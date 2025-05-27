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
    <section id="products" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-emerald-200 text-emerald-700 px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          {notification}
        </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 border border-gray-200 shadow-md mb-8 hover:shadow-lg transition-shadow duration-300">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <span className="text-base font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Premium Products</span>
          </motion.div>

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
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-3xl mx-auto">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg scale-105"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
