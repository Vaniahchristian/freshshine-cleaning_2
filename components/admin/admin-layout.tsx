"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import {
  LayoutDashboard,
  Droplets,
  ShoppingBag,
  MessageSquare,
  FileEdit,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Requests",
      href: "/admin/requests",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Site Content",
      href: "/admin/content",
      icon: <FileEdit className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white shadow-md">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 px-4 bg-amber-500 text-white">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              FreshShine Admin
            </Link>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href ? "bg-amber-100 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <div className="flex items-center justify-between h-16 px-4 bg-amber-500 text-white">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            FreshShine Admin
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="px-2 py-3 bg-white shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href ? "bg-amber-100 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900 mt-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </nav>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}
