import { test, describe } from "node:test";
import assert from "node:assert";

import QueriesService from "../service/queriesService";

describe("Test Queries Service", () => {
  let service: QueriesService;

  test.before(() => (service = new QueriesService()));

  test("Check findAll returns records", async () => {
    const records = await service.findAll();
    assert.strictEqual(records.length > 0, true);
  });
});
