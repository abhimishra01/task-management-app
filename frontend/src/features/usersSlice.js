import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteAUser, fetchAllUsers, updateAUser } from "@services/api";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token) => {
    const response = await fetchAllUsers(token);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ payload, token }) => {
    const response = await updateAUser(payload, token);
    alert(response.data.message);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, token }) => {
    console.log({ token });
    const response = await deleteAUser(id, token);
    alert(response.data.message);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = Object.keys(action.payload).map((key) => ({
          id: key,
          ...action.payload[key],
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
