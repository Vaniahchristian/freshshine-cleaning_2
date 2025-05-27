"use client"

import { getSiteContent } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import Loader from '@/components/ui/loader'
import { motion } from "framer-motion"
import { Play, Star, Users, Award, Sparkles } from "lucide-react"

export default function HeroSection() {
  const { data: hero, isLoading, error } = useQuery({
    queryKey: ['hero'],
    queryFn: () => getSiteContent('hero')
  })
  
  if (isLoading) return <Loader />
  if (error) return <div>Error loading hero content</div>
  if (!hero) return null
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
  {/* SVG Advanced Circuit Patterned Background */}
<div className="absolute inset-0 bg-white dark:bg-gray-950 -z-10">
  <div className="absolute inset-0">
    <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit-advanced" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        {/* Nodes */}
        <circle cx="10" cy="10" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="50" cy="10" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="90" cy="10" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="10" cy="50" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="50" cy="50" r="3" className="fill-purple-500 dark:fill-purple-400" />
        <circle cx="90" cy="50" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="10" cy="90" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="50" cy="90" r="2" className="fill-blue-500 dark:fill-blue-400" />
        <circle cx="90" cy="90" r="2" className="fill-blue-500 dark:fill-blue-400" />
        {/* Connections */}
        <path
          d="M10 10 H 30 V 50 H 10 M50 10 V 30 H 90 M50 50 H 70 V 90 M10 50 H 30 M50 50 H 70 M90 50 V 70 H 70"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-500 dark:text-blue-400"
          fill="none"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit-advanced)" />
    </svg>
  </div>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />
</div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Premium Cleaning Services</span>
            </motion.div> */}

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Sparkle</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Transform your spaces with our professional cleaning services. From cars to homes, we make everything
                shine like new.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">2,500+ Happy Customers</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection("services")}
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-emerald-500 px-8 py-6 rounded-2xl text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
                onClick={() => scrollToSection("how-it-works")}
              >
                <Play className="w-5 h-5 mr-2" />
                How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                animate={{
                  y: [0, 20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl mt-24 mb-24"
              >
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=700&fit=crop&crop=center"
                  alt="Professional Cleaning Service"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-3xl -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
