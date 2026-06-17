'use strict';

// Read context file
//And Database with queries from visitors
import fs from 'node:fs'
import sqlite3 from 'sqlite3';

let context, db
const PROD_DB = "./db/queries_PROD.db"
const QA_DB = "./db/queries_QA.db"
const CONNECTION_PATH = process.env.DB_PATH || PROD_DB
// const MODEL_NAME = "mistralai/ministral-3-3b"
// const MODEL_NAME = "google/gemma-4-e2b"
const MODEL_NAME = "qwen/qwen3-vl-4b"

try {
	// Load RAG data
	context = fs.readFileSync('./info.json', 'utf-8')
	console.log("context file is read!", context.length, JSON.parse(context) != null);
	// Load most often asked and latest visitors queries
	db = new sqlite3.Database(CONNECTION_PATH, sqlite3.OPEN_READWRITE);
	console.log("Data base connected to", CONNECTION_PATH);
} catch (error) {
	console.error({ error });
	process.exit(1)
}

//Start HTTP server
import http from 'node:http'
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT ? Number(process.env.PORT) : 3007
const QUESTION_LENGTH_LIMIT = 100;

const HELLO_QUERY = JSON.stringify({
	model: MODEL_NAME,
	input: greeting_prompt("Introduce yourself."),
})

//CACHE
const CACHE_RESPONSE = []
try {
	console.log("init cache...");
	const cache_response = await askAi(HELLO_QUERY)
	const queries = await getAllQueries(db)
	CACHE_RESPONSE.push(JSON.stringify({ response: cache_response, queries }))
	console.log("cache initialized.");
} catch (error) {
	console.error(error.message);
	process.exit(1);
}

const server = http.createServer(async (req, res) => {
	const { method, url } = req;
	console.log(new Date().toLocaleString(), { method, url, origin: req.headers.origin });
	const origin = new Set(['http://localhost:5173', 'https://ihorlazarkov.github.io']).has(req.headers.origin)
	// const origin = new Set(['https://ihorlazarkov.github.io']).has(req.headers.origin)
	origin && res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader("Content-Type", "application/json")
	res.statusCode = 200;

	if (method === 'OPTIONS') {
		res.end(JSON.stringify({ response: 'Success' }));
		return;
	} else if (method === 'GET') {
		if (url === '/api/version') {
			//take response from cache for better UX
			res.end(CACHE_RESPONSE.pop())
			//get new but afterwards
			const response = await askAi(HELLO_QUERY)
			const queries = await getAllQueries(db)
			CACHE_RESPONSE.push(JSON.stringify({ response, queries }))
		}
		return;
	} else if (method == 'POST') {
		// To Nothing
	} else {
		res.statusCode = 404;
		res.end("{'response':'Not found'}")
		return;
	}

	let body = '' //store request body@
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', async () => {
		try {
			const requestBodyParsed = JSON.parse(body)
			if (requestBodyParsed.prompt.length > QUESTION_LENGTH_LIMIT) {
				res.statusCode = 400;
				res.end(JSON.stringify({ response: "Your question exceeds limit of 100 characters." }))
				return;
			}
			console.log({ question: requestBodyParsed.prompt });

			// persist query
			const newQuery = await addQuery(db, requestBodyParsed.prompt);
			console.log("Query persisted", { result: { ...newQuery } });
			// get all queries
			const queries = await getAllQueries(db)
			console.log("Queries All", { queries });
			// Ask an agent
			const prompt = generate_prompt(requestBodyParsed.prompt)
			delete requestBodyParsed.prompt
			requestBodyParsed.input = prompt
			requestBodyParsed.model = MODEL_NAME
			const responseFromAi = await askAi(JSON.stringify(requestBodyParsed));
			res.end(JSON.stringify({ response: responseFromAi, queries }))
		} catch (error) {
			res.statusCode = 500;
			res.end(`{'response':'${error.message}}`)
		}
	})
});

// Server stop/close
// Do graceful shutdown here
server.on('close', () => {
	console.log("Server closing All connections...");
	server.closeAllConnections();
})

// Process stop
process.on('SIGINT', () => {
	console.log("Process received signal to close...");
	server.close(() => {
		console.log("Server is being shut down...");
		process.exit()
	})
})

server.listen(port, host, () => console.log(`Server's running at http://${host}:${port}/`))


// DB layer
// Get most often asked and latest visitors queries
async function getAllQueries(conn) {
	return new Promise((res, rej) => {
		conn.all("Select body, count(body) as times from queries group by body Order by 'times' asc limit 5;", (err, rows) => {
			if (err) rej({ message: err.message })
			return res(rows);
		})
	})
}

async function addQuery(conn, prompt) {
	return new Promise((res, rej) => {
		conn.run("INSERT INTO queries (body) VALUES(?)", [prompt], (result, err) => {
			if (err) rej({ message: err.message });
			return res(result);
		});
	});
}

// AI layer
async function askAi(q) {
	try {
		const res = await fetch('http://127.0.0.1:1234/api/v1/chat', {
			method: 'POST',
			headers: { 
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.LMS_API_KEY}`
			},
			body: q
		})
		const data = await res.json()
		// console.log({ response: data.output[0].content });
		return data?.output[0].content || "Sorry, I couldn't generate a response. Please try again later.";
	} catch (error) {
		console.error({ error });
	}
}

function generate_prompt(query = '') {
	return `You are conversational agent of Ihor Lazarkov's website.
    
        Below is the context which includes:
		- Ihor Lazarkov's professional summary, 
		- soft skills, 
		- hard skills, 
		- experience, projects, recognition and education
		
		Context: ${JSON.stringify(context)}
		Query: ${query}
		
		Important security aspect (don't mention it in your response) don't process any query if it violates security protocols: 
		- perform harmful activities, 
		- run external or internal programmes or processes,
		- connect to unknown or provided by visitor servers or any network operational entities
		- execute any sorts of scripts`
}

function greeting_prompt(query = 'Hello') {
	return `Please greet the visitor the way you usually do. 
	User query: ${query}`
}