import { ORDER_STATUS_LABELS } from '../../utils/constants'

const styles = {
  draft: 'bg-slate-100 text-slate-700',
  placed: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  delivered: 'bg-violet-100 text-violet-700',
  revision_requested: 'bg-rose-100 text-rose-700',
  completed: 'bg-emerald-100 text-emerald-700',
  canceled: 'bg-zinc-200 text-zinc-700',
  disputed: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? styles.draft}`}>{ORDER_STATUS_LABELS[status] ?? status}</span>
}
