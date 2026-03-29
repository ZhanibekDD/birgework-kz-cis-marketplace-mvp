import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Wallet,
  Settings,
  Plus,
  ExternalLink,
} from 'lucide-react'
import Header from '../components/layout/Header'
import { dashboardMockOrders } from '../data/mockData'

const nav = [
  { to: '/dashboard', label: 'Обзор', icon: LayoutDashboard, end: true },
  { to: '/catalog', label: 'Мои услуги', icon: Package },
  { to: '#', label: 'Сообщения', icon: MessageSquare },
  { to: '#', label: 'Финансы', icon: Wallet },
  { to: '#', label: 'Настройки', icon: Settings },
]

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <div className="container-main flex flex-col gap-8 py-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="card-surface p-3">
            <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Кабинет продавца</div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <Link
              to="/catalog"
              className="btn-primary mt-4 flex w-full items-center justify-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Новая услуга
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Обзор</h1>
            <p className="mt-1 text-slate-600">Mock-данные: заказы, баланс, активные кворки</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Активных заказов', value: '3', hint: 'в работе и на сдаче' },
              { label: 'Баланс', value: '128 400 ₸', hint: 'доступно к выводу' },
              { label: 'Просмотры услуг', value: '1 240', hint: 'за 7 дней' },
            ].map((card) => (
              <div key={card.label} className="card-surface p-5">
                <div className="text-sm text-slate-500">{card.label}</div>
                <div className="mt-1 text-2xl font-bold text-slate-950">{card.value}</div>
                <div className="mt-2 text-xs text-slate-400">{card.hint}</div>
              </div>
            ))}
          </div>

          <div className="card-surface overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Последние заказы</h2>
              <Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                Каталог
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">№</th>
                    <th className="px-5 py-3 font-medium">Услуга</th>
                    <th className="px-5 py-3 font-medium">Заказчик</th>
                    <th className="px-5 py-3 font-medium">Статус</th>
                    <th className="px-5 py-3 font-medium">Сумма</th>
                    <th className="px-5 py-3 font-medium">Срок</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardMockOrders.map((row) => (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="px-5 py-3 font-mono text-slate-600">{row.id}</td>
                      <td className="px-5 py-3 text-slate-800">{row.gig}</td>
                      <td className="px-5 py-3 text-slate-600">{row.buyer}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.sum}</td>
                      <td className="px-5 py-3 text-slate-500">{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
