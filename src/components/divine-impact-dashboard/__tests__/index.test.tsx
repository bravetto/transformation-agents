import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DivineImpactDashboard from "../index";
import { Mail, Users } from "lucide-react";
import type { DivineImpactDashboardProps } from "../types";

// Mock the DivineParticles component to avoid WebGL issues in tests
jest.mock("@/components/divine-particles", () => ({
  DivineParticles: () => <div data-testid="mock-particles" />,
}));

// Mock the generateMockData function
jest.mock("../mock-data", () => ({
  generateMockData: () => [
    {
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
    },
    {
      id: "supporters",
      title: "Active Supporters",
      value: 800,
      icon: Users,
      gradient: "from-green-600 to-green-400",
      description: "People actively supporting the cause",
      trend: {
        value: 8.2,
        direction: "up",
        timeframe: "vs. last month",
      },
      goal: 1000,
      role: "guardian",
    },
  ],
}));

describe("DivineImpactDashboard", () => {
  const defaultProps: DivineImpactDashboardProps = {
    refreshInterval: 60000, // 1 minute
    autoRefresh: true,
    className: "test-dashboard",
  };

  it("renders without crashing", () => {
    render(<DivineImpactDashboard {...defaultProps} />);
    expect(screen.getByText("Divine Impact Dashboard")).toBeInTheDocument();
  });

  it("displays the correct number of metrics", async () => {
    render(<DivineImpactDashboard {...defaultProps} />);

    // Wait for metrics to load
    await waitFor(() => {
      expect(screen.getByText("Letters Submitted")).toBeInTheDocument();
    });

    expect(screen.getByText("Active Supporters")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 impact metrics")).toBeInTheDocument();
  });

  it("shows metric values correctly", async () => {
    render(<DivineImpactDashboard {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("150")).toBeInTheDocument();
      expect(screen.getByText("800")).toBeInTheDocument();
    });
  });

  it("shows progress bar for metrics with goals", async () => {
    render(<DivineImpactDashboard {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("80% of 1000")).toBeInTheDocument();
    });
  });

  it("allows manual refresh of data", async () => {
    render(<DivineImpactDashboard {...defaultProps} />);

    // Find and click the refresh button
    const refreshButton = screen.getByLabelText("Refresh data");
    fireEvent.click(refreshButton);

    // Verify the last updated text changes
    await waitFor(() => {
      expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });
  });

  it("accepts custom metrics", async () => {
    const customMetrics = [
      {
        id: "custom",
        title: "Custom Metric",
        value: 42,
        description: "A custom metric",
        role: "witness" as const,
      },
    ];

    render(<DivineImpactDashboard {...defaultProps} metrics={customMetrics} />);

    await waitFor(() => {
      expect(screen.getByText("Custom Metric")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
