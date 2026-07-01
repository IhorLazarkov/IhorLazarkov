# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo contains two independent Node projects plus a deployed static site sitting at the repo root:

- `app/` — React 19 + TypeScript + Vite SPA source for the portfolio site.
- `agentic-server/` — standalone Node/TypeScript backend that powers the "ask my agent" chat widget on the site.
- Repo root (`index.html`, `assets/`, `*.png`, `*.jpg`, `favicon.ico`, etc.) — the **built output** of `app/`, committed directly and served via GitHub Pages from `ihorlazarkov.github.io`. It is not hand-edited; it is produced by the publish flow below.

These two projects are deployed completely separately (GitHub Pages for the frontend, a separately hosted Node process for `agentic-server`) and do not share tooling, env config, or a monorepo build system.

## Commands

### Frontend (`app/`)
Run from inside `app/`:
- `npm run dev` — start Vite dev server.
- `npm run build` — typecheck (`tsc -b`) then build (`vite build`) into `app/dist`.
- `npm run lint` — ESLint over the whole project.
- `npm run preview` — preview the production build.
- `npm run publish` — `cp -r ./dist/ ../`, copying the build output into the repo root for GitHub Pages. Run `build` first.

### Backend (`agentic-server/`)
Run from inside `agentic-server/`:
- `npm run start:qa` — `NODE_ENV=test`, runs on the QA env/port via `tsx main.mjs`.
- `npm run start:prod` — `NODE_ENV=production`, runs on the prod env/port via `tsx main.mjs`.
- `npm test` — resets the QA SQLite DB (`db/queries_QA.db`), runs `prisma db push`, reseeds (`seed:qa`), then runs all `src/test/*.spec.ts` with `tsx --experimental-test-coverage --test`. This always runs against a freshly seeded QA database — there is no mocked-DB test path.
- `npm run seed:qa` — push schema + run the Prisma seed against the QA DB only.
- `npm run backup:qa` — dumps the QA DB via `scripts/mackBackupQA.ts`.
- Single test file: `NODE_ENV=test npx tsx --test src/test/<name>.spec.ts` (DB must already be pushed/seeded — see `npm test` chain above if starting from scratch).
- `npm run release:06262026:deploy` / `release:06262026:rollback` — one-off scripts under `release_06262026/` (`deploy.sh` runs `prisma migrate reset` in production plus `read_db.ts`/`write_db.ts` to snapshot and replay queries through the LLM; `rollback.sh` just restores `db/queries_PROD_backup.db`). These are ad hoc release tooling for a specific past release, not a general CI/CD pipeline — there is no GitHub Actions workflow in this repo despite what `agentic-server/README.md` implies.

Tests use Node's built-in `node:test`/`node:assert`, not Jest, despite what `agentic-server/README.md` says.

## Backend architecture (`agentic-server/`)

Layered architecture, dependencies flow outward-in: `Controller → Service → Repository → Prisma ORM → SQLite`. See `agentic-server/architecture_decision.md` for the original ADR.

- `main.mjs` loads `.env` (prod) or `.env.test` (QA) based on `NODE_ENV`, then boots `src/server.ts`'s `Server` with an `lmsRouter` controller (LM Studio backend). `src/controllers/ollamaRouter.ts` is an alternate `IController` implementation for a local Ollama provider but is not currently wired into `main.mjs`.
- `src/server.ts` is a raw `node:http` server (no framework). It hand-rolls CORS, allowing only `http://localhost:5173` and `https://ihorlazarkov.github.io` as origins, and dispatches to whichever `IController` (`src/controllers/defaultRouter.ts`) method matches the HTTP verb.
- `src/controllers/lmsRouter.ts` implements the actual request flow (`processUserQuery`, used by both `GET /api/version` and `POST /api/generate`):
  1. Look up the incoming question in the `queries` table; if an identical question was asked before, serve the cached response/stats/top-queries immediately (no LLM call).
  2. Otherwise, build a RAG prompt via `service/agentService.ts` (`AgentService.generate_prompt`), using context from `service/ragService.ts` (`RagService.get()`, backed by `agentic-server/info.json` — Ihor's professional summary/skills/experience/projects). The prompt also embeds hardcoded guardrails against harmful/agentic actions.
  3. Call the LLM at `${AGENT_BASE_URL}${AGENT_CHAT}` (LM Studio) with `MODEL` and `LMS_API_KEY` from env.
  4. Persist the new question (`QueriesService`), cache the response (`CacheService`), and record token/timing stats (`StateService`), then return `{ message, stats, queries }` (top queries) to the client.
- Prisma schema (`agentic-server/prisma/schema.prisma`) uses the `prisma-client` generator with a **non-default output path**: `agentic-server/generated/prisma`. Import generated types from `../../generated/prisma/models` (see `lmsRouter.ts`), not from `@prisma/client`. Models: `queries` ← `Cache` and `State` (both FK'd via `queries_id`/`query_id`, cascade delete).
- `.env` (prod, port 3007, `AGENT_BASE_URL=http://127.0.0.1:1234`) and `.env.test` (QA, port 3008, `AGENT_BASE_URL=http://macmini.local:81/`) point at different local LM Studio instances — there is no shared/staging LLM endpoint.

## Frontend architecture (`app/`)

Single-page portfolio (`app/src/App.tsx`) with About/Experience/Projects sections driven by static content in `app/src/data.ts`, plus scroll-spy nav and a mouse-follow gradient effect wired up via `IntersectionObserver`/mouse/wheel listeners in a single `useEffect`.

The chat widget (`app/src/components/ClientToAgent/ClientToAgent.tsx`) talks directly to the deployed `agentic-server` instance:
- `BASE_URL` is a **hardcoded constant** in `ClientToAgent.tsx` (currently `https://agentic.ihorlazarkov-swe.in`), not sourced from Vite env vars. To point the widget at a local backend during development, temporarily swap this constant (a commented-out `http://localhost:3008` alternative is left in place for that purpose).
- On mount it fires `GET {BASE_URL}/api/version` to fetch a pre-cached greeting + top questions; on submit it fires `POST {BASE_URL}/api/generate`. Both go through the same `sendPrompt` (`useActionState`) flow, with `AbortController` wiring for in-flight request cancellation.
- Response HTML is produced by `AnswerProcessor.tsx` (`parseGemmaResponseToHtml`), since the LLM's raw output needs light formatting before being rendered as React nodes.

## Notes on stale docs

`project_document.md` (repo root) and `agentic-server/README.md` describe an earlier/aspirational version of the backend (e.g. reference `main.js`, a `POST /` endpoint, Jest, GitHub Actions CI) that no longer matches the current implementation (`main.mjs`, `POST /api/generate`, `node:test`, no CI workflow). Treat the actual source under `agentic-server/src/` as ground truth over these docs.
