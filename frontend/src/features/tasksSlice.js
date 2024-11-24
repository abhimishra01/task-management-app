import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createATask,
  deleteATask,
  fetchAllTasks,
  updateATask,
} from "@services/api";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (token) => {
    const response = await fetchAllTasks(token);
    return response;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ payload, token }) => {
    const response = await createATask(payload, token);
    alert(response.data.message);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ payload, id, token }) => {
    const response = await updateATask({ payload, id, token });
    alert(response.data.message);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ id, token }) => {
    const response = await deleteATask(id, token);
    alert(response.data.message);
    return response;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = Object.values(state.tasks).findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
