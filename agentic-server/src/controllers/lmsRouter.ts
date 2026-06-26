import dotenv from "dotenv";
const env_path = process.env.NODE_ENV !== "production" ? ".env.test" : ".env";
dotenv.config({ path: env_path });

import type { IncomingMessage, ServerResponse } from "node:http";
import IController from "./defaultRouter";

// Services
import CacheService from "../service/cacheService";
import QueriesService from "../service/queriesService";
import RagService from "../service/ragService";
import { AgentService } from "../service/agentService";
import {
  type queriesModel as TQuery,
  type CacheModel as TCache,
  type StateModel as TState,
} from "../../generated/prisma/models";
import StateService from "../service/stateService";

const BASE_URL = process.env["AGENT_BASE_URL"];
const CHAT = process.env["AGENT_CHAT"];
const MODEL = process.env["MODEL"];

type TGetHandler = "/" | "/api/version" | "BAD_REQUEST";
type TPostHandler = "/api/generate";

type TInboundMessage = {
  input: string;
};

const isTInboundMessage = (obj: any): obj is TInboundMessage => {
  return obj.input !== undefined;
};

async function processUserQuery(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  body: string,
) {
  try {
    //Validate body has input
    const inboundMessage = JSON.parse(body).body as TInboundMessage;
    if (!isTInboundMessage(inboundMessage)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Bad Request" }));
      return;
    }

    //Service declaration
    const queryService = new QueriesService();
    const cacheService = new CacheService();
    const stateService = new StateService();

    const queries: TQuery[] = (await queryService.findAll()).filter(
      (q) => q.body === inboundMessage.input,
    );

    //Response from cache
    if (queries.length > 0) {
      const id = queries[queries.length - 1]!.id;
      const cached = await cacheService.read(id);
      if (cached) {
        const stats = await stateService.read(id);
        const topQueries = await queryService.findTopQueries();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(
          JSON.stringify({
            message: cached.response,
            stats,
            queries: topQueries,
          }),
        );
      }
    }

    // RAG
    const context = RagService.get();
    const prompt = AgentService.generate_prompt(body, context);
    //1. Ask agent
    const response = await fetch(`${BASE_URL}${CHAT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LMS_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: prompt,
      }),
    });

    //Error handler
    const data = await response.json();
    const { output, stats, error } = data;
    // console.log({ output, stats, error });
    if (error) {
      // type TError = {
      //   message: string,
      //   type: string,
      //   code: string,
      //   param: string | null
      // }
      res.statusCode = 501;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(error));
    }
    //Retrieve response
    const message = output[0].content;

    // 2. Store in queries
    const newQuery = await queryService.create(inboundMessage.input);
    // 3. Store in Cache
    await cacheService.create({
      queries_id: newQuery.id,
      response: message,
    });
    // 4. Store States
    await stateService.create({
      response_id: data.response_id,
      query_id: newQuery.id,
      input_tokens: stats.input_tokens,
      total_output_tokens: stats.total_output_tokens,
      reasoning_output_tokens: stats.reasoning_output_tokens,
      tokens_per_second: stats.tokens_per_second,
      time_to_first_token_seconds: stats.time_to_first_token_seconds,
    });
    // 5. Top queries
    const topQueries = await queryService.findTopQueries();
    // 6. Respond
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message, stats, queries: topQueries }));

    //Internal Error Occurred
  } catch (err) {
    res.statusCode = 501;
    res.setHeader("Content-Type", "application/json");
    console.error(err);
    return res.end(JSON.stringify({ error: err }));
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
    return await processUserQuery(req, res, JSON.stringify({ body }));
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
  "/api/generate": processUserQuery,
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
