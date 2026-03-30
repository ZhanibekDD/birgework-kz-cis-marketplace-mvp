import fs from 'node:fs'
import path from 'node:path'

const dbPath = path.resolve(process.cwd(), 'data/db.json')

const emptyDb = {
  users: [], profiles: [], sellerProfiles: [], buyerAccounts: [], services: [], packages: [], reviews: [], orders: [], orderEvents: [], conversations: [], messages: [], notifications: [], favorites: [], sessions: [],
}

export function loadDb() {
  if (!fs.existsSync(dbPath)) return structuredClone(emptyDb)
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'))
}

export function saveDb(db) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

export function withDb(mutator) {
  const db = loadDb()
  const result = mutator(db)
  saveDb(db)
  return result
}
