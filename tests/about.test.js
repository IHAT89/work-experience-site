// tests/about.test.js
import { render, screen } from '@testing-library/react';
import About from '../pages/about';

describe('About Page', () => {
  it('renders the main "About Us" heading', () => {
    render(<About />);
    // Targets the main <h2> heading
    expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
  });

  it('renders the "Our Mission" section heading', () => {
    render(<About />);
    // Targets the <h3> for the mission
    expect(screen.getByRole('heading', { name: /our mission/i })).toBeInTheDocument();
  });

  it('renders the "Meet the Team" section heading', () => {
    render(<About />);
    // Specifically targets the <h3> for the team section
    expect(screen.getByRole('heading', { name: /meet the team/i })).toBeInTheDocument();
  });
});