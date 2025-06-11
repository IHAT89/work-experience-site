import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://workexperience.sg${router.asPath === '/' ? '' : router.asPath}`;

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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="$ Work Experience – Payroll Simplified" />
        <meta
          property="og:description"
          content="Fast, accurate payroll and compliance services for growing businesses in Singapore."
        />
        <meta property="og:image" content="/images/hero-illustration.png" />
        {/* <meta property="og:url" content="https://workexperience.sg" /> */}
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="$ Work Experience – Payroll Simplified" />
        <meta name="twitter:description" content="Singapore payroll and HR services handled with precision." />
        <meta name="twitter:image" content="/images/hero-illustration.png" />
      </Head>

      {/* Google Analytics (replace G-XXXXXXXXXX with your GA4 Measurement ID) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}