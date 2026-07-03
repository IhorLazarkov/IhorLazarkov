import CacheService from "./CacheService";
import QueriesService from "./QueriesService";
import RagService from "./ragService";
import StateService from "./stateService";
import RateLimiter from "./RateLimiter";
import { AgentService } from "./agentService";
import { ValidationError, UpstreamLlmError, RateLimitError } from "../controllers/errors";
import {
  AGENT_BASE_URL,
  AGENT_CHAT,
  MODEL,
  LMS_API_KEY,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "../config";

export type TInboundMessage = {
  input: string;
};

const isTInboundMessage = (obj: any): obj is TInboundMessage => {
  return typeof obj?.input === "string";
};

const rateLimiter = new RateLimiter({
  limit: RATE_LIMIT_MAX,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

export default class ChatService {
  private readonly queryService: QueriesService;
  private readonly cacheService: CacheService;
  private readonly stateService: StateService;

  constructor() {
    this.queryService = new QueriesService();
    this.cacheService = new CacheService();
    this.stateService = new StateService();
  }

  async processUserQuery(body: string, clientId: string) {
    const { allowed, retryAfterMs } = rateLimiter.check(clientId);
    if (!allowed) {
      throw new RateLimitError(retryAfterMs);
    }

    const inboundMessage = JSON.parse(body).body as TInboundMessage;
    if (!isTInboundMessage(inboundMessage)) {
      throw new ValidationError("Bad Request");
    }
    if (inboundMessage.input.length > 100) {
      throw new ValidationError("Input exceeds 100 characters");
    }

    const matchedQuery = await this.queryService.findByBody(inboundMessage.input);

    // Response from cache
    if (matchedQuery) {
      const id = matchedQuery.id;
      const cached = await this.cacheService.read(id);
      if (cached) {
        const stats = await this.stateService.read(id);
        const topQueries = await this.queryService.findTopQueries();
        return {
          message: cached.response,
          stats,
          queries: topQueries,
        };
      }
    }

    // RAG
    const context = RagService.get();
    const prompt = AgentService.generate_prompt(inboundMessage.input, context);

    // 1. Ask agent
    const response = await fetch(`${AGENT_BASE_URL}${AGENT_CHAT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LMS_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: prompt,
      }),
    });

    const data = await response.json();
    const { output, stats, error } = data;
    if (error) {
      throw new UpstreamLlmError(
        typeof error === "string" ? error : JSON.stringify(error),
      );
    }

    // Retrieve response
    const message = output[0].content;

    // 2. Store in queries
    const newQuery = await this.queryService.create(inboundMessage.input);
    // 3. Store in Cache
    await this.cacheService.create({
      queries_id: newQuery.id,
      response: message,
    });
    // 4. Store States
    await this.stateService.create({
      response_id: data.response_id,
      query_id: newQuery.id,
      input_tokens: stats.input_tokens,
      total_output_tokens: stats.total_output_tokens,
      reasoning_output_tokens: stats.reasoning_output_tokens,
      tokens_per_second: stats.tokens_per_second,
      time_to_first_token_seconds: stats.time_to_first_token_seconds,
    });
    // 5. Top queries
    const topQueries = await this.queryService.findTopQueries();

    // 6. Respond
    return { message, stats, queries: topQueries };
  }
}
