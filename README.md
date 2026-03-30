# BirgeWork — Phase 2 Frontend Foundation

BirgeWork — product-grade frontend foundation для маркетплейса фриланс-услуг (KZ + CIS) в модели фиксированных пакетов (Kwork-like).

## Что улучшено в Phase 2

- Усилен архитектурный слой: mock API + storage + utils + hooks + route guards.
- Реализован session-aware mock auth: guest / buyer / seller, login/register/logout.
- Добавлен order lifecycle: `draft → placed → in_progress → delivered → revision_requested → completed/canceled/disputed`.
- Усилен buyer journey: каталог → gig → checkout draft → order details.
- Усилен seller journey: seller-only routes, управление услугами, метрики в профиле.
- Прокачан inbox UX: список диалогов, unread, активный поток, отправка сообщений.
- Прокачан notification center: типы, read/unread, action links.
- Добавлены формы с валидацией и feedback states.
- Добавлены smoke/unit тесты ключевых потоков.

## Технологии

- React + Vite
- React Router
- Tailwind CSS
- Node built-in test runner (`node --test`)
- localStorage-backed mock backend

## Запуск

```bash
npm install
npm run dev
```

## Build & tests

```bash
npm run build
npm run test
```

## Архитектура (кратко)

- `src/lib/mockDb.js` — seed data моделей.
- `src/lib/storage.js` — localStorage abstraction.
- `src/lib/api.js` — mock API (async operations, session, orders/messages/notifications).
- `src/context/AuthContext.jsx` — auth/session состояние.
- `src/context/AppContext.jsx` — app entities и операции.
- `src/components/common/ProtectedRoute.jsx` — guard для приватных/role routes.
- `src/pages/orders/OrderDetailsPage.jsx` — жизненный цикл и переходы статусов.

## Документация

- `docs/ARCHITECTURE.md`
- `docs/MOCK_API.md`
- `docs/ROADMAP.md`

## Next backend phase

1. Заменить методы `src/lib/api.js` на HTTP client + backend contracts.
2. Внедрить JWT/refresh + server-side RBAC.
3. Добавить websocket gateway для chat/notifications.
4. Реализовать реальные платежи + escrow flow.
5. Добавить e2e (Playwright/Cypress) для критических путей.
