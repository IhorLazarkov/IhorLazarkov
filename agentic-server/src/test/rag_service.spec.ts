import { test, describe } from "node:test";
import assert from "node:assert";
import RagService from "../service/ragService";

describe("RagService", () => {
  test("get should return RAG data", () => {
    const result = RagService.get();
    assert.notEqual(result, null);
    assert.strictEqual(typeof result, "string");
    assert.strictEqual(result.length > 0, true);
  });

  test("get method should be static", () => {
    assert.strictEqual(typeof RagService.get, "function");
    assert.strictEqual(typeof new RagService().get, "undefined");
  });
});
