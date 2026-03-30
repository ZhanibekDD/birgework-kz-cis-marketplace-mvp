# Backend architecture (Phase 3)

## Structure
- `server/src/index.js` — HTTP server + route handlers
- `server/src/lib/auth.js` — password hashing + token signing/verification
- `server/src/db/store.js` — file DB persistence abstraction
- `server/src/db/migrate.js` — migration bootstrap
- `server/src/db/seed.js` — realistic seed data
- `server/db_schema.sql` — logical relational schema contract

## Data strategy
Runtime storage: `server/data/db.json`.

Logical model remains relational and documented in `server/db_schema.sql` for future migration to PostgreSQL/Prisma.

## Security defaults
- Hashed passwords (SHA-256 in current dependency-free mode)
- Signed access/refresh tokens
- Auth checks on protected endpoints
- Role checks for sensitive operations
- Input sanity checks in handlers
