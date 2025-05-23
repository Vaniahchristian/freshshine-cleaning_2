import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import ServicesSection from "@/components/services-section"
import ProductsSection from "@/components/products-section"
import HowItWorks from "@/components/how-it-works"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <HowItWorks />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
