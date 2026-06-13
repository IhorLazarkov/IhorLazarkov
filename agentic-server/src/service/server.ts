import { type IController } from "./controller";
import { createServer, Server as HttpServer } from "node:http";


export default class Server {
    controller: IController;
    server: HttpServer | undefined;
    port: number;
    host: string;
    body: string | undefined;

    constructor(controller: IController, port: number, host: string) {
        this.controller = controller;
        this.port = port;
        this.host = host;
    }

    start() {
        this.server = createServer(async (req, res) => {
            const { method, url } = req;
            console.log(new Date().toLocaleString(), { method, url, origin: req.headers.origin });
            const origin = new Set(['http://localhost:5173', 'https://ihorlazarkov.github.io']).has(req.headers.origin)
            // const origin = new Set(['https://ihorlazarkov.github.io']).has(req.headers.origin)
            origin && res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader("Content-Type", "application/json")
            res.statusCode = 200;

            this.body = '';
            req.on('data', (chunk) => {
                this.body += chunk.toString();
            });

            const onDataEnd: () => Promise<string> = () => {
                return new Promise((resolve) => {
                    req.on('end', () => {
                        resolve(this.body as string);
                    })
                });
            }

            const handler = this.controller[method as keyof IController];
            if (!handler) throw new TypeError("Method is not supported")
            if (method === 'POST') this.controller.POST(req, res, await onDataEnd());
            else handler(req, res, this.body as string);
        });

        this.server.listen(this.port, this.host, () => {
            console.log(`Server is running on http://${this.host}:${this.port}`);
        });

        this.server.on('close', () => {
            console.log("Server is closing ...")
        })
    }

    stop() {
        this.server?.close();
    }
}
