import { type IController } from "./controllers/defaultRouter";
import { createServer, Server as HttpServer } from "node:http";

export default class Server {
  controller: IController;
  server: HttpServer | undefined;
  port: number;
  host: string;

  constructor(controller: IController, port: number, host: string) {
    this.controller = controller;
    this.port = port;
    this.host = host;
  }

  start() {
    this.server = createServer(async (req, res) => {
      const buffer: Buffer[] = []
      const { method, url } = req;
      console.log(new Date().toLocaleString(), {
        method,
        url,
        origin: req.headers.origin,
      });
      const origin = new Set([
        "http://localhost:5173",
        "https://ihorlazarkov.github.io",
      ]).has(req.headers.origin);
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin!);
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
      );
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;

      req.on("data", (chunk) => buffer.push(chunk));

      const body: string = await new Promise<string>((resolve) => {
        req.on("end", () => {
          resolve(Buffer.concat(buffer).toString('utf-8'));
        });
      });

      const handler = method && method in this.controller
        ? this.controller[method as keyof IController]
        : undefined;

      if (!handler) {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: `Method ${method} is not supported` }));
        return;
      }

      try {
        await handler(req, res, body);
      } catch (error) {
        res.statusCode = 500;
        console.error(error);
        res.end(JSON.stringify({
          error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`
        }))
      }
    });

    this.server.listen(this.port, this.host, () => {
      console.log(`Server is running on http://${this.host}:${this.port}`);
    });

    this.server.on("close", () => {
      console.log("Server is closing ...");
    });
  }

  stop() {
    this.server?.close();
  }
}
