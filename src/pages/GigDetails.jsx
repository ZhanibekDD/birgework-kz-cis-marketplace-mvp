import { Link, useParams } from 'react-router-dom'
import { Star, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import GigPackagesSidebar from '../components/gig/GigPackagesSidebar'
import { getGigById } from '../data/mockData'

export default function GigDetails() {
  const { id } = useParams()
  const gig = getGigById(id)

  if (!gig) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold">Услуга не найдена</h1>
          <Link to="/catalog" className="mt-4 inline-block text-slate-600 underline">
            В каталог
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const s = gig.seller

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <Header />
      <main className="container-main py-8 md:py-12">
        <nav className="mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-800">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link to="/catalog" className="hover:text-slate-800">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Услуга #{gig.id}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr,380px] lg:items-start">
          <div className="space-y-8">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {gig.featured && <span className="badge-soft">Хит продаж</span>}
                <span className="badge-soft">{gig.level}</span>
                {gig.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{gig.title}</h1>
            </div>

            <div className="card-surface flex flex-wrap items-center gap-6 p-5 md:p-6">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white ${s.avatarColor}`}
              >
                {s.name.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold">{s.name}</span>
                  <span className="badge-soft">{s.level}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {s.rating} ({s.reviews} отзывов)
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {s.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Ответ: {s.responseTime}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-500">Выполнено заказов: {s.ordersDone}+</div>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <button type="button" className="btn-secondary flex-1 sm:flex-none">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Написать
                </button>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-bold text-slate-950">Описание</h2>
              {gig.description.split('\n\n').map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-slate-700 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">Что нужно от вас</h2>
              <ul className="mt-3 space-y-2">
                {gig.requirements.map((r) => (
                  <li key={r} className="flex gap-2 text-slate-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {gig.faq.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-950">Вопросы</h2>
                <div className="mt-4 space-y-4">
                  {gig.faq.map((item) => (
                    <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="font-medium text-slate-900">{item.q}</div>
                      <div className="mt-2 text-sm text-slate-600">{item.a}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <GigPackagesSidebar gig={gig} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
