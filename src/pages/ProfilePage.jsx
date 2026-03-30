import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProfilePage() {
  const { username } = useParams()
  const { users, services } = useApp()
  const profile = users.find((item) => item.username === username)

  if (!profile) return <div className="container-main py-20">Профиль не найден.</div>

  const sellerServices = services.filter((item) => item.sellerId === profile.id)

  return (
    <div className="container-main py-8">
      <article className="card-surface p-6">
        <h1 className="section-title">{profile.fullName}</h1>
        <p className="mt-1 text-slate-600">@{profile.username} · {profile.city}</p>
        <p className="mt-3 text-slate-700">{profile.bio || 'Пользователь не добавил описание.'}</p>
        <p className="mt-3 text-sm">Рейтинг: ★ {profile.rating} · Выполнено: {profile.completedOrders}</p>
        {profile.sellerMetrics && <p className="mt-2 text-sm text-slate-600">Ответ: {profile.sellerMetrics.responseRate}% · Время ответа: {profile.sellerMetrics.responseTimeHours}ч · Completion: {profile.sellerMetrics.completionRate}%</p>}
      </article>
      {profile.portfolio?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-bold">Портфолио и кейсы</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">{profile.portfolio.map((item) => <div key={item} className="card-surface p-4 text-sm">{item}</div>)}</div>
        </section>
      )}
      <section className="mt-6">
        <h2 className="text-xl font-bold">Услуги исполнителя</h2>
        <div className="mt-3 space-y-3">{sellerServices.length === 0 ? <p className="text-sm text-slate-500">Услуги не опубликованы.</p> : sellerServices.map((service) => <Link key={service.id} to={`/gig/${service.slug}`} className="card-surface block p-4 hover:bg-slate-50">{service.title}</Link>)}</div>
      </section>
    </div>
  )
}
