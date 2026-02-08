import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Контентна частина*/}
          <div className={styles.content}>
            <h1 className={styles.title}>
              The road to the <span className={styles.accent}>depths</span> of
              the human soul
            </h1>
            <p className={styles.description}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <Link to="/psychologists" className={styles.ctaButton}>
              Get started <span className={styles.arrow}>↗</span>
            </Link>
          </div>

          {/* Зображення та декоративні елементи*/}
          <div className={styles.imageContainer}>
            <img
              src="/image/hero.jpg"
              alt="Psychologist"
              className={styles.mainImg}
            />
            {/* Помаранчевий  блок */}

            <div className={styles.statsBadge}>
              {/* Белий квадрат */}
              <div className={styles.iconWrapper}>
                <svg width="30" height="30" className={styles.iconsCheck}>
                  <use href="/image/icons.svg#icon-check" />
                </svg>
              </div>

              {/* Текстова інформація */}
              <div className={styles.statsInfo}>
                <p className={styles.statsLabel}>Experienced psychologists</p>
                <p className={styles.statsValue}>15,000</p>
              </div>
            </div>

            {/* Зелений блок*/}
            <div className={`${styles.decorBlock} ${styles.questionBlock}`}>
              <svg width="15" height="23" className={styles.decorIconSvg}>
                <use href="/image/icons.svg#icon-question" />
              </svg>
            </div>

            {/* Жовтий блок */}
            <div className={`${styles.decorBlock} ${styles.usersBlock}`}>
              <svg width="25" height="25" className={styles.decorIconSvg}>
                <use href="/image/icons.svg#icon-users" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
