import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ fullName: '', username: '', role: 'buyer', city: 'Алматы' })

  return (
    <div className="container-main flex min-h-[70vh] items-center justify-center py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          register(form)
          navigate('/dashboard')
        }}
        className="card-surface w-full max-w-md space-y-4 p-6"
      >
        <h1 className="text-2xl font-bold">Регистрация</h1>
        {['fullName', 'username', 'city'].map((key) => (
          <input
            key={key}
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            placeholder={key}
            className="w-full rounded-xl bg-slate-100 px-3 py-2"
          />
        ))}
        <select value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} className="w-full rounded-xl bg-slate-100 px-3 py-2">
          <option value="buyer">Заказчик</option>
          <option value="seller">Исполнитель</option>
        </select>
        <button className="btn-primary w-full">Создать аккаунт</button>
      </form>
    </div>
  )
}
