import { useEffect, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // 1. Закриття по натисканню Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Блокуємо прокручування основної сторінки, доки відкрито вікно
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // 2. Закриття по кліку на темному тлі (Backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // 3.Використовуємо Portal

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Кнопка Крестик */}
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="30" height="30" className={styles.iconClose}>
            <use href="/image/icons.svg#icon-btn-close" />
          </svg>
        </button>

        {/*Контент (форми), який ми передамо всередину*/}
        {children}
      </div>
    </div>,
    document.body,
  );
}
