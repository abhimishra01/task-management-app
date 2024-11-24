import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/authSlice";
import tasksReducer from "@features/tasksSlice";
import usersReducer from "@features/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export default store;
