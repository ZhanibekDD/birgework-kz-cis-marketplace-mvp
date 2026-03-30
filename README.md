# BirgeWork — Phase 3 Full-stack Foundation

BirgeWork теперь работает как full-stack foundation: frontend на React + backend API на Node.js с реальной персистентностью, auth, RBAC и backend-driven ключевыми маркетплейс flow.

## Что реализовано в Phase 3

- Добавлен реальный backend сервис в `server/`.
- Реализованы API модули:
  - auth (register/login/refresh/logout/me)
  - services (list/details/create/update)
  - orders (create/list/details/status transitions)
  - messages (conversations/send message)
  - notifications (list/mark read)
  - profile (update own profile)
- Реализован RBAC:
  - seller-only создание/редактирование услуг
  - buyer-only создание заказа
  - доступ к своим заказам/сообщениям/уведомлениям
- Реализована персистентность в `server/data/db.json`.
- Реализованы migration/seed скрипты (`db:migrate`, `db:seed`) и логическая SQL-схема (`server/db_schema.sql`).
- Frontend API слой переведен на реальные HTTP endpoints (`src/lib/httpClient.js`, `src/lib/api.js`) с access/refresh token handling.

## Стек

### Frontend
- React + Vite
- React Router
- Tailwind CSS

### Backend
- Node.js native HTTP server
- JSON-backed persistence (file DB)
- Token auth (signed access/refresh tokens)
- Role-based authorization

> Примечание: из-за ограничений окружения на установку новых пакетов, выбран dependency-free backend runtime. Архитектурно готово к миграции на Express/Fastify + Postgres/Prisma без изменения frontend контрактов.

## Быстрый старт

```bash
npm install
npm --prefix server install
```

### Backend setup

```bash
npm run db:migrate
npm run db:seed
npm run backend:dev
```

### Frontend setup

```bash
npm run frontend:dev
```

### Одновременный запуск

```bash
npm run dev
```

## Environment

### Frontend `.env`

Скопируйте `.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

### Backend `server/.env`

Скопируйте `server/.env.example`:

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_ACCESS_SECRET=replace-with-strong-access-secret
JWT_REFRESH_SECRET=replace-with-strong-refresh-secret
```

## Тесты и сборка

```bash
npm run test
npm run build
npm run server:test
```

## Доп. документация

- `docs/ARCHITECTURE.md`
- `docs/MOCK_API.md`
- `docs/ROADMAP.md`
- `docs/BACKEND_ARCHITECTURE.md`
- `docs/API_CONTRACTS.md`
- `docs/AUTH_FLOW.md`

## Next phase

- Перевод backend persistence на PostgreSQL + Prisma migrations.
- WebSocket real-time layer для сообщений/уведомлений.
- E2E сценарии (catalog → checkout → order lifecycle).
- Hardening security (rate limit, audit logs, CSRF strategy).
