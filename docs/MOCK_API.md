# Frontend API layer

Файл `src/lib/api.js` теперь работает как client adapter к реальному backend API (`/api/*`), а не как local mock DB.

## Responsibilities
- маппинг backend payload в frontend shape
- login/register/logout + token refresh integration
- сервисы (list/details/create/update)
- заказы (draft helper/place/status)
- сообщения/уведомления/профиль

## Transport
- `src/lib/httpClient.js`
- access/refresh token persistence в localStorage
- auto-refresh on 401
