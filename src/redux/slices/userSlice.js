import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('userData')) ? true : false,
  userData: JSON.parse(localStorage.getItem('userData')) || null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData=null;
      localStorage.removeItem('userData')
      localStorage.removeItem("authToken")
      localStorage.removeItem("customerId")
    },
  },
});

export const { setLogin, logout, setUserData } = userSlice.actions;
export default userSlice.reducer;
