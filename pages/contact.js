// pages/contact.js
import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const res = await fetch('https://formspree.io/f/mdkzejaz', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert('Sorry, there was a problem sending your message.');
    }
  }

  return (
    <>
      <Head>
        <title>Contact | $ Work Experience</title>
        <meta name="description" content="Get in touch with $ Work Experience for payroll and HR support." />
        <meta property="og:title" content="Contact | $ Work Experience" />
        <meta property="og:description" content="Get in touch with $ Work Experience for payroll and HR support." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "$ Work Experience",
              "url": "https://yourdomain.com",
              "logo": "https://yourdomain.com/images/hero-illustration.png",
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+65-XXXX-XXXX",
                "contactType": "customer service",
                "areaServed": "SG",
                "availableLanguage": ["English"]
              }]
            })
          }}
        />
      </Head>
      <section className="section">
        <h2 className="section-title">Contact Us</h2>
        <p>We’d love to hear from you. Please fill out the form below and we’ll respond promptly.</p>
      </section>
      <section className="section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Experience:</strong> Years of payroll expertise in Singapore.</li>
          <li><strong>Accuracy:</strong> Reliable, compliant, and precise payroll every month.</li>
          <li><strong>Responsiveness:</strong> Fast support, even on weekends.</li>
        </ul>
      </section>
      <section className="section-alt">
        <div
          className="form-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Thank you so much for visiting our site</h3>
              <p>Your message has been sent. We’ll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '1.5rem',
                maxWidth: 600,
                width: '100%',
              }}
            >
              <div style={{ width: '100%' }}>
                <label htmlFor="name" style={{ display: 'block', textAlign: 'left' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="form-input"
                  style={{ height: '40.014px', width: '100%' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <label htmlFor="email" style={{ display: 'block', textAlign: 'left' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-input"
                  style={{ height: '40.014px', width: '100%' }}
                />
              </div>
              <div style={{ width: '100%' }}>
                <label htmlFor="message" style={{ display: 'block', textAlign: 'left' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="form-textarea"
                  style={{ width: '100%' }}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '0.25rem',
                  }}
                >
                  <button
                    type="submit"
                    className="button"
                    style={{ marginRight: 0 }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>Our Location</h3>
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.142395208725!2d103.85051201609872!3d1.2928977618769428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a1e1b1b1b1%3A0x1a2b3c4d5e6f7g8h!2sSingapore!5e0!3m2!1sen!2ssg!4v1620000000000!5m2!1sen!2ssg"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: '12px', marginTop: '1.5rem' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
}