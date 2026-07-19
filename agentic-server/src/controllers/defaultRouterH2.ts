import type { IncomingHttpHeaders, OutgoingHttpHeaders, ServerHttp2Stream } from "node:http2";

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

type HandlerH2 = (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
  body: string,
  corsHeaders: OutgoingHttpHeaders,
) => void | Promise<void>;

export interface IControllerH2 {
  GET: HandlerH2;
  POST: HandlerH2;
  PUT: HandlerH2;
  DELETE: HandlerH2;
  OPTIONS: HandlerH2;
}
