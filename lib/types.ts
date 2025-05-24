export interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Request {
  id?: number;
  name: string;
  phone: string;
  serviceType: string;
  description: string;
  location: string;
  paymentMethod: string;
  status?: 'pending' | 'handled';
  date?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    content: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  footer: {
    businessHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    contact: {
      address: string;
      phone: string;
      email: string;
    };
  };
}
