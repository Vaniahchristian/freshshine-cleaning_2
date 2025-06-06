"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div 
      variants={item} 
      whileHover={{ y: -8, scale: 1.02 }} 
      transition={{ duration: 0.4, ease: "easeOut" }} 
      className="group relative">

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50">

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">

          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Category Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-100/50">
            <span className="text-sm font-medium text-gray-800">{product.category}</span>
          </motion.div>

          {/* Rating */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-gray-100/50">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-800">4.8</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-2">{product.description}</p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                UGX{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">Free shipping</span>
            </div>
            <Button
              size="sm"
              onClick={onAddToCart}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ShoppingCart className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
              Add
            </Button>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  )
}
