// src/service/stateService.ts
import { StateRepository } from "../repository/stateRepository";
import { type StateModel as TState } from "../../generated/prisma/models/State";

export default class StateService {
  private stateRepository: StateRepository;

  constructor() {
    this.stateRepository = new StateRepository();
  }

  // Create a new state entry by writing to DB
  async create(state: {
    response_id: string;
    query_id: number;
    input_tokens: number;
    total_output_tokens: number;
    reasoning_output_tokens: number;
    tokens_per_second: number;
    time_to_first_token_seconds: number;
  }): Promise<TState> {
    return await this.stateRepository.create(state);
  }

  // Read a state entry by reading from DB
  async read(query_id: number): Promise<TState | null> {
    return await this.stateRepository.findByQueryId(query_id);
  }
}