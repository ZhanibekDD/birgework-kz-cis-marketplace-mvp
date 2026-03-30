import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function EditServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { services, editService } = useApp()
  const service = services.find((item) => item.id === id)
  const [title, setTitle] = useState(service?.title ?? '')
  const [description, setDescription] = useState(service?.description ?? '')

  if (!service) return <div className="container-main py-20">Услуга не найдена.</div>

  return (
    <div className="container-main py-8">
      <h1 className="section-title">Редактировать услугу</h1>
      <form className="card-surface mt-4 space-y-4 p-5" onSubmit={(e) => {
        e.preventDefault()
        editService(service.id, { title, description })
        navigate('/dashboard/services')
      }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-slate-100 px-3 py-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl bg-slate-100 px-3 py-2" rows="5" />
        <button className="btn-primary">Сохранить изменения</button>
      </form>
    </div>
  )
}
