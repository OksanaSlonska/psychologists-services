import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAt,
} from "firebase/database";
import { db } from "../firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchMore",
  async (lastId: string | null, thunkAPI) => {
    try {
      const dbRef = ref(db);

      let psychologistsQuery;

      if (!lastId) {
        psychologistsQuery = query(dbRef, orderByKey(), limitToFirst(3));
      } else {
        psychologistsQuery = query(
          dbRef,
          orderByKey(),
          startAt(lastId),
          limitToFirst(4),
        );
      }

      const snapshot = await get(psychologistsQuery);

      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const items = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));

        const finalItems = lastId ? items.slice(1) : items;

        const hasMore = items.length === (lastId ? 4 : 3);

        return { items: finalItems, hasMore };
      }

      return { items: [], hasMore: false };
    } catch {
      return thunkAPI.rejectWithValue("Error fetching psychologists");
    }
  },
);
