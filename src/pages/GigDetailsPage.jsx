import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function GigDetailsPage() {
  const { slug } = useParams()
  const { services, users, reviews } = useApp()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <div className="container-main py-20">Услуга не найдена.</div>

  const seller = users.find((u) => u.id === service.sellerId)
  const serviceReviews = reviews.filter((r) => r.serviceSlug === slug)

  return (
    <div className="container-main py-8">
      <div className="grid gap-7 lg:grid-cols-[1fr,340px]">
        <section>
          <h1 className="section-title">{service.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{seller?.fullName} · {seller?.city} · ★ {service.rating} ({service.reviewsCount})</p>
          <p className="mt-5 leading-relaxed text-slate-700">{service.description}</p>

          <h2 className="mt-8 text-xl font-bold">FAQ</h2>
          <div className="mt-3 space-y-3">
            {service.faq.length === 0 ? <p className="text-sm text-slate-500">Пока нет вопросов.</p> : service.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold">Отзывы</h2>
          <div className="mt-3 space-y-3">
            {serviceReviews.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <p className="font-semibold">@{item.author} · ★ {item.rating}</p>
                <p className="mt-1 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="card-surface h-fit p-4">
          <h2 className="text-lg font-bold">Пакеты</h2>
          <div className="mt-3 space-y-3">
            {service.packages.map((pkg) => (
              <article key={pkg.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between"><h3 className="font-semibold">{pkg.name}</h3><p className="font-bold">{pkg.price.toLocaleString('ru-RU')} ₸</p></div>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">{pkg.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <Link to={`/checkout/${service.slug}?package=${pkg.id}`} className="btn-primary mt-3 w-full">Выбрать</Link>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
