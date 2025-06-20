import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Work Experience Site</title>
      </Head>
      <main>
        <section className="section">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-subtitle">Last updated: June 20, 2025</p>
        </section>

        <section className="section-alt" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Introduction</h2>
          <p>
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you use the contact form.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to help customize the Site and improve your experience. Specifically, we use a cookie to remember your consent to our cookie policy.
            </li>
          </ul>

          <h2>Use of Your Information</h2>
          <p>
            Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to respond to your inquiries via the contact form.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us through the <a href="/contact">contact page</a>.
          </p>
        </section>
      </main>
    </>
  );
}