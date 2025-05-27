"use client"

import { getSiteContent } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { motion } from "framer-motion"
import Loader from '@/components/ui/loader'
import { CheckCircle, Calendar, Sparkles, ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const { data: howItWorks, isLoading, error } = useQuery({
    queryKey: ['howItWorks'],
    queryFn: () => getSiteContent('howItWorks')
  })

  if (isLoading) return <Loader />
  if (error) return <div>Error loading how it works content</div>
  if (!howItWorks || !howItWorks.howItWorks) return null;
  // Use steps from the database, fallback to default if missing or malformed
  const dbSteps = Array.isArray(howItWorks.howItWorks.steps) && howItWorks.howItWorks.steps.length > 0
    ? howItWorks.howItWorks.steps
    : [
        { title: "Choose Service", description: "Select from our range of premium cleaning services tailored to your needs." },
        { title: "Book & Schedule", description: "Pick your preferred date and time. We'll send confirmation instantly." },
        { title: "Enjoy Results", description: "Our certified professionals deliver exceptional results that exceed expectations." },
      ];
  // Assign icons and colors to first three steps
  const icons = [
    <CheckCircle className="h-8 w-8 text-white" key="icon1" />, 
    <Calendar className="h-8 w-8 text-white" key="icon2" />, 
    <Sparkles className="h-8 w-8 text-white" key="icon3" />
  ];
  const colors = [
    "from-emerald-500 to-emerald-600",
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600"
  ];
  const steps = dbSteps.slice(0, 3).map((step, i) => ({
    icon: icons[i] || icons[0],
    color: colors[i] || colors[0],
    ...step
  }));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/10 to-emerald-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-40 right-40 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-2xl animate-pulse-slow delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">Simple Process</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="text-gray-900">How It</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-xl text-gray-600/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Getting your space professionally cleaned has never been easier. Follow our simple three-step process.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative">
              <div className="text-center group">
                {/* Step Number */}
                <div className="relative mb-8">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-[2rem] flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}
                  >
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <span className="text-base font-bold bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-6 lg:-right-8">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-10 md:p-16 border border-gray-200/50 shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their cleaning needs.
            </p>
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
              Book Your Service
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
