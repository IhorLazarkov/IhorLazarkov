# NodeJS LLM Interaction Server

This project is a lightweight **NodeJS HTTP server** that facilitates real-time interaction with a locally running Large Language Model (LLM) via **LM Studio** and logs visitor queries in a local **SQLite database**.

## 🏗️ Architecture Overview

The system architecture comprises a client web-profile frontend, the NodeJS server, a local SQLite database for query persistence, and LM Studio running a local model (e.g., `qwen/qwen3-vl-4b`).

```mermaid
sequenceDiagram
    actor Client as Website Visitor
    participant Server as NodeJS Server
    database DB as SQLite Database
    participant LLM as LM Studio (Local LLM)

    Note over Server: Server Startup
    Server->>DB: Connect to Database (queries_PROD.db / queries_QA.db)
    Server->>Server: Read info.json (RAG context)
    Server->>LLM: Ask HELLO_QUERY (Greeting prompt)
    LLM-->>Server: Return Greeting
    Server->>DB: Get top 5 visitor queries
    DB-->>Server: Return Top Queries
    Server->>Server: Initialize CACHE_RESPONSE

    Note over Server: GET /api/version
    Client->>Server: HTTP GET /api/version
    Server-->>Client: Return cached Greeting & Top Queries (Instant pop)
    Server->>LLM: Fetch new Greeting response (Background async)
    LLM-->>Server: Return New Greeting
    Server->>DB: Fetch new Top Queries (Background async)
    DB-->>Server: Return New Top Queries
    Server->>Server: Update CACHE_RESPONSE cache for next request

    Note over Server: POST (Submit Query)
    Client->>Server: HTTP POST (Visitor Question)
    alt Question > 100 chars
        Server-->>Client: HTTP 400 Bad Request
    else Question <= 100 chars
        Server->>DB: Insert question into queries table
        Server->>DB: Fetch top 5 visitor queries
        DB-->>Server: Return Top Queries
        Server->>Server: Compile RAG prompt (context + query)
        Server->>LLM: Send request to LM Studio
        LLM-->>Server: Return LLM response
        Server-->>Client: HTTP 200 { response, queries }
    end
```

---

## ⚙️ Configuration & Environment

The server behavior is controlled through the following environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `3007` | Port on which the server listens. |
| `HOST` | `127.0.0.1` | Hostname/interface to bind the server to. |
| `DB_PATH` | `./db/queries_PROD.db` | Path to the SQLite database. |
| `LMS_API_KEY` | *(None)* | API Key required for authentication with the LM Studio endpoint. |

### Available Start Scripts
Defined in [package.json](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/package.json):
* **`npm run start`**: Standard start.
* **`npm run start:qa`**: Runs server with `DB_PATH=./db/queries_QA.db` on port `3008` in QA environment.
* **`npm run start:prod`**: Runs server with `DB_PATH=./db/queries_PROD.db` on port `3007` in Production environment.

---

## 💾 Database Layer

The database uses SQLite to store and retrieve queries.
* **Database path**: Configured via `DB_PATH`. Default is [db/queries_PROD.db](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/db/queries_PROD.db).
* **Table**: `queries`
  * Column: `body` (TEXT) - Stores the prompt submitted by the visitor.

## Database Schema

### Table: `queries`
- **ID**: INTEGER PRIMARY KEY AUTOINCREMENT
- **body**: VARCHAR(100) NOT NULL
- **createdAt**: DATETIME (default: CURRENT_TIMESTAMP)

### Sample Data
- 'Is this AI?'
- 'How does this agent work?'
- 'asdf'

## Diagram

[Insert diagram here - e.g., a simple ERD or visual representation of the table structure]

### Queries

#### 1. Retrieve most frequent queries
Fetches the 5 most popular/recently asked questions to display as suggested prompts:
```sql
Select body, count(body) as times from queries group by body Order by 'times' asc limit 5;
```

#### 2. Insert new query
Inserts the user's question:
```sql
INSERT INTO queries (body) VALUES(?)
```

---

## 🔌 API Reference

### CORS Policy
The server permits cross-origin resource sharing (CORS) only for:
* `http://localhost:5173`
* `https://ihorlazarkov.github.io`

### Endpoints

#### 1. `GET /api/version`
Used on initial site load to fetch a pre-cached greeting from the LLM and the list of popular visitor questions.
* **Response Status**: `200 OK`
* **Response Headers**: `Content-Type: application/json`
* **Response Body**:
  ```json
  {
    "response": "Hello! I am Ihor's virtual assistant. How can I help you today?",
    "queries": [
      { "body": "What is Ihor's experience?", "times": 10 },
      { "body": "What projects has he worked on?", "times": 8 }
    ]
  }
  ```
* **Performance Optimization**: Uses a `CACHE_RESPONSE` stack. On request, the cache is instantly popped and served. Afterwards, a new greeting and updated query stats are requested in the background and pushed to the cache.

#### 2. `POST /`
Submits a visitor's question to the LLM.
* **Request Body**:
  ```json
  {
    "prompt": "What is Ihor's background?"
  }
  ```
* **Security & Validations**:
  * If the length of `prompt` is > `100` characters, returns `400 Bad Request` with message: `"Your question exceeds limit of 100 characters."`.
* **Execution Flow**:
  1. Persists the question to the database via [addQuery](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/main.js#L148).
  2. Fetches the updated top 5 queries using [getAllQueries](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/main.js#L139).
  3. Formulates a RAG prompt using [generate_prompt](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/main.js#L176) merging the client query with context loaded from [info.json](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/info.json).
  4. Calls the LLM via [askAi](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/main.js#L158).
  5. Returns the LLM response along with the top queries.

---

## 🤖 LLM Integration & RAG Pipeline

* **Endpoint**: `http://127.0.0.1:1234/api/v1/chat`
* **Model**: `qwen/qwen3-vl-4b`
* **Context Generation**:
  The function [generate_prompt](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/main.js#L176) loads context from [info.json](file:///Users/dev/Development/VSCodeProjects/web-profile/agentic-server/info.json) which includes Ihor's:
  - Professional summary
  - Soft and hard skills
  - Experience, projects, recognition, and education

### Security Protocols
The LLM is prompted with instruction to avoid executing or processing requests that:
* Perform harmful activities
* Run external/internal programs or processes
* Connect to unknown network operational entities
* Execute scripts

---

## 🛑 Graceful Shutdown

To ensure robust process management:
* **SIGINT Listener**: Handles `Ctrl+C` or termination signals by invoking `server.close()`, allowing pending connections to complete.
* **Connection Management**: Upon closing, `server.closeAllConnections()` is invoked to release open sockets.
