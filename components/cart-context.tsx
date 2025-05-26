"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export type CartItem = {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    // other product fields...
  }
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getItemTotal: (item: CartItem) => number
  getCartTotal: () => number
  formatPrice: (price: number) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id)
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const getItemTotal = (item: CartItem) => {
    return item.quantity * item.product.price
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + getItemTotal(item), 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getItemTotal,
      getCartTotal,
      formatPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
