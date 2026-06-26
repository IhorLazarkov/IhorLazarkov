import { prisma } from "../lib/prisma";
import { type queriesModel as TQueries } from "../generated/prisma/models";
import fs from "node:fs";
import path from "node:path";

const prefix = "backup_qa_";
type TQueryExtended = TQueries & {
  caches: {
    queries_id: number;
    response: string;
  }[];
} & {
  states: {
    query_id: number;
    response_id: string;
    input_tokens: number;
    total_output_tokens: number;
    reasoning_output_tokens: number;
    tokens_per_second: number;
    time_to_first_token_seconds: number;
  }[];
};

fs.readdir("./scripts", { withFileTypes: true }, (err, files) => {
  //find latest file
  if (err) throw new Error("error reading directory", err);
  const latestFile = files
    .filter((f) => f.name.startsWith(prefix) && f.isFile())
    .sort((a, b) => {
      const aPath = path.join(__dirname, "../../scripts/" + a.name);
      const bPath = path.join(__dirname, "../../scripts/" + b.name);
      const stat1 = fs.statSync(aPath);
      const stat2 = fs.statSync(bPath);
      return stat2.birthtimeMs - stat1.birthtimeMs;
    })[0];
  if (!latestFile) throw new Error("file was not found");
  console.log("Found latest file:", { file: latestFile.name });

  //write data to database
  fs.readFile(`./scripts/${latestFile.name}`, async (err, data) => {
    if (err) throw new Error("error reading file", err);
    const json: TQueryExtended[] = JSON.parse(data.toString());
    try {
      await prisma.$transaction(async (tx) => {
        for (const query of json) {
          for (const cache of query.caches) {
            const newQuery = await tx.queries.create({
              data: { body: query.body },
            });
            await tx.cache.create({
              data: {
                queries_id: newQuery.id,
                response: cache.response,
              },
            });
          }
          for (const state of query.states) {
            await tx.state.create({
              data: {
                query_id: state.query_id,
                response_id: state.response_id,
                input_tokens: state.input_tokens,
                total_output_tokens: state.total_output_tokens,
                reasoning_output_tokens: state.reasoning_output_tokens,
                tokens_per_second: state.tokens_per_second,
                time_to_first_token_seconds: state.time_to_first_token_seconds,
              },
            });
          }
        }
      });
      console.log("created records: ", json.length);
    } catch (err) {
      throw new Error("error creating records", err);
    }
  });
  //end
});
