import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

//   Создаем интерфейс для данных Входа
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
}

/*
 * register — это имя нашего "курьера".
 * Первый аргумент: 'auth/register' — имя действия для Redux DevTools.
 * Второй аргумент: async функция, которая летит в Firebase.
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      // 1. Стучимся в Firebase для создания юзера
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );

      // 2. Если нужно, сразу обновляем имя пользователя (Firebase хранит его отдельно)
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: credentials.name,
        });
      }

      // 3. Возвращаем только нужные данные (не весь гигантский объект Firebase)
      return {
        uid: res.user.uid,
        email: res.user.email,
        name: credentials.name, // Берем из формы
      };
    } catch (error) {
      // Если ошибка (например, такой email занят) — возвращаем текст ошибки
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

/* * login — курьер для входа (сделаем сразу, чтобы было)
 */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      return {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const refreshUser = createAsyncThunk<AuthUser, void>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
            });
          } else {
            reject("No user found");
          }
        });
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
