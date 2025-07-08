import { render, screen, fireEvent, waitFor } from "@/test-utils";
import ContactPage from "../page";

// Mock fetch for form submission
global.fetch = jest.fn();

describe("ContactPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  it("renders contact form", () => {
    render(<ContactPage />);

    // Check for form elements
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders page title and description", () => {
    render(<ContactPage />);

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<ContactPage />);

    // Try to submit empty form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Check for HTML5 validation
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /message/i,
    ) as HTMLTextAreaElement;

    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
    expect(messageInput).toHaveAttribute("required");
  });

  it("validates email format", () => {
    render(<ContactPage />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("submits form successfully", async () => {
    render(<ContactPage />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    // Check that fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/contact"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a test message",
        }),
      }),
    );
  });

  it("handles submission errors", async () => {
    // Mock fetch to return error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    render(<ContactPage />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Test message" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("disables submit button while submitting", async () => {
    render(<ContactPage />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Test message" },
    });

    // Submit form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Button should be disabled while submitting
    expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("clears form after successful submission", async () => {
    render(<ContactPage />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /message/i,
    ) as HTMLTextAreaElement;

    // Fill out form
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    // Check form is cleared
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
  });
});
