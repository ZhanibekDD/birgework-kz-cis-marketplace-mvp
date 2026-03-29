import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, CheckCircle2, Wallet, Globe, Briefcase, Users } from 'lucide-react'

export default function HeroSection({
  query,
  setQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}) {
  const navigate = useNavigate()

  const handleFind = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedCategory && selectedCategory !== 'all') params.set('cat', selectedCategory)
    if (sortBy && sortBy !== 'popular') params.set('sort', sortBy)
    const s = params.toString()
    navigate(s ? `/catalog?${s}` : '/catalog')
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(15,23,42,0.06),transparent_25%)]" />

      <div className="container-main relative z-10 grid gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-8">
          <span className="badge-soft">MVP в стиле Kwork, но адаптирован под Казахстан и СНГ</span>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Покупайте и продавайте цифровые услуги быстро, безопасно и по фиксированной цене
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
              Биржа для бизнеса, агентств и фрилансеров: разработка, AI, парсинг, дизайн, маркетинг,
              тексты и автоматизация. Оплата в ₸, ₽, $, безопасная сделка и рейтинг исполнителей.
            </p>
          </div>

          <div className="card-surface p-3">
            <div className="grid gap-3 md:grid-cols-[1fr,180px,180px,auto]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                  placeholder="Например: Telegram-бот, лендинг, AI-ассистент, парсер"
                  className="h-12 w-full rounded-2xl border-0 bg-slate-50 pl-11 pr-4 text-base outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 rounded-2xl border-0 bg-slate-50 px-4 outline-none"
              >
                <option value="all">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 rounded-2xl border-0 bg-slate-50 px-4 outline-none"
              >
                <option value="popular">Сначала популярные</option>
                <option value="rating">По рейтингу</option>
                <option value="price_asc">Цена по возрастанию</option>
                <option value="price_desc">Цена по убыванию</option>
              </select>

              <button type="button" onClick={handleFind} className="btn-primary h-12">
                Найти
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {['Безопасная сделка', 'Фиксированные пакеты', 'Оплата в KZT/RUB/USD', 'Проверенные исполнители'].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-slate-900" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div className="card-surface p-6 md:p-7">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Исполнителей', value: '12 000+', icon: Users },
              { label: 'Активных услуг', value: '48 000+', icon: Briefcase },
              { label: 'Средний чек', value: '57 000 ₸', icon: Wallet },
              { label: 'География', value: 'KZ + СНГ', icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-slate-50 p-4">
                <stat.icon className="mb-3 h-5 w-5 text-slate-700" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
