---
name: project_lmsrouter_prompt_bug
description: lmsRouter.ts processUserQuery builds the RAG prompt from the raw request body string instead of the parsed user input field — found during 2026-07-02 review, not yet confirmed fixed.
metadata:
  type: project
---

In `agentic-server/src/controllers/lmsRouter.ts`, `processUserQuery` parses
the inbound message at line ~42 (`const inboundMessage = JSON.parse(body).body as TInboundMessage`)
but then calls `AgentService.generate_prompt(body, context)` at line ~79
using the raw, un-parsed `body` function parameter (the full wrapper JSON
string, e.g. `{"body":{"model":...,"input":...}}`) instead of
`inboundMessage.input`. This means the LLM prompt embeds the entire raw JSON
as the "Query" rather than just the visitor's actual question, while the
cache lookup (line ~55) and persisted query (line ~112) correctly use
`inboundMessage.input` — so cache keys and LLM prompt input are inconsistent
with each other.

**Why:** This was flagged as the top-priority finding in a full-repo code
review requested by the user on 2026-07-02 (report-only, no fix applied per
explicit instruction).

**How to apply:** If asked to review, fix, or explain `lmsRouter.ts` /
`processUserQuery` again, check whether this has been fixed
(`AgentService.generate_prompt(inboundMessage.input, context)`). If not,
this is still an open, high-impact bug worth surfacing again.
