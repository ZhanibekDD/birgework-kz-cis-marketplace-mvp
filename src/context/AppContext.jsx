import { createContext, useContext, useMemo, useState } from 'react'
import {
  addMessage,
  createOrderDraft,
  createService,
  markConversationRead,
  markNotificationRead,
  placeOrder,
  saveProfile,
  updateOrderStatus,
  updateService,
} from '../lib/api'

const AppContext = createContext(null)

export function AppProvider({ initialState, children }) {
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const value = useMemo(
    () => ({
      ...state,
      loading,
      async addService(form, sellerId) {
        setLoading(true)
        const service = await createService(form, sellerId)
        setState((prev) => ({ ...prev, services: [service, ...prev.services] }))
        setLoading(false)
      },
      async editService(serviceId, form) {
        setLoading(true)
        await updateService(serviceId, form)
        setState((prev) => ({ ...prev, services: prev.services.map((s) => (s.id === serviceId ? { ...s, ...form } : s)) }))
        setLoading(false)
      },
      async draftOrder(payload) {
        return createOrderDraft(payload)
      },
      async confirmOrder(draft) {
        setLoading(true)
        const order = await placeOrder(draft)
        setState((prev) => ({ ...prev, orders: [order, ...prev.orders] }))
        setLoading(false)
        return order
      },
      async setOrderStatus(orderId, status) {
        await updateOrderStatus(orderId, status)
        setState((prev) => ({ ...prev, orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status } : o)) }))
      },
      async sendMessage(chatId, senderId, text) {
        if (!text.trim()) return
        const now = new Date()
        setState((prev) => ({
          ...prev,
          chats: prev.chats.map((chat) => {
            if (chat.id !== chatId) return chat
            return {
              ...chat,
              messages: [...chat.messages, { id: `tmp-${Date.now()}`, senderId, text, time: now.toTimeString().slice(0, 5), date: now.toISOString().slice(0, 10) }],
            }
          }),
        }))
        await addMessage(chatId, senderId, text)
      },
      async readChat(chatId, userId) {
        await markConversationRead(chatId, userId)
        setState((prev) => ({ ...prev, chats: prev.chats.map((chat) => (chat.id === chatId ? { ...chat, unreadBy: chat.unreadBy.filter((id) => id !== userId) } : chat)) }))
      },
      async readNotification(id) {
        await markNotificationRead(id)
        setState((prev) => ({ ...prev, notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) }))
      },
      async updateProfile(userId, patch) {
        await saveProfile(userId, patch)
        setState((prev) => ({ ...prev, users: prev.users.map((u) => (u.id === userId ? { ...u, ...patch } : u)) }))
      },
    }),
    [state, loading],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
