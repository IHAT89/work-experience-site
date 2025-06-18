// pages/contact.js

import { useState, useRef } from 'react';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';
import FormInput from '../components/FormInput';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const recaptchaRef = useRef();

  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = 'Name is required.';
    if (!form.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.message) {
      errors.message = 'Message is required.';
    } else if (form.message.length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    if (!captcha) {
      errors.captcha = 'Please complete the reCAPTCHA.';
    }
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form is valid, submitting...');
      setSubmitted(true);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Thank you!</h3>
        <p>Your message has been sent.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <main>
        <section className="section-alt">
          <div className="form-container">
            <form onSubmit={handleSubmit} noValidate>
              {/* This is the crucial part that adds the summary error */}
              {Object.keys(fieldErrors).length > 0 && (
                <div role="alert" style={{ color: 'red', marginBottom: '1rem' }}>
                  Please fix the errors below.
                </div>
              )}

              <FormInput
                label="Name"
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                error={fieldErrors.name}
              />
              <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                error={fieldErrors.email}
              />
              <div>
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-invalid={!!fieldErrors.message}
                  className="form-textarea"
                />
                {fieldErrors.message && <span role="alert" style={{ color: 'red' }}>{fieldErrors.message}</span>}
              </div>
              
              <div style={{ margin: '1rem 0' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'test-key'}
                  onChange={token => setCaptcha(token)}
                />
                {fieldErrors.captcha && <span role="alert" style={{ color: 'red' }}>{fieldErrors.captcha}</span>}
              </div>

              <button type="submit" className="button">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}