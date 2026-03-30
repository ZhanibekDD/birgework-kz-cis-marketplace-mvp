import { useMemo, useState } from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

export default function DashboardMessagesPage() {
  const { user } = useAuth()
  const { chats, users, sendMessage, readChat } = useApp()
  const myChats = chats.filter((chat) => chat.participantIds.includes(user.id))
  const [activeChatId, setActiveChatId] = useState(myChats[0]?.id)
  const [text, setText] = useState('')

  const activeChat = useMemo(() => myChats.find((chat) => chat.id === activeChatId) ?? myChats[0], [myChats, activeChatId])

  if (myChats.length === 0) {
    return <DashboardLayout><h1 className="section-title">Сообщения</h1><div className="card-surface mt-4 p-6 text-sm text-slate-500">У вас пока нет диалогов.</div></DashboardLayout>
  }

  return (
    <DashboardLayout>
      <h1 className="section-title">Сообщения</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-[280px,1fr]">
        <aside className="card-surface p-3">
          {myChats.map((chat) => (
            <button key={chat.id} className={`mb-2 w-full rounded-xl p-3 text-left text-sm ${chat.id === activeChat.id ? 'bg-slate-900 text-white' : 'bg-slate-50'}`} onClick={() => {
              setActiveChatId(chat.id)
              readChat(chat.id, user.id)
            }}>
              <p className="font-semibold">{chat.topic}</p>
              <p className="truncate text-xs opacity-80">{chat.messages.at(-1)?.text}</p>
              {chat.unreadBy.includes(user.id) && <span className="mt-1 inline-block rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white">Непрочитано</span>}
            </button>
          ))}
        </aside>
        <section className="card-surface flex flex-col p-4">
          <div className="min-h-[320px] flex-1">
            {activeChat.messages.map((m) => {
              const sender = users.find((u) => u.id === m.senderId)
              const mine = m.senderId === user.id
              return <div key={m.id} className={`mb-2 max-w-xl rounded-2xl p-3 text-sm ${mine ? 'ml-auto bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}><p className="text-xs opacity-70">{sender?.username} · {m.time}</p><p>{m.text}</p></div>
            })}
          </div>
          <form className="mt-4 flex gap-2" onSubmit={(e) => {
            e.preventDefault()
            sendMessage(activeChat.id, user.id, text)
            setText('')
          }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Напишите сообщение..." className="w-full rounded-xl bg-slate-100 px-3 py-2" />
            <button className="btn-primary">Отправить</button>
          </form>
        </section>
      </div>
    </DashboardLayout>
  )
}
