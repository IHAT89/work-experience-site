import { fireEvent, render, screen } from "@testing-library/react";
import Contact from "../pages/contact";

// Mock dependencies
jest.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: jest.fn(() => Promise.resolve("mock_token")),
  }),
}));

jest.mock("@emailjs/browser", () => ({
  sendForm: jest.fn(() => Promise.resolve({ text: "OK" })),
}));

// Mock fetch globally
globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true, score: 0.9 }),
  }),
);

describe("Contact Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all required fields", () => {
    render(<Contact />);
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /message/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("shows errors if required fields are empty on submit", async () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Check for the main error summary
    expect(
      await screen.findByText(/please fix the errors below/i),
    ).toBeInTheDocument();

    // Check for individual field errors
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it("shows an error for an invalid email format", async () => {
    render(<Contact />);

    // Fill in other fields correctly
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "This is a perfectly valid test message." },
    });

    // Provide an invalid email
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for the specific email error to appear
    const errorMessage = await screen.findByText(
      /please enter a valid email address/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows an error for a short message", async () => {
    render(<Contact />);

    // Fill in other fields correctly
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "valid@email.com" },
    });

    // Provide a short message
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for the specific message length error to appear
    const errorMessage = await screen.findByText(
      /message must be at least 10 characters/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a server error when reCAPTCHA verification fails", async () => {
    // Mock verification failure
    globalThis.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, score: 0.1 }),
      }),
    );

    render(<Contact />);

    // Fill all fields with valid data
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "This is a valid message that is long enough." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // The only error remaining should be the server error
    // "Failed to send message. Please try again later."
    const errorMsg = await screen.findByText(/failed to send message/i);
    expect(errorMsg).toBeInTheDocument();

    // No other validation errors should be present
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/valid email address/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/at least 10 characters/i),
    ).not.toBeInTheDocument();
  });
});
