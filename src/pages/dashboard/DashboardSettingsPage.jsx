import { useState } from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardSettingsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ fullName: user.fullName, city: user.city, bio: user.bio ?? '' })

  return (
    <DashboardLayout>
      <h1 className="section-title">Настройки профиля</h1>
      <form className="card-surface mt-4 space-y-3 p-5" onSubmit={(e) => e.preventDefault()}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key}><label className="mb-1 block text-sm font-semibold">{key}</label><input value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} className="w-full rounded-xl bg-slate-100 px-3 py-2" /></div>
        ))}
        <button className="btn-primary">Сохранить</button>
      </form>
    </DashboardLayout>
  )
}
