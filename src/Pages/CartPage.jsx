import React, { useState } from "react";
import Cart from "../Components/Cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Paracetamol", price: 50, quantity: 1 },
    { id: 2, name: "Cough Syrup", price: 120, quantity: 1 },
  ]);

  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />;
};

export default CartPage;
