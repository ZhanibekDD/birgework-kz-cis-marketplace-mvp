import { CHATS, DEFAULT_AUTH_USER, NOTIFICATIONS, ORDERS, REVIEWS, SERVICES, USERS } from './mockDb'

const storageKey = 'birgework_state_v1'

const defaultState = {
  authUser: DEFAULT_AUTH_USER,
  services: SERVICES,
  orders: ORDERS,
  chats: CHATS,
  notifications: NOTIFICATIONS,
}

function readState() {
  const raw = localStorage.getItem(storageKey)
  if (!raw) return defaultState
  try {
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function writeState(nextState) {
  localStorage.setItem(storageKey, JSON.stringify(nextState))
}

export function getBootstrapData() {
  const state = readState()
  return {
    ...state,
    users: USERS,
    reviews: REVIEWS,
  }
}

export function loginAs(username) {
  const user = USERS.find((u) => u.username === username) ?? DEFAULT_AUTH_USER
  const state = readState()
  const next = { ...state, authUser: user }
  writeState(next)
  return user
}

export function registerUser(payload) {
  const user = {
    id: `u-${Date.now()}`,
    username: payload.username,
    role: payload.role,
    fullName: payload.fullName,
    city: payload.city || 'Казахстан',
    rating: 5,
    completedOrders: 0,
    bio: 'Новый пользователь BirgeWork',
  }
  const state = readState()
  const next = { ...state, authUser: user }
  writeState(next)
  return user
}

export function createService(form) {
  const state = readState()
  const newService = {
    ...form,
    id: `srv-${Date.now()}`,
    reviewsCount: 0,
    rating: 5,
    ordersInQueue: 0,
  }
  const next = { ...state, services: [newService, ...state.services] }
  writeState(next)
  return newService
}

export function updateService(serviceId, form) {
  const state = readState()
  const services = state.services.map((item) => (item.id === serviceId ? { ...item, ...form } : item))
  writeState({ ...state, services })
}

export function createOrder(serviceSlug, packageId) {
  const state = readState()
  const service = state.services.find((item) => item.slug === serviceSlug)
  if (!service) return null

  const pkg = service.packages.find((item) => item.id === packageId) ?? service.packages[0]
  const order = {
    id: `BW-${Math.floor(1000 + Math.random() * 9000)}`,
    serviceSlug,
    packageId: pkg.id,
    buyerId: state.authUser.id,
    sellerId: service.sellerId,
    total: pkg.price,
    status: 'Новый',
    deadline: new Date(Date.now() + service.deliveryDays * 86400000).toISOString().slice(0, 10),
  }

  writeState({ ...state, orders: [order, ...state.orders] })
  return order
}

export function markNotificationRead(notificationId) {
  const state = readState()
  const notifications = state.notifications.map((item) => (item.id === notificationId ? { ...item, read: true } : item))
  writeState({ ...state, notifications })
}
