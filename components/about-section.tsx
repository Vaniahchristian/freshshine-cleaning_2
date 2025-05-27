"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-gradient-to-br from-white via-blue-50/10 to-emerald-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 border border-emerald-200/50 shadow-sm mb-6 w-fit">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">About</span>
              {' '}
              <span className="text-gray-900">FreshShine</span>
            </h2>
            <p className="text-gray-600/90 text-lg leading-relaxed mb-6">
              FreshShine Cleaning Services was founded with a simple mission: to provide exceptional cleaning services
              that make your spaces shine. We believe that a clean environment contributes to a healthier, happier life.
            </p>
            <p className="text-gray-600/90 text-lg leading-relaxed mb-6">
              Our team of dedicated professionals is committed to delivering top-quality cleaning services for cars,
              homes, and backyards. We use eco-friendly products and advanced techniques to ensure the best results.
            </p>
            <p className="text-gray-600">
              What sets us apart is our attention to detail and our commitment to customer satisfaction. We're not just
              cleaning; we're creating spaces that inspire and rejuvenate.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center"
                alt="FreshShine Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full blur-2xl opacity-40 animate-pulse-slow" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse-slow delay-700" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
