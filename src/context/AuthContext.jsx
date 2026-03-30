import { createContext, useContext, useMemo, useState } from 'react'
import { loginAs, registerUser } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ initialUser, children }) {
  const [user, setUser] = useState(initialUser)

  const value = useMemo(
    () => ({
      user,
      isSeller: user?.role === 'seller',
      login: (username) => setUser(loginAs(username)),
      register: (form) => setUser(registerUser(form)),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
