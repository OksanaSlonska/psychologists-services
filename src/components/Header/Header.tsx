import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Modal from "../Modal/Modal";
import RegisterForm from "../AuthForms/RegisterForm";
import LoginForm from "../AuthForms/LoginForm";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsOpen(false);
  };

  const closeRegister = () => setIsRegisterOpen(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* 1. Логотип (Завжди видно) */}
        <Link className={styles.headerlogo} to="/" onClick={closeMenu}>
          <span className="accent">psychologists.</span>services
        </Link>

        {/*Меню (Навігація + Кнопки) */}

        <div
          className={`${styles.menuCollapsible} ${isOpen ? styles.open : ""}`}
        >
          <nav className={styles.nav}>
            <Link className={styles.headerlink} to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link
              className={styles.headerlink}
              to="/psychologists"
              onClick={closeMenu}
            >
              Psychologists
            </Link>
            <Link
              className={styles.headerlink}
              to="/favorites"
              onClick={closeMenu}
            >
              Favorites
            </Link>
          </nav>

          <div className={styles.authWrapper}>
            <button onClick={openLogin} className={styles.loginBtn}>
              Log In
            </button>
            <button onClick={openRegister} className={styles.registerBtn}>
              Registration
            </button>
          </div>
        </div>

        {/* Бургер кнопка (Тільки мобілка) */}
        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="24" height="24">
              <use href="/image/icons.svg#icon-btn-close" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>

        {/* Overlay */}
        <div
          className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
          onClick={closeMenu}
        ></div>
      </div>

      <Modal isOpen={isRegisterOpen} onClose={closeRegister}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Registration</h2>
          <p className={styles.modalText}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>

          <RegisterForm />
        </div>
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Log In</h2>
          <p className={styles.modalText}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>

          <LoginForm />
        </div>
      </Modal>
    </header>
  );
}
