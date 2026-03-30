import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function CheckoutPage() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const packageId = params.get('package') ?? 'basic'
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const { services, placeOrder } = useApp()
  const service = services.find((item) => item.slug === slug)

  const selectedPackage = useMemo(() => service?.packages.find((item) => item.id === packageId) ?? service?.packages[0], [service, packageId])

  if (!service || !selectedPackage) return <div className="container-main py-20">Не удалось оформить заказ.</div>

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Оформление заказа</h1>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr,320px]">
        <div className="card-surface p-5">
          <h2 className="text-lg font-bold">Бриф</h2>
          <textarea rows="8" value={comment} onChange={(e) => setComment(e.target.value)} className="mt-3 w-full rounded-xl bg-slate-100 px-3 py-2" placeholder="Опишите задачу, цели и материалы." />
        </div>
        <aside className="card-surface h-fit p-5">
          <p className="text-sm text-slate-500">Услуга</p>
          <h3 className="font-bold">{service.title}</h3>
          <p className="mt-2 text-sm">Пакет: {selectedPackage.name}</p>
          <p className="mb-4 text-2xl font-bold">{selectedPackage.price.toLocaleString('ru-RU')} ₸</p>
          <button className="btn-primary w-full" onClick={() => {
            placeOrder(slug, selectedPackage.id)
            navigate('/dashboard/orders')
          }}>Подтвердить и оплатить</button>
        </aside>
      </div>
    </div>
  )
}
