import { test } from 'node:test';
import assert from 'node:assert';

import { prisma } from "../lib/prisma.ts";

test("Test query db", async () => {
  const queries = await prisma.queries.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    }
  });
  assert.strictEqual(5, queries.length);
})
