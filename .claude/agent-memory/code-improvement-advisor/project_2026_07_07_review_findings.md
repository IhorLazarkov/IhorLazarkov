---
name: project-2026-07-07-review-findings
description: Findings from 2026-07-07 review of server.ts, lmsRouter.ts SSE countdown, ChatService, ClientToAgent.tsx — check current repo state before trusting, these may already be fixed.
metadata:
  type: project
---

Review pass on 2026-07-07 covering the most recently active areas: `agentic-server/src/server.ts`, the new `/api/countdown` SSE endpoint in `agentic-server/src/controllers/lmsRouter.ts`, `ChatService.ts`, and the redesigned `app/src/components/ClientToAgent/ClientToAgent.tsx`.

Notable non-obvious findings (not yet fixed as of this review):
- `server.ts:41-47` — the request-body-buffering promise only resolves on `req`'s `'end'` event, never rejects on `'error'`. A client that aborts mid-upload leaves the handler awaiting forever (hung connection/leak). Also no max-body-size guard — unbounded `Buffer.concat` on attacker-controlled input.
- `lmsRouter.ts:99-109` (`/api/countdown` handler) — the `setInterval` callback that polls `chatService.remainAwait(sessionId)` is **not** covered by the `try/catch` in `server.ts`'s request handler (that catch only wraps the synchronous `await handler(...)` call, not callbacks that outlive it). If `remainAwait` or `res.write` ever throws inside the timer tick, it becomes an uncaught exception on the process — could take down the whole server, not just one session. Currently `remainAwait` doesn't throw, so this is latent, not active.
- `ChatService.ts:98` — `const message = output[0].content;` indexes the upstream LLM response without validating `output` is a non-empty array first. If the LM Studio response shape changes or returns an empty array, this throws a raw `TypeError` that bubbles up as a generic 500 instead of a clear `UpstreamLlmError`.
- `/api/countdown` (`lmsRouter.ts:99`) instantiates a full `new ChatService()` (which builds `QueriesService`/`CacheService`/`StateService`, all unused) just to reach `remainAwait`, which only touches the shared `RateLimiter` singleton. Cheap in absolute terms (Prisma client itself is a shared singleton via `lib/prisma`), but a coupling/SRP smell worth cleaning if `ChatService` grows heavier constructors later.

Also observed: `app/src/components/ClientToAgent/ClientToAgent.tsx`'s `BASE_URL` now reads `import.meta.env.VITE_AGENTIC_CLIENT_BASE_URL` with the hardcoded URL only as fallback — CLAUDE.md's description of it as a pure hardcoded constant is stale as of this review; re-verify before citing that doc line.

Related: [[project_agentic_server_casing_bugs]], [[project_lmsrouter_prompt_bug]]
