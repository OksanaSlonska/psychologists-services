import { useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/psychologists/psychologistsSlice";
import { selectFavorites } from "../../redux/psychologists/selectors";
import styles from "./PsychologistCard.module.css";
import Modal from "../Modal/Modal";
import { AppointmentForm } from "../AppointmentForm/AppointmentForm";

interface Props {
  psychologist: Psychologist;
}

export const PsychologistCard = ({ psychologist }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const data = psychologist;

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav: any) => fav.id === psychologist.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(psychologist));
  };

  return (
    <div className={styles.card}>
      {/* 1. Аватарка (Зліва на робочому столі, зверху на мобілці) */}
      <div className={styles.avatarWrapper}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <div className={styles.onlineIndicator}></div>
      </div>

      {/* 2. Права частина з контентом */}
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.role}>Psychologist</span>

          <div className={styles.stats}>
            <span className={styles.rating}>
              <svg width="15" height="14" className={styles.iconsRating}>
                <use href="/image/icons.svg#icon-rating" />
              </svg>
              Rating: {psychologist.rating}
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.price}>
              Price / 1 hour:{" "}
              <span className={styles.priceValue}>
                {psychologist.price_per_hour}$
              </span>
            </span>

            <button
              className={styles.favoriteBtn}
              onClick={handleFavoriteClick}
            >
              <svg
                className={`${styles.iconsHeard} ${isFavorite ? styles.isFavorite : ""}`}
              >
                <use href="/image/icons.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <h2 className={styles.name}>{psychologist.name}</h2>

        <div className={styles.detailsList}>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Experience: </span>
            <span className={styles.tagValue}>{psychologist.experience}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>License: </span>
            <span className={styles.tagValue}>{psychologist.license}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Specialization: </span>
            <span className={styles.tagValue}>
              {psychologist.specialization}
            </span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagLabel}>Initial Consultation: </span>
            <span className={styles.tagValue}>
              {psychologist.initial_consultation}
            </span>
          </div>
        </div>

        <div className={styles.about}>
          <p>{psychologist.about}</p>
          {!isExpanded && (
            <button
              className={styles.readMoreBtn}
              onClick={() => {
                setIsExpanded(true);
              }}
            >
              Read more
            </button>
          )}
        </div>

        {isExpanded && (
          <div className={styles.expandedContent}>
            <ul className={styles.reviewsList}>
              {data.reviews.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>
                      {review.reviewer ? review.reviewer[0] : "?"}
                    </div>
                    <div>
                      <h4 className={styles.reviewerName}>{review.reviewer}</h4>
                      <span className={styles.reviewRating}>
                        <svg
                          width="15"
                          height="14"
                          className={styles.iconsRating}
                        >
                          <use href="/image/icons.svg#icon-rating" />
                        </svg>
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button
              className={styles.appointmentBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Make an appointment
            </button>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AppointmentForm
            psychologist={psychologist}
            onSubmitSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};
