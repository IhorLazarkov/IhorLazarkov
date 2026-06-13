import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.NODE_ENV === "test" 
? `${process.env.DATABASE_URL_QA}`
: `${process.env.DATABASE_URL_PROD}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };