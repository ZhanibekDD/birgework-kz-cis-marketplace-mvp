import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import StatusBadge from '../../components/ui/StatusBadge'

export default function DashboardOrdersPage() {
  const { user } = useAuth()
  const { orders } = useApp()
  const myOrders = orders.filter((o) => o.buyerId === user.id || o.sellerId === user.id)

  return (
    <DashboardLayout>
      <h1 className="section-title">Заказы</h1>
      <div className="card-surface mt-4 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600"><tr><th className="p-3">ID</th><th>Сумма</th><th>Дедлайн</th><th>Статус</th></tr></thead>
          <tbody>{myOrders.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="p-3">{order.id}</td><td>{order.total.toLocaleString('ru-RU')} ₸</td><td>{order.deadline}</td><td><StatusBadge status={order.status} /></td></tr>)}</tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
