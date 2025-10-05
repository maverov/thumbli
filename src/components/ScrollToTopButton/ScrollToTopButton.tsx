"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.scss";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`${styles.scrollButton} ${isVisible ? styles.visible : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
