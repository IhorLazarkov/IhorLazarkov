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
- `src/`: Main application code
  - `orm/`: Prisma ORM setup
  - `repositories/`: Data access layer
    - `RAGRepository.ts`: New repository for RAG data
  - `services/`: Business logic
    - `RAGService.ts`: New service for RAG operations
  - `controllers/`: HTTP routes
  - `tests/`: Unit tests

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
