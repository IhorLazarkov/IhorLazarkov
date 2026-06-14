import { test, describe } from 'node:test';
import assert from 'node:assert';
import QueryRepository from '../repository/queryRepository';
import { type queriesModel as TQuery } from "../../generated/prisma/models/queries";
import { prisma } from "../../lib/prisma";

describe('QueryRepository', () => {
    const backUp: TQuery[] = [];
    const queriesToDelete: TQuery[] = [];
    const repository = new QueryRepository();

    test.before(async () => {
        backUp.push(... await repository.findAll());
    });

    test.after(async () => {
        await prisma.queries.deleteMany({
            where: { id: { in: queriesToDelete.map((query) => query.id) } }
        });
    })

    test('create should create a new query', async () => {
        const record = await repository.create('test body');
        queriesToDelete.push(record);
        const last = queriesToDelete[queriesToDelete.length - 1];
        assert.notEqual(last!.id, undefined);
        assert.strictEqual(last!.body, 'test body');
    });

    test('findAll should return all queries', async () => {
        const size = backUp.length + queriesToDelete.length;
        const last = size - 1;
        const result = await repository.findAll();
        assert.strictEqual(result.length, size);
        assert.strictEqual(result[last]!.body, queriesToDelete[queriesToDelete.length - 1]!.body);
    });

    test('findById should return query by id', async () => {
        const size = queriesToDelete.length;
        const last = queriesToDelete[size - 1];
        const result = await repository.findById(last!.id);
        assert.strictEqual(result!.body, last!.body)
    });

    test('findById should return null if query not found', async () => {
        const result = await repository.findById(999);
        assert.strictEqual(result, null);
    });

    test('update should update query by id', async () => {
        const size = queriesToDelete.length;
        const last = queriesToDelete[size - 1];
        const result = await repository.update(last!.id, 'updated body');
        assert.strictEqual(result.body, 'updated body');
    });

    test('delete should delete query by id', async () => {
        const size = queriesToDelete.length;
        const last = queriesToDelete[size - 1];
        let result: TQuery | null = await repository.delete(last!.id);
        assert.strictEqual(result.body, 'updated body');
        result = await repository.findById(last!.id);
        assert.strictEqual(result, null);
    });
});