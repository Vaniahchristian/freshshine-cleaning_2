import { create } from "zustand"
import { createClient, User, Session } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  session: Session | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  accessToken: string | null
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  session: null,
  accessToken: null,
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.session) {
      set({ isAuthenticated: false, user: null, session: null, accessToken: null })
      return false
    }
    set({
      isAuthenticated: true,
      user: data.user,
      session: data.session,
      accessToken: data.session.access_token
    })
    return true
  },
  logout: async () => {
    await supabase.auth.signOut()
    set({ isAuthenticated: false, user: null, session: null, accessToken: null })
  }
}))
