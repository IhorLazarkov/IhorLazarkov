# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two independent Node projects plus a deployed static site at the repo root:

- `app/` — React 19 + TypeScript + Vite SPA source for the portfolio site.
- `agentic-server/` — standalone Node/TypeScript backend powering the "ask my agent" chat widget.
- Repo root (`index.html`, `assets/`, `*.png`, `*.jpg`, `favicon.ico`, etc.) — **built output** of `app/`, committed directly and served via GitHub Pages from `ihorlazarkov.github.io`. Not hand-edited; produced by the publish flow below.

Deployed completely separately (GitHub Pages for the frontend, a separately hosted Node process for `agentic-server`) — no shared tooling, env config, or monorepo build system.

## Commands

### Frontend (`app/`)
Run from inside `app/`:
- `npm run dev` — start Vite dev server.
- `npm run build` — typecheck (`tsc -b`) then build (`vite build`) into `app/dist`.
- `npm run lint` — ESLint over the whole project.
- `npm run preview` — preview the production build.
- `npm run publish` — `cp -r ./dist/assets ../ && cp ./dist/input.html ../`, copying build output into the repo root for GitHub Pages. Run `build` first.

### Backend (`agentic-server/`)
Run from inside `agentic-server/`:
- `npm run start:qa` — `NODE_ENV=test`, runs on the QA env/port via `tsx main.mjs`.
- `npm run start:prod` — `NODE_ENV=production`, runs on the prod env/port via `tsx main.mjs`.
- `npm test` — resets the QA SQLite DB (`db/queries_QA.db`), runs `prisma db push`, reseeds (`seed:qa`), then runs all `src/test/*.spec.ts` with `tsx --experimental-test-coverage --test`. Always runs against a freshly seeded QA database — no mocked-DB test path.
- `npm run seed:qa` — push schema + run the Prisma seed against the QA DB only.
- `npm run backup:qa` — dumps the QA DB via `scripts/mackBackupQA.ts`.
- Single test file: `NODE_ENV=test npx tsx --test src/test/<name>.spec.ts` (DB must already be pushed/seeded — see `npm test` chain if starting from scratch).
- `npm run release:06262026:deploy` / `release:06262026:rollback` — one-off scripts under `release_06262026/` (`deploy.sh` runs `prisma migrate reset` in production plus `read_db.ts`/`write_db.ts` to snapshot and replay queries through the LLM; `rollback.sh` restores `db/queries_PROD_backup.db`). Ad hoc release tooling for a specific past release, not a general CI/CD pipeline — there is no GitHub Actions workflow here despite what `agentic-server/README.md` implies.

Tests use Node's built-in `node:test`/`node:assert`, not Jest, despite what `agentic-server/README.md` says.

## Backend architecture (`agentic-server/`)

Layered, dependencies flow outward-in: `Controller → Service → Repository → Prisma ORM → SQLite`. See `agentic-server/architecture_decision.md` for the original ADR.

- `main.mjs` loads `.env` (prod) or `.env.test` (QA) based on `NODE_ENV`, then boots `src/server.ts`'s `Server` with an `lmsRouter` controller (LM Studio backend). `src/controllers/ollamaRouter.ts` is an alternate `IController` for a local Ollama provider, kept intentionally but not wired into `main.mjs`.
- `src/server.ts` is a raw `node:http` server (no framework). Hand-rolls CORS, allowing only `http://localhost:5173` and `https://ihorlazarkov.github.io`, and dispatches to whichever `IController` (`src/controllers/defaultRouter.ts`) method matches the HTTP verb.
- `src/controllers/lmsRouter.ts` implements the request flow (`processUserQuery`, used by both `GET /api/version` and `POST /api/generate`):
  1. Look up the incoming question in `queries`; if identical, serve cached response/stats/top-queries immediately (no LLM call).
  2. Otherwise build a RAG prompt via `service/agentService.ts` (`AgentService.generate_prompt`), context from `service/ragService.ts` (`RagService.get()`, backed by `agentic-server/info.json`). Prompt embeds hardcoded guardrails against harmful/agentic actions.
  3. Call the LLM at `${AGENT_BASE_URL}${AGENT_CHAT}` (LM Studio) with `MODEL`/`LMS_API_KEY` from env.
  4. Persist the question (`QueriesService`), cache the response (`CacheService`), record token/timing stats (`StateService`), return `{ message, stats, queries }` to the client.
