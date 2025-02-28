import api from "./api";

// Add Medicine to Cart
export const addToCart = async (customerId, medicineId, quantity) => {
  return api.post(`/cart-api/cart/add-medicine/${medicineId}/customer/${customerId}`, { quantity });
};

// Fetch Customer's Cart
export const fetchCart = async (customerId) => {
  return api.get(`/cart-api/cart/medicines/customer/${customerId}`);
};

// Update Medicine Quantity in Cart
export const updateCartQuantity = async (customerId, medicineId, quantity) => {
  return api.put(`/cart-api/cart/update-quantity/medicine/${medicineId}/customer/${customerId}`, { quantity });
};
