import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404: Page Not Found</title>
      </Head>
      <main>
        <section className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="section-title">404 - Page Not Found</h1>
          <p className="section-subtitle">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <Link href="/" className="hero-cta-button">
            Return to Homepage
          </Link>
        </section>
      </main>
    </>
  );
}