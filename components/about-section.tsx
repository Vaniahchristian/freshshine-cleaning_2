"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About FreshShine</h2>
            <p className="text-gray-600 mb-4">
              FreshShine Cleaning Services was founded with a simple mission: to provide exceptional cleaning services
              that make your spaces shine. We believe that a clean environment contributes to a healthier, happier life.
            </p>
            <p className="text-gray-600 mb-4">
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
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center"
              alt="FreshShine Team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
