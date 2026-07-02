import { test, describe } from 'node:test';
import assert from 'node:assert';
import QueryRepository from '../repository/QueryRepository';
import { type queriesModel as TQuery } from "../../generated/prisma/models/queries";
import { prisma } from "../../lib/prisma";

describe('QueryRepository', () => {
    const queriesToDelete: TQuery[] = [];
    const repository = new QueryRepository();

    test.afterEach(async () => {
        await prisma.queries.deleteMany({
            where: { id: { in: queriesToDelete.map((query) => query.id) } }
        });
    })

    test('create should create a new query', async () => {
        const record = await repository.create('test body');
        assert.notEqual(record!.id, undefined);
        assert.strictEqual(record!.body, 'test body');
        queriesToDelete.push(record);
    });

    test('findAll should return all queries', async () => {
        const result = await repository.findAll();
        assert.strictEqual(result.length > 0, true);
    });

    test('findByBody should return the most recent query matching the body', async () => {
        const first = await repository.create('duplicate body');
        queriesToDelete.push(first);
        const second = await repository.create('duplicate body');
        queriesToDelete.push(second);

        const result = await repository.findByBody('duplicate body');
        assert.notEqual(result, null);
        assert.strictEqual(result!.id, second.id);
    });

    test('findByBody should return null if no query matches', async () => {
        const result = await repository.findByBody('does not exist in db');
        assert.strictEqual(result, null);
    });

    test('findById should return query by id', async () => {
        const record = await repository.create('test body');
        const result = await repository.findById(record!.id);
        assert.strictEqual(result!.body, record!.body)
    });

    test('findById should return null if query not found', async () => {
        const result = await repository.findById(999);
        assert.strictEqual(result, null);
    });

    test('update should update query by id', async () => {
        const record = await repository.create('test body');
        const result = await repository.update(record!.id, 'updated body');
        assert.strictEqual(result.body, 'updated body');
    });

    test('delete should delete query by id', async () => {
        const record = await repository.create('test body');
        let result: TQuery | null = await repository.delete(record!.id);
        assert.strictEqual(result.body, 'test body');
        result = await repository.findById(record!.id);
        assert.strictEqual(result, null);
    });
});