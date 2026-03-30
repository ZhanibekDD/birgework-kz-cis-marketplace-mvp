import { createContext, useContext, useMemo, useState } from 'react'
import { createOrder, createService, markNotificationRead, updateService } from '../lib/api'

const AppContext = createContext(null)

export function AppProvider({ initialState, children }) {
  const [services, setServices] = useState(initialState.services)
  const [orders, setOrders] = useState(initialState.orders)
  const [chats] = useState(initialState.chats)
  const [notifications, setNotifications] = useState(initialState.notifications)

  const value = useMemo(
    () => ({
      users: initialState.users,
      reviews: initialState.reviews,
      services,
      orders,
      chats,
      notifications,
      addService: (form) => setServices((prev) => [createService(form), ...prev]),
      editService: (id, form) => {
        updateService(id, form)
        setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...form } : item)))
      },
      placeOrder: (slug, packageId) => {
        const created = createOrder(slug, packageId)
        if (created) setOrders((prev) => [created, ...prev])
        return created
      },
      readNotification: (id) => {
        markNotificationRead(id)
        setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)))
      },
    }),
    [initialState.reviews, initialState.users, services, orders, chats, notifications],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
