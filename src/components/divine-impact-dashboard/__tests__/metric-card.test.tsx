import { render, screen } from "@testing-library/react";
import { MetricCard } from "../metric-card";
import { Mail } from "lucide-react";
import type { MetricCard as MetricCardType } from "../types";

// Mock the DivineParticles component to avoid WebGL issues in tests
jest.mock("@/components/divine-particles", () => ({
  DivineParticles: () => <div data-testid="mock-particles" />,
}));

describe("MetricCard", () => {
  const defaultMetric: MetricCardType = {
    id: "letters",
    title: "Letters Submitted",
    value: 150,
    icon: Mail,
    gradient: "from-blue-600 to-blue-400",
    description: "Support letters submitted to the court",
    trend: {
      value: 12.5,
      direction: "up",
      timeframe: "vs. last week",
    },
    role: "messenger",
  };

  const metricWithGoal: MetricCardType = {
    ...defaultMetric,
    id: "supporters",
    title: "Active Supporters",
    value: 800,
    goal: 1000,
    role: "guardian",
  };

  const metricWithSuffix: MetricCardType = {
    ...defaultMetric,
    id: "countries",
    title: "Countries Reached",
    value: 42,
    suffix: " countries",
    role: "witness",
  };

  const metricWithDownTrend: MetricCardType = {
    ...defaultMetric,
    id: "engagement",
    title: "Engagement",
    trend: {
      value: 5.3,
      direction: "down",
      timeframe: "vs. yesterday",
    },
    role: "lightworker",
  };

  it("renders basic metric correctly", () => {
    render(<MetricCard metric={defaultMetric} />);

    expect(screen.getByText("Letters Submitted")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(
      screen.getByText("Support letters submitted to the court"),
    ).toBeInTheDocument();
  });

  it("renders trend indicator correctly", () => {
    render(<MetricCard metric={defaultMetric} />);

    expect(screen.getByText("12.5%")).toBeInTheDocument();
    expect(screen.getByText("vs. last week")).toBeInTheDocument();
  });

  it("renders goal progress bar when goal is provided", () => {
    render(<MetricCard metric={metricWithGoal} />);

    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("80% of 1000")).toBeInTheDocument();
  });

  it("renders suffix correctly", () => {
    render(<MetricCard metric={metricWithSuffix} />);

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("countries")).toBeInTheDocument();
  });

  it("renders down trend with correct color", () => {
    render(<MetricCard metric={metricWithDownTrend} />);

    expect(screen.getByText("5.3%")).toBeInTheDocument();

    // Find the trend container and check it has the red color class
    const trendElement = screen.getByText("5.3%").parentElement;
    expect(trendElement).toHaveClass("text-red-500");
  });

  it("renders with animation when animate prop is true", () => {
    render(<MetricCard metric={defaultMetric} animate={true} />);

    // This is a bit tricky to test directly, but we can check that the
    // motion.div elements are rendered by checking for the content
    expect(screen.getByText("150")).toBeInTheDocument();
  });
});
