import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const environment = process.env.NODE_ENV || 'test';
const envFile = environment === 'production' ? '.env' : `.env.${environment}`;

import dotenv from "dotenv"
dotenv.config({ path: envFile });

const connectionString = process.env["DATABASE_URL"] as string;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({
    adapter,
    log: ['error', 'info', 'query', 'warn']
});

export { prisma };