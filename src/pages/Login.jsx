import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Header from '../components/layout/Header'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="container-main flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
        <div className="card-surface w-full max-w-md p-8 shadow-soft">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Вход</h1>
              <p className="text-sm text-slate-500">Mock: без backend, форма для вёрстки</p>
            </div>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                autoComplete="email"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-slate-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Пароль</label>
              <input
                type="password"
                autoComplete="current-password"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-slate-400"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Войти
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Нет аккаунта?{' '}
            <Link to="/register" className="font-semibold text-slate-900 underline">
              Регистрация
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
