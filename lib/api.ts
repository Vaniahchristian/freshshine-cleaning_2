import axios from 'axios';
import { Service, Product, Request, SiteContent } from './types';

const API_URL = 'https://websitebackend-z9go.onrender.com/api';

// Services
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const createService = async (service: Omit<Service, 'id'>): Promise<Service> => {
  try {
    const response = await axios.post(`${API_URL}/services`, service);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (id: number, service: Partial<Service>): Promise<Service> => {
  try {
    const response = await axios.put(`${API_URL}/services/${id}`, service);
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/services/${id}`);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    if (category.toLowerCase() === 'all') {
      return getProducts();
    }
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};

// Requests
export const createRequest = async (request: Omit<Request, 'id' | 'status' | 'date'>): Promise<Request> => {
  const response = await axios.post(`${API_URL}/requests`, request);
  return response.data;
};

export const getRequests = async (): Promise<Request[]> => {
  try {
    const response = await axios.get(`${API_URL}/requests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

// Site Content
const defaultSiteContent: SiteContent = {
  hero: { title: '', subtitle: '' },
  about: { title: '', content: '' },
  howItWorks: { 
    title: '', 
    subtitle: '', 
    steps: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] 
  },
  footer: {
    businessHours: { weekdays: '', saturday: '', sunday: '' },
    contact: { address: '', phone: '', email: '' }
  }
};

export const getSiteContent = async (section: string): Promise<SiteContent> => {
  try {
    const response = await axios.get(`${API_URL}/site-content`);
    // Ensure all required sections exist with proper structure
    return {
      ...defaultSiteContent,
      ...response.data
    };
  } catch (error) {
    console.error(`Error fetching site content:`, error);
    return defaultSiteContent;
  }
};

export const updateSiteContent = async (section: keyof SiteContent, content: Partial<SiteContent[keyof SiteContent]>): Promise<SiteContent> => {
  try {
    const response = await axios.patch(`${API_URL}/site-content/${section}`, content);
    // Ensure all required sections exist with proper structure
    return {
      ...defaultSiteContent,
      ...response.data
    };
  } catch (error) {
    console.error(`Error updating site content for ${section}:`, error);
    throw error;
  }
};

export const getRequestsByStatus = async (status: 'pending' | 'handled'): Promise<Request[]> => {
  try {
    const response = await axios.get(`${API_URL}/requests/status/${status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching requests by status:', error);
    return [];
  }
};

export const updateRequestStatus = async (id: number, status: 'pending' | 'handled'): Promise<Request> => {
  try {
    const response = await axios.patch(`${API_URL}/requests/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};

// User Settings
import { useAuth } from "./auth"

export const updateProfile = async (data: { email: string }): Promise<any> => {
  // Get token from auth store
  const { accessToken } = useAuth.getState()
  try {
    const response = await axios.patch(
      `${API_URL}/settings/profile`,
      { email: data.email },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    return response.data
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

export const changePassword = async (data: { newPassword: string }): Promise<any> => {
  // Get token from auth store
  const { accessToken } = useAuth.getState()
  try {
    const response = await axios.patch(
      `${API_URL}/settings/password`,
      { newPassword: data.newPassword },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    return response.data
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
}
