import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../pages/contact';

describe('Contact Form', () => {
  it('renders all required fields', () => {
    render(<Contact />);
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows errors if required fields are empty on submit', async () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Check for the main error summary
    expect(await screen.findByText(/please fix the errors below/i)).toBeInTheDocument();

    // Check for individual field errors
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it('shows an error for an invalid email format', async () => {
    render(<Contact />);
    
    // Fill in other fields correctly
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { 
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), { 
      target: { value: 'This is a perfectly valid test message.' }
    });
    
    // Provide an invalid email
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { 
      target: { value: 'invalid-email' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for the specific email error to appear
    const errorMessage = await screen.findByText(/please enter a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows an error for a short message', async () => {
    render(<Contact />);
    
    // Fill in other fields correctly
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { 
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { 
      target: { value: 'valid@email.com' }
    });
    
    // Provide a short message
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), { 
      target: { value: 'short' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for the specific message length error to appear
    const errorMessage = await screen.findByText(/message must be at least 10 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows only the reCAPTCHA error when all fields are valid', async () => {
    render(<Contact />);
    
    // Fill all fields with valid data
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { 
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { 
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), { 
      target: { value: 'This is a valid message that is long enough.' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // The only error remaining should be for the CAPTCHA
    const captchaError = await screen.findByText(/please complete the captcha/i);
    expect(captchaError).toBeInTheDocument();

    // No other validation errors should be present
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/valid email address/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/at least 10 characters/i)).not.toBeInTheDocument();
  });
});