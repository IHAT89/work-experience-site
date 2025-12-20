// /components/header.js

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.logo}>
        <Link href="/">Work Experience</Link>
      </div>
      <nav
        id="main-nav"
        className={`${styles.nav} ${menuOpen ? styles.open : ''}`}
        aria-label="Main navigation"
      >
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <button
        className={styles.hamburger}
        aria-label="Toggle navigation"
        aria-controls="main-nav"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}