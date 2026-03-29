import { Link, NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const navCls = ({ isActive }) =>
  isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-main flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">BirgeWork</div>
            <div className="text-xs text-slate-500">Фриланс-биржа Казахстан + СНГ</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <NavLink to="/catalog" className={navCls}>
            Каталог
          </NavLink>
          <a href="/#how" className="text-slate-600 hover:text-slate-950">
            Как это работает
          </a>
          <a href="/#buyers" className="text-slate-600 hover:text-slate-950">
            Заказчикам
          </a>
          <a href="/#sellers" className="text-slate-600 hover:text-slate-950">
            Исполнителям
          </a>
          <a href="/#pricing" className="text-slate-600 hover:text-slate-950">
            Тарифы
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-secondary">
            Войти
          </Link>
          <Link to="/register" className="hidden sm:inline-flex btn-secondary">
            Регистрация
          </Link>
          <Link to="/dashboard" className="btn-primary">
            Кабинет продавца
          </Link>
        </div>
      </div>
    </header>
  )
}
