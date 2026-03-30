import crypto from 'node:crypto'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret'

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function b64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url')
}

function sign(payload, secret, ttlMs) {
  const exp = Date.now() + ttlMs
  const body = { ...payload, exp }
  const encoded = b64(body)
  const signature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url')
  return `${encoded}.${signature}`
}

function verify(token, secret) {
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) throw new Error('Bad token')
  const expected = crypto.createHmac('sha256', secret).update(encoded).digest('base64url')
  if (expected !== signature) throw new Error('Bad signature')
  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString())
  if (payload.exp < Date.now()) throw new Error('Expired')
  return payload
}

export const signAccessToken = (payload) => sign(payload, ACCESS_SECRET, 15 * 60 * 1000)
export const signRefreshToken = (payload) => sign(payload, REFRESH_SECRET, 7 * 24 * 60 * 60 * 1000)
export const verifyAccessToken = (token) => verify(token, ACCESS_SECRET)
export const verifyRefreshToken = (token) => verify(token, REFRESH_SECRET)
