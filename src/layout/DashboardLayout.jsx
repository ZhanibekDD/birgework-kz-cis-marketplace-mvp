import { Bell, LayoutDashboard, MessageSquare, Package, Settings, ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Обзор', icon: LayoutDashboard, end: true },
  { to: '/dashboard/services', label: 'Услуги', icon: Package },
  { to: '/dashboard/orders', label: 'Заказы', icon: ShoppingBag },
  { to: '/dashboard/messages', label: 'Сообщения', icon: MessageSquare },
  { to: '/dashboard/notifications', label: 'Уведомления', icon: Bell },
  { to: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

export default function DashboardLayout({ children }) {
  return (
    <div className="container-main py-8">
      <div className="grid gap-6 lg:grid-cols-[250px,1fr]">
        <aside className="card-surface h-fit p-3">
          <p className="mb-2 px-2 text-xs uppercase tracking-wide text-slate-500">Рабочее пространство</p>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `mb-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            )
          })}
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  )
}
