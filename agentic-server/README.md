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
        RS[RagService]
        CS[CacheService]
        QS[QueriesService]
    end

    subgraph Repository_Layer [Repository Layer]
        CR[CacheRepository]
        QR[QueriesRepository]
    end

    subgraph Data_Layer [ORM/Data Layer]
        P[Prisma ORM]
        DB[(SQLite DB)]
    end

    subgraph External_Providers [External LLM Providers]
        LMS["LM Studio Server\n(Qwen LLM)"]
        OLL["Ollama Server"]
    end

    IC --> RS
    IC --> CS
    IC --> QS
    RS --> CR
    RS --> QR
    CS --> CR
    QS --> QR
    CR & QR --> P
    P --> DB

    LR -.-> LMS
    OR -.-> OLL
```

### Folder Map
- `src/controllers/`: Handles HTTP requests and input validation (using Valibot).
- `src/services/`: Contains core business logic and orchestrates data flow.
- `src/repositories/`: Abstracts database operations and provides a clean interface for data access.
- `src/orm/`: Prisma client configuration and database schema.
- `src/tests/`: Automated unit and integration tests.

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
