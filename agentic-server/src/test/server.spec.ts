import { test, describe } from "node:test";
import assert from "node:assert";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const PORT = Number.parseInt(process.env["PORT"] as string);
const HOST = process.env["HOST"] as string;
const MODEL = process.env["MODEL"];

import Server from "../server";
import Router from "../controllers/lmsRouter";

type TResponse = {
  message: string;
  stats: string;
  queries: string;
};

const isTResponse = (obj: any): obj is TResponse => {
  return obj.message !== undefined && obj.stats !== undefined;
};

async function createSessionCookie(): Promise<string> {
  const response = await fetch(`http://${HOST}:${PORT}/api/version`, {
    method: "GET",
    headers: { Origin: "http://localhost:5173" },
  });
  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) throw new Error("Expected a session cookie to be issued");
  return setCookie.split(";")[0] as string;
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
    const response = await fetch(`http://${HOST}:${PORT}`, { method: "GET" });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.strictEqual(data!.message, "OK");
  });

  test("Check POST without a session cookie is rejected", async () => {
    const body = { body: { input: "no session" } };
    const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 401);
    assert.strictEqual(json.error, "Missing or expired session");
  });

  test("Check POST is supported", async () => {
    const cookie = await createSessionCookie();
    const body = { body: { input: "post is supported" } };
    const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(json.message.length > 0, true);
    assert.strictEqual(isTResponse(json), true);
  });

  test("Check error is returned when sent invalid message", async () => {
    const cookie = await createSessionCookie();
    const body = { body: "test" }; //invalid message
    const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 400);
    assert.strictEqual(json.error, "Bad Request");
  });

  test("Check error is returned when input exceeds 100 characters", async () => {
    const cookie = await createSessionCookie();
    const body = { body: { input: "a".repeat(101) } };
    const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 400);
    assert.strictEqual(json.error, "Input exceeds 100 characters");
  });

  test("Check OPTIONS is supported", async () => {
    const response = await fetch(`http://${HOST}:${PORT}`, {
      method: "OPTIONS",
    });
    assert.strictEqual(response.status, 200);
  });

  test("Check DELETE is not supported", async () => {
    const response = await fetch(`http://${HOST}:${PORT}`, {
      method: "DELETE",
    });
    assert.strictEqual(response.status, 405);
  });

  test("Check PUT is not supported", async () => {
    const response = await fetch(`http://${HOST}:${PORT}`, { method: "PUT" });
    assert.strictEqual(response.status, 405);
  });

  test('Check "/api/version" is cached', async () => {
    //ask agent
    const response = await fetch(`http://${HOST}:${PORT}/api/version`, {
      method: "GET",
    });
    const { message } = await await response.json();
    //check status
    assert.strictEqual(response.status, 200);
    assert.strictEqual(message.length > 0, true);
  });

  test("Check any other request is cached", async () => {
    //ask agent
    const cookie = await createSessionCookie();
    const response = await fetch(`http://${HOST}:${PORT}/api/generate`, {
      method: "POST",
      headers: { Cookie: cookie },
      body: JSON.stringify({
        body: {
          model: MODEL,
          input: "Is this AI?",
        },
      }),
    });
    const { message } = await await response.json();
    //check status
    assert.strictEqual(response.status, 200);
    assert.strictEqual(message.length > 0, true);
  });
});
