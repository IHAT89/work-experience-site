import { render, screen } from '@testing-library/react';
import Contact from '../pages/contact';

describe('Contact Form', () => {
  it('renders the contact form', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});