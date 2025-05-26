"use client"

import { useState } from "react"
import { useCart } from './cart-context'
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { getProducts } from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/ui/loader'
import { ShoppingBag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [notification, setNotification] = useState<string | null>(null)

  const { data: allProducts, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: getProducts,
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error loading products</div>
  if (!allProducts) return null

  const { addToCart } = useCart()
  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, quantity: 1, product })
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(null), 2000)
  }

  // Extract all categories from full product list
  const categories = [
    "All",
    ...Array.from(new Set(allProducts.map((product) => product.category))).filter(Boolean)
  ]

  // Filter products client-side
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const { cart } = useCart()
  const totalItems = cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0)

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all animate-fade-in-out">
          {notification}
        </div>
      )}
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full px-4 py-2 border border-emerald-200 mb-6">
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Premium Products</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Professional</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cleaning Products
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Shop our curated collection of eco-friendly, professional-grade cleaning products trusted by experts
            worldwide.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-lg">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
