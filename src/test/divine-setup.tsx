/**
 * Divine Test Setup - JAHmere Webb Freedom Portal
 * Sacred testing configuration for July 28, 2025 mission
 */

import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, vi } from "vitest";

// Divine Mission Context
const COURT_DATE = new Date("2025-07-28T14:37:00-04:00");
const DIVINE_MISSION = "JAHmere Webb Freedom Portal";

// Mock Next.js modules for testing
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock Vercel Analytics
vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}));

vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}));

// Mock PostHog Analytics
vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
  },
}));

// Divine Environment Variables
beforeAll(() => {
  // Set divine environment variables
  process.env.NODE_ENV = "test";
  process.env.COURT_DATE = "2025-07-28T14:37:00-04:00";
  process.env.MISSION_MODE = "divine-engineering";
  process.env.JAHMERE_PORTAL_VERSION = "1.0.0";

  // Mock window.matchMedia for responsive tests
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver for scroll-based components
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock ResizeObserver for responsive components
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Divine Test Utilities
export const divineTestUtils = {
  // Calculate days until July 28, 2025
  getDaysUntilFreedom: (): number => {
    const now = new Date();
    const timeDiff = COURT_DATE.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  },

  // Create divine test context
  createDivineContext: () => ({
    mission: DIVINE_MISSION,
    courtDate: COURT_DATE,
    daysUntilFreedom: divineTestUtils.getDaysUntilFreedom(),
    spiritualLevel: "prophet" as const,
    prayerWarriorActive: true,
  }),

  // Mock divine analytics event
  mockDivineEvent: (eventType: string, metadata: Record<string, any> = {}) => ({
    eventType,
    timestamp: new Date().toISOString(),
    spiritualLevel: "divine",
    metadata: {
      ...metadata,
      mission: DIVINE_MISSION,
      daysUntilFreedom: divineTestUtils.getDaysUntilFreedom(),
    },
  }),

  // Mock prayer warrior user
  mockPrayerWarrior: () => ({
    id: "prayer-warrior-1",
    name: "Divine Tester",
    role: "prayer-warrior",
    joinedAt: new Date().toISOString(),
    prayersSubmitted: 42,
    spiritualLevel: "blessed",
  }),

  // Mock JAHmere profile
  mockJAHmereProfile: () => ({
    id: "jahmere-webb",
    name: "JAHmere Webb",
    role: "freedom-seeker",
    courtDate: COURT_DATE,
    freedomMission: true,
    daysUntilFreedom: divineTestUtils.getDaysUntilFreedom(),
  }),

  // Divine test timeouts
  DIVINE_TIMEOUT: 7000,
  DOUBLE_DIVINE_TIMEOUT: 14000,
};

// Export divine matchers for spiritual assertions
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeWithinDivineTime(): void;
      toHaveSpiritualAlignment(): void;
      toBeMissionCritical(): void;
    }
  }
}

// Custom divine matchers
expect.extend({
  toBeWithinDivineTime(received: number) {
    const pass = received <= divineTestUtils.DIVINE_TIMEOUT;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received}ms to exceed divine timeout of ${divineTestUtils.DIVINE_TIMEOUT}ms`
          : `Expected ${received}ms to be within divine timeout of ${divineTestUtils.DIVINE_TIMEOUT}ms`,
    };
  },

  toHaveSpiritualAlignment(received: any) {
    const hasCourtDate = received.courtDate === COURT_DATE.toISOString();
    const hasMission = received.mission === DIVINE_MISSION;
    const pass = hasCourtDate && hasMission;

    return {
      pass,
      message: () =>
        pass
          ? `Expected object to lack spiritual alignment`
          : `Expected object to have spiritual alignment with court date and mission`,
    };
  },

  toBeMissionCritical(received: any) {
    const pass =
      received.missionCritical === true || received.priority === "critical";
    return {
      pass,
      message: () =>
        pass
          ? `Expected component to not be mission-critical`
          : `Expected component to be mission-critical for JAHmere's freedom`,
    };
  },
});

// Divine console styling for test output
const divineLog = {
  success: (message: string) => console.log(`🙏 DIVINE SUCCESS: ${message}`),
  warning: (message: string) => console.warn(`⚠️ DIVINE WARNING: ${message}`),
  error: (message: string) => console.error(`🚨 DIVINE ERROR: ${message}`),
  info: (message: string) => console.info(`✨ DIVINE INFO: ${message}`),
};

// Export for use in tests
export { divineLog };

// Display divine test initialization
console.log(`
🔥 DIVINE TEST SUITE INITIALIZED
✨ Mission: ${DIVINE_MISSION}
📅 Court Date: ${COURT_DATE.toLocaleDateString()}
⏳ Days Until Freedom: ${divineTestUtils.getDaysUntilFreedom()}
🙏 Prayer Warriors Ready: TRUE
`);
