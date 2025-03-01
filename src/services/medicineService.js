import api from "./apiService";

// Fetch All Medicines (With Pagination & Sorting)
export const fetchMedicines = async (page, size, sortBy, order) => {
  return api.get(`/medicine-api/medicines/pageNumber/${page}/pageSize/${size}?sortBy=${sortBy}&order=${order}`);
};

// Fetch Medicine By ID
export const fetchMedicineById = async (medicineId) => {
  return api.get(`/medicine-api/medicines/${medicineId}`);
};

// Fetch Medicines By Category
export const fetchMedicinesByCategory = async (category) => {
  return api.get(`/medicine-api/medicines/category/${category}`);
};

// Update Medicine Stock
export const updateMedicineStock = async (medicineId, quantity) => {
  return api.put(`/medicine-api/medicines/update-stock/medicine/${medicineId}`, { orderedQuantity: quantity });
};
