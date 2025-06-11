import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/globals.css';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header>
        <div><strong>$ Work Experience</strong></div>

        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu}>☰</button>

        {/* Navigation */}
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <Link href="/" legacyBehavior><a>Home</a></Link>
          <Link href="/services" legacyBehavior><a>Services</a></Link>
          <Link href="/about" legacyBehavior><a>About</a></Link>
          <Link href="/contact" legacyBehavior><a>Contact</a></Link>
        </nav>
      </header>

      <main>{children}</main>

      {/* Floating Contact Button */}
      <Link href="/contact#name" className="floating-cta">
        Contact Us
      </Link>
     
      <footer>
        <div>© {new Date().getFullYear()} $ Work Experience. All rights reserved.</div>
        <div>Developed by Ian Townrow</div>
      </footer>
    </>
  );
}
