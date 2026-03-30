import { Link } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

export default function DashboardServicesPage() {
  const { user } = useAuth()
  const { services } = useApp()
  const myServices = services.filter((item) => item.sellerId === user.id)

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between"><h1 className="section-title">Мои услуги</h1><Link to="/create-service" className="btn-primary">Добавить услугу</Link></div>
      <div className="space-y-3">
        {myServices.length === 0 ? <div className="card-surface p-5 text-sm text-slate-500">У вас еще нет услуг.</div> : myServices.map((service) => (
          <div key={service.id} className="card-surface flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-slate-500">{service.category} · ★ {service.rating}</p>
            </div>
            <Link to={`/edit-service/${service.id}`} className="btn-secondary">Редактировать</Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
