// /pages/privacy-policy.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link'; // 1. IMPORT the Link component

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Work Experience Site</title>
      </Head>
      <main>
        <section className="section">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-subtitle">Your privacy is important to us.</p>
        </section>
        <section className="section-alt" style={{ padding: '2rem' }}>
          <h2>1. Information We Collect</h2>
          <p>We only collect information that you voluntarily provide to us through our contact form, which includes your name, email address, and message.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>The information you provide is used solely to respond to your inquiries. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
          
          <h2>3. Contact Us</h2>
          <p>If you have any questions about this privacy policy, you can contact us using the information on our contact page.</p>

          <div style={{ marginTop: '2rem' }}>
            {/* 2. REPLACE the <a> tag with the <Link> component */}
            <Link href="/">
              Go back to the homepage
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}