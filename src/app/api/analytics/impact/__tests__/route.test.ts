import { GET } from "../route";
import { NextRequest } from "next/server";

// Mock localStorage for testing
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe("Analytics Impact API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("returns default impact metrics", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("totalImpact");
    expect(data).toHaveProperty("activeUsers");
    expect(data).toHaveProperty("transformations");
    expect(data).toHaveProperty("weeklyGrowth");
    expect(data).toHaveProperty("monthlyGrowth");
    expect(data).toHaveProperty("recentActivity");
  });

  it("returns metrics from localStorage when available", async () => {
    const storedMetrics = {
      totalImpact: 1500,
      activeUsers: 200,
      transformations: 75,
      hearts: 300,
      letters: 150,
      shares: 50,
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedMetrics));

    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.totalImpact).toBe(1500);
    expect(data.activeUsers).toBe(200);
    expect(data.transformations).toBe(75);
  });

  it("calculates growth rates correctly", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.weeklyGrowth).toBeGreaterThanOrEqual(0);
    expect(data.weeklyGrowth).toBeLessThanOrEqual(100);
    expect(data.monthlyGrowth).toBeGreaterThanOrEqual(0);
    expect(data.monthlyGrowth).toBeLessThanOrEqual(100);
  });

  it("includes recent activity array", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(Array.isArray(data.recentActivity)).toBe(true);
    expect(data.recentActivity.length).toBeGreaterThan(0);

    // Check activity structure
    const activity = data.recentActivity[0];
    expect(activity).toHaveProperty("id");
    expect(activity).toHaveProperty("type");
    expect(activity).toHaveProperty("user");
    expect(activity).toHaveProperty("timestamp");
    expect(activity).toHaveProperty("impact");
  });

  it("returns correct content type header", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);

    expect(response.headers.get("content-type")).toBe("application/json");
  });

  it("handles localStorage errors gracefully", async () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });

    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact",
    );
    const response = await GET(request);
    const data = await response.json();

    // Should still return default data
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("totalImpact");
    expect(data).toHaveProperty("activeUsers");
  });

  it("filters activities by date range when provided", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics/impact?from=2024-01-01&to=2024-01-31",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.recentActivity).toBeDefined();
    // All activities should be within the date range
    data.recentActivity.forEach((activity: any) => {
      const activityDate = new Date(activity.timestamp);
      expect(activityDate.getTime()).toBeGreaterThanOrEqual(
        new Date("2024-01-01").getTime(),
      );
      expect(activityDate.getTime()).toBeLessThanOrEqual(
        new Date("2024-01-31").getTime(),
      );
    });
  });
});
