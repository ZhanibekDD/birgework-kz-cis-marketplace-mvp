import fs from 'node:fs'
import path from 'node:path'
import { saveDb } from './store.js'

const migrationDir = path.resolve(process.cwd(), 'data/migrations')
fs.mkdirSync(migrationDir, { recursive: true })
const file = path.join(migrationDir, `${Date.now()}_init.sql`)
fs.copyFileSync(path.resolve(process.cwd(), 'db_schema.sql'), file)
saveDb({ users: [], profiles: [], sellerProfiles: [], buyerAccounts: [], services: [], packages: [], reviews: [], orders: [], orderEvents: [], conversations: [], messages: [], notifications: [], favorites: [], sessions: [] })
console.log('Migration applied and db initialized')
