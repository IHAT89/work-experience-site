import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/Layout';
import CookieConsent from "react-cookie-consent";

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
        <link rel="icon" href="/HoneyBeeKissingHeart48x48.png" type="image/png"/>
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
        <meta property="og:type" content="website" /> {/* Open Graph type: website */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image:alt" content="Work Experience hero illustration" />
        <meta name="twitter:image:alt" content="Work Experience hero illustration" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="$ Work Experience – Payroll Simplified" />
        <meta name="twitter:description" content="Singapore payroll and HR services handled with precision." />
        <meta name="twitter:image" content="/images/hero-illustration.png" />
      </Head>

      {/* Google Analytics (replace G-XXXXXXXXXX with your GA4 Measurement ID) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JBBB57S80V"
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
            gtag('config', 'G-JBBB57S80V',{
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
        <CookieConsent
          buttonText="Accept"
          style={{ background: "#222" }}
          buttonStyle={{ color: "#fff", background: "#007aff" }}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </Layout>
    </>
  );
}