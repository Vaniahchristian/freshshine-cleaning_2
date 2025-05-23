"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import LoginForm from "@/components/admin/login-form"

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">FreshShine Admin</h1>
          <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Username: admin</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  )
}
