import { test, describe } from 'node:test';
import assert from 'node:assert';
import RagService from '../service/ragService';

describe('RagService', () => {
    test('get should return RAG data', async () => {
        const result = await RagService.get();
        assert.notEqual(result, null);
        assert.strictEqual(typeof result, 'string' )
        assert.strictEqual(result.length > 0, true)
    });
});