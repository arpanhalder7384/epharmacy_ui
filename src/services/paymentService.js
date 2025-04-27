import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5005"; // Replace with your actual API URL

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

// Make Payment
export const makePayment = async (amount, paymentData) => {
  return api.post(`/payment-api/amount/${amount}`, paymentData);
};

// Add New Card
export const addCard = async (customerId, cardData) => {
  return api.post(`/payment-api/add-card/${customerId}`, cardData);
};

// Fetch All Cards
export const fetchCards = async (customerId) => {
  return api.get(`/payment-api/view-cards/${customerId}`);
};