"use client";

import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode; // button text/icon
  fallbackHref?: string;      // where to go if there's no history
};

export default function BackButton({ children = "Back", fallbackHref = "/" }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1 || (document.referrer && new URL(document.referrer).origin === window.location.origin)) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.backButton} aria-label="Go back">
      {children}
    </button>
  );
}
