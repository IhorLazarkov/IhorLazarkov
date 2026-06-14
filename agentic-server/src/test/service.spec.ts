import { test, describe } from 'node:test'
import assert from 'node:assert'

import Server from '../service/server'
import TestController from './test_controller'

import dotenv from "dotenv"
dotenv.config({ path: ".env.qa" });

const PORT = Number.parseInt(process.env["PORT"] as string);
const HOST = process.env["HOST"] as string;

describe("Test Server with Test Controller", async () => {
    const server = new Server(new TestController(), PORT, HOST)
    test.before(() => {
        server.start()
    })

    test.after(() => {
        server.stop()
    })

    test('Check GET is supported', async () => {
        const response = await fetch(`http://${HOST}:${PORT}`, { method: 'GET' })
        assert.strictEqual(response.status, 200)
    })

    test('Check POST is supported', async () => {
        const body = { body: 'test' }
        const response = await fetch(`http://${HOST}:${PORT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        assert.strictEqual(response.status, 200)
        assert.strictEqual((await response.json()).body, JSON.stringify(body))
    })

    test('Check OPTIONS is supported', async () => {
        const response = await fetch(`http://${HOST}:${PORT}`, { method: 'OPTIONS' })
        assert.strictEqual(response.status, 200)
    })

    test('Check DELETE is not supported', async () => {
        const response = await fetch(`http://${HOST}:${PORT}`, { method: 'DELETE' })
        assert.strictEqual(response.status, 400)
    })

    test('Check PUT is not supported', async () => {
        const response = await fetch(`http://${HOST}:${PORT}`, { method: 'PUT' })
        assert.strictEqual(response.status, 400)
    })
})