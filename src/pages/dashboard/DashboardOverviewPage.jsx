import { Link } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import StatusBadge from '../../components/ui/StatusBadge'

export default function DashboardOverviewPage() {
  const { user } = useAuth()
  const { orders } = useApp()
  const myOrders = orders.filter((o) => o.buyerId === user.id || o.sellerId === user.id)

  return (
    <DashboardLayout>
      <h1 className="section-title">Добро пожаловать, {user.fullName}</h1>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="card-surface p-4"><p className="text-sm text-slate-500">Всего заказов</p><p className="text-2xl font-bold">{myOrders.length}</p></div>
        <div className="card-surface p-4"><p className="text-sm text-slate-500">Активные</p><p className="text-2xl font-bold">{myOrders.filter((o) => o.status !== 'Завершен').length}</p></div>
        <div className="card-surface p-4"><p className="text-sm text-slate-500">Оборот</p><p className="text-2xl font-bold">{myOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString('ru-RU')} ₸</p></div>
      </div>
      <div className="card-surface mt-5 p-4">
        <div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Последние заказы</h2><Link to="/dashboard/orders" className="text-sm font-semibold">Все</Link></div>
        <div className="space-y-2">{myOrders.slice(0, 4).map((order) => <div key={order.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm"><span>{order.id}</span><StatusBadge status={order.status} /></div>)}</div>
      </div>
    </DashboardLayout>
  )
}
