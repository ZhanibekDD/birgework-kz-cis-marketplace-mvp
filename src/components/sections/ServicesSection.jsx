import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock3, Star, MapPin, ChevronRight } from 'lucide-react'

function ServiceCard({ item }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={`/gig/${item.id}`} className="block h-full">
        <div className="card-surface h-full p-6 transition-all hover:shadow-xl">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {item.featured && <span className="badge-soft">Хит</span>}
                <span className="badge-soft">{item.level}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-current" />
                {item.rating}
                <span className="text-slate-400">({item.reviews})</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <span className="font-medium text-slate-700">{item.seller}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {item.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                {item.delivery}
              </span>
              <span>от</span>
            </div>

            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-950">
                  {item.price.toLocaleString('ru-RU')} {item.currency}
                </div>
                <div className="text-xs text-slate-500">фиксированный пакет, без сюрпризов</div>
              </div>

              <span className="btn-primary cursor-pointer">
                Подробнее
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServicesSection({ services }) {
  return (
    <section id="catalog" className="container-main py-12 md:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <span className="badge-soft">Каталог услуг</span>
          <h2 className="section-title">Популярные кворки для бизнеса и e-commerce</h2>
          <p className="section-desc">
            Тут уже чувствуется вайб маркетплейса: фиксированные пакеты, понятные сроки, рейтинг и реальные кейсы
            исполнителей.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Найдено: <span className="font-semibold text-slate-900">{services.length}</span>
          </div>
          <Link to="/catalog" className="btn-secondary text-sm">
            Весь каталог
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
