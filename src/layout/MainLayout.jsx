import { Bell, BriefcaseBusiness, MessageSquareMore } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

function navClass({ isActive }) {
  return `text-sm font-medium ${isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'}`
}

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="container-main flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-xl font-black tracking-tight">BirgeWork</Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/catalog" className={navClass}>Каталог</NavLink>
            <NavLink to="/dashboard" className={navClass}>Кабинет</NavLink>
            <NavLink to="/create-service" className={navClass}>Создать услугу</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/messages" className="rounded-xl p-2 hover:bg-slate-100"><MessageSquareMore className="h-5 w-5" /></Link>
            <Link to="/dashboard/notifications" className="rounded-xl p-2 hover:bg-slate-100"><Bell className="h-5 w-5" /></Link>
            <Link to="/dashboard" className="btn-primary hidden md:inline-flex"><BriefcaseBusiness className="mr-1 h-4 w-4" />Мой кабинет</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-main flex flex-col gap-2 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 BirgeWork — фриланс-маркетплейс Казахстана и СНГ.</p>
          <p>Безопасная сделка · фиксированные пакеты · прозрачные дедлайны.</p>
        </div>
      </footer>
    </div>
  )
}
