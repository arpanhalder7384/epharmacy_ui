import api from "./api";

// Place Order
export const placeOrder = async (orderData) => {
  return api.post("/order-api/order/place-order", orderData);
};

// Fetch Order History
export const fetchOrders = async (customerId) => {
  return api.get(`/order-api/orders/customer/${customerId}`);
};
