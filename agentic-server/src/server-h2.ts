import { type IControllerH2, type HttpMethods } from "./controllers/defaultRouterH2";
import { constants, createSecureServer, type Http2Server, type OutgoingHttpHeaders, type ServerHttp2Stream, type IncomingHttpHeaders } from "node:http2";
import fs from 'node:fs'

import dotenv from 'dotenv'
const envpath = process.env["NODE_ENV"] !== 'production' ? '.env.test' : '.env'
dotenv.config({ path: envpath })

export default class Server {
  controller: IControllerH2;
  server: Http2Server | undefined;
  port: number;
  host: string;

  constructor(controller: IControllerH2, port: number, host: string) {
    this.controller = controller;
    this.port = port;
    this.host = host;
  }

  start() {
    this.server = createSecureServer({
      key: fs.readFileSync(process.env["H2_KEY"]),
      cert: fs.readFileSync(process.env["H2_CERT"])
    });

    this.server.on('stream', async (stream: ServerHttp2Stream, headers: IncomingHttpHeaders) => {
      const method = headers[constants.HTTP2_HEADER_METHOD] as string;
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

      const corsHeaders: OutgoingHttpHeaders = {
        'access-control-allow-methods': "POST, GET, OPTIONS",
        'access-control-allow-headers': "Content-Type, Authorization, X-Session-Id",
      };

      if (allowedOrigin) {
        corsHeaders['access-control-allow-origin'] = origin;
      }

      stream.on('error', (err) => {
        console.error('Stream error:', err);
      });

      const buffer: Buffer[] = [];
      stream.on('data', (chunk) => buffer.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));

      const body: string = await new Promise<string>((resolve) => {
        stream.on('end', () => {
          resolve(Buffer.concat(buffer).toString('utf-8'));
        });
      });

      const handler = method && method in this.controller
        ? this.controller[method as HttpMethods]
        : undefined;

      if (!handler) {
        stream.respond({ ...corsHeaders, [constants.HTTP2_HEADER_STATUS]: 405 }, { endStream: method === 'HEAD' });

        // Node's http2 auto-ends the writable side of a stream once respond() 
        // is called on a HEAD-originated stream (HEAD responses can't carry a body), 
        // so the follow-up stream.end(body) throws ERR_STREAM_WRITE_AFTER_END
        if (method !== 'HEAD') {
          stream.end(JSON.stringify({ error: `Method ${method} is not supported` }));
        }
        return;
      }

      try {
        await handler(stream, headers, body, corsHeaders);
      } catch (error) {
        console.error(error);
        stream.respond({ ...corsHeaders, [constants.HTTP2_HEADER_STATUS]: 500 });
        stream.end(JSON.stringify({
          error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`
        }));
      }
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
