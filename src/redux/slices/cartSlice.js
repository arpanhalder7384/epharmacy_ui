import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemCount:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems=action.payload;
    },
    updateItemCount: (state, action)=>{
      state.itemCount=action.payload;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart,updateItemCount } = cartSlice.actions;
export default cartSlice.reducer;
