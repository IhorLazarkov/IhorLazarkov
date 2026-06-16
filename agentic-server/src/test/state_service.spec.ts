// src/test/state_service.spec.ts
import { test, describe } from "node:test";
import assert from "node:assert";

import StateService from "../service/stateService";
import QueriesService from "../service/queriesService";
import { type queriesModel as TQuery } from "../../generated/prisma/models/queries";

describe("StateService", () => {
  let stateService: StateService;
  let queriesService: QueriesService;
  let query: TQuery;
  let state: {
    response_id: string;
    query_id: number;
    input_tokens: number;
    total_output_tokens: number;
    reasoning_output_tokens: number;
    tokens_per_second: number;
    time_to_first_token_seconds: number;
  };

  test.before(async () => {
    stateService = new StateService();
    queriesService = new QueriesService();

    query = (await queriesService.findAll())[0]!;
    console.log({ query });
  });

  test("should create a state entry successfully", async () => {
    state = {
      response_id: "resp-123",
      query_id: query.id,
      input_tokens: 100,
      total_output_tokens: 200,
      reasoning_output_tokens: 50,
      tokens_per_second: 1.5,
      time_to_first_token_seconds: 0.2,
    };

    const result = await stateService.create(state);
    assert.notEqual(result, null);
    assert.strictEqual(result.id > 0, true);
  });

  test("should read a state entry by query_id", async () => {
    const state1 = {
      response_id: "resp-123",
      query_id: query.id,
      input_tokens: 100,
      total_output_tokens: 200,
      reasoning_output_tokens: 50,
      tokens_per_second: 1.5,
      time_to_first_token_seconds: 0.2,
    };

    const result = await stateService.create(state1);
    const query_id = result.query_id;
    const state2 = await stateService.read(query_id);
    assert.notEqual(state2, null);
  });

  test("should return null for non-existing state entry", async () => {
    const query_id = 999;
    const state = await stateService.read(query_id);
    assert.strictEqual(state, null);
  });

  test("should throw error for invalid query_id", async () => {
    assert.strictEqual(await stateService.read(-1), null);
  });
});