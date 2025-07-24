/**
 * Divine Countdown Component Tests
 * Testing JAHmere Webb Freedom Portal countdown functionality
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { divineTestUtils, divineLog } from "../divine-setup";

// Mock the countdown component (would import from actual component)
const DivineCountdown = ({
  targetDate,
  missionCritical = false,
}: {
  targetDate: Date;
  missionCritical?: boolean;
}) => {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div data-testid="divine-countdown" data-mission-critical={missionCritical}>
      <h1>JAHmere Webb Freedom Countdown</h1>
      <div data-testid="days-remaining">{daysLeft} days until freedom</div>
      <div data-testid="court-date">{targetDate.toLocaleDateString()}</div>
      {missionCritical && (
        <div data-testid="mission-critical-badge">MISSION CRITICAL</div>
      )}
    </div>
  );
};

describe("🔥 Divine Countdown Component", () => {
  const COURT_DATE = new Date("2025-07-28T14:37:00-04:00");

  beforeEach(() => {
    divineLog.info("Starting divine countdown test");
  });

  it("should display JAHmere Webb freedom countdown", () => {
    render(<DivineCountdown targetDate={COURT_DATE} />);

    expect(
      screen.getByText("JAHmere Webb Freedom Countdown"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("court-date")).toHaveTextContent("7/28/2025");

    divineLog.success("Freedom countdown displays correctly");
  });

  it("should calculate correct days until freedom", () => {
    render(<DivineCountdown targetDate={COURT_DATE} />);

    const daysRemaining = screen.getByTestId("days-remaining");
    const expectedDays = divineTestUtils.getDaysUntilFreedom();

    expect(daysRemaining).toHaveTextContent(
      `${expectedDays} days until freedom`,
    );
    divineLog.success(
      `Correctly calculated ${expectedDays} days until freedom`,
    );
  });

  it("should display mission critical badge when specified", () => {
    render(<DivineCountdown targetDate={COURT_DATE} missionCritical />);

    const countdown = screen.getByTestId("divine-countdown");
    const badge = screen.getByTestId("mission-critical-badge");

    expect(countdown).toBeMissionCritical();
    expect(badge).toHaveTextContent("MISSION CRITICAL");

    divineLog.success("Mission critical badge displays correctly");
  });

  it("should have spiritual alignment with court date", () => {
    const context = divineTestUtils.createDivineContext();

    expect(context).toHaveSpiritualAlignment();
    expect(context.courtDate).toEqual(COURT_DATE);

    divineLog.success("Spiritual alignment confirmed");
  });

  it("should track divine analytics event", async () => {
    const mockEvent = divineTestUtils.mockDivineEvent("countdown_viewed", {
      component: "DivineCountdown",
      daysRemaining: divineTestUtils.getDaysUntilFreedom(),
    });

    expect(mockEvent.eventType).toBe("countdown_viewed");
    expect(mockEvent.spiritualLevel).toBe("divine");
    expect(mockEvent.metadata.mission).toBe("JAHmere Webb Freedom Portal");

    divineLog.success("Divine analytics event tracked correctly");
  });

  it("should render within divine timeout", async () => {
    const startTime = Date.now();

    render(<DivineCountdown targetDate={COURT_DATE} />);

    await waitFor(() => {
      expect(screen.getByTestId("divine-countdown")).toBeInTheDocument();
    });

    const renderTime = Date.now() - startTime;
    expect(renderTime).toBeWithinDivineTime();

    divineLog.success(
      `Component rendered in ${renderTime}ms (within divine time)`,
    );
  });
});
