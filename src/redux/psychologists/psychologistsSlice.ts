import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";
import type { Psychologist } from "../../types/psychologist";

interface PsychologistsState {
  items: Psychologist[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: PsychologistsState = {
  items: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;

        // Створюємо масив існуючих ID
        const existingIds = state.items.map((item) => item.id);

        // Фільтруємо елементи, що прийшли, залишаючи тільки нові
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

export const { clearItems } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
