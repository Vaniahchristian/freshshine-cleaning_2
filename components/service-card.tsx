"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import type { Service } from "@/lib/data"

interface ServiceCardProps {
  service: Service
  onNegotiateClick: (serviceType: string) => void
}

export default function ServiceCard({ service, onNegotiateClick }: ServiceCardProps) {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={item} whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group relative">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">4.9</span>
          </div>

          {/* Service Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Professional Equipment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Eco-Friendly Products</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onNegotiateClick(service.name)}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  )
}
