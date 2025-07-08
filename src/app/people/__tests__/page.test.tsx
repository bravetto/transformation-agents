import { render, screen, waitFor } from "@testing-library/react";
import PeoplePage from "../page";
import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock components
jest.mock("@/components/people/interactive-person-grid", () => ({
  __esModule: true,
  default: () => <div data-testid="person-grid">Interactive Person Grid</div>,
}));

jest.mock("@/components/section", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <section data-testid="section" {...props}>
      {children}
    </section>
  ),
}));

jest.mock("@/components/ui/typography", () => ({
  Heading: ({ children, ...props }: any) => (
    <h1 data-testid="heading" {...props}>
      {children}
    </h1>
  ),
  Text: ({ children, ...props }: any) => (
    <p data-testid="text" {...props}>
      {children}
    </p>
  ),
}));

// Mock data
jest.mock("@/data/people", () => ({
  people: [
    {
      id: "jahmere-webb",
      name: "JAHmere Webb",
      role: "Founder & CEO",
      bio: "Test bio",
      image: "/images/test.jpg",
    },
    {
      id: "michael-mataluni",
      name: "Michael Mataluni",
      role: "CTO",
      bio: "Test bio 2",
      image: "/images/test2.jpg",
    },
  ],
}));

describe("PeoplePage", () => {
  it("renders the page title and description", async () => {
    render(await PeoplePage());

    await waitFor(() => {
      expect(screen.getByTestId("heading")).toHaveTextContent("Our People");
      expect(screen.getByTestId("text")).toHaveTextContent(
        /Meet the visionaries/,
      );
    });
  });

  it("renders the interactive person grid", async () => {
    render(await PeoplePage());

    await waitFor(() => {
      expect(screen.getByTestId("person-grid")).toBeInTheDocument();
    });
  });

  it("has proper page structure", async () => {
    render(await PeoplePage());

    await waitFor(() => {
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("py-24");
    });
  });
});
