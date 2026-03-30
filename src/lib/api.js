import { http, clearTokens } from './httpClient'

function mapService(service) {
  return {
    id: service.id,
    sellerId: service.sellerId,
    category: service.category,
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    tags: service.tags?.split(',') ?? [],
    deliveryDays: service.deliveryDays,
    packages: (service.packages || []).map((p) => ({ id: p.id, tier: p.tier, name: p.tier, price: p.price, revisions: p.revisions, features: p.features.split(';') })),
    rating: service.reviews?.length ? service.reviews.reduce((a, b) => a + b.rating, 0) / service.reviews.length : 5,
    reviewsCount: service.reviews?.length ?? 0,
  }
}


function mapOrder(order) {
  return {
    id: order.id,
    serviceId: order.serviceId,
    serviceSlug: order.service?.slug,
    packageId: order.packageId,
    buyerId: order.buyerId,
    sellerId: order.sellerId,
    brief: order.brief,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
    deadline: order.deadline,
  }
}

function mapConversation(c, currentUserId) {
  return {
    id: c.id,
    participantIds: [c.userAId, c.userBId],
    topic: `Диалог #${c.id.slice(0, 6)}`,
    unreadBy: [],
    messages: (c.messages || []).map((m) => ({ id: m.id, senderId: m.senderId, text: m.text, time: new Date(m.createdAt).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}), date: m.createdAt })),
  }
}

function mapUser(u) {
  return {
    id: u.id,
    role: u.role,
    username: u.username,
    fullName: u.profile?.fullName,
    city: u.profile?.city,
    bio: u.profile?.bio,
    sellerMetrics: u.sellerProfile ? {
      responseRate: u.sellerProfile.responseRate,
      responseTimeHours: u.sellerProfile.responseTimeHours,
      completionRate: u.sellerProfile.completionRate,
      repeatBuyers: u.sellerProfile.repeatBuyers,
    } : undefined,
  }
}

export async function bootstrapApp() {
  const [services, me, notifications] = await Promise.all([
    http.get('/services'),
    http.get('/auth/me').catch(() => null),
    http.get('/notifications').catch(() => []),
  ])

  const authUser = me ? mapUser(me) : { id: 'guest', role: 'guest', fullName: 'Гость' }
  return {
    authUser,
    services: services.map(mapService),
    users: me ? [mapUser(me), ...(services.map((s) => mapUser(s.seller)).filter(Boolean))] : services.map((s) => mapUser(s.seller)).filter(Boolean),
    reviews: services.flatMap((s) => (s.reviews || []).map((r) => ({ id: r.id, serviceSlug: s.slug, rating: r.rating, text: r.text }))),
    orders: me ? (await http.get('/orders').catch(() => [])).map(mapOrder) : [],
    chats: me ? (await http.get('/messages/conversations').catch(() => [])).map((c) => mapConversation(c, me.id)) : [],
    notifications: notifications.map((n) => ({ id: n.id, userId: n.userId, type: n.type, title: n.title, actionPath: n.actionPath, date: n.createdAt, read: n.isRead })),
  }
}

export async function login(payload) {
  const data = await http.post('/auth/login', payload)
  http.setTokens(data.accessToken, data.refreshToken)
  const me = await http.get('/auth/me')
  return mapUser(me)
}

export async function register(payload) {
  const data = await http.post('/auth/register', payload)
  http.setTokens(data.accessToken, data.refreshToken)
  const me = await http.get('/auth/me')
  return mapUser(me)
}

export async function logout() {
  await http.post('/auth/logout', {}).catch(() => ({}))
  clearTokens()
}

export async function createService(form, sellerId) {
  const created = await http.post('/services', {
    title: form.title,
    slug: form.slug,
    category: form.category,
    shortDescription: form.shortDescription,
    deliveryDays: form.deliveryDays || 4,
    tags: form.tags || ['KZ'],
    packages: form.packages.map((p) => ({ tier: p.id || p.tier || p.name.toLowerCase(), price: Number(p.price), revisions: Number(p.revisions || 1), features: p.features || ['Scope'] })),
  })
  return mapService(created)
}

export async function updateService(serviceId, patch) {
  await http.put(`/services/${serviceId}`, patch)
}

export async function createOrderDraft({ serviceSlug, packageId, brief }) {
  const service = await http.get(`/services/${serviceSlug}`)
  const pkg = service.packages.find((p) => p.id === packageId) || service.packages[0]
  return { serviceId: service.id, packageId: pkg.id, brief }
}

export async function placeOrder(draft) {
  const created = await http.post('/orders', draft)
  const full = await http.get(`/orders/${created.id}`).catch(() => created)
  return mapOrder(full)
}

export async function updateOrderStatus(orderId, status) {
  await http.patch(`/orders/${orderId}/status`, { status })
}

export async function addMessage(chatId, senderId, text) {
  return http.post(`/messages/conversations/${chatId}/messages`, { text })
}

export async function markConversationRead() {
  return null
}

export async function markNotificationRead(notificationId) {
  return http.patch(`/notifications/${notificationId}/read`, {})
}

export async function saveProfile(userId, patch) {
  return http.patch('/profile/me', patch)
}
