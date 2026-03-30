import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatters'

export default function CheckoutPage() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const packageId = params.get('package') ?? 'basic'
  const navigate = useNavigate()
  const { user } = useAuth()
  const { services, draftOrder, confirmOrder, loading } = useApp()

  const [brief, setBrief] = useState('')
  const [error, setError] = useState('')
  const [draft, setDraft] = useState(null)

  const service = services.find((item) => item.slug === slug)
  const selectedPackage = useMemo(() => service?.packages.find((item) => item.id === packageId) ?? service?.packages[0], [service, packageId])

  useEffect(() => {
    if (!service || !selectedPackage) return
    draftOrder({ serviceSlug: slug, packageId: selectedPackage.id, buyerId: user.id, brief: '' }).then(setDraft)
  }, [draftOrder, service, selectedPackage, slug, user.id])

  if (!service || !selectedPackage) return <div className="container-main py-20">Не удалось оформить заказ.</div>

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Оформление заказа</h1>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr,340px]">
        <div className="card-surface p-5">
          <h2 className="text-lg font-bold">Бриф проекта</h2>
          <p className="text-sm text-slate-500">Опишите цель, сроки, примеры и критерии приемки.</p>
          <textarea rows="8" value={brief} onChange={(e) => setBrief(e.target.value)} className="mt-3 w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="Например: интеграция с amoCRM, 3 сценария, дедлайн 5 дней." />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <aside className="card-surface h-fit p-5">
          <p className="text-sm text-slate-500">Услуга</p>
          <h3 className="font-bold">{service.title}</h3>
          <p className="mt-2 text-sm">Пакет: {selectedPackage.name}</p>
          <p className="mt-1 text-sm text-slate-500">Статус после оплаты: Размещен</p>
          <p className="mb-3 mt-2 text-2xl font-bold">{formatCurrency(selectedPackage.price)}</p>
          <button
            className="btn-primary w-full disabled:opacity-50"
            disabled={loading}
            onClick={async () => {
              if (brief.trim().length < 20) {
                setError('Бриф должен содержать минимум 20 символов.')
                return
              }
              const order = await confirmOrder({ ...draft, brief })
              navigate(`/dashboard/orders/${order.id}`)
            }}
          >
            {loading ? 'Подтверждаем...' : 'Подтвердить и оплатить'}
          </button>
          <Link to={`/gig/${service.slug}`} className="mt-3 block text-center text-sm text-slate-600 underline">Вернуться к услуге</Link>
        </aside>
      </div>
    </div>
  )
}
