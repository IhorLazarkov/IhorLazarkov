import { prisma } from "../lib/prisma";
import { type queriesModel as TQueries } from "../generated/prisma/models";
import fs from 'node:fs'
import { stat } from 'node:fs/promises'

const prefix = 'backup_qa_'

fs.readdir('./scripts', { withFileTypes: true }, (err, files) => {
    //find latest file
    if (err) throw new Error("error reading directory", err);
    const latestFile = files
        .filter(f => f.name.startsWith(prefix) && f.isFile())
        .sort(async (a, b) => {
            const stat1 = await stat(a)
            const stat2 = await stat(b)
            return stat1.ctimeMs - stat2.ctimeMs
        })[0]
    if (!latestFile) throw new Error("file was not found")
    console.log("Found latest file:", { file: latestFile.name })

    //write data to database
    fs.readFile(`./scripts/${latestFile.name}`, async (err, data) => {
        if (err) throw new Error("error reading file", err)
        const json : TQueries[] = JSON.parse(data.toString())
        try {
            const result = await prisma.queries.createMany({ data: json })
            console.log("created records: ", result.count)
        } catch (err) {
            throw new Error("error creating records", err)
        }
    })
    //end
})