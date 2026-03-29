import { useMemo, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Clock3, Star, MapPin, ChevronRight } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { categories, services } from '../data/mockData'

function CatalogCard({ item }) {
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
                <div className="text-xs text-slate-500">от минимального пакета</div>
              </div>
              <span className="btn-primary cursor-pointer text-sm">
                Открыть
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') ?? 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') ?? 'popular')

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    const cat = searchParams.get('cat') ?? 'all'
    const sort = searchParams.get('sort') ?? 'popular'
    setQuery(q)
    setSelectedCategory(cat)
    setSortBy(sort)
  }, [searchParams])

  const applyToUrl = () => {
    const next = new URLSearchParams()
    if (query) next.set('q', query)
    if (selectedCategory !== 'all') next.set('cat', selectedCategory)
    if (sortBy !== 'popular') next.set('sort', sortBy)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let items = services.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.join(' ').toLowerCase().includes(query.toLowerCase()) ||
        item.seller.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesQuery && matchesCategory
    })
    if (sortBy === 'price_asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'popular') items = [...items].sort((a, b) => b.reviews - a.reviews)
    return items
  }, [query, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <Header />
      <main className="container-main py-10 md:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="badge-soft">Каталог</span>
            <h1 className="section-title mt-2">Услуги фрилансеров</h1>
            <p className="section-desc mt-2 max-w-2xl">Фильтры, сортировка и переход к карточке с пакетами как на Kwork.</p>
          </div>
          <Link to="/" className="btn-secondary self-start md:self-auto">
            На главную
          </Link>
        </div>

        <div className="card-surface mb-10 p-4">
          <div className="grid gap-3 md:grid-cols-[1fr,160px,180px,auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyToUrl()}
                placeholder="Поиск по названию, тегам, исполнителю"
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
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
            </select>
            <button type="button" onClick={applyToUrl} className="btn-primary h-12">
              Применить
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6 text-sm text-slate-600">
          Найдено: <span className="font-semibold text-slate-900">{filtered.length}</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
