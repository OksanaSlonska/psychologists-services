import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Modal from "../Modal/Modal";
import RegisterForm from "../AuthForms/RegisterForm";
import LoginForm from "../AuthForms/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const closePopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

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

  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* 1. Логотип (Завжди видно) */}
        <NavLink className={styles.headerlogo} to="/" onClick={closeMenu}>
          <span className="accent">psychologists.</span>services
        </NavLink>

        {/*Меню (Навігація + Кнопки) */}

        <div
          className={`${styles.menuCollapsible} ${isOpen ? styles.open : ""}`}
        >
          <nav className={styles.nav}>
            <NavLink className={styles.headerlink} to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              className={styles.headerlink}
              to="/psychologists"
              onClick={closeMenu}
            >
              Psychologists
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={styles.headerlink}>
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.authWrapper}>
            {isLoggedIn ? (
              /* ЯКЩО ЗАЛОГІНЕН: Показуємо ім'я, аватарку та кнопку "Log out"*/
              <div className={styles.userMenu}>
                <div className={styles.userInfo}>
                  <span className={styles.avatar}>
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </span>
                  <span className={styles.userName}>{user.name}</span>
                </div>

                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              /* ЯКЩО НЕ ЗАЛОЖЕНИЙ: Показуємо кнопки "Log In" та "Registration"*/
              <div className={styles.authButtons}>
                <button className={styles.loginBtn} onClick={openLogin}>
                  Log In
                </button>
                <button className={styles.registerBtn} onClick={openRegister}>
                  Registration
                </button>
              </div>
            )}
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

          <RegisterForm onClose={closePopups} />
        </div>
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Log In</h2>
          <p className={styles.modalText}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>

          <LoginForm onClose={closePopups} />
        </div>
      </Modal>
    </header>
  );
}
