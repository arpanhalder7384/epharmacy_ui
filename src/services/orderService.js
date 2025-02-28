// import api from "./api";
import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5004"; // Replace with your actual API URL

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

// Place Order
export const placeOrder = async (orderData) => {
  return api.post("/order-api/place-order", orderData);
};

// Fetch Order History
export const fetchOrders = async (customerId) => {
  return api.get(`/order-api/get-order/${customerId}`);
};
