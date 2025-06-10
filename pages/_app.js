// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>$ Work Experience – Payroll Simplified for Singapore</title>
        <meta
          name="description"
          content="Singapore payroll and compliance services – CPF, IRAS, salary, reimbursements. Fast, accurate, and reliable support even on weekends."
        />
        <meta
          name="keywords"
          content="Singapore payroll, CPF, IRAS, salary disbursement, reimbursements, compliance services, HR support"
        />
        <meta name="robots" content="index, follow" />

        {/* ✅ This is the correct favicon line */}
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="$ Work Experience – Payroll Simplified" />
        <meta property="og:description" content="Fast, accurate payroll and compliance services for growing businesses in Singapore." />
        <meta property="og:image" content="/images/hero-illustration.png" />
        {/* Update this once you have your domain: */}
        {/* <meta property="og:url" content="https://yourdomain.com" /> */}
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="$ Work Experience – Payroll Simplified" />
        <meta name="twitter:description" content="Singapore payroll and HR services handled with precision." />
        <meta name="twitter:image" content="/images/hero-illustration.png" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
