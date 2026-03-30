export function required(value, label) {
  if (!String(value ?? '').trim()) return `${label} обязательно`
  return ''
}

export function minLength(value, label, min) {
  if (String(value ?? '').trim().length < min) return `${label}: минимум ${min} символов`
  return ''
}

export function slugValidator(value) {
  if (!value) return 'Slug обязателен'
  if (!/^[a-z0-9-]+$/.test(value)) return 'Slug: только a-z, 0-9 и -'
  return ''
}
