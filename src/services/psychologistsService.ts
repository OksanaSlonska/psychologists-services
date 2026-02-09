import { ref, get } from "firebase/database";
import { db } from "../firebase";
import type { Psychologist } from "../types/psychologist";

export const getAllPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as Psychologist[];
    }
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
