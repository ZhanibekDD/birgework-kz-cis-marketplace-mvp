import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ServiceCard from '../components/marketplace/ServiceCard'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../lib/mockDb'

export default function CatalogPage() {
  const { services, users } = useApp()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(params.get('category') ?? 'all')
  const [sort, setSort] = useState(params.get('sort') ?? 'popular')

  const filtered = useMemo(() => {
    let data = services.filter((item) => {
      const q = query.toLowerCase()
      return (!q || item.title.toLowerCase().includes(q) || item.tags.join(' ').toLowerCase().includes(q)) && (category === 'all' || item.category === category)
    })
    if (sort === 'price_asc') data = [...data].sort((a, b) => a.packages[0].price - b.packages[0].price)
    if (sort === 'price_desc') data = [...data].sort((a, b) => b.packages[0].price - a.packages[0].price)
    if (sort === 'rating') data = [...data].sort((a, b) => b.rating - a.rating)
    return data
  }, [services, query, category, sort])

  const apply = () => {
    const next = new URLSearchParams()
    if (query) next.set('q', query)
    if (category !== 'all') next.set('category', category)
    if (sort !== 'popular') next.set('sort', sort)
    setParams(next)
  }

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Каталог услуг</h1>
      <div className="card-surface mt-5 grid gap-3 p-4 md:grid-cols-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск услуги" className="rounded-xl bg-slate-100 px-3 py-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl bg-slate-100 px-3 py-2">
          <option value="all">Все категории</option>
          {CATEGORIES.map((cat) => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl bg-slate-100 px-3 py-2">
          <option value="popular">Популярные</option>
          <option value="rating">Рейтинг</option>
          <option value="price_asc">Цена ↑</option>
          <option value="price_desc">Цена ↓</option>
        </select>
        <button onClick={apply} className="btn-primary">Применить</button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => <ServiceCard key={service.id} service={service} seller={users.find((u) => u.id === service.sellerId)} />)}
      </div>
    </div>
  )
}
