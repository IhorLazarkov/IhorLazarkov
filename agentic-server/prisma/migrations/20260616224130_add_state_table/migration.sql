-- CreateTable
CREATE TABLE "queries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "queries_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cache_queries_id_fkey" FOREIGN KEY ("queries_id") REFERENCES "queries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "State" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "response_id" TEXT NOT NULL,
    "query_id" INTEGER NOT NULL,
    "input_tokens" INTEGER NOT NULL,
    "total_output_tokens" INTEGER NOT NULL,
    "reasoning_output_tokens" INTEGER NOT NULL,
    "tokens_per_second" REAL NOT NULL,
    "time_to_first_token_seconds" REAL NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "State_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "queries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
