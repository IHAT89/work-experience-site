// pages/contact.js
import { useState, useRef } from 'react';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isRecaptchaBlocked, setIsRecaptchaBlocked] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setError('');

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue && !isRecaptchaBlocked) {
      setError('Please complete the reCAPTCHA.');
      setStatus('');
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    if (formData.get('website')) {
      setError("Spam detected.");
      setStatus('');
      return;
    }

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      recaptcha: recaptchaValue,
    };

    console.log('Form submitted:', data);
    setStatus('Message sent successfully!');
    form.reset();
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Work Experience Site</title>
      </Head>
      <main>
        <section className="section">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Have a question? Fill out the form below.</p>
        </section>
        <section className="section-alt">
          <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form" autoComplete="off">
            <div>
              <label htmlFor="name">Name <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="message">Message <span style={{ color: 'red' }} aria-hidden="true">*</span></label>
              <textarea id="message" name="message" rows="5" required />
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
                  The reCAPTCHA could not load. This may be due to an ad-blocker. Please disable it for this site to submit the form, or contact us directly at your-email@example.com.
                </p>
              )}
            </div>

            <div>
              {status && <p>{status}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div>
              <button type="submit">Send Message</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
