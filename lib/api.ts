import axios from 'axios';
import { Service, Product, Request, SiteContent } from './types';

const API_URL = 'http://localhost:5000/api';

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
export const getSiteContent = async (section: string): Promise<SiteContent> => {
  try {
    const response = await axios.get(`${API_URL}/site-content/${section}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching site content for ${section}:`, error);
    return { content: {} };
  }
};

export const getRequestsByStatus = async (status: 'pending' | 'handled'): Promise<Request[]> => {
  const response = await axios.get(`${API_URL}/requests/status/${status}`);
  return response.data;
};

// Site Content

