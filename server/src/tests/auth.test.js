import test from 'node:test'
import assert from 'node:assert/strict'
import { hashPassword, signAccessToken, verifyAccessToken } from '../lib/auth.js'

test('hashPassword deterministic', () => {
  assert.equal(hashPassword('Pass1234!'), hashPassword('Pass1234!'))
})

test('token sign/verify', () => {
  const token = signAccessToken({ userId: 'u1', role: 'buyer' })
  const payload = verifyAccessToken(token)
  assert.equal(payload.userId, 'u1')
})
