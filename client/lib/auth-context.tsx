"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const demoUsers: Array<User & { password: string }> = [
  { id: "1", email: "admin@shop.com", name: "Admin User", password: "admin123", isAdmin: true },
  { id: "2", email: "user@shop.com", name: "John Doe", password: "user123", isAdmin: false },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }, [])

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Check if user already exists
    const existingUser = demoUsers.find((u) => u.email === email)
    if (existingUser) {
      return false
    }
    
    // Create new user (in real app, this would be an API call)
    const newUser: User = {
      id: String(demoUsers.length + 1),
      email,
      name,
      isAdmin: false,
    }
    
    setUser(newUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
