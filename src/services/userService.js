import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5001"; // Replace with your actual API URL

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

// Register User
export const registerUser = async (userData) => {
  return api.post("/customer-api/customer/register", userData);
};

// Login User
export const loginUser = async (credentials) => {
  return api.post("/customer-api/customer/login", credentials);
};

// Fetch User Profile
export const fetchUserProfile = async () => {
  return api.get("/user-api/profile");
};

// Update User Profile
export const updateUserProfile = async (updatedData, customerId) => {
  return api.put(`/customer-api/customer/${customerId}`, updatedData);
};

export const updatePassword = async (updatedData, customerId) => {
  return api.put(`/customer-api/customer/updatePassword`, updatedData);
};
