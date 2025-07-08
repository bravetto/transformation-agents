import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../page";
import "@testing-library/jest-dom";

// Mock components
jest.mock("@/components/hero", () => ({
  __esModule: true,
  default: () => <div data-testid="hero">Hero Component</div>,
}));

jest.mock("@/components/section", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <section data-testid="section" {...props}>
      {children}
    </section>
  ),
}));

jest.mock("@/components/feature-card", () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="feature-card">{title}</div>,
}));

jest.mock("@/components/youth-mentorship", () => ({
  __esModule: true,
  default: () => <div data-testid="youth-mentorship">Youth Mentorship</div>,
}));

jest.mock("@/components/risk-mitigation", () => ({
  __esModule: true,
  default: () => <div data-testid="risk-mitigation">Risk Mitigation</div>,
}));

jest.mock("@/components/footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>,
}));

jest.mock("@/components/divine-particles", () => ({
  __esModule: true,
  default: () => <div data-testid="divine-particles">Particles</div>,
}));

jest.mock("@/components/prophetic-countdown", () => ({
  __esModule: true,
  default: () => <div data-testid="prophetic-countdown">Countdown</div>,
}));

describe("HomePage", () => {
  it("renders all main sections", async () => {
    render(await HomePage());

    await waitFor(() => {
      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getAllByTestId("section")).toHaveLength(4);
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });

  it("renders feature cards", async () => {
    render(await HomePage());

    await waitFor(() => {
      const featureCards = screen.getAllByTestId("feature-card");
      expect(featureCards).toHaveLength(3);
      expect(screen.getByText("Youth Mentorship")).toBeInTheDocument();
      expect(screen.getByText("Strategic Partnerships")).toBeInTheDocument();
      expect(screen.getByText("Community Impact")).toBeInTheDocument();
    });
  });

  it("renders special components", async () => {
    render(await HomePage());

    await waitFor(() => {
      expect(screen.getByTestId("youth-mentorship")).toBeInTheDocument();
      expect(screen.getByTestId("risk-mitigation")).toBeInTheDocument();
      expect(screen.getByTestId("divine-particles")).toBeInTheDocument();
      expect(screen.getByTestId("prophetic-countdown")).toBeInTheDocument();
    });
  });

  it("has proper section structure", async () => {
    render(await HomePage());

    await waitFor(() => {
      const sections = screen.getAllByTestId("section");
      expect(sections[0]).toHaveClass("relative");
      expect(sections[1]).toHaveAttribute("id", "features");
    });
  });
});
