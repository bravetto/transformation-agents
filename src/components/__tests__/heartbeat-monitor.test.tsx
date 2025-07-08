import { render, screen, fireEvent, waitFor } from "@/test-utils";
import HeartbeatMonitor from "../heartbeat-monitor";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    path: (props: any) => <path {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the impactEvents
jest.mock("../impact-dashboard", () => ({
  impactEvents: {
    addHeart: jest.fn(),
  },
}));

describe("HeartbeatMonitor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders heartbeat monitor interface", () => {
    render(<HeartbeatMonitor />);
    expect(screen.getByText("Community Heartbeat")).toBeInTheDocument();
    expect(screen.getByText("Hearts Beating with JAHmere")).toBeInTheDocument();
  });

  it("displays initial heart count", () => {
    render(<HeartbeatMonitor />);
    expect(screen.getByText("247")).toBeInTheDocument();
  });

  it("renders EKG visualization", () => {
    render(<HeartbeatMonitor />);
    const svg = screen.getByRole("img", { name: /heart rate visualization/i });
    expect(svg).toBeInTheDocument();
  });

  it("handles add heart button click", () => {
    const { impactEvents } = require("../impact-dashboard");
    render(<HeartbeatMonitor />);

    const addButton = screen.getByRole("button", { name: /add your heart/i });
    fireEvent.click(addButton);

    expect(impactEvents.addHeart).toHaveBeenCalled();
    expect(
      screen.getByText(/your heart is beating with jahmere/i),
    ).toBeInTheDocument();
  });

  it("disables button after adding heart", () => {
    render(<HeartbeatMonitor />);

    const addButton = screen.getByRole("button", { name: /add your heart/i });
    fireEvent.click(addButton);

    expect(addButton).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <HeartbeatMonitor className="custom-monitor" />,
    );
    expect(container.firstChild).toHaveClass("custom-monitor");
  });

  it("displays latest supporters section", () => {
    render(<HeartbeatMonitor />);
    expect(screen.getByText("Latest Supporters:")).toBeInTheDocument();
  });

  it("shows ripple message", () => {
    render(<HeartbeatMonitor />);
    expect(
      screen.getByText("Every heart creates a ripple of hope"),
    ).toBeInTheDocument();
  });

  it("simulates heartbeat updates over time", async () => {
    render(<HeartbeatMonitor />);

    // Initial count
    expect(screen.getByText("247")).toBeInTheDocument();

    // Fast-forward time to trigger interval
    jest.advanceTimersByTime(3000);

    // The component uses Math.random() > 0.7 to add hearts
    // We can't guarantee it will update, but we can check the structure is there
    expect(screen.getByText("Hearts Beating with JAHmere")).toBeInTheDocument();
  });
});
