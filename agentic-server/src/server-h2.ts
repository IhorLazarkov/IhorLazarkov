import { type IController } from "./controllers/defaultRouter";
import { createSecureServer, type Http2Server } from "node:http2";
import fs from 'node:fs'

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
      key: fs.readFileSync("/etc/letsencrypt/live/agentic.ihorlazarkov-swe.in/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/agentic.ihorlazarkov-swe.in/fullchain.pem")
    });

    this.server.on('stream', (stream, headers) => {
      stream.respond({
        'content-type': "text/html; charset=utf8",
        ':status': 200
      })
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
