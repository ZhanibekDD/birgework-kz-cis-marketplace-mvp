import http from 'node:http'
import crypto from 'node:crypto'
import { loadDb, saveDb, withDb } from './db/store.js'
import { hashPassword, signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from './lib/auth.js'

const PORT = Number(process.env.PORT || 4000)

function json(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'http://localhost:5173', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS' })
  res.end(JSON.stringify(data))
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => resolve(body ? JSON.parse(body) : {}))
  })
}

function getAuth(req) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return null
  try {
    return verifyAccessToken(auth.slice(7))
  } catch {
    return null
  }
}

function enrichUser(db, user) {
  const profile = db.profiles.find((p) => p.userId === user.id)
  const sellerProfile = db.sellerProfiles.find((p) => p.userId === user.id)
  const buyerAccount = db.buyerAccounts.find((p) => p.userId === user.id)
  return { ...user, profile, sellerProfile, buyerAccount }
}

function getServiceView(db, service) {
  const seller = enrichUser(db, db.users.find((u) => u.id === service.sellerId))
  const packages = db.packages.filter((p) => p.serviceId === service.id)
  const reviews = db.reviews.filter((r) => r.serviceId === service.id)
  return { ...service, seller, packages, reviews }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 204, {})
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const path = url.pathname

  if (path === '/health') return json(res, 200, { ok: true })

  // Auth
  if (path === '/api/auth/register' && req.method === 'POST') {
    const body = await parseBody(req)
    if (!body.email || !body.username || !body.password || !body.role || !body.fullName || !body.city) return json(res, 400, { message: 'Missing fields' })
    return withDb((db) => {
      if (db.users.some((u) => u.email === body.email || u.username === body.username)) return json(res, 409, { message: 'Email or username already used' })
      const user = { id: crypto.randomUUID(), email: body.email, username: body.username, passwordHash: hashPassword(body.password), role: body.role, createdAt: new Date().toISOString() }
      db.users.push(user)
      db.profiles.push({ userId: user.id, fullName: body.fullName, city: body.city, bio: body.bio || '', rating: 5 })
      if (body.role === 'seller') db.sellerProfiles.push({ userId: user.id, responseRate: 95, responseTimeHours: 2, completionRate: 94, repeatBuyers: 0, earningsMonth: 0, earningsPending: 0 })
      if (body.role === 'buyer') db.buyerAccounts.push({ userId: user.id, totalSpent: 0, activeOrders: 0, savedServices: 0 })
      const payload = { userId: user.id, role: user.role }
      const accessToken = signAccessToken(payload)
      const refreshToken = signRefreshToken(payload)
      db.sessions.push({ userId: user.id, refreshToken })
      return json(res, 200, { accessToken, refreshToken, user: enrichUser(db, user) })
    })
  }

  if (path === '/api/auth/login' && req.method === 'POST') {
    const body = await parseBody(req)
    return withDb((db) => {
      const user = db.users.find((u) => u.username === body.username && u.passwordHash === hashPassword(body.password || ''))
      if (!user) return json(res, 401, { message: 'Invalid credentials' })
      const payload = { userId: user.id, role: user.role }
      const accessToken = signAccessToken(payload)
      const refreshToken = signRefreshToken(payload)
      db.sessions = db.sessions.filter((s) => s.userId !== user.id)
      db.sessions.push({ userId: user.id, refreshToken })
      return json(res, 200, { accessToken, refreshToken, user: enrichUser(db, user) })
    })
  }

  if (path === '/api/auth/refresh' && req.method === 'POST') {
    const body = await parseBody(req)
    try {
      const payload = verifyRefreshToken(body.refreshToken)
      const db = loadDb()
      const session = db.sessions.find((s) => s.userId === payload.userId && s.refreshToken === body.refreshToken)
      if (!session) return json(res, 401, { message: 'Invalid refresh token' })
      return json(res, 200, { accessToken: signAccessToken({ userId: payload.userId, role: payload.role }) })
    } catch {
      return json(res, 401, { message: 'Invalid refresh token' })
    }
  }

  const auth = getAuth(req)
  if (path === '/api/auth/me' && req.method === 'GET') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const db = loadDb()
    const user = db.users.find((u) => u.id === auth.userId)
    return user ? json(res, 200, enrichUser(db, user)) : json(res, 404, { message: 'Not found' })
  }

  if (path === '/api/auth/logout' && req.method === 'POST') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    return withDb((db) => {
      db.sessions = db.sessions.filter((s) => s.userId !== auth.userId)
      return json(res, 200, { ok: true })
    })
  }

  // Services
  if (path === '/api/services' && req.method === 'GET') {
    const db = loadDb()
    const q = (url.searchParams.get('q') || '').toLowerCase()
    const category = url.searchParams.get('category')
    let services = db.services.filter((s) => !s.isArchived)
    if (q) services = services.filter((s) => s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q))
    if (category) services = services.filter((s) => s.category === category)
    return json(res, 200, services.map((s) => getServiceView(db, s)))
  }

  if (path.startsWith('/api/services/') && req.method === 'GET') {
    const slug = path.split('/').at(-1)
    const db = loadDb()
    const service = db.services.find((s) => s.slug === slug)
    if (!service) return json(res, 404, { message: 'Not found' })
    return json(res, 200, getServiceView(db, service))
  }

  if (path === '/api/services' && req.method === 'POST') {
    if (!auth || auth.role !== 'seller') return json(res, 403, { message: 'Forbidden' })
    const body = await parseBody(req)
    return withDb((db) => {
      const service = { id: crypto.randomUUID(), sellerId: auth.userId, category: body.category, slug: body.slug, title: body.title, shortDescription: body.shortDescription, tags: (body.tags || []).join(','), deliveryDays: body.deliveryDays || 4, isArchived: false, createdAt: new Date().toISOString() }
      db.services.push(service)
      for (const p of body.packages || []) db.packages.push({ id: crypto.randomUUID(), serviceId: service.id, tier: p.tier, price: p.price, revisions: p.revisions, features: (p.features || []).join(';') })
      return json(res, 201, getServiceView(db, service))
    })
  }

  if (path.startsWith('/api/services/') && req.method === 'PUT') {
    if (!auth || auth.role !== 'seller') return json(res, 403, { message: 'Forbidden' })
    const id = path.split('/').at(-1)
    const body = await parseBody(req)
    return withDb((db) => {
      const service = db.services.find((s) => s.id === id)
      if (!service || service.sellerId !== auth.userId) return json(res, 403, { message: 'Forbidden' })
      Object.assign(service, body)
      return json(res, 200, getServiceView(db, service))
    })
  }

  // Orders
  if (path === '/api/orders' && req.method === 'POST') {
    if (!auth || auth.role !== 'buyer') return json(res, 403, { message: 'Forbidden' })
    const body = await parseBody(req)
    return withDb((db) => {
      const service = db.services.find((s) => s.id === body.serviceId)
      const pkg = db.packages.find((p) => p.id === body.packageId)
      if (!service || !pkg) return json(res, 400, { message: 'Invalid service/package' })
      const order = { id: crypto.randomUUID(), serviceId: service.id, packageId: pkg.id, buyerId: auth.userId, sellerId: service.sellerId, brief: body.brief, status: 'placed', total: pkg.price, createdAt: new Date().toISOString(), deadline: new Date(Date.now() + service.deliveryDays * 86400000).toISOString() }
      db.orders.unshift(order)
      db.notifications.unshift({ id: crypto.randomUUID(), userId: service.sellerId, type: 'order', title: 'Новый заказ', actionPath: '/dashboard/orders', isRead: false, createdAt: new Date().toISOString() })
      return json(res, 201, order)
    })
  }

  if (path === '/api/orders' && req.method === 'GET') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const db = loadDb()
    const orders = db.orders.filter((o) => o.buyerId === auth.userId || o.sellerId === auth.userId).map((o) => ({ ...o, service: db.services.find((s) => s.id === o.serviceId), package: db.packages.find((p) => p.id === o.packageId) }))
    return json(res, 200, orders)
  }

  if (path.match(/^\/api\/orders\/[\w-]+$/) && req.method === 'GET') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const id = path.split('/').at(-1)
    const db = loadDb()
    const order = db.orders.find((o) => o.id === id)
    if (!order || (order.buyerId !== auth.userId && order.sellerId !== auth.userId)) return json(res, 404, { message: 'Not found' })
    return json(res, 200, { ...order, service: db.services.find((s) => s.id === order.serviceId), package: db.packages.find((p) => p.id === order.packageId), events: db.orderEvents.filter((e) => e.orderId === id) })
  }

  if (path.match(/^\/api\/orders\/[\w-]+\/status$/) && req.method === 'PATCH') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const id = path.split('/')[3]
    const body = await parseBody(req)
    return withDb((db) => {
      const order = db.orders.find((o) => o.id === id)
      if (!order || (order.buyerId !== auth.userId && order.sellerId !== auth.userId)) return json(res, 404, { message: 'Not found' })
      const sellerTransitions = ['in_progress', 'delivered', 'canceled']
      const buyerTransitions = ['revision_requested', 'completed', 'disputed', 'canceled']
      const allowed = order.sellerId === auth.userId ? sellerTransitions : buyerTransitions
      if (!allowed.includes(body.status)) return json(res, 403, { message: 'Transition forbidden' })
      const from = order.status
      order.status = body.status
      db.orderEvents.push({ id: crypto.randomUUID(), orderId: id, actorId: auth.userId, fromStatus: from, toStatus: body.status, note: body.note || '', createdAt: new Date().toISOString() })
      return json(res, 200, order)
    })
  }

  // Messaging
  if (path === '/api/messages/conversations' && req.method === 'GET') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const db = loadDb()
    const data = db.conversations
      .filter((c) => c.userAId === auth.userId || c.userBId === auth.userId)
      .map((c) => ({ ...c, messages: db.messages.filter((m) => m.conversationId === c.id) }))
    return json(res, 200, data)
  }

  if (path.match(/^\/api\/messages\/conversations\/[\w-]+\/messages$/) && req.method === 'POST') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const conversationId = path.split('/')[4]
    const body = await parseBody(req)
    return withDb((db) => {
      const convo = db.conversations.find((c) => c.id === conversationId)
      if (!convo || (convo.userAId !== auth.userId && convo.userBId !== auth.userId)) return json(res, 404, { message: 'Not found' })
      const message = { id: crypto.randomUUID(), conversationId, senderId: auth.userId, text: body.text, isRead: false, createdAt: new Date().toISOString() }
      db.messages.push(message)
      const target = convo.userAId === auth.userId ? convo.userBId : convo.userAId
      db.notifications.unshift({ id: crypto.randomUUID(), userId: target, type: 'message', title: 'Новое сообщение', actionPath: '/dashboard/messages', isRead: false, createdAt: new Date().toISOString() })
      return json(res, 201, message)
    })
  }

  if (path === '/api/notifications' && req.method === 'GET') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const db = loadDb()
    return json(res, 200, db.notifications.filter((n) => n.userId === auth.userId))
  }

  if (path.match(/^\/api\/notifications\/[\w-]+\/read$/) && req.method === 'PATCH') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const id = path.split('/')[3]
    return withDb((db) => {
      const n = db.notifications.find((x) => x.id === id && x.userId === auth.userId)
      if (!n) return json(res, 404, { message: 'Not found' })
      n.isRead = true
      return json(res, 200, n)
    })
  }

  if (path === '/api/profile/me' && req.method === 'PATCH') {
    if (!auth) return json(res, 401, { message: 'Unauthorized' })
    const body = await parseBody(req)
    return withDb((db) => {
      const p = db.profiles.find((x) => x.userId === auth.userId)
      if (!p) return json(res, 404, { message: 'Not found' })
      p.fullName = body.fullName || p.fullName
      p.city = body.city || p.city
      p.bio = body.bio ?? p.bio
      return json(res, 200, p)
    })
  }

  return json(res, 404, { message: 'Not found' })
})

server.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
