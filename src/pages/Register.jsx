import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Header from '../components/layout/Header'

export default function Register() {
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
              <h1 className="text-xl font-bold">Регистрация</h1>
              <p className="text-sm text-slate-500">Заказчик или исполнитель — позже через API</p>
            </div>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Имя</label>
              <input
                type="text"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-slate-400"
                placeholder="Как к вам обращаться"
              />
            </div>
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
                autoComplete="new-password"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-slate-400"
                placeholder="Минимум 8 символов"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Роль</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 p-3 hover:bg-slate-50">
                  <input type="radio" name="role" defaultChecked className="accent-slate-900" />
                  <span className="text-sm">Заказчик</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 p-3 hover:bg-slate-50">
                  <input type="radio" name="role" className="accent-slate-900" />
                  <span className="text-sm">Исполнитель</span>
                </label>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Создать аккаунт
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-semibold text-slate-900 underline">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
