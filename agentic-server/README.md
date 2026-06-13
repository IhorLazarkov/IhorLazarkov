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
  - `services/`: Business logic
  - `controllers/`: HTTP routes
  - `tests/`: Unit tests

## Running the Server

### Development
```bash
npm run dev
```

### Testing
```bash
npm run test
```

### Running Tests
```bash
npm test
```
Test will configure qa env file and remove entire qa db file and the push the prisma schema to have it clean.

### Running Server
```bash
npm run start:qa
```
or 
```bash
npm run start:prod
```

## License
MIT