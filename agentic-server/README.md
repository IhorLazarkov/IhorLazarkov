# Agentic Server

A backend server built with modern Node.js, TypeScript, and Prisma ORM. 
It serves as agentic server for https://ihorlazarkov.githun.io/ihorlazarkov 

## Tech Stack
- **Language**: TypeScript
- **ORM**: Prisma
- **Testing**: Node:Test, Node:Assert
- **Formatter**: Prettier
- **Testing**: Jest
- **CI/CD**: GitHub Actions

## Structure
The server follows a **Layered Architecture** (refer to `architecture_decision.md` for details). Dependencies flow from the outer layers (Controllers) to the inner layers (ORM).

### Architecture Diagram

```mermaid
graph TD
    Server[Server] --> IC

    subgraph Controller_Layer [Controller Layer]
        IC["<<interface>>\nIController"]
        OR[ollamaRouter]
        LR[lmsRouter]
        DR[defaultRouter]
        OR & LR & DR -- implements --> IC
    end

    subgraph Service_Layer [Service Layer]
        ChS[ChatService]
        RS[RagService]
        CS[CacheService]
        QS[QueriesService]
        SS[StatesService]
    end

    subgraph Repository_Layer [Repository Layer]
        CR[CacheRepository]
        QR[QueriesRepository]
        SR[StatesRepository]
    end

    subgraph Data_Layer [ORM/Data Layer]
        P[Prisma ORM]
        DB[(SQLite DB)]
    end

    subgraph External_Providers [External LLM Providers]
        LMS["LM Studio Server\n(Qwen LLM)"]
        OLL["Ollama Server"]
    end

    LR --> ChS
    ChS --> RS
    ChS --> CS
    ChS --> QS
    ChS --> SS
    RS --> CR
    RS --> QR
    CS --> CR
    QS --> QR
    SS --> SR
    CR & QR & SR --> P
    P --> DB

    ChS -.-> LMS
    OR -.-> OLL
```

`lmsRouter`'s `POST /api/generate` / `GET /api/version` handler delegates entirely to `ChatService.processUserQuery`, which owns cache lookup, RAG prompt construction, the LM Studio call, and persistence. Expected failures are signaled via the `AppError` class hierarchy in `src/controllers/errors.ts` (`ValidationError` → 400, `UpstreamLlmError` → 502); the controller catches these (`instanceof AppError`) to set the response status code and falls back to 500 for anything else. See `architecture_decision.md` (ADR-002) for the rationale.

### Folder Map
- `src/controllers/`: Handles HTTP request/response only (status codes, headers); delegates business logic to services.
- `src/service/`: Core business logic. `ChatService` orchestrates the chat flow (cache, RAG, LLM call, persistence, error signaling); the rest are thin repository-backed services.
- `src/repository/`: Abstracts database operations and provides a clean interface for data access.
- `generated/prisma/`: Prisma client output (non-default output path — import types from here, not `@prisma/client`).
- `src/test/`: Automated unit and integration tests (`node:test`, not Jest).

## Testing Strategy
Our testing approach mirrors the layered architecture to ensure each component behaves correctly in isolation and when integrated.

| Test Category | Architectural Layer | Responsibility | Tooling |
| :--- | :--- | :--- | :--- |
| **Unit** | Repositories | Database CRUD operations and Prisma query logic. | Node:Test, Assert |
| **Unit** | Services | Core business logic, prompt orchestration, and RAG processing. | Node:Test, Assert |
| **Integration** | Controllers | API routing, Valibot schema validation, and status code verification. | Node:Test |
| **System** | Full Application | End-to-end flow from Client HTTP request to Local LLM (LM Studio) response. | Node:Test |

## Running the Server

### Development
```bash
npm run dev
```

### Testing
```bash
npm test
```

### Running Server
```bash
npm run start:qa
```
or 
```bash
npm run start:prod
```
