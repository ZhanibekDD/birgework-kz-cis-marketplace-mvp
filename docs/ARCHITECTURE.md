# Architecture

## Frontend layers
- Pages/components UI
- Context layer (`AuthContext`, `AppContext`)
- API adapter (`src/lib/api.js`)
- HTTP client with token refresh (`src/lib/httpClient.js`)

## Backend layers
- HTTP server (`server/src/index.js`)
- Auth/token library (`server/src/lib/auth.js`)
- File DB abstraction (`server/src/db/store.js`)
- Migration/seed scripts (`server/src/db/migrate.js`, `server/src/db/seed.js`)
- Logical relational schema contract (`server/db_schema.sql`)

## Why this structure
- Full-stack vertical slice is runnable now.
- Frontend no longer depends on mock local DB.
- Backend can be migrated to PostgreSQL/Prisma while keeping API contracts stable.
