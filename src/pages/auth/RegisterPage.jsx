import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFormValidation } from '../../hooks/useFormValidation'
import { minLength, required } from '../../utils/validators'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { registerUser, authLoading, authError } = useAuth()
  const { values, errors, setField, validate } = useFormValidation(
    { fullName: '', username: '', email: '', password: '', role: 'buyer', city: 'Алматы', bio: '' },
    (v) => ({ fullName: minLength(v.fullName, 'Имя', 3), username: minLength(v.username, 'Username', 4), city: required(v.city, 'Город'), email: required(v.email, 'Email'), password: minLength(v.password, 'Пароль', 8) }),
  )

  return (
    <div className="container-main flex min-h-[70vh] items-center justify-center py-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (!validate()) return
          await registerUser(values)
          navigate('/dashboard')
        }}
        className="card-surface w-full max-w-xl space-y-4 p-6"
      >
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={values.fullName} onChange={(e) => setField('fullName', e.target.value)} placeholder="ФИО" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
          <input value={values.username} onChange={(e) => setField('username', e.target.value)} placeholder="username" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
          <input value={values.email} onChange={(e) => setField('email', e.target.value)} placeholder="email" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
          <input type="password" value={values.password} onChange={(e) => setField('password', e.target.value)} placeholder="password" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
          <input value={values.city} onChange={(e) => setField('city', e.target.value)} placeholder="Город" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
          <select value={values.role} onChange={(e) => setField('role', e.target.value)} className="w-full rounded-xl bg-slate-100 px-3 py-2"><option value="buyer">Заказчик</option><option value="seller">Исполнитель</option></select>
        </div>
        <textarea value={values.bio} onChange={(e) => setField('bio', e.target.value)} rows="3" placeholder="Кратко о себе" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
        {Object.values(errors).filter(Boolean).map((err) => <p key={err} className="text-xs text-red-600">{err}</p>)}
        {authError && <p className="rounded-xl bg-red-50 p-2 text-sm text-red-700">{authError}</p>}
        <button disabled={authLoading} className="btn-primary w-full disabled:opacity-50">{authLoading ? 'Создаем...' : 'Создать аккаунт'}</button>
      </form>
    </div>
  )
}
