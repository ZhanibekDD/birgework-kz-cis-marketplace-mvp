import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

export default function DashboardMessagesPage() {
  const { user } = useAuth()
  const { chats, users } = useApp()
  const myChats = chats.filter((chat) => chat.participantIds.includes(user.id))

  return (
    <DashboardLayout>
      <h1 className="section-title">Сообщения</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-[280px,1fr]">
        <aside className="card-surface p-3">{myChats.map((chat) => <div key={chat.id} className="mb-2 rounded-xl bg-slate-50 p-3 text-sm"><p className="font-semibold">{chat.topic}</p><p className="text-xs text-slate-500">{chat.messages.at(-1)?.text}</p></div>)}</aside>
        <section className="card-surface p-4">
          {(myChats[0]?.messages ?? []).map((m) => {
            const sender = users.find((u) => u.id === m.senderId)
            const mine = m.senderId === user.id
            return <div key={m.id} className={`mb-2 max-w-xl rounded-2xl p-3 text-sm ${mine ? 'ml-auto bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}><p className="text-xs opacity-70">{sender?.username} · {m.time}</p><p>{m.text}</p></div>
          })}
          <input placeholder="Напишите сообщение..." className="mt-4 w-full rounded-xl bg-slate-100 px-3 py-2" />
        </section>
      </div>
    </DashboardLayout>
  )
}
