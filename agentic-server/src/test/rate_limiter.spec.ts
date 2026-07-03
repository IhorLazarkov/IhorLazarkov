import { test, describe } from "node:test";
import assert from "node:assert";

import RateLimiter from "../service/RateLimiter";

describe("RateLimiter", () => {
  test("allows requests under the limit", () => {
    const limiter = new RateLimiter({ limit: 3, windowMs: 1000 });
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
  });

  test("rejects the request that exceeds the limit within the window", () => {
    const limiter = new RateLimiter({ limit: 2, windowMs: 1000 });
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    const result = limiter.check("1.2.3.4");
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.retryAfterMs > 0, true);
  });

  test("tracks separate keys independently", () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 1000 });
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    assert.strictEqual(limiter.check("1.2.3.4").allowed, false);
    assert.strictEqual(limiter.check("5.6.7.8").allowed, true);
  });

  test("allows requests again once the window has elapsed", () => {
    let now = 0;
    const limiter = new RateLimiter({
      limit: 1,
      windowMs: 1000,
      clock: () => now,
    });
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
    assert.strictEqual(limiter.check("1.2.3.4").allowed, false);

    now += 1000;
    assert.strictEqual(limiter.check("1.2.3.4").allowed, true);
  });

  test("evicts stale keys so memory doesn't grow unbounded", () => {
    let now = 0;
    const limiter = new RateLimiter({
      limit: 1,
      windowMs: 1000,
      clock: () => now,
    });
    limiter.check("1.2.3.4");
    now += 1000;
    limiter.check("5.6.7.8");
    assert.strictEqual(limiter.size(), 1);
  });
});
