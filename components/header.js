// /components/header.js

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="logo">
        <Link href="/">$ Work Experience</Link>
      </div>
      <nav
        id="main-nav"
        className={`nav ${menuOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <button
        className="hamburger"
        aria-label="Toggle navigation"
        aria-controls="main-nav"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <style jsx>{`
        .site-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: #fff;
          border-bottom: 1px solid #eee;
          position: relative;
        }
        .logo {
          font-weight: bold;
          font-size: 1.2rem;
        }
        .nav {
          display: flex;
          gap: 2rem;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          width: 25px;
          height: 3px;
          background: #222;
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .nav {
            position: absolute;
            top: 60px;
            right: 0;
            background: #fff;
            flex-direction: column;
            gap: 1.5rem;
            width: 200px;
            padding: 1.5rem;
            border: 1px solid #eee;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            display: none;
          }
          .nav.open {
            display: flex;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}