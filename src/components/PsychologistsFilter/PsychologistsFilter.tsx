import { useState, useRef, useEffect } from "react";
import styles from "./PsychologistsFilter.module.css";

interface Props {
  onFilterChange: (value: string) => void;
}

const options = [
  { value: "show_all", label: "Show all" },
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
  { value: "less_10", label: "Less than 10$" },
  { value: "greater_10", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not_popular", label: "Not popular" },
];

export const PsychologistsFilter = ({ onFilterChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Show all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string, label: string) => {
    setSelectedLabel(label);
    onFilterChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <label className={styles.label}>Filters</label>

      <div className={styles.selectField} onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}

        <svg className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>
          <use href="/image/icons.svg#icon-chevron-down" />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={styles.option}
              onClick={() => handleSelect(opt.value, opt.label)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
