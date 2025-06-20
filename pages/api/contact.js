// /pages/api/contact.js
import nodemailer from 'nodemailer';

// --- START ENV VARIABLE VALIDATION ---
const requiredEnvVars = [
  'RECAPTCHA_SECRET_KEY',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SENDER_EMAIL',
  'RECIPIENT_EMAIL',
];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`FATAL ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
}
// --- END ENV VARIABLE VALIDATION ---

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message, recaptcha, website } = req.body;

  // 2. Honeypot check (from your original form)
  if (website) {
    // If the honeypot field is filled, it's likely a bot.
    // We return a success message to not alert the bot, but we don't send an email.
    console.log('Honeypot field filled. Likely a bot. Silently ignoring.');
    return res.status(200).json({ message: 'Message sent successfully.' });
  }

  // 3. Server-side input validation
  if (!name || !email || !message || !recaptcha) {
    return res.status(400).json({ message: 'All form fields are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // 4. Validate reCAPTCHA
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
    });
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed.' });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ message: 'Failed to verify reCAPTCHA.' });
  }

  // 5. Configure Nodemailer transporter for GMAIL
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 6. Define email options
  const mailOptions = {
    from: `"${name}" <${process.env.SENDER_EMAIL}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `<div style="font-family: sans-serif; line-height: 1.6;"><h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><hr><h3>Message:</h3><p style="white-space: pre-wrap;">${message}</p></div>`,
  };

  // 7. Send the email
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}