// pages/contact.js
import { useState, useRef } from 'react';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';

function SuccessMessage({ onReset }) {
  return (
    <div className="success-message">
      <h3>Message Sent!</h3>
      <p>Thank you very much for visiting our site. We will get back to you shortly.</p>
      <button onClick={onReset}>Send Another Message</button>
    </div>
  );
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaBlocked, setIsRecaptchaBlocked] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue && !isRecaptchaBlocked) {
      setError('Please complete the reCAPTCHA.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      recaptcha: recaptchaValue,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An unknown error occurred. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current.reset(); // Reset reCAPTCHA after submission
    }
  };

  if (isSubmitted) {
    return (
      <main>
        <section className="section-alt">
          <SuccessMessage onReset={() => setIsSubmitted(false)} />
        </section>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us - Work Experience Site</title>
      </Head>
      <main>
        <section className="section">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">Have a question? Fill out the form below.</p>
        </section>
        <section className="section-alt">
          <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form" autoComplete="off">
            <div>
              <label htmlFor="name">Name <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" required disabled={isSubmitting} />
            </div>
            <div>
              <label htmlFor="email">Email <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" required disabled={isSubmitting} />
            </div>
            <div>
              <label htmlFor="message">Message <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <textarea id="message" name="message" rows="5" required disabled={isSubmitting} />
            </div>
            <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onErrored={() => setIsRecaptchaBlocked(true)}
              />
              {isRecaptchaBlocked && (
                <p style={{ color: '#8B0000', marginTop: '0.5rem' }}>
                  The reCAPTCHA could not load. This may be due to an ad-blocker.
                </p>
              )}
            </div>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}