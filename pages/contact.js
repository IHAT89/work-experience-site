// pages/contact.js

import Head from 'next/head';
import { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const recaptchaRef = useRef();
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!captcha) {
      setError("Please complete the reCAPTCHA.");
      return;
    }
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.append("g-recaptcha-response", captcha);

    const res = await fetch('https://formspree.io/f/mdkzejaz', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData,
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
      setCaptcha(null);
      if (recaptchaRef.current) recaptchaRef.current.reset();
    } else {
      setError('Sorry, there was a problem sending your message.');
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
              "url": "https://workexperience.sg",
              "logo": "https://workexperience.sg/images/hero-illustration.png",
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

      <main>
        <section className="section">
          <h2 className="section-title">Contact Us</h2>
          <p>We’d love to hear from you. Please fill out the form below and we’ll respond promptly.</p>
        </section>

        <section className="section">
          <h2>Why Choose Us?</h2>
          <ul className="no-bullets">
            <li><strong>Experience:</strong> Years of payroll expertise in Singapore.</li>
            <li><strong>Accuracy:</strong> Reliable, compliant, and precise payroll every month.</li>
            <li><strong>Responsiveness:</strong> Fast support, even on weekends.</li>
          </ul>
        </section>

        <section className="section-alt">
          <div className="form-container">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Thank you so much for visiting our site</h3>
                <p>Your message has been sent. We’ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: 600, width: '100%' }} aria-label="Contact form">
                {error && (
                  <div className="form-error" style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required className="form-input" aria-label="Your name" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required className="form-input" aria-label="Your email address" />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required className="form-textarea" aria-label="Your message" />
                </div>
                <div style={{ margin: "1rem 0" }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LdwSl4rAAAAAIeg1LZ7jmoYbk6BAg_1AwzMr5kX"
                    onChange={token => setCaptcha(token)}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button type="submit" className="button" disabled={loading} aria-label="Send message">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>Our Location</h3>
          <iframe
            className="map-frame hide-on-mobile"
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.805047982354!2d103.84867227447214!3d1.2913184617622326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a729046f1f%3A0xbe711601da8c21fb!2s1%20Coleman%20St%2C%20Singapore%20179803!5e0!3m2!1sen!2ssg!4v1749634480282!5m2!1sen!2ssg"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px', marginTop: '1.5rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <style jsx>{`
            .hide-on-mobile {
              display: block;
            }
            @media (max-width: 768px) {
              .hide-on-mobile {
                display: none;
              }
            }
          `}</style>
        </section>
      </main>
    </>
  );
}