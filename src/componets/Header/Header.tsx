import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.flexContainer}`}>
        <div className={styles.containerNav}>
          <Link className={styles.headerlogo} to="/">
            <span className="accent">psychologists.</span>services
          </Link>
          <nav className={styles.nav}>
            <Link className={styles.headerlink} to="/">
              Home
            </Link>
            <Link className={styles.headerlink} to="/psychologists">
              Psychologists
            </Link>
            <Link className={styles.headerlink} to="/favorites">
              Favorites
            </Link>
          </nav>
        </div>
        <div className={styles.authWrapper}>
          <button className={styles.loginBtn}>Log In</button>
          <button className={styles.registerBtn}>Registration</button>
        </div>
      </div>
    </header>
  );
}
