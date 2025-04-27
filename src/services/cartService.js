// import api from "./api";
import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5003"; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Fetch token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add Medicine to Cart
export const addToCart = async (customerId, medicineId, quantity) => {
  return api.post(`/cart-api/add-medicine/${medicineId}/customer/${customerId}`, { quantity });
};

// Fetch Customer's Cart
export const fetchCart = async (customerId) => {
  return api.get(`/cart-api/customer/${customerId}`);
};

// Update Medicine Quantity in Cart
export const updateCartQuantity = async (customerId, medicineId, quantity) => {
  return api.put(`/cart-api/update-quantity/medicine/${medicineId}/customer/${customerId}`, { quantity });
};