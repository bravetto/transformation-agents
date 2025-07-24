import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DivineLetterForm from "../index";

// Mock the DivineParticles component
jest.mock("@/components/divine-particles", () => ({
  DivineParticles: () => <div data-testid="mock-divine-particles" />,
}));

describe("DivineLetterForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnSave.mockClear();
  });

  it("renders the form title", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByText("Divine Letter of Support")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your letter will help the court understand JAHmere's character and impact/,
      ),
    ).toBeInTheDocument();
  });

  it("renders the progress indicator", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the auto-save indicator", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByText(/Auto-save/)).toBeInTheDocument();
  });

  it("renders the form navigation", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders the personal info form step initially", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByText("Your Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <DivineLetterForm
        onSubmit={mockOnSubmit}
        onSave={mockOnSave}
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders with divine particles background", () => {
    render(<DivineLetterForm onSubmit={mockOnSubmit} onSave={mockOnSave} />);

    expect(screen.getByTestId("mock-divine-particles")).toBeInTheDocument();
  });
});
