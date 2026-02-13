import type { RootState } from "../store";

export const selectPsychologists = (state: RootState) =>
  state.psychologists.items;
export const selectIsLoading = (state: RootState) =>
  state.psychologists.isLoading;
export const selectHasMore = (state: RootState) => state.psychologists.hasMore;
