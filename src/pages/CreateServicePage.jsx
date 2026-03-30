import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../lib/mockDb'
import { useFormValidation } from '../hooks/useFormValidation'
import { minLength, slugValidator } from '../utils/validators'

const empty = {
  title: '', slug: '', category: 'ai', shortDescription: '', tags: ['KZ', 'CIS'], deliveryDays: 4,
  packages: [
    { id: 'basic', name: 'Basic', price: 30000, revisions: 1, features: ['1 задача'] },
    { id: 'standard', name: 'Standard', price: 60000, revisions: 2, features: ['2 задачи'] },
    { id: 'pro', name: 'Pro', price: 90000, revisions: 3, features: ['3 задачи'] },
  ],
  faq: [],
}

export default function CreateServicePage() {
  const { values, errors, setField, validate } = useFormValidation(empty, (v) => ({ title: minLength(v.title, 'Название', 12), slug: slugValidator(v.slug), shortDescription: minLength(v.shortDescription, 'Описание', 30) }))
  const { user } = useAuth()
  const { addService, loading } = useApp()
  const navigate = useNavigate()

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Создать услугу</h1>
      <form className="card-surface mt-5 space-y-4 p-5" onSubmit={async (e) => {
        e.preventDefault()
        if (!validate()) return
        await addService(values, user.id)
        navigate('/dashboard/services')
      }}>
        <input className="w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="Название услуги" value={values.title} onChange={(e) => setField('title', e.target.value)} />
        {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
        <input className="w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="slug-на-латинице" value={values.slug} onChange={(e) => setField('slug', e.target.value)} />
        {errors.slug && <p className="text-xs text-red-600">{errors.slug}</p>}
        <select className="w-full rounded-xl bg-slate-100 px-3 py-2" value={values.category} onChange={(e) => setField('category', e.target.value)}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
        <textarea className="w-full rounded-xl bg-slate-100 px-3 py-2" rows="5" placeholder="Краткое описание ценности услуги" value={values.shortDescription} onChange={(e) => setField('shortDescription', e.target.value)} />
        {errors.shortDescription && <p className="text-xs text-red-600">{errors.shortDescription}</p>}
        <button disabled={loading} className="btn-primary disabled:opacity-50">{loading ? 'Публикуем...' : 'Опубликовать'}</button>
      </form>
    </div>
  )
}
