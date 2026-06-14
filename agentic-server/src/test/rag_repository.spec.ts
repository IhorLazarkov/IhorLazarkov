import { test, describe } from 'node:test';
import assert from 'node:assert';
import RAGRepository from '../repository/RAGRepository';

describe('RAGRepository', () => {
    test('should return data from info.js file', async () => {
        const data = RAGRepository.data;
        assert.notEqual(data, undefined);
        assert.strictEqual(typeof data, 'string');
    });

    test('should return the same data on subsequent calls', async () => {
        const firstCall = RAGRepository.data;
        const secondCall = RAGRepository.data;
        assert.strictEqual(firstCall, secondCall);
    });
});