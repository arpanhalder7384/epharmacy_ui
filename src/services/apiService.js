import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5002"; // Replace with your actual API URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding authentication token (if needed)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Fetch token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
