import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/mockDb'
import { useApp } from '../context/AppContext'
import ServiceCard from '../components/marketplace/ServiceCard'

export default function HomePage() {
  const { services, users } = useApp()

  return (
    <div className="container-main space-y-14 py-10">
      <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white md:px-12">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs"><Sparkles className="h-4 w-4" />Kwork-подобный маркетплейс KZ + CIS</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">Биржа фиксированных услуг для бизнеса: быстро, прозрачно, безопасно</h1>
        <p className="mt-4 max-w-2xl text-slate-300">От AI-автоматизации до дизайна и разработки — выбирайте пакет, отправляйте бриф, контролируйте статус заказа в одном кабинете.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/catalog" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">Найти исполнителя <ArrowRight className="ml-2 h-4 w-4" /></Link>
          <Link to="/register" className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white/10">Стать продавцом</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Категории услуг</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => <Link key={cat.id} to={`/catalog?category=${cat.id}`} className="card-surface p-4 text-sm font-semibold hover:bg-slate-50">{cat.title}</Link>)}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-title">Популярные кворки</h2>
          <Link className="text-sm font-semibold" to="/catalog">Смотреть все</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => <ServiceCard key={service.id} service={service} seller={users.find((u) => u.id === service.sellerId)} />)}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Безопасная сделка', 'Оплата резервируется до сдачи и приемки заказа.'],
          ['Фиксированный scope', 'Пакеты с ясным составом и сроком реализации.'],
          ['Прозрачный контроль', 'Трекинг этапов: размещен → работа → сдача → завершение.'],
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
