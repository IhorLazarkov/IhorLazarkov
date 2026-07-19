import { test, describe } from "node:test";
import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { Agent, fetch, type Response } from "undici";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const PORT = Number.parseInt(process.env["PORT"] as string);
const HOST = process.env["HOST"] as string;
const MODEL = process.env["MODEL"];
const RATE_LIMIT_MAX = Number(process.env["RATE_LIMIT_MAX"] ?? 5);
const BASE_URL = `https://${HOST}:${PORT}`;

// Self-signed cert used locally for QA (see certs/qa) - trust it for tests only.
const dispatcher = new Agent({
  allowH2: true,
  connect: { rejectUnauthorized: false },
});

import Server from "../server-h2";
import Router from "../controllers/lmsRouter-h2";

type TResponse = {
  message: string;
  stats: string;
  queries: string;
};

const isTResponse = (obj: any): obj is TResponse => {
  return obj.message !== undefined && obj.stats !== undefined;
};

async function createSessionToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}/api/version`, {
    method: "GET",
    dispatcher,
    headers: { Origin: "http://localhost:5173" },
  });
  const { sessionId } = (await response.json()) as any;
  if (!sessionId) throw new Error("Expected a session id to be issued");
  return sessionId as string;
}

describe("Test Server with LM Studio Router", async () => {
  const router = new Router();
  const server = new Server(router, PORT, HOST);

  test.before(() => {
    server.start();
  });

  test.after(() => {
    server.stop();
  });

  test("Check GET is supported", async () => {
    const response = await fetch(`${BASE_URL}`, { method: "GET", dispatcher });
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any;
    assert.strictEqual(data!.message, "OK");
  });

  test("Check POST without a session id is rejected", async () => {
    const body = { body: { input: "no session" } };
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      dispatcher,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = (await response.json()) as any;
    assert.strictEqual(response.status, 401);
    assert.strictEqual(json.error, "Missing or expired session");
  });

  test("Check POST is supported", async () => {
    const sessionId = await createSessionToken();
    const body = { body: { input: "post is supported" } };
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      dispatcher,
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
      },
      body: JSON.stringify(body),
    });
    const json = (await response.json()) as any;
    assert.strictEqual(response.status, 200);
    assert.strictEqual(json.message.length > 0, true);
    assert.strictEqual(isTResponse(json), true);
  });

  test("Check error is returned when sent invalid message", async () => {
    const sessionId = await createSessionToken();
    const body = { body: "test" }; //invalid message
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      dispatcher,
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
      },
      body: JSON.stringify(body),
    });
    const json = (await response.json()) as any;
    assert.strictEqual(response.status, 400);
    assert.strictEqual(json.error, "Bad Request");
  });

  test("Check error is returned when input exceeds 100 characters", async () => {
    const sessionId = await createSessionToken();
    const body = { body: { input: "a".repeat(101) } };
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      dispatcher,
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
      },
      body: JSON.stringify(body),
    });
    const json = (await response.json()) as any;
    assert.strictEqual(response.status, 400);
    assert.strictEqual(json.error, "Input exceeds 100 characters");
  });

  test("Check OPTIONS is supported", async () => {
    const response = await fetch(`${BASE_URL}`, {
      method: "OPTIONS",
      dispatcher,
    });
    assert.strictEqual(response.status, 200);
  });

  test("Check DELETE is not supported", async () => {
    const response = await fetch(`${BASE_URL}`, {
      method: "DELETE",
      dispatcher,
    });
    assert.strictEqual(response.status, 405);
  });

  test("Check PUT is not supported", async () => {
    const response = await fetch(`${BASE_URL}`, { method: "PUT", dispatcher });
    assert.strictEqual(response.status, 405);
  });

  test('Check "/api/version" is cached', async () => {
    //ask agent
    const response = await fetch(`${BASE_URL}/api/version`, {
      method: "GET",
      dispatcher,
    });
    const { message } = (await response.json()) as any;
    //check status
    assert.strictEqual(response.status, 200);
    assert.strictEqual(message.length > 0, true);
  });

  test("Check any other request is cached", async () => {
    //ask agent
    const sessionId = await createSessionToken();
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      dispatcher,
      headers: { "X-Session-Id": sessionId },
      body: JSON.stringify({
        body: {
          model: MODEL,
          input: "Is this AI?",
        },
      }),
    });
    const { message } = (await response.json()) as any;
    //check status
    assert.strictEqual(response.status, 200);
    assert.strictEqual(message.length > 0, true);
  });

  describe("GET /api/countdown", () => {
    async function readFirstChunk(response: Response): Promise<string> {
      const reader = response.body!.getReader();
      const { value } = await reader.read();
      await reader.cancel();
      return new TextDecoder().decode(value);
    }

    test("rejects without a session id", async () => {
      const response = await fetch(`${BASE_URL}/api/countdown`, {
        method: "GET",
        dispatcher,
      });
      const json = (await response.json()) as any;
      assert.strictEqual(response.status, 401);
      assert.strictEqual(json.error, "Missing or expired session");
    });

    test("reports 0 for a session that hasn't hit the rate limiter yet", async () => {
      // The token is an unvalidated UUID (see session.ts) - unlike
      // createSessionToken(), this never goes through /api/version, which
      // itself calls processUserQuery() and would consume a rate-limit slot.
      const sessionId = randomUUID();
      const response = await fetch(
        `${BASE_URL}/api/countdown?session=${sessionId}`,
        { method: "GET", dispatcher },
      );
      assert.strictEqual(response.status, 200);
      assert.strictEqual(
        response.headers.get("content-type"),
        "text/event-stream",
      );
      const chunk = await readFirstChunk(response);
      assert.strictEqual(chunk, "data:0\n\n");
    });

    test("streams a positive countdown once the session is rate-limited", async () => {
      const sessionId = await createSessionToken();
      const body = { body: { input: "post is supported" } };
      for (let i = 0; i < RATE_LIMIT_MAX; i++) {
        await fetch(`${BASE_URL}/api/generate`, {
          method: "POST",
          dispatcher,
          headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionId,
          },
          body: JSON.stringify(body),
        });
      }

      const response = await fetch(
        `${BASE_URL}/api/countdown?session=${sessionId}`,
        { method: "GET", dispatcher },
      );
      const chunk = await readFirstChunk(response);
      const match = chunk.match(/^data:(\d+)\n\n$/);
      assert.ok(
        match,
        `expected an SSE countdown frame, got ${JSON.stringify(chunk)}`,
      );
      assert.strictEqual(Number(match![1]) > 0, true);
    });
  });
});
