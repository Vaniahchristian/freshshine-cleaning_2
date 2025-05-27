import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">FreshShine</h3>
            <p className="text-gray-400 leading-relaxed">Professional cleaning services for cars, homes, and backyards.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white/90">Business Hours</h4>
            <ul className="space-y-3 text-gray-400/90">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                Monday - Friday: 8:00 AM - 6:00 PM
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                Saturday: 9:00 AM - 5:00 PM
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                Sunday: Closed
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white/90">Contact</h4>
            <ul className="space-y-3 text-gray-400/90">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                123 Cleaning Street, Sparkle City
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                info@freshshine.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400/90 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">FreshShine Cleaning Services</span>. 
            All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
