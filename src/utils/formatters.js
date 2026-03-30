export function formatCurrency(amount) {
  return `${Number(amount || 0).toLocaleString('ru-RU')} ₸`
}

export function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
}
