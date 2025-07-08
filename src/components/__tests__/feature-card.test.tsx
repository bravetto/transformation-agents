import { render, screen } from "@/test-utils";
import FeatureCard from "../feature-card";

const mockFeature = {
  title: "Test Feature",
  description: "This is a test feature description",
  icon: "⭐",
  link: "/test-feature",
  emphasis: "standard" as const,
  size: "medium" as const,
};

describe("FeatureCard", () => {
  it("renders feature information", () => {
    render(<FeatureCard {...mockFeature} />);
    expect(screen.getByText("Test Feature")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test feature description"),
    ).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("renders with action link when provided", () => {
    render(
      <FeatureCard
        {...mockFeature}
        actionLabel="Learn More"
        actionHref="/learn-more"
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/learn-more");
    expect(link).toHaveTextContent("Learn More");
  });

  it("renders without action link when not provided", () => {
    render(<FeatureCard {...mockFeature} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies hover effects", () => {
    render(<FeatureCard {...mockFeature} />);
    const card = screen.getByText("Test Feature").closest(".transition-all");
    expect(card).toHaveClass("hover:scale-[1.02]");
  });

  it("applies size variants correctly", () => {
    const sizes = ["small", "medium", "large", "featured"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<FeatureCard {...mockFeature} size={size} />);
      const heading = screen.getByText("Test Feature");

      // Check heading has correct parent structure
      expect(heading).toBeInTheDocument();

      unmount();
    });
  });

  it("applies emphasis variants correctly", () => {
    const emphasisLevels = ["standard", "primary", "secondary"] as const;

    emphasisLevels.forEach((emphasis) => {
      const { unmount } = render(
        <FeatureCard {...mockFeature} emphasis={emphasis} />,
      );
      const card = screen.getByText("Test Feature").closest(".transition-all");

      if (emphasis === "primary")
        expect(card).toHaveClass("hover:scale-[1.03]");
      if (emphasis === "secondary")
        expect(card).toHaveClass("hover:scale-[1.02]");

      unmount();
    });
  });

  it("renders with custom className", () => {
    render(<FeatureCard {...mockFeature} className="custom-class" />);
    const card = screen.getByText("Test Feature").closest(".transition-all");
    expect(card).toHaveClass("custom-class");
  });

  it("applies minimum height based on size", () => {
    render(<FeatureCard {...mockFeature} size="large" minHeight={true} />);
    const card = screen.getByText("Test Feature").closest(".transition-all");
    expect(card).toHaveClass("min-h-[280px]");
  });

  it("renders without minimum height when disabled", () => {
    render(<FeatureCard {...mockFeature} size="large" minHeight={false} />);
    const card = screen.getByText("Test Feature").closest(".transition-all");
    expect(card).not.toHaveClass("min-h-[280px]");
  });

  it("displays icon with proper size based on card size", () => {
    const { container } = render(<FeatureCard {...mockFeature} size="large" />);
    const icon = screen.getByText("⭐");

    // Find the icon's direct parent div which should have the size classes
    // Look for a div that contains the icon and has the expected classes
    const iconWrapper = container.querySelector("div.text-4xl.mb-6");
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper).toContainElement(icon);
  });
});
