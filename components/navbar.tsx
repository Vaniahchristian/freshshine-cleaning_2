"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from './cart-context'
import { type Product } from '@/lib/types'

interface CartItem {
  id: number
  quantity: number
  product?: Product
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, removeFromCart, clearCart } = useCart()
  const totalItems = cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl blur group-hover:blur-md transition-all duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FreshShine
            </span>
          </Link>

          {/* Cart Icon Desktop */}
          <div className="hidden md:flex items-center mr-4">
            <button
              className="relative p-2 rounded-full hover:bg-emerald-50 transition"
              onClick={() => setCartOpen((open) => !open)}
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Cart Dropdown */}
            {cartOpen && (
              <div className="absolute right-24 top-16 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                <h4 className="font-bold text-lg mb-2">Your Cart</h4>
                {cart.length === 0 ? (
                  <div className="text-gray-500">Cart is empty</div>
                ) : (
                  <ul className="divide-y divide-gray-100 max-h-60 overflow-auto mb-4">
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center justify-between py-2">
                        <div>
                          <span className="font-medium text-gray-800">
                            {item.product?.name || `Product #${item.id}`}
                          </span>
                          <span className="ml-2 text-gray-500">x{item.quantity}</span>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl py-2 font-semibold hover:from-emerald-700 hover:to-blue-700 transition"
                    onClick={() => { clearCart(); setCartOpen(false); }}
                    disabled={cart.length === 0}
                  >
                    Checkout
                  </button>
                  <button
                    className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-2 font-semibold hover:bg-gray-200 transition"
                    onClick={() => setCartOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: "Home", id: "home" },
              { name: "Services", id: "services" },
              { name: "Products", id: "products" },
              { name: "How It Works", id: "how-it-works" },
              { name: "About", id: "about" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-xl font-bold transition-all duration-300 text-gray-700 hover:text-emerald-600"
              >
                {item.name}
              </button>
            ))}     
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("services")}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Quote
            </Button>
          </div>

          {/* Cart Icon Mobile */}
          <div className="md:hidden flex items-center mr-2">
            <button
              className="relative p-2 rounded-full hover:bg-emerald-50 transition"
              onClick={() => setCartOpen((open) => !open)}
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Cart Dropdown Mobile */}
            {cartOpen && (
              <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={() => setCartOpen(false)}>
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-t-2xl shadow-2xl p-4" onClick={e => e.stopPropagation()}>
                  <h4 className="font-bold text-lg mb-2">Your Cart</h4>
                  {cart.length === 0 ? (
                    <div className="text-gray-500">Cart is empty</div>
                  ) : (
                    <ul className="divide-y divide-gray-100 max-h-60 overflow-auto mb-4">
                      {cart.map((item) => (
                        <li key={item.id} className="flex items-center justify-between py-2">
                          <div>
                            <span className="font-medium text-gray-800">
                              {item.product?.name || `Product #${item.id}`}
                            </span>
                            <span className="ml-2 text-gray-500">x{item.quantity}</span>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl py-2 font-semibold hover:from-emerald-700 hover:to-blue-700 transition"
                      onClick={() => { clearCart(); setCartOpen(false); }}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                    <button
                      className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-2 font-semibold hover:bg-gray-200 transition"
                      onClick={() => setCartOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {[
                { name: "Home", id: "home" },
                { name: "Services", id: "services" },
                { name: "Products", id: "products" },
                { name: "How It Works", id: "how-it-works" },
                { name: "About", id: "about" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 font-bold"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("services")}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold mt-4"
              >
                Get Quote
              </Button>
            </div>
        </div>
      )}
    </div>
  )
}
