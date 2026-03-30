# API contracts

Base URL: `/api`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

## Services
- `GET /services`
- `GET /services/:slug`
- `POST /services` (seller)
- `PUT /services/:id` (seller-owner)

## Orders
- `POST /orders` (buyer)
- `GET /orders` (owner)
- `GET /orders/:id` (owner)
- `PATCH /orders/:id/status` (buyer/seller transition rules)

## Messages
- `GET /messages/conversations`
- `POST /messages/conversations/:id/messages`

## Notifications
- `GET /notifications`
- `PATCH /notifications/:id/read`

## Profile
- `PATCH /profile/me`
