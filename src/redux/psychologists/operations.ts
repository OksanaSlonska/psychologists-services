import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAt,
} from "firebase/database";
import { db } from "../../firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchMore",
  async (lastId: string | null, thunkAPI) => {
    try {
      const dbRef = ref(db);

      const limitCount = lastId ? 5 : 3;

      let q = query(dbRef, orderByKey(), limitToFirst(limitCount));

      if (lastId) {
        q = query(
          dbRef,
          orderByKey(),
          startAt(lastId),
          limitToFirst(limitCount),
        );
      }

      const snapshot = await get(q);

      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const items = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));

        const finalItems = lastId
          ? items.filter((item) => item.id !== lastId)
          : items;

        const hasMore = items.length === limitCount;

        return { items: finalItems, hasMore };
      }

      return { items: [], hasMore: false };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching psychologists");
    }
  },
);
