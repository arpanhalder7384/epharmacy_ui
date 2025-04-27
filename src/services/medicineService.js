import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5002"; // Replace with your actual API URL

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


// Fetch All Medicines (With Pagination & Sorting)
export const fetchMedicines = async (page, size,category, sortBy, order) => {
  // medicine-api/medicines/pageNumber/1/pageSize/5/category/all?
  return api.get(`/medicine-api/medicines/pageNumber/${page}/pageSize/${size}/category/${category}?sortBy=${sortBy}&order=${order}`);
};

// Fetch Medicine By ID
export const fetchMedicineById = async (medicineId) => {
  return api.get(`/medicine-api/medicines/${medicineId}`);
};

// Fetch Medicine By Name
export const fetchMedicinesByName = async (medicineName) => {
  return api.get(`/medicine-api/medicines/search?name=${medicineName}`);
};

// Fetch Medicines By Category
export const fetchMedicinesByCategory = async (category) => {
  return api.get(`/medicine-api/medicines/category/${category}`);
};

// Update Medicine Stock
export const updateMedicineStock = async (medicineId, quantity) => {
  return api.put(`/medicine-api/medicines/update-stock/medicine/${medicineId}`, { orderedQuantity: quantity });
};