import React, { useState, useEffect, useRef } from "react";
import Cart from "../Components/Cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { fetchCart, updateCartQuantity } from "../services/cartService";
import { logout } from "../redux/slices/userSlice";
import { useToast } from "../utils/ToastProvider";
import { updateItemCount } from "../redux/slices/cartSlice";

const CartPage = () => {
  const customerId = localStorage.getItem("customerId")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [cartItems, setCartItems] = useState([]);
  const showToast = useToast();

  useEffect(()=>{
    dispatch(updateItemCount(cartItems.length))
  },[cartItems])

  const updateQuantity = (medicineId, quantity) => {
    handleCartUpdate(medicineId, quantity)
    setCartItems(cartItems.map(item => item.medicineId === medicineId ? { ...item, quantity } : item));
  };

  const removeItem = (medicineId) => {
    handleCartUpdate(medicineId, 0)
    setCartItems(cartItems.filter(item => item.medicineId !== medicineId));
  };

  const handleCartUpdate = (medicineId, quantity) => {
    dispatch(showLoader());
    updateCartQuantity(customerId, medicineId, quantity).then(() => {
      if (quantity == 0) {
        showToast("Item removed from cart.", "success")
      } else {
        showToast("Item updated successfully.", "success")
      }
    }).catch((e) => {
      showToast("Please retry after some time.", "error")
    }).finally(() => {
      dispatch(hideLoader())
    })
  }

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    navigate("/checkout")
  }

  useEffect(() => {
    if (cartItems.length == 0) {
      localStorage.removeItem("cartItems")
    }
  }, [cartItems])

  useEffect(() => {
    dispatch(showLoader());
    fetchCart(customerId).then((res) => {
      if (res.data?.items) {
        setCartItems(res.data.items)
      }
    }).catch((e) => {
      if (e.status && (e.status == 401 || e.status == 403)) {
        dispatch(logout())
        return;
      }
      showToast("Unable to fetch cart details. Please Retry.", "error")
    }).finally(() => {
      dispatch(hideLoader())
    })
  }, [])

  useEffect(() => {
    if (!userData) { // if user not logged in
      navigate("/")
    }
  }, [userData])

  return <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} handleCheckout={handleCheckout} />;
};

export default CartPage;
