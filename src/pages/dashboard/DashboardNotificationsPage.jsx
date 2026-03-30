import { Link } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

const typeLabels = { order: 'Заказ', message: 'Сообщение', payout: 'Выплата', review: 'Отзыв' }

export default function DashboardNotificationsPage() {
  const { user } = useAuth()
  const { notifications, readNotification } = useApp()
  const myNotifications = notifications.filter((item) => item.userId === user.id)

  return (
    <DashboardLayout>
      <h1 className="section-title">Уведомления</h1>
      <div className="mt-4 space-y-3">
        {myNotifications.length === 0 ? <div className="card-surface p-6 text-sm text-slate-500">Пока нет уведомлений.</div> : myNotifications.map((item) => (
          <article key={item.id} className={`card-surface p-4 ${item.read ? 'opacity-80' : ''}`}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">{typeLabels[item.type] ?? 'Событие'}</p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
              <div className="flex gap-2">
                {!item.read && <button className="btn-secondary" onClick={() => readNotification(item.id)}>Прочитано</button>}
                <Link className="btn-primary" to={item.actionPath || '/dashboard'}>Открыть</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  )
}
