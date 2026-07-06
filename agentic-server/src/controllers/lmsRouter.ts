import dotenv from "dotenv";
const env_path = process.env.NODE_ENV !== "production" ? ".env.test" : ".env";
dotenv.config({ path: env_path });

import type { IncomingMessage, ServerResponse } from "node:http";
import { type IController } from "./defaultRouter";

// Services
import ChatService, { type TInboundMessage } from "../service/ChatService";
import { AppError, RateLimitError, SessionError } from "./errors";
import { issueSessionId, readSessionId } from "../service/session";

type TGetHandler = "/" | "/api/version" | "BAD_REQUEST";
type TPostHandler = "/api/generate";

function sendError(res: ServerResponse<IncomingMessage>, err: unknown) {
  res.setHeader("Content-Type", "application/json");
  if (err instanceof RateLimitError) {
    res.statusCode = err.statusCode;
    res.setHeader("Retry-After", Math.ceil(err.retryAfterMs / 1000).toString());
    return res.end(JSON.stringify({ error: err.message }));
  }
  if (err instanceof AppError) {
    res.statusCode = err.statusCode;
    return res.end(JSON.stringify({ error: err.message }));
  }
  res.statusCode = 500;
  console.error(err);
  return res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
}

async function processUserQuery(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  body: string,
  clientId: string,
) {
  try {
    const chatService = new ChatService();
    const result = await chatService.processUserQuery(body, clientId);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(result));
  } catch (err) {
    return sendError(res, err);
  }
}

const getHandler: Record<
  TGetHandler,
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
> = {
  "/": async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "OK" }));
  },
  /**
   * @description
   * Process when a visitor just open the webpage
   * and it sends us a greeting query.
   *
   * The work flow is
   * 1. Check the Cache if there is already such a query then
   * take it and respond.
   * 2. Otherwise ask LLM > store it in Cache > and respond.
   * @param req
   * @param res
   */
  "/api/version": async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
  ) => {
    const greeting_prompt = (query = "Hello") => {
      return `Please greet the visitor the way you usually do. User query: ${query}`;
    };

    const greetingMessage = greeting_prompt("Introduce yourself.");
    const body: TInboundMessage = { input: greetingMessage };

    const origin = req.headers.origin;
    let clientId = readSessionId(req);
    if (origin && !clientId) {
      clientId = issueSessionId(res);
    }
    clientId ??= req.socket.remoteAddress ?? "unknown";

    return await processUserQuery(req, res, JSON.stringify({ body }), clientId);
  },

  /**
   * @description Reject because something unknown
   * @param req
   * @param res
   */
  BAD_REQUEST: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.statusCode = 405;
    const response = { response: "Bad Request" };
    return res.end(JSON.stringify(response));
  },
};

const postHandler: Record<
  TPostHandler,
  (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: string,
  ) => void
> = {
  "/api/generate": async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: string,
  ) => {
    const clientId = readSessionId(req);
    if (!clientId) {
      return sendError(res, new SessionError());
    }
    return processUserQuery(req, res, body, clientId);
  },
};

export default class lmsRouter implements IController {
  GET(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    const handler = getHandler[req.url as TGetHandler];
    if (!handler) return getHandler["BAD_REQUEST"](req, res);
    return handler(req, res);
  }
  POST(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: string,
  ): void {
    const handler = postHandler[req.url as TPostHandler];
    if (!handler) return getHandler["BAD_REQUEST"](req, res);
    return handler(req, res, body);
  }
  PUT(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "PUT is not supported" }));
  }
  DELETE(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "DELETE is not supported" }));
  }
  OPTIONS(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "OK" }));
  }
}
