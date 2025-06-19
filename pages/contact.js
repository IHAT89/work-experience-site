// pages/contact.js
import { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setError('');

    // Use the FormData API - this is a more reliable way to get form values.
    const form = e.target;
    const formData = new FormData(form);

    // Honeypot check using the new method.
    if (formData.get('website')) {
      setError("Spam detected.");
      setStatus('');
      return;
    }

    // Create the data object using the new method.
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'),
    };

    console.log('Form submitted:', data);
    setStatus('Message sent successfully!');
    form.reset();
  };

  return (
    <>
      <Head>
        <title>Contact Us - Work Experience Site</title>
      </Head>
      <main>
        <section className="section">
          <h2 className="section-title">Contact Us</h2>
        </section>
        <section className="section-alt">
          <form onSubmit={handleSubmit} aria-label="Contact form" autoComplete="off">
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
              <textarea id="message" name="message" required />
            </div>
            <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
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