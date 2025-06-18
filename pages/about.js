// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About | $ Work Experience</title>
        <meta
          name="description"
          content="Learn more about $ Work Experience, our mission, and our team."
        />
      </Head>
      
      <main>
        <section className="section">
          <div className="container about-narrow">
            <h2 className="section-title">About Us</h2>
            <p>
              $ Work Experience is dedicated to providing simple, reliable payroll solution.
              Our team combines years of experience with a passion for helping businesses grow by removing the stress of compliance and payroll.
            </p>
            <p>
              We believe in accuracy, transparency, and responsiveness. Whether you’re a startup or an established company, we’re here to support your HR and payroll needs so you can focus on what matters most—your business.
            </p>
          </div>
        </section>
        <section className="section-alt">
          <div className="container">
            <h3>Our Mission</h3>
            <p>
              To empower Singapore businesses with seamless, compliant, and worry-free payroll and HR services.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h3>Meet the Team</h3>
            <p>
              Our team is made up of payroll specialists, HR advisors, and tech enthusiasts who care about your success.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}