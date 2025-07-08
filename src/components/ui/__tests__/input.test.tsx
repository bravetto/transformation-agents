import { render, screen, fireEvent } from "@/test-utils";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders basic input", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const { getByRole } = render(<Input />);
    const input = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test value" } });
    expect(input.value).toBe("test value");
  });

  it("shows error variant", () => {
    render(<Input variant="error" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("border-error");
    expect(input).toHaveClass("text-error");
  });

  it("handles disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:opacity-50");
  });

  it("applies different input types", () => {
    const types = ["text", "email", "number", "tel"] as const;

    types.forEach((type) => {
      const { unmount } = render(<Input type={type} />);
      const input = screen.getByRole(
        type === "number" ? "spinbutton" : "textbox",
      );
      expect(input).toHaveAttribute("type", type);
      unmount();
    });
  });

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text here" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text here");
  });

  it("handles required field", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("required");
  });

  it("applies custom className", () => {
    render(<Input className="custom-input-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input-class");
  });

  it("handles focus and blur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders with icon", () => {
    render(<Input icon={<span data-testid="test-icon">🔍</span>} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10");
  });

  it("renders with suffix", () => {
    render(<Input suffix={<span data-testid="test-suffix">✓</span>} />);
    expect(screen.getByTestId("test-suffix")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-10");
  });

  it("handles maxLength constraint", () => {
    render(<Input maxLength={10} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("applies size variants", () => {
    const sizes = ["sm", "default", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Input inputSize={size} />);
      const input = screen.getByRole("textbox");

      if (size === "sm") expect(input).toHaveClass("h-9");
      if (size === "default") expect(input).toHaveClass("h-10");
      if (size === "lg") expect(input).toHaveClass("h-11");

      unmount();
    });
  });
});
