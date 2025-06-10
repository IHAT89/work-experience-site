// components/Layout.js
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <div><strong>$ Work Experience</strong></div>
        <nav>
          <Link href="/" legacyBehavior><a>Home</a></Link>
          <Link href="/services" legacyBehavior><a>Services</a></Link>
          <Link href="/about" legacyBehavior><a>About</a></Link>
          <Link href="/contact" legacyBehavior><a>Contact</a></Link>
        </nav>
      </header>

      <main>{children}</main>

      {/* Floating Contact Button */}
      <Link href="/contact" legacyBehavior>
        <a className="floating-cta">Contact Us</a>
      </Link>

      <footer>
        <div>© {new Date().getFullYear()} $ Work Experience. All rights reserved.</div>
        <div>Developed by Ian Townrow</div>
      </footer>
    </>
  );
}
