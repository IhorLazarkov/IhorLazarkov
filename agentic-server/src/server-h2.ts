import { type IController } from "./controllers/defaultRouter";
import { constants, createSecureServer, type Http2Server, type OutgoingHttpHeaders } from "node:http2";
import fs from 'node:fs'

import dotenv from 'dotenv'
const envpath = process.env["NODE_ENV"] === 'test' ? '.env.test' : '.env'
dotenv.config({ path: envpath })

export default class Server {
  controller: IController;
  server: Http2Server | undefined;
  port: number;
  host: string;

  constructor(controller: IController, port: number, host: string) {
    this.controller = controller;
    this.port = port;
    this.host = host;
  }

  start() {
    this.server = createSecureServer({
      key: fs.readFileSync(process.env["H2_KEY"]),
      cert: fs.readFileSync(process.env["H2_CERT"])
    });

    this.server.on('stream', (stream, headers) => {
      const method = headers[constants.HTTP2_HEADER_METHOD];
      const url = headers[constants.HTTP2_HEADER_PATH];
      const origin = headers.origin;

      console.log(new Date().toLocaleString(), {
        method,
        url,
        origin,
      });

      const allowedOrigin = origin !== undefined && new Set([
        "http://localhost:5173",
        "https://ihorlazarkov.github.io",
      ]).has(origin);

      const responseHeaders: OutgoingHttpHeaders = {
        'content-type': "text/html; charset=utf8",
        'access-control-allow-methods': "POST, GET, OPTIONS",
        'access-control-allow-headers': "Content-Type, Authorization, X-Session-Id",
        ':status': 200
      };

      if (allowedOrigin) {
        responseHeaders['access-control-allow-origin'] = origin;
      }

      stream.respond(responseHeaders)
      stream.end("operational")
    })

    this.server.on('error', (err) => {
      console.error({ err });
    })

    this.server.listen(this.port, this.host, () => {
      console.log(`Server is running on https://${this.host}:${this.port}`);
    });

    this.server.on("close", () => {
      console.log("Server is closing ...");
    });
  }

  stop() {
    this.server?.close();
  }
}
