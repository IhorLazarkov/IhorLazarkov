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

> **Note**: This ADR will be updated as the project evolves.