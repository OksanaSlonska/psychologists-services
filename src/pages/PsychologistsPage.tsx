import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { fetchPsychologists } from "../redux/psychologists/operations";
import {
  selectPsychologists,
  selectHasMore,
  selectIsLoading,
} from "../redux/psychologists/selectors";
import styles from "./PsychologistsPage.module.css";

import { PsychologistCard } from "../components/PsychologistCard/PsychologistCard";

export default function PsychologistsPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Беремо дані із "сховища" (Redux)
  const psychologists = useSelector(selectPsychologists);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);

  // 1. Завантажуємо першу порцію під час відкриття сторінки
  useEffect(() => {
    // Завантажуємо тільки якщо у сторі ще немає психологів
    if (psychologists.length === 0) {
      dispatch(fetchPsychologists(null));
    }
  }, [dispatch, psychologists.length]);

  // 2. Функція для кнопки Load More
  const handleLoadMore = () => {
    const lastId = psychologists[psychologists.length - 1]?.id;
    if (lastId) {
      dispatch(fetchPsychologists(lastId));
    }
  };

  return (
    <div className={`container ${styles.listContainer}`}>
      <ul className={styles.list}>
        {psychologists.map((item) => (
          <PsychologistCard key={item.id} psychologist={item} />
        ))}
      </ul>

      {/* Кнопка Load More */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className={styles.loadMoreBtn}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
