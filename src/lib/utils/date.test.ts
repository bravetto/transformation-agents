import { describe, it, expect } from "vitest";

// Example utility function
export function getDaysUntil(targetDate: string): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

describe("getDaysUntil", () => {
  it("calculates days until future date", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);

    const days = getDaysUntil(futureDate.toISOString());
    expect(days).toBe(10);
  });

  it("returns negative days for past dates", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);

    const days = getDaysUntil(pastDate.toISOString());
    expect(days).toBe(-5);
  });
});
