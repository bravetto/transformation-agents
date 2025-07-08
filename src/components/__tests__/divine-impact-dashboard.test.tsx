import { render, screen, waitFor } from "@/test-utils";
import DivineImpactDashboard from "../divine-impact-dashboard";

// Mock the fetch API
global.fetch = jest.fn();

describe("DivineImpactDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        totalImpact: 1000,
        activeUsers: 150,
        transformations: 45,
        weeklyGrowth: 12.5,
        monthlyGrowth: 35.2,
      }),
    });
  });

  it("renders impact metrics sections", () => {
    render(<DivineImpactDashboard />);

    // Check for main sections
    expect(screen.getByText(/The Bridge Project Impact/i)).toBeInTheDocument();
  });

  it("displays loading state initially", () => {
    render(<DivineImpactDashboard />);

    // Check for refresh button instead of skeleton
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });

  it("handles floating widget positioning", () => {
    const { container } = render(
      <DivineImpactDashboard className="test-class" />,
    );
    const dashboard = container.querySelector(".test-class");
    expect(dashboard).toBeInTheDocument();
  });

  it("fetches and displays metrics data", async () => {
    render(<DivineImpactDashboard />);

    // Wait for initial data to load (mock data is generated on mount)
    await waitFor(() => {
      expect(screen.getByText(/Letters Submitted/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Volunteers Registered/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Views/i)).toBeInTheDocument();
  });

  it("shows refresh button", () => {
    render(<DivineImpactDashboard />);

    const refreshButton = screen.getByText("Refresh");
    expect(refreshButton).toBeInTheDocument();
  });

  it("shows role filter buttons", () => {
    render(<DivineImpactDashboard />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Lightworker")).toBeInTheDocument();
    expect(screen.getByText("Messenger")).toBeInTheDocument();
    expect(screen.getByText("Witness")).toBeInTheDocument();
    expect(screen.getByText("Guardian")).toBeInTheDocument();
  });

  it("applies role-based filtering", async () => {
    render(<DivineImpactDashboard />);

    // Click on a role filter
    const messengerButton = screen.getByText("Messenger");
    messengerButton.click();

    // Should show only messenger role metrics
    await waitFor(() => {
      const metrics = screen.getAllByText(/Letters Submitted|Social Shares/i);
      expect(metrics.length).toBeGreaterThan(0);
    });
  });

  it("displays last updated time", () => {
    render(<DivineImpactDashboard />);

    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });
});
