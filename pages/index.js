import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>$ Work Experience | Payroll & HR Services Singapore</title>
        <meta name="description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
        <meta property="og:title" content="$ Work Experience | Payroll & HR Services Singapore" />
        <meta property="og:description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
        <meta property="og:image" content="https://workexperience.sg/images/hero-illustration.png" />
        <meta property="og:url" content="https://workexperience.sg/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="$ Work Experience | Payroll & HR Services Singapore" />
        <meta name="twitter:description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
        <meta name="twitter:image" content="https://workexperience.sg/images/hero-illustration.png" />
      </Head>
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Payroll Made Simple</h1>
            <p className="hero-subtitle">
              We handle the complexity so you do not have to. Professional payroll services that give you time back to focus on what matters most—growing your business.
            </p>
            <Link href="/contact" className="button hero-cta">Get Your Free Quote</Link>
          </div>
          
          <div className="hero-visual">
             {/* Placeholder for a professional corporate image */}
             <div className="corporate-placeholder"></div>
          </div>
        </section>
      </main>
    </>
  );
}