// pages/services.js
import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Payroll Service - Work Experience Site</title>
        <meta name="description" content="Learn about our comprehensive, full-service payroll solution." />
      </Head>

      <main>
        <section className="section">
          <h1 className="section-title">Our Premier Payroll Service</h1>
          <p className="section-subtitle">
            A comprehensive solution designed to make your payroll process effortless.
          </p>
        </section>

        <section className="section-alt featured-service">
          <div className="featured-service-icon">📄</div>
          <h2 className="featured-service-title">Full-Service Payroll Management</h2>
          <p className="featured-service-description">
            From calculating paychecks and direct deposits to handling tax filings and year-end forms, we manage every detail with precision and care. Our service ensures your team is paid accurately and on time, every time, keeping you compliant and free to focus on your core business.
          </p>
          <Link href="/contact" className="hero-cta-button">
            Get a Free Quote
          </Link>
        </section>
      </main>
    </>
  );
}