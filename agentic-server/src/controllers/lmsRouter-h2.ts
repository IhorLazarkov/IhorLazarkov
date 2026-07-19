import dotenv from "dotenv";
const env_path = process.env.NODE_ENV !== "production" ? ".env.test" : ".env";
dotenv.config({ path: env_path });

import {
  constants,
  type IncomingHttpHeaders,
  type OutgoingHttpHeaders,
  type ServerHttp2Stream,
} from "node:http2";
import { type IControllerH2 } from "./defaultRouterH2";

// Services
import ChatService, { type TInboundMessage } from "../service/ChatService";
import { AppError, RateLimitError, SessionError } from "./errors";
import { issueSessionId, readSessionIdFromParts } from "../service/session";

type TGetHandler = "/" | "/api/version" | "/api/countdown" | "BAD_REQUEST";
type TPostHandler = "/api/generate";

function pathOf(headers: IncomingHttpHeaders): string {
  return (headers[constants.HTTP2_HEADER_PATH] as string) ?? "";
}

function sendError(
  stream: ServerHttp2Stream,
  corsHeaders: OutgoingHttpHeaders,
  err: unknown,
) {
  const responseHeaders: OutgoingHttpHeaders = {
    ...corsHeaders,
    "content-type": "application/json",
  };
  if (err instanceof RateLimitError) {
    responseHeaders[constants.HTTP2_HEADER_STATUS] = err.statusCode;
    responseHeaders["retry-after"] = Math.ceil(err.retryAfterMs / 1000).toString();
    stream.respond(responseHeaders);
    return stream.end(JSON.stringify({ error: err.message }));
  }
  if (err instanceof AppError) {
    responseHeaders[constants.HTTP2_HEADER_STATUS] = err.statusCode;
    stream.respond(responseHeaders);
    return stream.end(JSON.stringify({ error: err.message }));
  }
  responseHeaders[constants.HTTP2_HEADER_STATUS] = 500;
  console.error(err);
  stream.respond(responseHeaders);
  return stream.end(
    JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
  );
}

async function processUserQuery(
  stream: ServerHttp2Stream,
  corsHeaders: OutgoingHttpHeaders,
  body: string,
  clientId: string,
  extra?: Record<string, unknown>,
) {
  try {
    const chatService = new ChatService();
    const result = await chatService.processUserQuery(body, clientId);
    stream.respond({
      ...corsHeaders,
      "content-type": "application/json",
      [constants.HTTP2_HEADER_STATUS]: 200,
    });
    return stream.end(JSON.stringify({ ...result, ...extra }));
  } catch (err) {
    return sendError(stream, corsHeaders, err);
  }
}

const getHandler: Record<
  TGetHandler,
  (
    stream: ServerHttp2Stream,
    headers: IncomingHttpHeaders,
    corsHeaders: OutgoingHttpHeaders,
  ) => void
> = {
  "/": (stream, _headers, corsHeaders) => {
    stream.respond({
      ...corsHeaders,
      "content-type": "application/json",
      [constants.HTTP2_HEADER_STATUS]: 200,
    });
    return stream.end(JSON.stringify({ message: "OK" }));
  },
  "/api/version": async (stream, headers, corsHeaders) => {
    const greeting_prompt = (query = "Hello") => {
      return `Please greet the visitor the way you usually do. User query: ${query}`;
    };

    const greetingMessage = greeting_prompt("Introduce yourself.");
    const body: TInboundMessage = { input: greetingMessage };

    const sessionId = readSessionIdFromParts(headers, pathOf(headers)) ?? issueSessionId();

    return await processUserQuery(
      stream,
      corsHeaders,
      JSON.stringify({ body }),
      sessionId,
      { sessionId },
    );
  },
  "/api/countdown": (stream, headers, corsHeaders) => {
    const sessionId = readSessionIdFromParts(headers, pathOf(headers));
    if (!sessionId) return sendError(stream, corsHeaders, new SessionError());

    stream.respond({
      ...corsHeaders,
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "x-accel-buffering": "no",
      [constants.HTTP2_HEADER_STATUS]: 200,
    });

    const chatService = new ChatService();
    const intervalId = setInterval(() => {
      const remainingTime = chatService.remainAwait(sessionId);
      if (remainingTime < 1) {
        clearInterval(intervalId);
        return stream.end("data:0\n\n");
      }
      stream.write(`data:${remainingTime}\n\n`);
    }, 1000);

    stream.once("close", () => clearInterval(intervalId));
  },
  BAD_REQUEST: (stream, _headers, corsHeaders) => {
    stream.respond({ ...corsHeaders, [constants.HTTP2_HEADER_STATUS]: 405 });
    return stream.end(JSON.stringify({ response: "Bad Request" }));
  },
};

const postHandler: Record<
  TPostHandler,
  (
    stream: ServerHttp2Stream,
    headers: IncomingHttpHeaders,
    body: string,
    corsHeaders: OutgoingHttpHeaders,
  ) => void
> = {
  "/api/generate": (stream, headers, body, corsHeaders) => {
    const clientId = readSessionIdFromParts(headers, pathOf(headers));
    if (!clientId) {
      return sendError(stream, corsHeaders, new SessionError());
    }
    return processUserQuery(stream, corsHeaders, body, clientId);
  },
};

export default class lmsRouterH2 implements IControllerH2 {
  GET(
    stream: ServerHttp2Stream,
    headers: IncomingHttpHeaders,
    _body: string,
    corsHeaders: OutgoingHttpHeaders,
  ): void {
    const path = pathOf(headers).split("?")[0];
    const handler = getHandler[path as TGetHandler];
    if (!handler) return getHandler["BAD_REQUEST"](stream, headers, corsHeaders);
    return handler(stream, headers, corsHeaders);
  }

  POST(
    stream: ServerHttp2Stream,
    headers: IncomingHttpHeaders,
    body: string,
    corsHeaders: OutgoingHttpHeaders,
  ): void {
    const handler = postHandler[pathOf(headers) as TPostHandler];
    if (!handler) return getHandler["BAD_REQUEST"](stream, headers, corsHeaders);
    return handler(stream, headers, body, corsHeaders);
  }

  PUT(
    stream: ServerHttp2Stream,
    _headers: IncomingHttpHeaders,
    _body: string,
    corsHeaders: OutgoingHttpHeaders,
  ): void {
    stream.respond({
      ...corsHeaders,
      "content-type": "application/json",
      [constants.HTTP2_HEADER_STATUS]: 405,
    });
    stream.end(JSON.stringify({ message: "PUT is not supported" }));
  }

  DELETE(
    stream: ServerHttp2Stream,
    _headers: IncomingHttpHeaders,
    _body: string,
    corsHeaders: OutgoingHttpHeaders,
  ): void {
    stream.respond({
      ...corsHeaders,
      "content-type": "application/json",
      [constants.HTTP2_HEADER_STATUS]: 405,
    });
    stream.end(JSON.stringify({ message: "DELETE is not supported" }));
  }

  OPTIONS(
    stream: ServerHttp2Stream,
    _headers: IncomingHttpHeaders,
    _body: string,
    corsHeaders: OutgoingHttpHeaders,
  ): void {
    stream.respond({
      ...corsHeaders,
      "content-type": "application/json",
      [constants.HTTP2_HEADER_STATUS]: 200,
    });
    stream.end(JSON.stringify({ message: "OK" }));
  }
}
