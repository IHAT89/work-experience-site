import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../pages/contact';

describe('Contact Form', () => {
  it('renders all form fields and the submit button', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows a user to fill out and submit the form', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Find form elements
    const nameInput = screen.getByLabelText(/^name/i);
    const emailInput = screen.getByLabelText(/^email/i);
    const messageInput = screen.getByLabelText(/^message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Simulate user interaction
    await user.type(nameInput, 'Jane Doe');
    await user.type(emailInput, 'jane.doe@example.com');
    await user.type(messageInput, 'This is a test message from Jane.');

    await user.click(submitButton);

    // Assert that the form submission was handled correctly
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      message: 'This is a test message from Jane.',
      website: '',
    });

    // Clean up the spy
    consoleSpy.mockRestore();
  });
});