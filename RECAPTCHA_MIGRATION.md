# Migrate from Cloudflare Turnstile to Google reCAPTCHA v3

This guide replaces Cloudflare Turnstile with Google reCAPTCHA v3 in your contact form.

## Why reCAPTCHA v3?

- **Invisible**: No checkboxes or challenges for users
- **Score-based**: Returns a score (0.0 to 1.0) indicating if user is human
- **Better integration**: Works seamlessly with Google Cloud Armor
- **No Cloudflare dependency**: One less reason to deal with them

---

## Step 1: Get reCAPTCHA Keys

1. Go to: https://www.google.com/recaptcha/admin/create
2. **Register a new site**:
   - Label: `Work Experience Site`
   - reCAPTCHA type: **reCAPTCHA v3**
   - Domains:
     - `workexperience.sg`
     - `www.workexperience.sg`
     - `localhost` (for development)
   - Accept terms and submit

3. **Copy your keys**:
   - **Site Key**: Starts with `6L...` (public, goes in frontend)
   - **Secret Key**: Starts with `6L...` (private, goes in backend)

---

## Step 2: Update Environment Variables

### Local Development (`.env.local`):

```env
# Remove these Cloudflare lines:
# NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx
# TURNSTILE_SECRET_KEY=xxx

# Add these Google reCAPTCHA lines:
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Keep EmailJS as is:
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Vercel Production:

1. Go to: https://vercel.com/your-account/work-experience-site/settings/environment-variables
2. **Delete**:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
3. **Add**:
   - Name: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, Value: `your_site_key_here`
   - Name: `RECAPTCHA_SECRET_KEY`, Value: `your_secret_key_here`

---

## Step 3: Install reCAPTCHA Package

```bash
cd /home/ubuntu64_ian/projects/work-experience-site
npm install react-google-recaptcha-v3
```

---

## Step 4: Update Next.js Configuration

### File: `next.config.js`

Find any references to Turnstile and remove them. The config should look like:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
};

module.exports = nextConfig;
```

---

## Step 5: Create reCAPTCHA Wrapper Component

### File: `components/ReCaptchaProvider.js`

Create this new file:

```javascript
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReCaptchaProvider({ children }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.warn("reCAPTCHA site key not found");
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
```

---

## Step 6: Update Main App File

### File: `pages/_app.js`

Wrap your app with the reCAPTCHA provider:

```javascript
import "../styles/globals.css";
import ReCaptchaProvider from "../components/ReCaptchaProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ReCaptchaProvider>
      <Component {...pageProps} />
    </ReCaptchaProvider>
  );
}

export default MyApp;
```

---

## Step 7: Update Contact Form Component

### Find your contact form file (likely `components/ContactForm.js` or similar)

Replace Turnstile code with reCAPTCHA:

```javascript
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      // Execute reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not ready");
      }

      const token = await executeRecaptcha("contact_form");

      // Verify token on backend
      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success || verifyData.score < 0.5) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Send email via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <div className="alert alert-success">
          Thank you! Your message has been sent.
        </div>
      )}

      {status === "error" && (
        <div className="alert alert-error">
          Sorry, something went wrong. Please try again.
        </div>
      )}

      <div className="recaptcha-info">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>
    </form>
  );
}
```

---

## Step 8: Create Backend Verification API

### File: `pages/api/verify-recaptcha.js`

Create this new API route:

```javascript
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 1.0 is very likely a good interaction
    // 0.0 is very likely a bot
    // We'll accept scores >= 0.5

    if (data.success && data.score >= 0.5) {
      return res.status(200).json({
        success: true,
        score: data.score,
      });
    } else {
      return res.status(400).json({
        success: false,
        score: data.score,
        error: "reCAPTCHA verification failed",
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error during verification",
    });
  }
}
```

---

## Step 9: Add reCAPTCHA Badge Styling (Optional)

reCAPTCHA v3 shows a small badge in the bottom-right corner. You can style or hide it:

### File: `styles/globals.css`

Add this at the end:

```css
/* reCAPTCHA Badge Styling */
.grecaptcha-badge {
  visibility: visible !important;
  opacity: 0.8;
}

.grecaptcha-badge:hover {
  opacity: 1;
}

/* If you want to hide it (only if you show the reCAPTCHA branding elsewhere) */
/* 
.grecaptcha-badge {
  visibility: hidden !important;
}
*/
```

**Note**: If you hide the badge, you MUST include the reCAPTCHA branding text in your form (which we did in Step 7).

---

## Step 10: Test Locally

```bash
npm run dev
```

1. Visit `http://localhost:3001`
2. Go to contact form
3. Fill out the form
4. Submit
5. Check browser console - should see reCAPTCHA token being generated
6. Check network tab - should see call to `/api/verify-recaptcha`

---

## Step 11: Deploy to Vercel

```bash
git add .
git commit -m "Replace Cloudflare Turnstile with Google reCAPTCHA v3"
git push origin main
```

Vercel will auto-deploy. Check:

- https://workexperience.sg (once DNS is updated)
- The contact form should work
- No more Cloudflare Turnstile

---

## Step 12: Monitor reCAPTCHA

1. Go to: https://www.google.com/recaptcha/admin
2. Click on your site
3. View analytics:
   - Requests
   - Score distribution
   - Blocked attempts

You can adjust the score threshold in `/api/verify-recaptcha.js` if needed:

- `0.7+` = Stricter (might block some real users)
- `0.5` = Balanced (recommended)
- `0.3` = Lenient (might let some bots through)

---

## Cleanup

### Remove Cloudflare Turnstile Script

If you manually added Turnstile script tags anywhere, remove them:

```html
<!-- DELETE THIS if found in pages/_document.js or elsewhere -->
<script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
  async
  defer
></script>
```

### Uninstall Turnstile Package (if installed)

```bash
npm uninstall @cloudflare/turnstile
```

---

## Troubleshooting

### reCAPTCHA not loading

Check browser console for:

```
reCAPTCHA site key not found
```

**Fix**: Make sure environment variables are set in both `.env.local` and Vercel.

### Score always 0.0

**Issue**: Token might be reused or expired.

**Fix**: Make sure you're generating a new token per form submission.

### Form submits but email not sent

**Issue**: reCAPTCHA passed but EmailJS failed.

**Fix**: Check EmailJS credentials separately from reCAPTCHA.

---

## Comparison

| Feature         | Cloudflare Turnstile  | Google reCAPTCHA v3 |
| --------------- | --------------------- | ------------------- |
| User Experience | Interactive challenge | Invisible           |
| False Positives | Common                | Rare                |
| Dependency      | Cloudflare account    | Google account      |
| Domain Deletion | YES 😡                | NO                  |
| Integration     | Clunky                | Smooth              |
| Analytics       | Limited               | Detailed            |
| Cost            | Free                  | Free                |
| Peace of Mind   | ❌                    | ✅                  |

---

## Next Steps

1. ✅ Complete this migration
2. ✅ Test contact form thoroughly
3. ✅ Delete Cloudflare account
4. ✅ Never think about Cloudflare again

Your site now uses Google reCAPTCHA v3 - invisible protection without the Cloudflare drama.
