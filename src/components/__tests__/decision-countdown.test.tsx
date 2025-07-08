"use client";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DecisionCountdown from "@/components/decision-countdown";
import "@testing-library/jest-dom";

// Mock the PropheticCountdown component since we've already tested it separately
jest.mock("@/components/prophetic-countdown", () => ({
  __esModule: true,
  default: ({ milestone, targetDate, onMilestoneReached }: any) => (
    <div data-testid="prophetic-countdown" data-milestone={milestone}>
      Countdown to {new Date(targetDate).toDateString()}
      <button onClick={onMilestoneReached}>Trigger Milestone</button>
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("DecisionCountdown", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("renders the inline countdown correctly", () => {
    const targetDate = new Date(new Date().setDate(new Date().getDate() + 14));

    render(
      <DecisionCountdown
        targetDate={targetDate}
        ctaLink="/test-link"
        ctaText="Test CTA"
      />,
    );

    // Check that the component renders with the right content
    expect(screen.getByText("Judge Ferrero's Decision")).toBeInTheDocument();
    expect(screen.getByTestId("prophetic-countdown")).toBeInTheDocument();
    expect(screen.getByText("Test CTA")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
  });

  it("renders the modal when showModal is true and user has not seen it", () => {
    const targetDate = new Date(new Date().setDate(new Date().getDate() + 14));
    const handleClose = jest.fn();

    render(
      <DecisionCountdown
        targetDate={targetDate}
        showModal={true}
        onClose={handleClose}
        ctaLink="/test-link"
        ctaText="Test CTA"
      />,
    );

    // Check that the modal content renders
    expect(
      screen.getByText("Judge Ferrero's Decision is Coming"),
    ).toBeInTheDocument();
    expect(screen.getByText("The time to act is now.")).toBeInTheDocument();
    expect(screen.getByText("Test CTA")).toBeInTheDocument();
    expect(screen.getByText("Maybe Later")).toBeInTheDocument();
  });

  it("does not render the modal if user has seen it before", () => {
    // Set localStorage to indicate user has seen the countdown
    localStorageMock.setItem("hasSeenDecisionCountdown", "true");

    const targetDate = new Date(new Date().setDate(new Date().getDate() + 14));

    render(
      <DecisionCountdown
        targetDate={targetDate}
        showModal={true}
        ctaLink="/test-link"
        ctaText="Test CTA"
      />,
    );

    // Modal should not be shown
    expect(
      screen.queryByText("Judge Ferrero's Decision is Coming"),
    ).not.toBeInTheDocument();
  });

  it("handles the close action correctly", () => {
    const targetDate = new Date(new Date().setDate(new Date().getDate() + 14));
    const handleClose = jest.fn();

    render(
      <DecisionCountdown
        targetDate={targetDate}
        showModal={true}
        onClose={handleClose}
        ctaLink="/test-link"
        ctaText="Test CTA"
      />,
    );

    // Click the "Maybe Later" button
    fireEvent.click(screen.getByText("Maybe Later"));

    // Check that localStorage was updated
    expect(localStorageMock.getItem("hasSeenDecisionCountdown")).toBe("true");

    // Check that the onClose callback was called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("triggers milestone callback when reached", () => {
    const targetDate = new Date(new Date().setDate(new Date().getDate() + 14));
    const consoleSpy = jest.spyOn(console, "log");

    render(
      <DecisionCountdown
        targetDate={targetDate}
        ctaLink="/test-link"
        ctaText="Test CTA"
      />,
    );

    // Trigger the milestone callback
    fireEvent.click(screen.getByText("Trigger Milestone"));

    // Check that the console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith("Decision time has arrived!");
  });
});
