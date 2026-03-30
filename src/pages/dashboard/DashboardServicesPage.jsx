import { Link } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatters'

export default function DashboardServicesPage() {
  const { user } = useAuth()
  const { services } = useApp()
  const myServices = services.filter((item) => item.sellerId === user.id)

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between"><h1 className="section-title">Мои услуги</h1><Link to="/create-service" className="btn-primary">Добавить услугу</Link></div>
      {myServices.length === 0 ? (
        <div className="card-surface p-6 text-sm text-slate-500">У вас еще нет услуг. Создайте первую карточку и начните получать заказы.</div>
      ) : (
        <div className="space-y-3">
          {myServices.map((service) => (
            <div key={service.id} className="card-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-slate-500">{service.category} · ★ {service.rating} · В очереди: {service.ordersInQueue}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/gig/${service.slug}`} className="btn-secondary">Превью</Link>
                  <Link to={`/edit-service/${service.id}`} className="btn-secondary">Редактировать</Link>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">Пакеты: от {formatCurrency(Math.min(...service.packages.map((p) => p.price)))}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
