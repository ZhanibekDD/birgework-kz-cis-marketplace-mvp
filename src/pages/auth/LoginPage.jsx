import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('aliya_pm')
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="container-main flex min-h-[70vh] items-center justify-center py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login(username)
          navigate('/dashboard')
        }}
        className="card-surface w-full max-w-md space-y-4 p-6"
      >
        <h1 className="text-2xl font-bold">Вход в BirgeWork</h1>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="w-full rounded-xl bg-slate-100 px-3 py-2" />
        <button className="btn-primary w-full">Войти</button>
      </form>
    </div>
  )
}
