import axios from "axios";

// Base API URL
const API_BASE_URL = "https://your-api-url.com/api"; // Replace with your actual API URL

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

// Generic API Service
const apiService = {
  // 🏥 Get All Medicines
  getMedicines: () => api.get("/medicines"),

  // 🏥 Get Single Medicine by ID
  getMedicineById: (id) => api.get(`/medicines/${id}`),

  // 🛒 Add to Cart
  addToCart: (medicine) => api.post("/cart", medicine),

  // 🛒 Get Cart Items
  getCartItems: () => api.get("/cart"),

  // 🛒 Remove from Cart
  removeFromCart: (id) => api.delete(`/cart/${id}`),

  // 🛍️ Place Order
  placeOrder: (orderData) => api.post("/orders", orderData),

  // 📦 Get Orders
  getOrders: () => api.get("/orders"),

  // 🔑 User Signup
  signUpUser: (userData) => api.post("/auth/signup", userData),

  // 🔑 User Login
  loginUser: (credentials) => api.post("/auth/login", credentials),

  // 🔐 Get User Profile
  getUserProfile: () => api.get("/user/profile"),
};

export default apiService;
