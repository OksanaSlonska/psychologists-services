import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";
import type { Psychologist } from "../../types/psychologist";

interface PsychologistsState {
  items: Psychologist[];
  favorites: Psychologist[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: PsychologistsState = {
  items: [],
  favorites: (() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
  isLoading: false,
  error: null,
  hasMore: true,
};

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.hasMore = true;
    },
    toggleFavorite: (state, action: PayloadAction<Psychologist>) => {
      const index = state.favorites.findIndex(
        (fav) => fav.id === action.payload.id,
      );
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;

        // Логіка фільтрації дублів
        const existingIds = state.items.map((item) => item.id);
        const uniqueNewItems = action.payload.items.filter(
          (newItem) => !existingIds.includes(newItem.id),
        );

        state.items = [...state.items, ...uniqueNewItems];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Объединяем экспорт
export const { toggleFavorite, clearItems } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
