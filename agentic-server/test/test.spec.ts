import { test } from 'node:test';
import assert from 'node:assert';

import { prisma } from "../lib/prisma.ts";

test("Test query db", async () => {
  const queries = await prisma.queries.findMany();
  console.log({queries});
  assert(queries.length > 0);
})
