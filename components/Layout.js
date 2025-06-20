import React, { useState } from 'react';
import Link from 'next/link';
import CookieBanner from './CookieBanner'; // 1. Import the CookieBanner

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header>
        <div><strong>$ Work Experience</strong></div>
                
        {/* Hamburger Icon */}
        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={menuOpen ? 'nav active' : 'nav'}> {/* Changed 'open' to 'active' to match CSS */}
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main>{children}</main>

      {/* Floating Contact Button */}
      <Link href="/contact#name" className="floating-cta">
        Contact Us
      </Link>
     
      <CookieBanner /> {/* 2. Add the CookieBanner component here */}

      <footer>
        <div>© {new Date().getFullYear()} $ Work Experience. All rights reserved.</div>
        <div>Developed by Ian Townrow</div>
      </footer>
    </>
  );
}