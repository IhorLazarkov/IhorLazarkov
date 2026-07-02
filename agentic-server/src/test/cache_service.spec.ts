import { test, describe } from "node:test";
import assert from "node:assert";

import CacheService from "../service/CacheService";
import QueriesService from "../service/QueriesService";
import { type queriesModel as TQuery } from "../../generated/prisma/models/queries";

describe("CacheService", () => {
  let cacheService: CacheService;
  let queriesService: QueriesService;
  let query: TQuery;
  let cache: {
    queries_id: number;
    response: string;
  };

  test.before(async () => {
    cacheService = new CacheService();
    queriesService = new QueriesService();
  });

  test("should create a cache entry successfully", async () => {
    query = (await queriesService.findAll())[0]!;
    if(!query){
      console.log({query})
      assert.fail("query is null");
    }
    cache = {
      queries_id: query.id,
      response: "test response",
    };

    const result = await cacheService.create(cache);
    assert.notEqual(result, null);
    assert.strictEqual(result.id > 0, true)
  });

  test("should read a cache entry by query_id", async () => {
    query = (await queriesService.findAll())[0]!;
    const cache1 = {
      queries_id: query.id,
      response: "test response",
    };
    if(!query){
      console.log({query})
      assert.fail("query is null");
    }

    const result = await cacheService.create(cache1);
    assert.notEqual(result, null);
    const query_id = result.queries_id;
    const cache2 = await cacheService.read(query_id);
    assert.notEqual(cache2, null);
  });

  test("should return null for non-existing cache entry", async () => {
    const query_id = 999;
    const cache = await cacheService.read(query_id);
    assert.strictEqual(cache, null);
  });

  test("should return null for invalid query_id", async () => {
    assert.strictEqual(await cacheService.read(-1), null);
  });
});
