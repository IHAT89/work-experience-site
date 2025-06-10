// pages/services.js
import Head from 'next/head';
export default function Services() {
  return (
    <>
    <Head>
      <title>Services | $ Work Experience</title>
      <meta name="description" content="Discover our payroll, compliance, and HR services for small and medium-sized businesses." />
      <meta property="og:title" content="Services | $ Work Experience" />
      <meta property="og:description" content="Discover our payroll, compliance, and HR services for small and medium-sized businesses." />
    </Head> 
      <h2 className="section-title">Our Services</h2>
      <section className="section-alt">
        <div>
          <h3>1. Payroll Processing</h3>
          <p>• Monthly salary computation</p>
          <p>• Overtime, bonuses, and allowances calculation</p>
          <p>• Generation of itemized payslips</p>
        </div>
      </section>

      <section className="section">
        <div>
          <h3>2. Statutory Compliance</h3>
          <p>• CPF (Central Provident Fund) contributions</p>
          <p>• IRAS tax filings (e.g., IR8A, IR21)</p>
          <p>• SDL, SHG, and other contributions</p>
        </div>
      </section>

      <section className="section-alt">
        <div>
          <h3>3. Leave and Claims Management</h3>
          <p>• Tracking annual, medical, and childcare leave</p>
          <p>• Reimbursement claims processing</p>
        </div>
      </section>

      <section className="section">
        <div>
          <h3>4. Employee Self-Service Portals</h3>
          <p>• Access to payslips, leave balances, and tax forms</p>
          <p>• Mobile-friendly user access</p>
        </div>
      </section>

      <section className="section-alt">
        <div>
          <h3>5. HR Advisory and Support</h3>
          <p>• Guidance on labor laws and HR practices</p>
          <p>• Assistance with onboarding and contracts</p>
        </div>
      </section>

      <section className="section">
        <div>
          <h3>6. Systems Integration</h3>
          <p>• Syncing with accounting and HR systems</p>
          <p>• Custom reports and analytics</p>
        </div>
      </section>

      <section className="section-alt">
        <div>
          <h3>7. Additional Services</h3>
          <p>• On request only if we can deliver excellence</p>
        </div>
      </section>
    </>
  );
}
