import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

export default function DashboardNotificationsPage() {
  const { user } = useAuth()
  const { notifications, readNotification } = useApp()
  const myNotifications = notifications.filter((item) => item.userId === user.id)

  return (
    <DashboardLayout>
      <h1 className="section-title">Уведомления</h1>
      <div className="mt-4 space-y-3">
        {myNotifications.map((item) => (
          <article key={item.id} className="card-surface flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.date}</p>
            </div>
            {!item.read && <button className="btn-secondary" onClick={() => readNotification(item.id)}>Прочитано</button>}
          </article>
        ))}
      </div>
    </DashboardLayout>
  )
}
