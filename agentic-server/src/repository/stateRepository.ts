// src/repository/stateRepository.ts
import { prisma } from "../../lib/prisma";
import { type StateModel as TState } from "../../generated/prisma/models/State";

export class StateRepository {
  async create({
    response_id,
    query_id,
    input_tokens,
    total_output_tokens,
    reasoning_output_tokens,
    tokens_per_second,
    time_to_first_token_seconds,
  }: {
    response_id: string;
    query_id: number;
    input_tokens: number;
    total_output_tokens: number;
    reasoning_output_tokens: number;
    tokens_per_second: number;
    time_to_first_token_seconds: number;
  }): Promise<TState> {
    return await prisma.state.create({
      data: {
        response_id,
        query_id,
        input_tokens,
        total_output_tokens,
        reasoning_output_tokens,
        tokens_per_second,
        time_to_first_token_seconds,
      },
    });
  }

  async findByQueryId(query_id: number): Promise<TState | null> {
    return (await prisma.state.findFirst({
      where: { query_id },
      select: {
        id: true,
        response_id: true,
        query_id: true,
        input_tokens: true,
        total_output_tokens: true,
        reasoning_output_tokens: true,
        tokens_per_second: true,
        time_to_first_token_seconds: true,
        createdAt: true,
      },
    })) as TState | null;
  }
}