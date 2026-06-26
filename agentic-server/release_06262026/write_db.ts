/**
 * Need to:
 * 1. Reade back_up file 
 * 2. Query LM Studio model 
 * 3. store response
 */
import fs from 'node:fs/promises'
import { Dirent, statSync } from 'node:fs';
import lmsRouter from "../src/controllers/lmsRouter"
import Server from "../src/server"
import path from 'node:path';

const PORT = process.env["PORT"] as string,
    HOST = process.env["HOST"] as string;

async function main() {
    const server = new Server(new lmsRouter(), Number.parseInt(PORT), HOST)

    try {
        // Start the server 
        server.start()
        await waitForServer()
        // Read file
        const backupFilePath = await getFilePath()
        const queries = JSON.parse((await fs.readFile(backupFilePath)).toString())
        console.log("found :", queries.length, "queries");
        // query server with each body
        for (const { body } of queries) {

            console.log("sending prompt:", { body });
            const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body: { input: body } }),
            })
            const data = await response.json()
            if (data) console.log({ data });
            else console.error("Something went wrong", { data });
        }
    } catch (error) {
        console.error({ error });
    } finally {
        //stop the server
        server.stop()
    }
}

async function getFilePath(): Promise<string> {
    const files = await fs.readdir(path.join(__dirname, "../../release_06262026/"), { withFileTypes: true })
    console.log({ files });
    const { parentPath, name } = files.filter((f) => f.name.startsWith("backup_") && f.isFile())
        .sort((a, b) => {
            const aPath = path.join(__dirname, "../../release_06262026/" + a.name);
            const bPath = path.join(__dirname, "../../release_06262026/" + b.name);
            const stat1 = statSync(aPath)
            const stat2 = statSync(bPath)
            return stat2.birthtimeMs - stat1.birthtimeMs;
        })[0] as Dirent
    console.log({ parentPath, name });
    return path.join(parentPath, name);
}

async function waitForServer(): Promise<void> {
    return new Promise((res, _) => {
        setTimeout(async () => {
            try {
                const result = await fetch(`http://${HOST}:${PORT}/api/version`, { method: "GET" })
                const data = await result.text()
                console.log({ data });
                if (data) return res()
            } catch (err) {
                console.error({ err });
            }
        }, 3000)
    })
}


await main()

