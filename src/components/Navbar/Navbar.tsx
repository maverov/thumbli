"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.navbarContent}>
        <Link 
          href="/" 
          className={styles.logo} 
          aria-label="Thumbli Thumbnail Getter Home Page"
        >
          Thumbli
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>

        <ul className={`${styles.actions} ${isMenuOpen ? styles.open : ''}`}>
          <li>
            <Link href="/about" className={styles.actionLink} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className={styles.actionLink} onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/tools" className={styles.actionLink} onClick={closeMenu}>
              Other Tools
            </Link>
          </li>
          <li>
            <Link
              href="https://buymeacoffee.com/hrisko"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
              onClick={closeMenu}
            >
              <Image
                src="/bmac.svg"
                alt="Buy Me a Coffee"
                width={18}
                height={18}
                priority
              />
              &nbsp;Support
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};