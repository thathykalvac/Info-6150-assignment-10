import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user data from localStorage
  isAuthenticated: !!localStorage.getItem('token'), // Check if the token exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // Set user data
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
    },
    logout(state) {
      state.user = null; // Clear user data
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // Clear user data from localStorage
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
