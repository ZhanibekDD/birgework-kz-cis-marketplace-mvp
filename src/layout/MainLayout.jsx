import { Bell, BriefcaseBusiness, Heart, LogOut, MessageSquareMore } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLE_LABELS } from '../utils/constants'

function navClass({ isActive }) {
  return `text-sm font-medium ${isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'}`
}

export default function MainLayout({ children }) {
  const { user, isAuthenticated, logoutUser } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="container-main flex h-16 items-center justify-between gap-3">
          <Link to="/" className="text-xl font-black tracking-tight">BirgeWork</Link>
          <nav className="hidden items-center gap-5 md:flex">
            <NavLink to="/catalog" className={navClass}>Каталог</NavLink>
            <NavLink to="/dashboard" className={navClass}>Кабинет</NavLink>
            <NavLink to="/create-service" className={navClass}>Продавать</NavLink>
          </nav>
          <div className="flex items-center gap-1">
            {isAuthenticated && (
              <>
                <Link to="/dashboard/messages" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Сообщения"><MessageSquareMore className="h-5 w-5" /></Link>
                <Link to="/dashboard/notifications" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Уведомления"><Bell className="h-5 w-5" /></Link>
                <button type="button" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Выйти" onClick={logoutUser}><LogOut className="h-5 w-5" /></button>
              </>
            )}
            {!isAuthenticated ? <Link to="/login" className="btn-primary">Войти</Link> : <Link to="/dashboard" className="btn-secondary hidden md:inline-flex"><BriefcaseBusiness className="mr-1 h-4 w-4" />{ROLE_LABELS[user.role]}</Link>}
            <Link to="/dashboard/orders" className="hidden rounded-xl p-2 hover:bg-slate-100 md:block" aria-label="Избранное"><Heart className="h-5 w-5" /></Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-main py-7 text-sm text-slate-500 md:flex md:justify-between">
          <p>© 2026 BirgeWork — фриланс-маркетплейс Казахстана и СНГ.</p>
          <p>Безопасная сделка · фиксированные пакеты · прозрачные дедлайны.</p>
        </div>
      </footer>
    </div>
  )
}
