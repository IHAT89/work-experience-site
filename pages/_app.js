import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* The viewport meta tag belongs here, not in _document.js */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;