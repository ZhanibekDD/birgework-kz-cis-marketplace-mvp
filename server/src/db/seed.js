import crypto from 'node:crypto'
import { saveDb } from './store.js'

const id = () => crypto.randomUUID()
const now = new Date().toISOString()

const sellerId = id()
const buyerId = id()
const serviceId = id()
const packageBasic = id()
const packageStandard = id()
const orderId = id()
const convoId = id()

const db = {
  users: [
    { id: buyerId, email: 'aliya@birgework.kz', username: 'aliya_pm', passwordHash: crypto.createHash('sha256').update('Pass1234!').digest('hex'), role: 'buyer', createdAt: now },
    { id: sellerId, email: 'nurlan@birgework.kz', username: 'nurlan_ai', passwordHash: crypto.createHash('sha256').update('Pass1234!').digest('hex'), role: 'seller', createdAt: now },
  ],
  profiles: [
    { userId: buyerId, fullName: 'Алия Бекенова', city: 'Алматы', bio: 'Product manager', rating: 5 },
    { userId: sellerId, fullName: 'Нурлан Жумабек', city: 'Астана', bio: 'AI automation engineer', rating: 4.9 },
  ],
  sellerProfiles: [{ userId: sellerId, responseRate: 97, responseTimeHours: 2, completionRate: 95, repeatBuyers: 15, earningsMonth: 540000, earningsPending: 120000 }],
  buyerAccounts: [{ userId: buyerId, totalSpent: 760000, activeOrders: 2, savedServices: 4 }],
  services: [{ id: serviceId, sellerId, category: 'ai', slug: 'telegram-ai-sales-bot', title: 'Telegram AI-бот для продаж', shortDescription: 'Интеграция с CRM и аналитикой.', tags: 'Telegram,OpenAI,CRM', deliveryDays: 4, isArchived: false, createdAt: now }],
  packages: [
    { id: packageBasic, serviceId, tier: 'basic', price: 55000, revisions: 1, features: '1 сценарий;FAQ' },
    { id: packageStandard, serviceId, tier: 'standard', price: 98000, revisions: 2, features: '3 сценария;CRM webhook;аналитика' },
  ],
  reviews: [{ id: id(), serviceId, authorId: buyerId, rating: 5, text: 'Сильная экспертиза.', createdAt: now }],
  orders: [{ id: orderId, serviceId, packageId: packageStandard, buyerId, sellerId, brief: 'Интеграция amoCRM', status: 'in_progress', total: 98000, createdAt: now, deadline: new Date(Date.now() + 4 * 86400000).toISOString() }],
  orderEvents: [{ id: id(), orderId, actorId: sellerId, fromStatus: 'placed', toStatus: 'in_progress', note: 'Старт', createdAt: now }],
  conversations: [{ id: convoId, userAId: buyerId, userBId: sellerId, createdAt: now }],
  messages: [{ id: id(), conversationId: convoId, senderId: buyerId, text: 'Нужна интеграция с amoCRM.', isRead: false, createdAt: now }],
  notifications: [{ id: id(), userId: buyerId, type: 'order', title: 'Ваш заказ в работе', actionPath: '/dashboard/orders', isRead: false, createdAt: now }],
  favorites: [{ id: id(), userId: buyerId, serviceId, createdAt: now }],
  sessions: [],
}

saveDb(db)
console.log('Seed applied')
