import { Link } from 'react-router-dom'

export default function ServiceCard({ service, seller }) {
  const startPrice = Math.min(...service.packages.map((item) => item.price))

  return (
    <Link to={`/gig/${service.slug}`} className="card-surface block p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>{service.tags.slice(0, 2).join(' • ')}</span>
        <span>★ {service.rating}</span>
      </div>
      <h3 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{seller?.fullName} · {seller?.city}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">от</span>
        <span className="text-xl font-bold">{startPrice.toLocaleString('ru-RU')} ₸</span>
      </div>
    </Link>
  )
}
