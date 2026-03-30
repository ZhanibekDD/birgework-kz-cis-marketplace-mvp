import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { minLength } from '../utils/validators'

export default function EditServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { services, editService } = useApp()
  const service = services.find((item) => item.id === id)
  const [title, setTitle] = useState(service?.title ?? '')
  const [shortDescription, setShortDescription] = useState(service?.shortDescription ?? '')
  const [error, setError] = useState('')

  if (!service) return <div className="container-main py-20">Услуга не найдена.</div>

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Редактировать услугу</h1>
      <form className="card-surface mt-4 space-y-4 p-5" onSubmit={async (e) => {
        e.preventDefault()
        const msg = minLength(title, 'Название', 12) || minLength(shortDescription, 'Описание', 30)
        if (msg) {
          setError(msg)
          return
        }
        await editService(service.id, { title, shortDescription })
        navigate('/dashboard/services')
      }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-slate-100 px-3 py-2" />
        <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full rounded-xl bg-slate-100 px-3 py-2" rows="5" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn-primary">Сохранить изменения</button>
      </form>
    </div>
  )
}
