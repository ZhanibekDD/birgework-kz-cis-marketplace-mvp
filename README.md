# BirgeWork MVP

BirgeWork — frontend MVP маркетплейса фриланс-услуг для Казахстана и СНГ в модели фиксированных пакетов (Kwork-like).

## Что реализовано

- Каталог услуг с поиском, фильтрацией и сортировкой.
- Карточка услуги с пакетами, FAQ и отзывами.
- Оформление заказа и локальное сохранение состояния.
- Авторизация/регистрация (mock), профиль исполнителя.
- Полноценный раздел кабинета:
  - обзор,
  - услуги,
  - заказы,
  - сообщения,
  - уведомления,
  - настройки.
- Формы создания и редактирования услуги.
- 404 и стабильная маршрутизация всех ключевых экранов.

## Технологии

- React + Vite
- React Router
- Tailwind CSS
- Локальный mock API + localStorage persistence

## Быстрый старт

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Структура

- `src/components` — UI и domain-компоненты
- `src/context` — Auth/App контексты
- `src/layout` — основные layout-обертки
- `src/lib` — mock DB и API слой
- `src/pages` — страницы и route targets

## Backend integration next steps

1. Заменить `src/lib/api.js` на реальные HTTP-запросы.
2. Подключить JWT + refresh токены и role guards.
3. Добавить backend-driven поиск/фильтры и пагинацию.
4. Реализовать реальные чат/уведомления через WebSocket.
5. Добавить платежный провайдер и безопасную сделку.
