import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavorites } from "../redux/psychologists/selectors";
import { PsychologistCard } from "../components/PsychologistCard/PsychologistCard";
import styles from "./PsychologistsPage.module.css";

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <section className={`container ${styles.listContainer}`}>
      <div className={styles.listWrapper}>
        {favorites.length > 0 ? (
          <ul className={styles.list}>
            {favorites.map((psychologist) => (
              <PsychologistCard
                key={psychologist.id}
                psychologist={psychologist}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.emptyWrapper}>
            <h2 className={styles.emptyTitle}>Your favorites list is empty</h2>
            <p className={styles.emptyText}>
              It seems you haven't added any psychologists to your favorites
              yet. Explore our specialists to find the perfect match for you.
            </p>
            <Link to="/psychologists" className={styles.backBtn}>
              Go to Specialists
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
