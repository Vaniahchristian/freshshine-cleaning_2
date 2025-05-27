"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Contact form submitted:", data)
    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      reset()
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-white via-blue-50/10 to-emerald-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 border border-emerald-200/50 shadow-sm mb-6 mx-auto">
            <Mail className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-700">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-gray-900">Let's</span>
            {' '}
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-gray-600/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or ready to schedule a service? Get in touch with our team and we'll be happy to assist you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-gray-200/50"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Our Location</h3>
                <p className="text-gray-600">123 Cleaning Street, Sparkle City, SC 12345</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-gray-600">info@freshshine.com</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="h-12 w-12 rounded-2xl bg-white/90 shadow-md hover:shadow-xl flex items-center justify-center hover:bg-gradient-to-br from-emerald-500 to-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-2xl bg-white/90 shadow-md hover:shadow-xl flex items-center justify-center hover:bg-gradient-to-br from-emerald-500 to-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-2xl bg-white/90 shadow-md hover:shadow-xl flex items-center justify-center hover:bg-gradient-to-br from-emerald-500 to-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl border border-gray-200/50"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <span className="text-white text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" {...register("name", { required: "Name is required" })} />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
