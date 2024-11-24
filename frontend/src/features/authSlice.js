import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "@services/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("access_token") || null,
};

export const loginThunk = createAsyncThunk("auth/login", async (payload) => {
  const response = await loginUser(payload);
  if (response.isError) throw new Error(response.message);
  return response.data;
});

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ payload, token, navigate }) => {
    const response = await registerUser(payload, token);
    if (response.isError) throw new Error(response.message);

    alert(response.data.message);
    navigate("/users");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.user = null;
      state.token = null;
      state.role = null;
    },
    register: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { role, access_token } = action.payload;
        state.loading = false;
        state.user = action.payload;
        state.role = role;
        state.token = access_token;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("role", role);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        localStorage.setItem("access_token", null);
        localStorage.setItem("role", null);
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
