import test from 'node:test'
import assert from 'node:assert/strict'
import { required, slugValidator } from '../utils/validators.js'
import { ORDER_STATUS_LABELS } from '../utils/constants.js'
import { formatCurrency } from '../utils/formatters.js'
import { bootstrapApp, createOrderDraft } from '../lib/api.js'

function mockStorage() {
  const db = new Map()
  global.localStorage = {
    getItem: (k) => (db.has(k) ? db.get(k) : null),
    setItem: (k, v) => db.set(k, v),
    removeItem: (k) => db.delete(k),
  }
}

test('validators work', () => {
  assert.equal(required('', 'Имя'), 'Имя обязательно')
  assert.equal(slugValidator('good-slug-1'), '')
  assert.notEqual(slugValidator('bad slug'), '')
})

test('status labels and formatting', () => {
  assert.equal(ORDER_STATUS_LABELS.revision_requested, 'Нужна доработка')
  assert.ok(formatCurrency(120000).includes('120'))
})

test('bootstrap and draft order flow', async () => {
  mockStorage()
  const boot = await bootstrapApp()
  assert.ok(Array.isArray(boot.services))
  const draft = await createOrderDraft({
    serviceSlug: boot.services[0].slug,
    packageId: boot.services[0].packages[0].id,
    buyerId: 'u-buyer-1',
    brief: 'Тестовый бриф для проверки черновика заказа',
  })
  assert.equal(draft.status, 'draft')
  assert.ok(draft.total > 0)
})
