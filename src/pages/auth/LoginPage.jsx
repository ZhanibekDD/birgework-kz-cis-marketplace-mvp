import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFormValidation } from '../../hooks/useFormValidation'
import { required } from '../../utils/validators'

export default function LoginPage() {
  const { loginUser, authLoading, authError } = useAuth()
  const navigate = useNavigate()
  const { values, errors, setField, validate } = useFormValidation({ username: 'aliya_pm' }, (v) => ({ username: required(v.username, 'Username') }))

  return (
    <div className="container-main flex min-h-[70vh] items-center justify-center py-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (!validate()) return
          await loginUser(values)
          navigate('/dashboard')
        }}
        className="card-surface w-full max-w-md space-y-4 p-6"
      >
        <h1 className="text-2xl font-bold">Вход в BirgeWork</h1>
        <label className="block text-sm font-medium" htmlFor="username">Username</label>
        <input id="username" value={values.username} onChange={(e) => setField('username', e.target.value)} placeholder="aliya_pm / nurlan_ai / diana_web" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
        {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
        {authError && <p className="rounded-xl bg-red-50 p-2 text-sm text-red-700">{authError}</p>}
        <button disabled={authLoading} className="btn-primary w-full disabled:opacity-50">{authLoading ? 'Входим...' : 'Войти'}</button>
      </form>
    </div>
  )
}
