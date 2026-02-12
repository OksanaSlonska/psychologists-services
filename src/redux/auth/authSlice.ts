import { createSlice } from "@reduxjs/toolkit";
import { register, login, refreshUser } from "./operations";

// 1. Описываем, как выглядит наше состояние
interface AuthState {
  user: {
    name: string | null;
    email: string | null;
    uid: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// 2. Начальное состояние (когда мы только зашли на сайт)
const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    uid: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

// 3. Создаем "слайс" (кусочек логики)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = { name: null, email: null, uid: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- REGISTRATION ---
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload; // Записываем данные юзера
        state.token = action.payload.uid; // Используем UID как токен
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // --- LOGIN ---
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.token = action.payload.uid;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true; // Мы в процессе проверки
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload; // Записываем юзера, если нашли сессию
        state.isLoggedIn = true; // Теперь мы залогинены!
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoading = false; // Сессии нет, пользователь - гость
      });
  },
});

// 4. Экспортируем редьюсер, чтобы подключить его к стору
export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
