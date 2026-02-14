import type { RootState } from "../store";
import type { Psychologist } from "../../types/psychologist";

export const selectPsychologists = (state: RootState) =>
  state.psychologists.items;
export const selectIsLoading = (state: RootState) =>
  state.psychologists.isLoading;
export const selectHasMore = (state: RootState) => state.psychologists.hasMore;
export const selectFavorites = (state: RootState): Psychologist[] =>
  state.psychologists.favorites;
