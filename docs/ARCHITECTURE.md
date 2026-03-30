# Architecture

## Layering
- UI pages/components
- Context layer (`AuthContext`, `AppContext`)
- Mock API layer (`src/lib/api.js`)
- Storage abstraction (`src/lib/storage.js`)
- Seed dataset (`src/lib/mockDb.js`)

## Why this structure
- Сохраняется простота разработки.
- Есть четкая точка замены mock API на реальный backend.
- UI не зависит от localStorage напрямую.
- Role-aware route protection централизован в `ProtectedRoute`.

## Data flow
1. `main.jsx` вызывает `bootstrapApp()`.
2. Данные передаются в контексты.
3. UI вызывает методы контекстов.
4. Контексты вызывают API методы.
5. API читает/пишет в storage и возвращает обновленный payload.
