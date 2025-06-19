import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    // Use the actual heading text from your page
    const heading = screen.getByRole('heading', {
      name: /payroll made simple/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('contains a link to get a quote', () => {
    render(<Home />);
    // Use the actual link text from your page
    const quoteLink = screen.getByRole('link', { name: /get your free quote/i });
    expect(quoteLink).toBeInTheDocument();
    // Optional: check if it links to the correct page
    expect(quoteLink).toHaveAttribute('href', '/contact');
  });
});