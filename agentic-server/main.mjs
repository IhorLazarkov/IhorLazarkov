import dotenv from 'dotenv'
const envpath = process.env["NODE_ENV"] === 'test' ? '.env.test' : '.env'
dotenv.config({ path: envpath })

const PORT = process.env.PORT || 3007
const HOST = process.env.HOST || '127.0.0.1'
import Server from "./src/server"
import lmsRouter from "./src/controllers/lmsRouter"

async function main() { // Mark main as async to use await
    const server = new Server(new lmsRouter(), PORT, HOST);
    try {
        await server.start(); // Await server start if it's async
        console.log(`Server running at http://${HOST}:${PORT}/`);

        process.on('SIGINT', async () => { // Mark callback as async
            console.log('SIGINT received. Initiating graceful shutdown...');
            await server.stop(); // Await the stop operation
            console.log('Server gracefully stopped.');
            process.exit(0); // Exit cleanly
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        await server.stop(); // Await the stop operation
        process.exit(1); // Exit with error code
    }
}

main()