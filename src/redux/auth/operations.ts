import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
}

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: credentials.name,
        });
      }

      return {
        uid: res.user.uid,
        email: res.user.email,
        name: credentials.name, // Берем из формы
      };
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);
