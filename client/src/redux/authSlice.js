import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    isAuth: false,
    loading: false,
    username: null,
    token: null,
    error: null,
  },
  reducers: {
    signupSuccess: (state) => {
      state.loading = false;
    },
    signupPending: (state) => {
      state.error = null;
      state.loading = true;
    },
    signupFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    loginPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
    signOut: (state) => {
      state.id = null;
      state.isAuth = false;
      state.username = null;
      state.token = null;
    },
  },
});

export const {
  signupSuccess,
  signupPending,
  signupFailed,
  loginSuccess,
  loginPending, 
  loginFailed,
  signOut,
} = authSlice.actions;
export default authSlice.reducer;
