import test from 'node:test'
import assert from 'node:assert/strict'
import { required, slugValidator } from '../utils/validators.js'
import { ORDER_STATUS_LABELS } from '../utils/constants.js'
import { formatCurrency } from '../utils/formatters.js'

test('validators work', () => {
  assert.equal(required('', 'Имя'), 'Имя обязательно')
  assert.equal(slugValidator('good-slug-1'), '')
  assert.notEqual(slugValidator('bad slug'), '')
})

test('status labels and formatting', () => {
  assert.equal(ORDER_STATUS_LABELS.revision_requested, 'Нужна доработка')
  assert.ok(formatCurrency(120000).includes('120'))
})
