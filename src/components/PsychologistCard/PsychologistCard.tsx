import type { Psychologist } from "../../types/psychologist";
import styles from "./PsychologistCard.module.css";

interface Props {
  data: Psychologist;
}

export const PsychologistCard = ({ data }: Props) => {
  return (
    <div className={styles.card}>
      {/* 1. Аватарка (Зліва на робочому столі, зверху на мобілці) */}
      <div className={styles.avatarWrapper}>
        <img src={data.avatar_url} alt={data.name} className={styles.avatar} />
        <div className={styles.onlineIndicator}></div>
      </div>

      {/* 2. Права частина з контентом */}
      <div className={styles.content}>
        {/*Верхній рядок: "Psychologist" ----- Рейтинг | Ціна | Серце */}
        <div className={styles.headerRow}>
          <span className={styles.role}>Psychologist</span>

          <div className={styles.stats}>
            <span className={styles.rating}>⭐️ Rating: {data.rating}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.price}>
              Price / 1 hour:{" "}
              <span className={styles.priceValue}>{data.price_per_hour}$</span>
            </span>

            <button className={styles.favoriteBtn}>
              <svg className={styles.iconsHeard}>
                <use href="/image/icons.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <h2 className={styles.name}>{data.name}</h2>

        <div className={styles.detailsList}>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Experience: </span>
            <span className={styles.tagValue}>{data.experience}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>License: </span>
            <span className={styles.tagValue}>{data.license}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Specialization: </span>
            <span className={styles.tagValue}>{data.specialization}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Initial Consultation: </span>
            <span className={styles.tagValue}>{data.initial_consultation}</span>
          </div>
        </div>

        <div className={styles.about}>
          <p>{data.about}</p>
          <button className={styles.readMoreBtn}>Read more</button>
        </div>
      </div>
    </div>
  );
};
