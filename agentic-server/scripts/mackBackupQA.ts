import { prisma } from "../lib/prisma";
import fs from 'node:fs'
import path from 'node:path'

const targetPath = path.join(__dirname, `backup_qa_${Date.now()}.json`)
console.log({targetPath})

prisma.queries.findMany({
    include:{
        caches: true,
        states: true
    }
})
    .then(data => {
        fs.writeFile(
            `./scripts/backup_qa_${Date.now()}.json`,
            Buffer.from(JSON.stringify(data)),
            () => console.log("backup records: ", data.length))
    })
    .catch(err => {
        console.log(err)
    });
