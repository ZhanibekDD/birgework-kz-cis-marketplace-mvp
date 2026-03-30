import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { ORDER_STATUSES } from '../../utils/constants'
import { useAuth } from '../../context/AuthContext'

const nextStatusByRole = {
  buyer: ['revision_requested', 'completed', 'disputed', 'canceled'],
  seller: ['in_progress', 'delivered', 'canceled'],
}

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const { orders, services, users, setOrderStatus } = useApp()
  const { user } = useAuth()

  const order = orders.find((o) => o.id === orderId)
  if (!order) return <DashboardLayout><div className="card-surface p-6">Заказ не найден.</div></DashboardLayout>

  const service = services.find((s) => s.slug === order.serviceSlug)
  const seller = users.find((u) => u.id === order.sellerId)
  const buyer = users.find((u) => u.id === order.buyerId)

  const actorRole = user?.id === order.sellerId ? 'seller' : 'buyer'

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="section-title">Заказ {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr,300px]">
        <article className="card-surface p-5">
          <p className="text-sm text-slate-500">Услуга</p>
          <h2 className="text-xl font-bold">{service?.title}</h2>
          <p className="mt-2 text-sm text-slate-600">Исполнитель: {seller?.fullName} · Заказчик: {buyer?.fullName}</p>
          <p className="mt-3 text-sm">Бриф:</p>
          <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{order.brief}</p>
          <div className="mt-4 text-sm text-slate-600">Создан: {formatDate(order.createdAt)} · Дедлайн: {formatDate(order.deadline)}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {nextStatusByRole[actorRole].filter((s) => ORDER_STATUSES.includes(s)).map((status) => (
              <button key={status} className="btn-secondary" onClick={() => setOrderStatus(order.id, status)}>Перевести в {status}</button>
            ))}
          </div>
        </article>
        <aside className="card-surface h-fit p-5">
          <p className="text-sm text-slate-500">Сумма заказа</p>
          <p className="text-2xl font-bold">{formatCurrency(order.total)}</p>
          <Link className="btn-primary mt-4 w-full" to="/dashboard/messages">Открыть переписку</Link>
        </aside>
      </div>
    </DashboardLayout>
  )
}
