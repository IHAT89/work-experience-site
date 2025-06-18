// pages/contact.js

import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from '../styles/contact.module.css';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const recaptchaRef = useRef();
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (error || submitted) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error, submitted]);

  // Optional: Manual dismiss handler
  const handleCloseAlert = () => setShowAlert(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
      setError('');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    let errors = {};

    const formElement = e.target;

    // Honeypot check
    if (formElement.website.value) {
      setError("Spam detected.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formElement.name.value) errors.name = "Name is required.";
    if (!formElement.email.value) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formElement.email.value)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formElement.message.value) {
      errors.message = "Message is required.";
    } else if (formElement.message.value.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
    if (!captcha) errors.captcha = "Please complete the reCAPTCHA.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix the errors below.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(formElement);
      formData.append("g-recaptcha-response", captcha);

      const res = await fetch('https://formspree.io/f/mdkzejaz', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        formElement.reset();
        setCaptcha(null);
        if (recaptchaRef.current) recaptchaRef.current.reset();
      } else {
        setError('Sorry, there was a problem sending your message.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
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
            {showAlert && error && (
              <div
                className="form-error"
                style={{ color: 'red', marginBottom: '1rem', position: 'relative' }}
                role="alert"
              >
                {error}
                <button
                  onClick={handleCloseAlert}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                  aria-label="Close alert"
                >
                  ×
                </button>
              </div>
            )}
            {showAlert && submitted && (
              <div
                className={styles.thankYouMessage}
                aria-live="polite"
                role="alert"
                style={{ marginBottom: '1rem', position: 'relative' }}
              >
                Thank you for your submission!
                <button
                  onClick={handleCloseAlert}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                  aria-label="Close alert"
                >
                  ×
                </button>
              </div>
            )}
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Thank you so much for visiting our site</h3>
                <p>Your message has been sent. We’ll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, width: '100%' }}
                aria-label="Contact form"
                autoComplete="off"
              >
                <div>
                  <FormInput
                    label="Name"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    error={fieldErrors.name}
                  />
                </div>
                <div>
                  <FormInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    error={fieldErrors.email}
                  />
                </div>
                <div>
                  <FormTextarea
                    label="Message"
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleInputChange}
                    error={fieldErrors.message}
                  />
                </div>
                <div style={{ margin: "1rem 0" }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={token => setCaptcha(token)}
                  />
                  {fieldErrors.captcha && (
                    <span id="captcha-error" style={{ color: 'red' }} role="alert">{fieldErrors.captcha}</span>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    type="submit"
                    className="button"
                    disabled={loading}
                    aria-label="Send message"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  {loading && (
                    <span
                      style={{ marginLeft: '1rem', color: '#888' }}
                      aria-live="polite"
                      role="status"
                    >
                      Sending...
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />
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
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0,0,0,0);
              border: 0;
            }
          `}</style>
        </section>
      </main>
    </>
  );
}