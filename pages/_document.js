import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Static meta tags */}
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#007aff" />
        <meta name="author" content="Work Experience Pte Ltd" />
        
        {/* Google Fonts belong here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
