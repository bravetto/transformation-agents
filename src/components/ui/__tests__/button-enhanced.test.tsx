"use client";
import { render, screen, fireEvent } from "@/test-utils";
import { Button } from "../button";

describe("Button Component - Enhanced Tests", () => {
  it("renders all button variants", () => {
    const variants = [
      "default",
      "primary",
      "secondary",
      "outline",
      "ghost",
      "divine",
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Button variant={variant}>Test {variant}</Button>,
      );
      expect(screen.getByText(`Test ${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("renders with different sizes", () => {
    const sizes = ["sm", "default", "lg", "xl"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Size {size}</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Check for size-specific classes
      if (size === "sm") expect(button).toHaveClass("text-xs");
      if (size === "lg") expect(button).toHaveClass("text-base");
      if (size === "xl") expect(button).toHaveClass("text-lg");
      unmount();
    });
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Button</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with asChild prop", () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    // When asChild is true, it should render the child element
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("handles role-based variants", () => {
    const roles = ["lightworker", "messenger", "witness", "guardian"] as const;

    roles.forEach((role) => {
      const { unmount } = render(<Button variant={role}>{role} Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(`bg-${role}-primary`);
      unmount();
    });
  });

  it("applies full width when specified", () => {
    render(<Button width="full">Full Width Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  it("handles complex interaction states", () => {
    const handleClick = jest.fn();
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Interactive Button
      </Button>,
    );

    const button = screen.getByRole("button");

    fireEvent.mouseEnter(button);
    expect(handleMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(button);
    expect(handleMouseLeave).toHaveBeenCalled();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies accessibility attributes", () => {
    render(
      <Button
        ariaLabel="Test button"
        ariaPressed={true}
        ariaExpanded={false}
        ariaControls="test-menu"
      >
        Accessible Button
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Test button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "test-menu");
  });

  it("renders icon button with correct size", () => {
    render(<Button size="icon">🔍</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-11");
    expect(button).toHaveClass("w-11");
  });
});
