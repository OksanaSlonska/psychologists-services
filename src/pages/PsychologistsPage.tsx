import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import {
  selectPsychologists,
  selectIsLoading,
} from "../redux/psychologists/selectors";
import { fetchPsychologists } from "../redux/psychologists/operations";
import { PsychologistsFilter } from "../components/PsychologistsFilter/PsychologistsFilter";
import { PsychologistCard } from "../components/PsychologistCard/PsychologistCard";
import styles from "./PsychologistsPage.module.css";

const ITEMS_PER_PAGE = 3;

export default function PsychologistsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const psychologists = useSelector(selectPsychologists);
  const isLoading = useSelector(selectIsLoading);

  const [filter, setFilter] = useState("show_all");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const getFilteredPsychologists = () => {
    const filtered = [...psychologists];

    switch (filter) {
      case "az":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "less_10":
        return filtered.filter((p) => p.price_per_hour < 10);
      case "greater_10":
        return filtered.filter((p) => p.price_per_hour > 10);
      case "popular":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "not_popular":
        return filtered.sort((a, b) => a.rating - b.rating);
      case "show_all":
      default:
        return filtered;
    }
  };

  const allFilteredItems = getFilteredPsychologists();

  const visibleItems = allFilteredItems.slice(0, visibleCount);

  const hasMoreToLoad = visibleCount < allFilteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className={`container ${styles.listContainer}`}>
      <PsychologistsFilter onFilterChange={handleFilterChange} />

      <ul className={styles.list}>
        {visibleItems.map((item) => (
          <PsychologistCard key={item.id} psychologist={item} />
        ))}
      </ul>

      {visibleItems.length === 0 && !isLoading && (
        <p className={styles.noDataText}>No psychologists found.</p>
      )}

      {hasMoreToLoad && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}
    </div>
  );
}
