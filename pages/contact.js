// pages/contact.js

import emailjs from "@emailjs/browser";
import Head from "next/head";
import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import FormInput from "../components/FormInput";

export default function Contact() {
  const formRef = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required.";
    if (!form.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.message) {
      errors.message = "Message is required.";
    } else if (form.message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: If the hidden 'website' field is filled, it's a bot.
    if (form.website) {
      console.log("Bot detected. Silently ignoring.");
      setSubmitted(true); // Fake success
      return;
    }

    const errors = validate();
    setFieldErrors(errors);
    setErrorMessage("");

    if (Object.keys(errors).length === 0) {
      setIsSending(true);

      try {
        // Execute reCAPTCHA
        if (!executeRecaptcha) {
          console.error("executeRecaptcha is not available");
          throw new Error("reCAPTCHA not ready");
        }

        console.log("Executing reCAPTCHA...");
        const token = await executeRecaptcha("contact_form");
        console.log("reCAPTCHA token received:", token ? "Success" : "Failed");

        // Verify reCAPTCHA token
        const verifyResponse = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success || verifyData.score < 0.5) {
          throw new Error("Security verification failed");
        }

        // Send email via EmailJS
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        );

        console.log(result.text);
        setSubmitted(true);
      } catch (error) {
        console.error("Form submission error:", error);
        setErrorMessage("Failed to send message. Please try again later.");
      } finally {
        setIsSending(false);
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
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
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Honeypot Field - Invisible to humans, tempting for bots */}
              <div
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              {Object.keys(fieldErrors).length > 0 && (
                <div
                  role="alert"
                  style={{ color: "red", marginBottom: "1rem" }}
                >
                  Please fix the errors below.
                </div>
              )}
              {errorMessage && (
                <div
                  role="alert"
                  style={{ color: "red", marginBottom: "1rem" }}
                >
                  {errorMessage}
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
                {fieldErrors.message && (
                  <span role="alert" style={{ color: "red" }}>
                    {fieldErrors.message}
                  </span>
                )}
              </div>

              <div
                style={{ margin: "1rem 0", fontSize: "0.85rem", color: "#666" }}
              >
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </div>

              <button type="submit" className="button" disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
