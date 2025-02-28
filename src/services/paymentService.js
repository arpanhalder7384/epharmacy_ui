import api from "./api";

// Make Payment
export const makePayment = async (amount, paymentData) => {
  return api.post(`/payment-api/payment/amount/${amount}`, paymentData);
};

// Add New Card
export const addCard = async (customerId, cardData) => {
  return api.post(`/payment-api/payment/add-card/${customerId}`, cardData);
};

// Fetch All Cards
export const fetchCards = async (customerId) => {
  return api.get(`/payment-api/payment/view-cards/${customerId}`);
};
