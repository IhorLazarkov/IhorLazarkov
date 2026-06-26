import fs from 'node:fs/promises'
import path from 'node:path'
import { prisma } from '../lib/prisma'

/**
 * Read all queries from PROD DB
 * and store in backup file
 */
async function main() {
    try {
        const queries = await prisma.queries.findMany()
        const filePath = path.join(__dirname, `../../release_06262026/backup_${process.env.NODE_ENV}_${Date.now()}.json`)
        await fs.writeFile(filePath, JSON.stringify(queries))
        console.log({filePath});
    } catch (error) {
        console.error({ error });
        process.exit(1)
    }
}

await main()
