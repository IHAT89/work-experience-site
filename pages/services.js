// pages/services.js
import Head from 'next/head';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services | $ Work Experience</title>
        <meta
          name="description"
          content="Discover our payroll, compliance, and HR services for small and medium-sized businesses."
        />
        <meta property="og:title" content="Services | $ Work Experience" />
        <meta
          property="og:description"
          content="Discover our payroll, compliance, and HR services for small and medium-sized businesses."
        />
      </Head>

      <main>
        <section className="section">
          <h2 className="section-title" aria-label="Our Services">Our Services</h2>
        </section>

        <section className="section-alt" aria-label="Payroll Processing">
          <div>
            <h3 aria-label="Payroll Processing">1. Payroll Processing</h3>
            <p aria-label="Monthly salary computation">• Monthly salary computation</p>
            <p aria-label="Overtime, bonuses, and allowances calculation">• Overtime, bonuses, and allowances calculation</p>
            <p aria-label="Generation of itemized payslips">• Generation of itemized payslips</p>
          </div>
        </section>

        <section className="section" aria-label="Statutory Compliance">
          <div>
            <h3 aria-label="Statutory Compliance">2. Statutory Compliance</h3>
            <p aria-label="CPF contributions">• CPF (Central Provident Fund) contributions</p>
            <p aria-label="IRAS tax filings">• IRAS tax filings (e.g., IR8A, IR21)</p>
            <p aria-label="SDL, SHG, and other contributions">• SDL, SHG, and other contributions</p>
          </div>
        </section>

        <section className="section-alt" aria-label="Leave and Claims Management">
          <div>
            <h3 aria-label="Leave and Claims Management">3. Leave and Claims Management</h3>
            <p aria-label="Tracking annual, medical, and childcare leave">• Tracking annual, medical, and childcare leave</p>
            <p aria-label="Reimbursement claims processing">• Reimbursement claims processing</p>
          </div>
        </section>

        <section className="section" aria-label="Employee Self-Service Portals">
          <div>
            <h3 aria-label="Employee Self-Service Portals">4. Employee Self-Service Portals</h3>
            <p aria-label="Access to payslips, leave balances, and tax forms">• Access to payslips, leave balances, and tax forms</p>
            <p aria-label="Mobile-friendly user access">• Mobile-friendly user access</p>
          </div>
        </section>

        <section className="section-alt" aria-label="HR Advisory and Support">
          <div>
            <h3 aria-label="HR Advisory and Support">5. HR Advisory and Support</h3>
            <p aria-label="Guidance on labor laws and HR practices">• Guidance on labor laws and HR practices</p>
            <p aria-label="Assistance with onboarding and contracts">• Assistance with onboarding and contracts</p>
          </div>
        </section>

        <section className="section" aria-label="Systems Integration">
          <div>
            <h3 aria-label="Systems Integration">6. Systems Integration</h3>
            <p aria-label="Syncing with accounting and HR systems">• Syncing with accounting and HR systems</p>
            <p aria-label="Custom reports and analytics">• Custom reports and analytics</p>
          </div>
        </section>

        <section className="section-alt" aria-label="Additional Services">
          <div>
            <h3 aria-label="Additional Services">7. Additional Services</h3>
            <p aria-label="Work pass and visa application support">• Work pass and visa application support</p>
          </div>
        </section>
      </main>
    </>
  );
}
