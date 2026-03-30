# Mock API contract

## Auth
- `bootstrapApp()`
- `login({ username })`
- `register(payload)`
- `logout()`

## Services
- `createService(form, sellerId)`
- `updateService(serviceId, patch)`

## Orders
- `createOrderDraft(payload)`
- `placeOrder(draft)`
- `updateOrderStatus(orderId, status)`

## Messaging
- `addMessage(chatId, senderId, text)`
- `markConversationRead(chatId, userId)`

## Notifications
- `markNotificationRead(notificationId)`

## Profile
- `saveProfile(userId, patch)`
