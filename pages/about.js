// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Work Experience Site</title>
        <meta name="description" content="Learn about our mission to deliver best-in-class payroll services." />
      </Head>

      <main>
        <section className="section">
          <h1 className="section-title">Our Mission</h1>
          <p className="section-subtitle">
            We are dedicated to providing businesses with the high-quality payroll services they need to thrive.
          </p>
        </section>

        <section className="section-alt about-story">
          <div className="about-story-icon-wrapper">
            <div className="about-story-icon">🍯</div>
          </div>
          <div className="about-story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2008, our company was born from a simple observation: too many business owners were bogged down by the complexities of payroll administration. We set out to create a service that was not only reliable and efficient but also a true partner in our clients&apos; success.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}