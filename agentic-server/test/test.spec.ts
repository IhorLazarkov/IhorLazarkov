import { test } from 'node:test';
import assert from 'node:assert';
import sqlite3 from 'sqlite3';

const QA_DB = "./db/queries_QA.db"
const CONNECTION_PATH = QA_DB
// const conn = new sqlite3.Database(CONNECTION_PATH, sqlite3.OPEN_READWRITE);
const conn = new sqlite3.Database(CONNECTION_PATH, sqlite3.OPEN_READONLY);

type TQuery = {
  id: number,
  body: string,
  createdAt: string
}

const isRecord = (record: any): record is TQuery => {
  return 'id' in record
    && 'createdAt' in record
    && 'body' in record
}

test('queries table is not empty', async () => {
  try {
    const results: TQuery[] = await new Promise((res, rej) => {
      conn.all("Select * from queries Order By 'times' asc limit 5;", (err, results) => {
        if (err) return rej(err)
        return res(results)
      });
    });

    assert.notEqual(null, results)
    assert.strictEqual(5, results.length)
    for (const record of results) assert.notEqual(null, record)
    for (const record of results) assert.strictEqual(true, isRecord(record))

  } catch (err) {
    assert.fail(err as Error)
  }
});
