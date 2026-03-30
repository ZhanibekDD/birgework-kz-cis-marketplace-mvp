import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/mockDb'
import { useApp } from '../context/AppContext'
import ServiceCard from '../components/marketplace/ServiceCard'

export default function HomePage() {
  const { services, users } = useApp()
  const featured = services.slice(0, 3)

  return (
    <div className="container-main space-y-14 py-10">
      <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white md:px-12">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs"><Sparkles className="h-4 w-4" />Маркетплейс цифровых услуг KZ + CIS</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">BirgeWork: фиксированные пакеты услуг с безопасной сделкой</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Покупатели находят проверенных исполнителей, а фрилансеры продают кворки с понятным scope, дедлайном и ценой.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/catalog" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">Перейти в каталог <ArrowRight className="ml-2 h-4 w-4" /></Link>
          <Link to="/create-service" className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white/10">Стать исполнителем</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Категории</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/catalog?category=${cat.id}`} className="card-surface p-4 text-sm font-semibold hover:bg-slate-50">{cat.title}</Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-title">Популярные услуги</h2>
          <Link className="text-sm font-semibold" to="/catalog">Смотреть все</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((service) => <ServiceCard key={service.id} service={service} seller={users.find((u) => u.id === service.sellerId)} />)}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Безопасная оплата', 'Деньги резервируются до сдачи заказа'],
          ['Фиксированный scope', 'Пакеты с прозрачным составом работ'],
          ['Контроль сроков', 'Видимый статус по каждому заказу'],
        ].map(([title, desc]) => (
          <article key={title} className="card-surface p-5">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h3 className="mt-3 font-bold">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{desc}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
