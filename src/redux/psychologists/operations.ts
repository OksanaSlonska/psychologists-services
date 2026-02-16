import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, query, ref, orderByKey } from "firebase/database";
import { db } from "../../firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(db);

      const q = query(dbRef, orderByKey());

      const snapshot = await get(q);

      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const items = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));

        return { items, hasMore: false };
      }

      return { items: [], hasMore: false };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Error fetching psychologists");
    }
  },
);
