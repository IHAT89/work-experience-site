import { render, screen } from '@testing-library/react';
import Services from '../pages/services';

describe('Services Page', () => {
  it('renders the main "Our Services" heading', () => {
    render(<Services />);
    // This correctly finds the main <h2> heading
    const heading = screen.getByRole('heading', { name: /our services/i });
    expect(heading).toBeInTheDocument();
  });

  it('lists the "Payroll Processing" service', () => {
    render(<Services />);
    // This correctly finds the <h3> for a specific service
    const payrollService = screen.getByRole('heading', { name: /payroll processing/i });
    expect(payrollService).toBeInTheDocument();
  });

  it('lists the "Statutory Compliance" service', () => {
    render(<Services />);
    // This correctly finds another service heading
    const complianceService = screen.getByRole('heading', { name: /statutory compliance/i });
    expect(complianceService).toBeInTheDocument();
  });
});