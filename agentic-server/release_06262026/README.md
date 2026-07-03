# release_06262026/ — archived, one-off release tooling

**Status: completed, historical record only.** This directory is not a general CI/CD pipeline or a reusable release template — see `../CLAUDE.md`. It was used once, on 2026-06-26, to migrate production `queries` data across a schema change:

1. `read_db.ts` — dumps all rows from the prod `queries` table into a timestamped `backup_production_*.json` snapshot.
2. `deploy.sh` — runs `read_db.ts`, backs up `db/queries_PROD.db` to `db/queries_PROD_backup.db`, runs `prisma migrate reset` against production (destructive — wipes and re-applies migrations), then runs `write_db.ts`.
3. `write_db.ts` — replays each backed-up query body through the live LM Studio-backed server (`POST /api/generate`) to regenerate responses/cache/state on the freshly migrated schema.
4. `rollback.sh` — restores `db/queries_PROD_backup.db` over `db/queries_PROD.db` if the deploy needs to be undone.

`deploy.sh` originally did not create `db/queries_PROD_backup.db`, so `rollback.sh` referenced a file that was never produced — fixed in place rather than left as a trap for a future run. Do not reuse this directory as-is for a future release without re-verifying the backup/rollback path end-to-end; the JSON backups (`backup_production_*.json`, `backup_test_*.json`) are kept here only as a record of what was migrated.
