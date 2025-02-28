import api from "./api";

// Register User
export const registerUser = async (userData) => {
  return api.post("/user-api/auth/register", userData);
};

// Login User
export const loginUser = async (credentials) => {
  return api.post("/user-api/auth/login", credentials);
};

// Fetch User Profile
export const fetchUserProfile = async () => {
  return api.get("/user-api/profile");
};

// Update User Profile
export const updateUserProfile = async (updatedData) => {
  return api.put("/user-api/profile/update", updatedData);
};
