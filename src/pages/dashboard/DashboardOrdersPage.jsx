import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function DashboardOrdersPage() {
  const { user } = useAuth()
  const { orders } = useApp()
  const [onlyActive, setOnlyActive] = useState(false)
  const myOrders = orders
    .filter((o) => o.buyerId === user.id || o.sellerId === user.id)
    .filter((o) => (onlyActive ? ['placed', 'in_progress', 'revision_requested'].includes(o.status) : true))

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="section-title">Заказы</h1>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />Только активные</label>
      </div>
      {myOrders.length === 0 ? <div className="card-surface p-6">Заказов пока нет.</div> : (
        <div className="card-surface overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="p-3">ID</th><th>Сумма</th><th>Дедлайн</th><th>Статус</th><th /></tr></thead>
            <tbody>{myOrders.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="p-3">{order.id}</td><td>{formatCurrency(order.total)}</td><td>{formatDate(order.deadline)}</td><td><StatusBadge status={order.status} /></td><td><Link className="underline" to={`/dashboard/orders/${order.id}`}>Детали</Link></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
