import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../lib/mockDb'

const empty = {
  title: '',
  slug: '',
  category: 'ai',
  description: '',
  tags: ['KZ', 'CIS'],
  deliveryDays: 4,
  packages: [
    { id: 'basic', name: 'Basic', price: 30000, revisions: 1, features: ['1 задача'] },
    { id: 'standard', name: 'Standard', price: 60000, revisions: 2, features: ['2 задачи'] },
    { id: 'pro', name: 'Pro', price: 90000, revisions: 3, features: ['3 задачи'] },
  ],
  faq: [],
}

export default function CreateServicePage() {
  const [form, setForm] = useState(empty)
  const { user } = useAuth()
  const { addService } = useApp()
  const navigate = useNavigate()

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Создать услугу</h1>
      <form className="card-surface mt-5 space-y-4 p-5" onSubmit={(e) => {
        e.preventDefault()
        addService({ ...form, sellerId: user.id })
        navigate('/dashboard/services')
      }}>
        <input className="w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="Название" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
        <input className="w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
        <select className="w-full rounded-xl bg-slate-100 px-3 py-2" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
        <textarea className="w-full rounded-xl bg-slate-100 px-3 py-2" rows="5" placeholder="Описание" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        <button className="btn-primary">Опубликовать</button>
      </form>
    </div>
  )
}
