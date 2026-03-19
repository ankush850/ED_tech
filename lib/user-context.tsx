"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"

export type UserRole = "student" | "admin"

interface UserContextValue {
  id: string
  name: string
  email: string
  role: UserRole
  isLoading: boolean
  setUser: (data: { id: string; name: string; email: string; role: UserRole }) => void
}

const defaultUser = {
  id: "",
  name: "",
  email: "",
  role: "student" as UserRole,
}

const UserContext = createContext<UserContextValue>({
  ...defaultUser,
  isLoading: true,
  setUser: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState(defaultUser)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("learnhub-user")
      if (stored) {
        setUserState(JSON.parse(stored))
      }
    } catch {
      // Ignore
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setUser = useCallback((data: { id: string; name: string; email: string; role: UserRole }) => {
    setUserState(data)
    try {
      if (data.email) {
        localStorage.setItem("learnhub-user", JSON.stringify(data))
      } else {
        localStorage.removeItem("learnhub-user")
      }
    } catch {
      // Ignore
    }
  }, [])

  return (
    <UserContext.Provider value={{ ...user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
