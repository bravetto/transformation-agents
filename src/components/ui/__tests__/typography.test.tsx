import { render, screen } from "@/test-utils";
import { Heading, Text, Quote } from "../typography";

describe("Typography Components", () => {
  describe("Heading", () => {
    it("renders with correct text and level", () => {
      render(<Heading as="h1">Test Heading</Heading>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Test Heading");
    });

    it("applies correct size classes", () => {
      render(
        <Heading as="h1" size="h2">
          Large Heading
        </Heading>,
      );
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-4xl");
    });

    it("applies color variants correctly", () => {
      render(
        <Heading as="h2" textColor="primary">
          Primary Heading
        </Heading>,
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-gentle-charcoal");
    });

    it("renders different heading levels", () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;
      levels.forEach((level) => {
        const { unmount } = render(
          <Heading as={`h${level}` as any}>Heading {level}</Heading>,
        );
        const heading = screen.getByRole("heading", { level });
        expect(heading).toBeInTheDocument();
        unmount();
      });
    });

    it("applies custom className", () => {
      render(
        <Heading as="h1" className="custom-class">
          Custom Heading
        </Heading>,
      );
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("custom-class");
    });
  });

  describe("Text", () => {
    it("renders with correct content", () => {
      render(<Text>Test text content</Text>);
      expect(screen.getByText("Test text content")).toBeInTheDocument();
    });

    it("applies size variants", () => {
      render(<Text size="lg">Large text</Text>);
      const text = screen.getByText("Large text");
      expect(text).toHaveClass("text-lg");
    });

    it("applies weight variants", () => {
      render(<Text weight="bold">Bold text</Text>);
      const text = screen.getByText("Bold text");
      expect(text).toHaveClass("font-bold");
    });

    it("applies color variants", () => {
      render(<Text textColor="accent">Accent text</Text>);
      const text = screen.getByText("Accent text");
      expect(text).toHaveClass("text-hope-gold");
    });

    it("renders as different HTML elements", () => {
      const { container } = render(<Text as="span">Span text</Text>);
      const span = container.querySelector("span");
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent("Span text");
    });
  });

  describe("Quote", () => {
    it("renders quote with attribution", () => {
      render(<Quote attribution="Test Author">This is a test quote</Quote>);
      expect(screen.getByText("This is a test quote")).toBeInTheDocument();
      expect(screen.getByText("— Test Author")).toBeInTheDocument();
    });

    it("renders without attribution", () => {
      render(<Quote>Quote without author</Quote>);
      expect(screen.getByText("Quote without author")).toBeInTheDocument();
      expect(screen.queryByText(/—/)).not.toBeInTheDocument();
    });

    it("applies variant styles", () => {
      render(
        <Quote variant="default" attribution="Author">
          Featured quote
        </Quote>,
      );
      const quote = screen.getByText("Featured quote");
      expect(quote).toHaveClass("border-l-4");
    });
  });
});
