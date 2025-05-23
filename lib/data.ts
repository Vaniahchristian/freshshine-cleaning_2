// Mock data for the application

export interface Service {
  id: number
  name: string
  description: string
  image: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface Request {
  id: number
  name: string
  phone: string
  serviceType: string
  description: string
  location: string
  paymentMethod: string
  status: "pending" | "handled"
  date: string
}

export const services: Service[] = [
  {
    id: 1,
    name: "Car Cleaning",
    description: "Professional car detailing services to make your vehicle shine inside and out.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "House Cleaning",
    description: "Comprehensive home cleaning services for a spotless and healthy living environment.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Backyard Cleaning",
    description: "Transform your outdoor space with our thorough backyard cleaning and maintenance.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Office Cleaning",
    description: "Keep your workplace clean and professional with our specialized office cleaning.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 5,
    name: "Window Cleaning",
    description: "Crystal clear windows that let in more light and improve your property's appearance.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 6,
    name: "Carpet Cleaning",
    description: "Deep cleaning for carpets to remove stains, allergens, and restore their appearance.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: "All-Purpose Cleaner",
    description: "Effective cleaner for multiple surfaces.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop&crop=center",
    category: "Household",
  },
  {
    id: 2,
    name: "Car Wash Shampoo",
    description: "Gentle yet effective car cleaning solution.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=300&fit=crop&crop=center",
    category: "Automotive",
  },
  {
    id: 3,
    name: "Glass Cleaner",
    description: "Streak-free formula for windows and mirrors.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center",
    category: "Household",
  },
  {
    id: 4,
    name: "Carpet Shampoo",
    description: "Deep cleaning solution for carpets and upholstery.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
    category: "Household",
  },
  {
    id: 5,
    name: "Tire Shine Spray",
    description: "Give your tires that showroom shine.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center",
    category: "Automotive",
  },
  {
    id: 6,
    name: "Microfiber Cloth Set",
    description: "Pack of 5 premium microfiber cleaning cloths.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Disinfectant Spray",
    description: "Kills 99.9% of germs and bacteria.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center",
    category: "Household",
  },
  {
    id: 8,
    name: "Leather Cleaner",
    description: "Gentle cleaner for leather surfaces.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=300&fit=crop&crop=center",
    category: "Automotive",
  },
]

export const requests: Request[] = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    serviceType: "Car Cleaning",
    description: "Need full detailing for my SUV before a road trip.",
    location: "123 Main St, Anytown",
    paymentMethod: "mtn",
    status: "pending",
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    serviceType: "House Cleaning",
    description: "Weekly cleaning service for a 3-bedroom house.",
    location: "456 Oak Ave, Somewhere",
    paymentMethod: "airtel",
    status: "handled",
    date: "2023-05-14",
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "+1 (555) 456-7890",
    serviceType: "Backyard Cleaning",
    description: "Need help cleaning up after a storm.",
    location: "789 Pine Rd, Nowhere",
    paymentMethod: "mtn",
    status: "pending",
    date: "2023-05-13",
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "+1 (555) 234-5678",
    serviceType: "Window Cleaning",
    description: "Need all windows cleaned in a two-story house.",
    location: "101 Elm St, Anytown",
    paymentMethod: "airtel",
    status: "pending",
    date: "2023-05-12",
  },
  {
    id: 5,
    name: "David Wilson",
    phone: "+1 (555) 876-5432",
    serviceType: "Car Cleaning",
    description: "Interior cleaning for a sedan.",
    location: "202 Maple Dr, Somewhere",
    paymentMethod: "mtn",
    status: "handled",
    date: "2023-05-11",
  },
]

// Site content that can be edited in the admin panel
export const siteContent = {
  hero: {
    title: "Sparkle Starts Here",
    subtitle: "Book car, home & backyard cleaning services or buy trusted cleaning products.",
  },
  about: {
    title: "About FreshShine",
    content:
      "FreshShine Cleaning Services was founded with a simple mission: to provide exceptional cleaning services that make your spaces shine. We believe that a clean environment contributes to a healthier, happier life.\n\nOur team of dedicated professionals is committed to delivering top-quality cleaning services for cars, homes, and backyards. We use eco-friendly products and advanced techniques to ensure the best results.\n\nWhat sets us apart is our attention to detail and our commitment to customer satisfaction. We're not just cleaning; we're creating spaces that inspire and rejuvenate.",
  },
  howItWorks: {
    title: "How It Works",
    subtitle: "Our simple three-step process makes it easy to get your spaces sparkling clean.",
    steps: [
      {
        title: "Choose Service",
        description: "Select from our range of cleaning services for your car, home, or backyard.",
      },
      {
        title: "Negotiate",
        description: "Fill out our negotiation form to discuss your specific needs and pricing.",
      },
      {
        title: "Get Cleaned",
        description: "Our professional team will arrive at the scheduled time and deliver exceptional service.",
      },
    ],
  },
  footer: {
    businessHours: {
      weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 5:00 PM",
      sunday: "Sunday: Closed",
    },
    contact: {
      address: "123 Cleaning Street, Sparkle City",
      phone: "+1 (555) 123-4567",
      email: "info@freshshine.com",
    },
  },
}
