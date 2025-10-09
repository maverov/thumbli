"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";

export const Navbar = () => {
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

        <ul className={styles.actions}>
          <li>
            <Link href="/about" className={styles.actionLink}>About</Link>
          </li>
          <li>
            <Link href="/tools" className={styles.actionLink}>Other Tools</Link>
          </li>
          <li>
            <Link
              href="https://buymeacoffee.com/hrisko"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
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