- Prisma schema (`agentic-server/prisma/schema.prisma`) uses the `prisma-client` generator with a **non-default output path**: `agentic-server/generated/prisma`. Import generated types from `../../generated/prisma/models`, not `@prisma/client`. Models: `queries` ← `Cache` and `State` (FK'd via `queries_id`/`query_id`, cascade delete).
- Requests are rate-limited per browser session, not per IP (ADR-003). Session ids are **not** cookies — `ihorlazarkov.github.io` and `agentic.ihorlazarkov-swe.in` are different sites, so a session cookie is a third-party cookie and gets blocked/partitioned by Safari ITP, Firefox ETP, and Chrome's third-party cookie policies regardless of `SameSite=None; Secure`. Instead `src/service/session.ts` issues a plain UUID from `GET /api/version`, returned in the JSON body (`{ ..., sessionId }`); the client persists it in `localStorage` (`ClientToAgent.tsx`) and echoes it back manually as the `X-Session-Id` header on `POST /api/generate`, or a `?session=` query param on `GET /api/countdown` (SSE, since `EventSource` can't set custom headers). `GET /api/countdown` and `POST /api/generate` both consume a rate-limit slot; `POST /api/generate` rejects with 401 (`SessionError`) if no session id is provided — no IP fallback. Session id keys the in-memory `RateLimiter` singleton wired through `ChatService`. No CORS credentials mode is needed since nothing relies on cookies — `src/server.ts` just needs `X-Session-Id` in `Access-Control-Allow-Headers` and an origin-specific (never `*`) `Access-Control-Allow-Origin`.
- `.env` (prod, port 3007, `AGENT_BASE_URL=http://127.0.0.1:1234`) and `.env.test` (QA, port 3008, `AGENT_BASE_URL=http://macmini.local:81/`) point at different local LM Studio instances — no shared/staging LLM endpoint.

## Frontend architecture (`app/`)

Single-page portfolio (`app/src/App.tsx`) with About/Experience/Projects sections driven by static content in `app/src/data.ts`, plus scroll-spy nav and a mouse-follow gradient effect via `IntersectionObserver`/mouse/wheel listeners in a single `useEffect`.

The chat widget (`app/src/components/ClientToAgent/ClientToAgent.tsx`) talks directly to the deployed `agentic-server` instance:
- `BASE_URL` is a **hardcoded constant** in `ClientToAgent.tsx` (currently `https://agentic.ihorlazarkov-swe.in`), not sourced from Vite env vars. To point the widget at a local backend during development, temporarily swap this constant (a commented-out `http://localhost:3008` alternative is left in place).
- On mount it fires `GET {BASE_URL}/api/version` for a pre-cached greeting + top questions; on submit, `POST {BASE_URL}/api/generate`. Both go through the same `sendPrompt` (`useActionState`) flow, with `AbortController` wiring for in-flight request cancellation.
- Response HTML is produced by `AnswerProcessor.tsx` (`parseGemmaResponseToHtml`), since the LLM's raw output needs light formatting before rendering as React nodes.

## Notes on stale docs

`project_document.md` (repo root) and `agentic-server/README.md` describe an earlier/aspirational version of the backend (e.g. reference `main.js`, a `POST /` endpoint, Jest, GitHub Actions CI) that no longer matches the current implementation (`main.mjs`, `POST /api/generate`, `node:test`, no CI workflow). Treat the actual source under `agentic-server/src/` as ground truth over these docs.
