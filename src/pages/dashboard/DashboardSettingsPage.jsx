import { useState } from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { minLength } from '../../utils/validators'

export default function DashboardSettingsPage() {
  const { user, setUser } = useAuth()
  const { updateProfile } = useApp()
  const [form, setForm] = useState({ fullName: user.fullName ?? '', city: user.city ?? '', bio: user.bio ?? '' })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  return (
    <DashboardLayout>
      <h1 className="section-title">Настройки профиля</h1>
      <form className="card-surface mt-4 space-y-3 p-5" onSubmit={async (e) => {
        e.preventDefault()
        const fullNameError = minLength(form.fullName, 'Имя', 3)
        if (fullNameError) {
          setError(fullNameError)
          return
        }
        await updateProfile(user.id, form)
        setUser((prev) => ({ ...prev, ...form }))
        setError('')
        setSaved(true)
      }}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key}><label className="mb-1 block text-sm font-semibold">{key}</label><input value={value} onChange={(e) => {
            setSaved(false)
            setForm((prev) => ({ ...prev, [key]: e.target.value }))
          }} className="w-full rounded-xl bg-slate-100 px-3 py-2" /></div>
        ))}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-emerald-700">Изменения сохранены.</p>}
        <button className="btn-primary">Сохранить</button>
      </form>
    </DashboardLayout>
  )
}
