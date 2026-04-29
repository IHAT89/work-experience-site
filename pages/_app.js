import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import PropTypes from "prop-types";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import CookieBanner from "../components/CookieBanner";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://workexperience.sg${router.asPath === "/" ? "" : router.asPath}`;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/HoneyBeeKissingHeart48x48.png" />
        </Head>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
        </Script>

        <Component {...pageProps} />

        <Analytics />
        <CookieBanner />
      </Layout>
    </GoogleReCaptchaProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
