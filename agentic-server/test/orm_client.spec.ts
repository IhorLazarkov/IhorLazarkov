import { test } from 'node:test';
import assert from 'node:assert';

import { prisma } from "../lib/prisma";
import { type queriesModel as TQueries } from "../generated/prisma/models/queries"

test.describe('Test ORM configurability', () => {
  const backUp: TQueries[] = [];
  const queriesToDelete: TQueries[] = [];

  test.before(async () => {
    backUp.push(... await prisma.queries.findMany())
    await prisma.queries.deleteMany();
  })

  test.after(async () => {
    const ids = queriesToDelete.map((query) => query.id);
    await prisma.queries.deleteMany({ where: { id: { in: ids } } });
    await prisma.queries.createMany({ data: backUp });
  })

  test("Check record persisted", async () => {
    const newQuery = await prisma.queries.create({ data: { body: 'test' } });
    queriesToDelete.push(newQuery);
    const queries = await prisma.queries.findMany({ take: 1 });
    assert.strictEqual(1, queries.length);
  })

  test('Check record is updated', async () => {
    const queries = await prisma.queries.findMany();
    const query = queries[0];
    const updatedQuery = await prisma.queries.update({ where: { id: query!.id }, data: { body: 'updated' } });
    assert.strictEqual(updatedQuery.id, query!.id);
    assert.strictEqual(updatedQuery.body, 'updated');
  })

  test('Check record is deleted', async () => {
    const target = await prisma.queries.findFirst({ where: { body: 'updated' } })
    await prisma.queries.delete({ where: { id: target!.id } });
    const queries = await prisma.queries.findMany();
    assert.strictEqual(queries.length, 0);
  })

})