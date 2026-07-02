---
name: project_agentic_server_casing_bugs
description: agentic-server has repository import filename casing mismatches that only fail on case-sensitive filesystems (Linux prod), not macOS/Windows dev.
metadata:
  type: project
---

As of 2026-07-02, `agentic-server/src/service/CacheService.ts` imports from
`"../repository/cacheRepository"` and `QueriesService.ts` imports from
`"../repository/queryRepository"`, but the actual files on disk are
`CacheRepository.ts` and `QueryRepository.ts` (PascalCase). Also
`ollamaRouter.ts` does `import IController from "./defaultRouter"` (default
import) when `defaultRouter.ts` only has a named `export interface IController`.

**Why:** macOS (dev machine, case-insensitive HFS+/APFS) and Windows resolve
these imports fine, masking the bug locally. If the backend is ever deployed
to or built on a case-sensitive filesystem (most Linux CI/hosting), these
imports will fail at build/runtime. `ollamaRouter.ts` is currently unwired
from `main.mjs` per CLAUDE.md, which may also be why the interface-import
mismatch hasn't surfaced as a type error yet — worth checking whether it's
even in the active tsconfig `include` path.

**How to apply:** When reviewing or touching `agentic-server/src/repository/`
or its importers, verify import path casing matches on-disk filenames
exactly. Recommend adding a lint rule or case-sensitive CI check rather than
relying on manual review, since this class of bug is invisible in local dev
on this team's machines.
