import { test, describe } from "node:test";
import assert from "node:assert";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const PORT = Number.parseInt(process.env["PORT"] as string);
const HOST = process.env["HOST"] as string;
const MODEL = process.env["MODEL"];

import Server from "../server";
import Router from "../controllers/lmsRouter";

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

  test.skip("Check POST is supported", async () => {
    const body = { body: "test" };
    const response = await fetch(`http://${HOST}:${PORT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    assert.strictEqual(response.status, 201);
    assert.strictEqual((await response.json()).body, JSON.stringify(body));
  });

  test("Check OPTIONS is supported", async () => {
    const response = await fetch(`http://${HOST}:${PORT}`, {
      method: "OPTIONS",
    });
    assert.strictEqual(response.status, 405);
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
    const response = await fetch(`http://${HOST}:${PORT}`, {
      method: "POST",
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
