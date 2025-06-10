// pages/about.js
import Head from 'next/head';
export default function About() {
  return (
    <>
     <Head>
     <title>About Us | $ Work Experience</title>
        <meta name="description" content="Learn more about our team and mission at $ Work Experience." />
        <meta property="og:title" content="About Us | $ Work Experience" />
        <meta property="og:description" content="Learn more about our team and mission at $ Work Experience." /> 
      </Head> 
      <section className="section">
        <h2 className="section-title">About $ Work Experience</h2>
      </section>

      <section className="section-alt">
        <p>
          Founded in Singapore, $ Work Experience delivers simple and effective payroll services for small and medium-sized businesses.
        </p>
      </section>

      <section className="section">
        <p>
          We understand that managing payroll, CPF compliance, tax filings, and leave reimbursements can be time-consuming.
          Our goal is to handle those tasks for you — with precision and reliability — so you can focus on running your business.
        </p>
      </section>

      <section className="section-alt">
        <p>
          Our experienced team operates with confidentiality and integrity. We offer timely support, even on weekends,
          because we understand how fast-paced your business can be.
        </p>
      </section>

      <section className="section">
        <p>
          Whether you&apos;re just starting up or scaling fast, we adapt to your needs and ensure you remain compliant, efficient, and informed.
        </p>
      </section>
    </>
  );
}
