const styles = {
  Новый: 'bg-blue-100 text-blue-700',
  'В работе': 'bg-amber-100 text-amber-700',
  'На проверке': 'bg-violet-100 text-violet-700',
  Завершен: 'bg-emerald-100 text-emerald-700',
}

export default function StatusBadge({ status }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? 'bg-slate-100 text-slate-700'}`}>{status}</span>
}
