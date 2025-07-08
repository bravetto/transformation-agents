import { render, screen } from "@/test-utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../card";

describe("Card Component", () => {
  it("renders with basic content", () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>,
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with all sections", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  it("applies variant styles correctly", () => {
    const { rerender } = render(
      <Card variant="default">
        <CardContent>Default card</CardContent>
      </Card>,
    );

    let card = screen.getByText("Default card").closest("div")?.parentElement;
    expect(card).toHaveClass("bg-pure-white");

    rerender(
      <Card variant="outline">
        <CardContent>Outline card</CardContent>
      </Card>,
    );

    card = screen.getByText("Outline card").closest("div")?.parentElement;
    expect(card).toHaveClass("border-hope-gold");
  });

  it("applies padding variants correctly", () => {
    const { rerender } = render(
      <Card padding="small">
        <CardContent>Small padding</CardContent>
      </Card>,
    );

    let card = screen.getByText("Small padding").closest("div")?.parentElement;
    expect(card).toHaveClass("p-4");

    rerender(
      <Card padding="large">
        <CardContent>Large padding</CardContent>
      </Card>,
    );

    card = screen.getByText("Large padding").closest("div")?.parentElement;
    expect(card).toHaveClass("p-8");
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-class">
        <CardContent>Custom card</CardContent>
      </Card>,
    );

    const card = screen.getByText("Custom card").closest("div")?.parentElement;
    expect(card).toHaveClass("custom-class");
  });
});
