import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>$ Work Experience | Payroll & HR Services Singapore</title>
        <meta name="description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
        <meta property="og:title" content="$ Work Experience | Payroll & HR Services Singapore" />
        <meta property="og:description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
      </Head>
      <section className="hero">
        <Image
          src="/images/hero-illustration.png"
          alt="Illustration"
          className="hero-image"
          width={600}
          height={400}
        />
        <h2 className="main-heading">Payroll Simplified for Singapore Businesses</h2>
        <p>
          $ Work Experience offers hassle-free payroll and compliance services for growing businesses in Singapore.
          From CPF and IRAS filings to salary disbursement and reimbursements — we handle it all accurately and on time.
        </p>
        <p>
          We&apos;re responsive, reliable, and available — even on weekends — so you can focus on running your business.
        </p>
        <Link href="/services" legacyBehavior>
          <a className="button">View Full List of Services →</a>
        </Link>
      </section>
    </>
  );
}


