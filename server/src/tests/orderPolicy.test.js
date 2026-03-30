import test from 'node:test'
import assert from 'node:assert/strict'
import { canTransition } from '../lib/orderPolicy.js'

test('seller transitions', () => {
  assert.equal(canTransition('seller', 'delivered'), true)
  assert.equal(canTransition('seller', 'completed'), false)
})

test('buyer transitions', () => {
  assert.equal(canTransition('buyer', 'completed'), true)
  assert.equal(canTransition('buyer', 'in_progress'), false)
})
