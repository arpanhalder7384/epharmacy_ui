import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    loader: loaderReducer,
    auth: authReducer,
  },
});

export default store;

