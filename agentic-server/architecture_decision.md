# Architecture Decision Record (ADR)

## ADR-001: Layered Architecture for Backend Server

### 1. Motivation

The current `main.js` file is monolithic and lacks separation of concerns. As the project scales, this will lead to:
- Tight coupling between business logic and data access.
- Difficulty in testing and debugging.
- Poor maintainability and extensibility.

This ADR proposes a layered architecture to improve:
- Testability
- Scalability
- Maintainability
- Separation of concerns

### 2. Decision

We will decompose the backend into the following layers:

1. **ORM Layer** (Prisma) — handles database interactions.
2. **Repository Layer** — abstracts data access, provides interfaces for ORM.
3. **Service Layer** — contains business logic, coordinates between repositories and controllers.
4. **Controller Layer** — handles HTTP requests, delegates to services.

This structure follows Clean Architecture principles.

### 3. Rationale

- **Repository Layer**: Isolates data access from business logic. Makes testing easier (mocking DB calls).
- **Service Layer**: Encapsulates business logic, allows for easy mocking and testing.
- **Controller Layer**: Minimal, handles HTTP routing and response formatting.

### 4. Implementation Plan

- First, implement Repository layer with Prisma.
- Then, implement Service layer with business logic.
- Finally, implement Controller layer with HTTP routes.

### 5. Dependencies

- Prisma ORM
- TypeScript (for type safety)
- Jest/Testing Library (for tests)

### 6. Risks

- Potential for over-engineering if layers are too abstract.
- Risk of tight coupling if interfaces are not well-defined.

### 7. Alternatives

- Keep `main.js` monolithic — Not recommended for scalability.
- Use a different ORM (e.g., Sequelize) — Not necessary, Prisma is preferred.
- Use a different architecture (e.g., MVC) — Not applicable, we’re following Clean Architecture.

### 8. Open Questions

- Should we use dependency injection? — Yes, for better testability.
- Should we use a DI container? — Yes, for better control.

### 9. Next Steps

- Implement Repository layer with Prisma.
- Write tests for Repository layer.
- Implement Service layer.
- Write tests for Service layer.
- Implement Controller layer.
- Write tests for Controller layer.

### 10. References

- Clean Architecture by Robert C. Martin
- Prisma Documentation
- TypeScript Best Practices

---

## ADR-002: Extract Chat Orchestration into a Service, Errors via `statusCode`-Tagged Errors

### 1. Motivation

`lmsRouter.ts`'s `processUserQuery` (the handler behind `GET /api/version` and `POST /api/generate`) contained the full orchestration inline at the controller level: request validation, cache lookup, RAG prompt construction, the LLM `fetch` call, and persistence across `QueriesService`/`CacheService`/`StateService`. The controller also wrote HTTP status codes and response bodies directly inside that logic, so the controller layer was not "minimal" as intended by ADR-001.

### 2. Decision

- Added `src/service/ChatService.ts`, a use-case/orchestrator service (distinct from the existing thin repository-wrapper services) that owns the entire flow above and returns `{ message, stats, queries }` or throws on failure. The controller now only calls `ChatService.processUserQuery(body)` and translates the outcome into an HTTP response.
- Error signaling uses typed `Error` subclasses defined in `src/controllers/errors.ts`: a base `AppError` (carries a `statusCode`), with `ValidationError` (400) and `UpstreamLlmError` (502) extending it. `ChatService` throws these; the controller catches and checks `err instanceof AppError` to pick the status code, falling back to 500 for anything else.
- This module was placed under `src/controllers/`, not the project root, since these error types exist specifically to carry HTTP semantics (status codes) that the controller layer consumes — keeping them next to the controllers that interpret them, rather than treating them as a repo-wide concern.
- Two lighter-weight alternatives were tried in between and rejected: (a) an `errors.ts` at the project root with the same classes, and (b) a plain `Error` tagged with a `statusCode` property (`httpError(message, statusCode)` + an `isHttpError` type guard) with no dedicated file at all. Both were abandoned in favor of the class-based approach in `src/controllers/errors.ts` once its placement made sense.
- Bad request input now throws a `ValidationError` → 400; an LLM/upstream error now throws an `UpstreamLlmError` → 502 (instead of the previous blanket 500).

### 3. Rationale

- Keeps the controller layer HTTP-only (status codes, headers, response shape) per ADR-001's intent, while all business/orchestration logic and knowledge of downstream services lives in `ChatService`.
- Typed error classes make the controller's `instanceof` dispatch self-documenting and easy to extend with new error variants without touching the type-guard logic.

### 4. Follow-ups / Open Questions

- If more distinct failure modes are added later (e.g. rate limiting, timeout), add new `AppError` subclasses in `src/controllers/errors.ts`.

---

> **Note**: This ADR will be updated as the project evolves.