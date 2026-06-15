import dotenv from "dotenv";
const env_path = process.env.NODE_ENV !== "production" ? ".env.test" : ".env";
dotenv.config({ path: env_path });

import type { IncomingMessage, ServerResponse } from "node:http";
import IController from "./serverRouter";

// Services
import CacheService from "../service/cacheService";
import QueriesService from "../service/queriesService";
import { type queriesModel as TQuery } from "../../generated/prisma/models";

const BASE_URL = process.env["AGENT_BASE_URL"];
const CHAT = process.env["AGENT_CHAT"];

type TGetHandler = "/api/version" | "BAD_REQUEST";
const getHandler: Record<
  TGetHandler,
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
> = {
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

      const greeting_prompt = (query = "Hello") => {
        return `Please greet the visitor the way you usually do. 
        User query: ${query}`;
      };

      const greetingMessage = greeting_prompt("Introduce yourself.");

      const queried: TQuery = (await queries.findAll()).filter(
        (q) => q.body === greetingMessage,
      )[0] as TQuery;
      if (!queried) {
        //1. Aks and agent

        // 2. Store in queries

        // 3. Store in Cache

        // 4. Respond
        return;
      }

      let cached = await cache.read(queried.id);
      if (!cached) {
        cached = await cache.create({
          queries_id: queried.id,
          response: queried.body,
        });
      }

      res.setHeader("Content-Type", "application/json");
      return res.end({ response: cached.response });
    } catch (err) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 501;
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
    res.end(JSON.stringify(response));
  },
};

export default class lmsRouter implements IController {
  GET(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    const { url } = req;
    const handler = getHandler[url as TGetHandler];
    if (!handler) return getHandler["BAD_REQUEST"](req, res);
    handler(req, res);
  }
  async POST(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: string,
  ): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}${CHAT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LMS_API_KEY}`,
        },
        body,
      });
      const data = await response.json();
      const message =
        data?.output[0].content ||
        "Sorry, I couldn't generate a response. Please try again later.";
      // console.log({ response: data.output[0].content });
      res.end(message);
    } catch (error) {
      console.error({ error });
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
