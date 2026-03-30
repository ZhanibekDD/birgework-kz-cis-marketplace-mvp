import { createContext, useContext, useMemo, useState } from 'react'
import { login, logout, register } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ initialUser, children }) {
  const [user, setUser] = useState(initialUser)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user?.role !== 'guest',
      authLoading,
      authError,
      async loginUser(payload) {
        setAuthError('')
        setAuthLoading(true)
        try {
          const next = await login(payload)
          setUser(next)
          return next
        } catch (error) {
          setAuthError(error.message)
          throw error
        } finally {
          setAuthLoading(false)
        }
      },
      async registerUser(payload) {
        setAuthError('')
        setAuthLoading(true)
        try {
          const next = await register(payload)
          setUser(next)
          return next
        } catch (error) {
          setAuthError(error.message)
          throw error
        } finally {
          setAuthLoading(false)
        }
      },
      async logoutUser() {
        await logout()
        setUser({ id: 'u-guest', role: 'guest', fullName: 'Гость' })
      },
      setUser,
    }),
    [user, authError, authLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
