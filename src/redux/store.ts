import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { psychologistsReducer } from "./psychologists/psychologistsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologists: psychologistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
