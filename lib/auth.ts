// Simple mock authentication for demo purposes
import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  user: { username: string } | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

// In a real app, this would be connected to a backend authentication system
export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (username: string, password: string) => {
    // Mock login - in a real app, this would call an API
    if (username === "admin" && password === "password") {
      set({ isAuthenticated: true, user: { username } })
      return true
    }
    return false
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
  },
}))
