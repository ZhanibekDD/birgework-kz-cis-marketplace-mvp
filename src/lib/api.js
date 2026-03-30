import { CHATS, DEFAULT_SESSION, NOTIFICATIONS, ORDERS, REVIEWS, SERVICES, USERS } from './mockDb.js'
import { loadJSON, saveJSON, storageKeys } from './storage.js'
import { ORDER_STATUSES } from '../utils/constants.js'

const defaultState = {
  users: USERS,
  services: SERVICES,
  orders: ORDERS,
  chats: CHATS,
  notifications: NOTIFICATIONS,
  reviews: REVIEWS,
  favorites: { 'u-buyer-1': ['srv-1'] },
}

const pause = (ms = 80) => new Promise((res) => setTimeout(res, ms))

function getState() {
  return loadJSON(storageKeys.STATE, defaultState)
}

function setState(next) {
  saveJSON(storageKeys.STATE, next)
}

function getSession() {
  return loadJSON(storageKeys.SESSION, DEFAULT_SESSION)
}

function setSession(next) {
  saveJSON(storageKeys.SESSION, next)
}

export async function bootstrapApp() {
  await pause()
  const state = getState()
  const session = getSession()
  const authUser = state.users.find((u) => u.id === session.userId) ?? state.users[0]
  return { ...state, authUser }
}

export async function login({ username }) {
  await pause()
  const state = getState()
  const user = state.users.find((u) => u.username === username)
  if (!user) throw new Error('Пользователь не найден')
  setSession({ userId: user.id })
  return user
}

export async function register(payload) {
  await pause()
  const state = getState()
  if (state.users.some((u) => u.username === payload.username)) throw new Error('Username уже занят')
  const user = {
    id: `u-${Date.now()}`,
    username: payload.username,
    fullName: payload.fullName,
    role: payload.role,
    city: payload.city,
    bio: payload.bio || '',
    rating: 5,
    completedOrders: 0,
    stats: { spent: 0, activeOrders: 0, savedServices: 0 },
  }
  state.users.push(user)
  setState(state)
  setSession({ userId: user.id })
  return user
}

export async function logout() {
  await pause(20)
  setSession(DEFAULT_SESSION)
}

export async function createService(form, sellerId) {
  await pause()
  const state = getState()
  const service = { ...form, id: `srv-${Date.now()}`, sellerId, rating: 5, reviewsCount: 0, ordersInQueue: 0, bookmarks: 0 }
  state.services.unshift(service)
  setState(state)
  return service
}

export async function updateService(serviceId, patch) {
  await pause()
  const state = getState()
  state.services = state.services.map((s) => (s.id === serviceId ? { ...s, ...patch } : s))
  setState(state)
}

export async function createOrderDraft({ serviceSlug, packageId, buyerId, brief }) {
  await pause()
  const state = getState()
  const service = state.services.find((s) => s.slug === serviceSlug)
  if (!service) throw new Error('Услуга не найдена')
  const pkg = service.packages.find((p) => p.id === packageId) ?? service.packages[0]
  const draft = {
    id: `DRAFT-${Math.floor(Math.random() * 9000 + 1000)}`,
    serviceSlug,
    packageId: pkg.id,
    buyerId,
    sellerId: service.sellerId,
    total: pkg.price,
    status: 'draft',
    createdAt: new Date().toISOString().slice(0, 10),
    deadline: new Date(Date.now() + service.deliveryDays * 86400000).toISOString().slice(0, 10),
    brief,
  }
  return draft
}

export async function placeOrder(draft) {
  await pause()
  const state = getState()
  const order = { ...draft, id: `BW-${Math.floor(Math.random() * 9000 + 1000)}`, status: 'placed' }
  state.orders.unshift(order)
  state.notifications.unshift({
    id: `n-${Date.now()}`,
    userId: draft.buyerId,
    type: 'order',
    title: `Заказ ${order.id} размещен`,
    actionPath: '/dashboard/orders',
    date: new Date().toISOString().slice(0, 10),
    read: false,
  })
  setState(state)
  return order
}

export async function updateOrderStatus(orderId, status) {
  await pause()
  if (!ORDER_STATUSES.includes(status)) throw new Error('Некорректный статус')
  const state = getState()
  state.orders = state.orders.map((order) => (order.id === orderId ? { ...order, status } : order))
  setState(state)
}

export async function addMessage(chatId, senderId, text) {
  await pause(30)
  const state = getState()
  state.chats = state.chats.map((chat) => {
    if (chat.id !== chatId) return chat
    const now = new Date()
    return {
      ...chat,
      messages: [...chat.messages, { id: `m-${Date.now()}`, senderId, text, time: now.toTimeString().slice(0, 5), date: now.toISOString().slice(0, 10) }],
      unreadBy: chat.participantIds.filter((id) => id !== senderId),
    }
  })
  setState(state)
}

export async function markConversationRead(chatId, userId) {
  await pause(20)
  const state = getState()
  state.chats = state.chats.map((chat) => (chat.id === chatId ? { ...chat, unreadBy: chat.unreadBy.filter((id) => id !== userId) } : chat))
  setState(state)
}

export async function markNotificationRead(notificationId) {
  await pause(20)
  const state = getState()
  state.notifications = state.notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
  setState(state)
}

export async function saveProfile(userId, patch) {
  await pause()
  const state = getState()
  state.users = state.users.map((u) => (u.id === userId ? { ...u, ...patch } : u))
  setState(state)
}
