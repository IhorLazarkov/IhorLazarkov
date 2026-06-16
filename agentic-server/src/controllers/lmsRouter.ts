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
    try {
      const queries = new QueriesService();
      const cache = new CacheService();
      const state = new StateService();

      const greeting_prompt = (query = "Hello") => {
        return `Please greet the visitor the way you usually do. User query: ${query}`;
      };

      const greetingMessage = greeting_prompt("Introduce yourself.");

      const queried = (await queries.findAll()).filter(
        (q) => q.body === greetingMessage,
      )[0] as TQuery;
      if (!queried) {
        return new lmsRouter().POST(
          req,
          res,
          JSON.stringify({
            body: {
              model: MODEL,
              input: greetingMessage,
            },
          }),
        );
      }

      let cached: TCache | null = await cache.read(queried.id);
      if (!cached) {
        cached = await cache.create({
          queries_id: queried.id,
          response: queried.body,
        });
      }

      let stated: TState | null = await state.read(queried.id);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({ message: cached.response, states: stated }),
      );
    } catch (err) {
      res.statusCode = 501;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: err }));
    }
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

export default class lmsRouter implements IController {
  GET(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    const handler = getHandler[req.url as TGetHandler];
    if (!handler) return getHandler["BAD_REQUEST"](req, res);
    return handler(req, res);
  }
  async POST(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: string,
  ): Promise<void> {
    try {
      const queryService = new QueriesService();
      const cacheService = new CacheService();
      const stateService = new StateService();

      const queries: TQuery[] = (await queryService.findAll()).filter(
        (q) => q.body === JSON.parse(body)!.body.input,
      );

      //Response from cache
      if (queries.length > 0) {
        const cached = await cacheService.read(queries[0]!.id);
        if (cached) {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          return res.end(JSON.stringify({ message: cached.response }));
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

      const data = await response.json();

      //Error
      // data: {
      //   error: {
      //     message: 'The model has crashed without additional information. (Exit code: null)',
      //     type: 'internal_error',
      //     code: 'unknown',
      //     param: null
      //   }
      // },

      const { output, stats, error } = data;
      console.log({ data, output, error });
      if (error) {
        res.statusCode = 501;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ error: { ...error } }));
      }
      const message =
        output[0].content ||
        "Sorry, I couldn't generate a response. Please try again later.";

      // 2. Store in queries
      const newQuery = await queryService.create(JSON.parse(body)!.body.input);
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
      // 5. Respond
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message, states: data.states }));
    } catch (err) {
      console.error({ error: err });
      res.statusCode = 501;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: "Server Internal Error" }));
    }
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
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "OPTION is not supported" }));
  }
}
