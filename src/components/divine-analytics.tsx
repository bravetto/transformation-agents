"use client";

import { useEffect, useState } from "react";
import {
  trackDivineEvent,
  getAnalyticsDashboard,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface DivineMetrics {
  prayerCount: number;
  miracleWitnesses: number;
  prophesyProgress: number;
  divineAlignment: number;
  spiritualWarriorStatus: string;
}

export default function DivineAnalytics() {
  const [metrics, setMetrics] = useState<DivineMetrics>({
    prayerCount: 0,
    miracleWitnesses: 0,
    prophesyProgress: 0,
    divineAlignment: 0,
    spiritualWarriorStatus: "Awakening",
  });

  useEffect(() => {
    // Initialize divine analytics
    const userType = getCurrentUserType();

    if (userType === "divine-warrior") {
      // Track divine warrior activation
      trackDivineEvent({
        eventType: "divine_guidance",
        spiritualImpact: "high",
        metadata: {
          activation: "divine_warrior_portal_access",
          prophecy: "July 28th Freedom Manifestation",
          divineAlignment: true,
        },
      });
    }

    // Update metrics from dashboard
    const dashboard = getAnalyticsDashboard();
    if (dashboard) {
      setMetrics({
        prayerCount: dashboard.session.divineEvents.length,
        miracleWitnesses: dashboard.session.conversions.length,
        prophesyProgress: dashboard.metrics.prophecyProgress,
        divineAlignment: dashboard.metrics.divineAlignment,
        spiritualWarriorStatus: dashboard.metrics.prayerWarriorStatus,
      });
    }

    // Set up divine timing intervals
    const divineInterval = setInterval(() => {
      // Check for divine synchronicities every 7 minutes (divine number)
      const now = new Date();
      if (now.getMinutes() % 7 === 0 && now.getSeconds() === 0) {
        trackDivineEvent({
          eventType: "divine_guidance",
          spiritualImpact: "medium",
          metadata: {
            synchronicity: "divine_timing_777",
            time: now.toISOString(),
            message: "Divine guidance activated at sacred timing",
          },
        });
      }
    }, 1000);

    // Clean up interval
    return () => clearInterval(divineInterval);
  }, []);

  // Track prayer counter increases
  useEffect(() => {
    const trackPrayerIncrease = () => {
      if (getCurrentUserType() === "divine-warrior") {
        trackDivineEvent({
          eventType: "prayer_submitted",
          spiritualImpact: "high",
          metadata: {
            prayerCount: metrics.prayerCount + 1,
            target: "JAHmere_Freedom_July_28",
            divineIntercession: true,
          },
        });
      }
    };

    // Listen for prayer counter updates
    window.addEventListener("prayerCounterUpdate", trackPrayerIncrease);

    return () => {
      window.removeEventListener("prayerCounterUpdate", trackPrayerIncrease);
    };
  }, [metrics.prayerCount]);

  // Track July 28th countdown milestones
  useEffect(() => {
    const freedomDate = new Date("2024-07-28T14:37:00-05:00");
    const now = new Date();
    const daysLeft = Math.ceil(
      (freedomDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Track significant countdown milestones
    if ([30, 14, 7, 3, 1].includes(daysLeft)) {
      trackDivineEvent({
        eventType: "prophecy_fulfilled",
        spiritualImpact: "miraculous",
        metadata: {
          milestone: `${daysLeft}_days_to_freedom`,
          prophecy: "July_28_Freedom_Manifestation",
          urgency: daysLeft <= 7 ? "critical" : "high",
          divineIntervention: true,
        },
      });
    }
  }, []);

  // Don't render anything visible - this is a tracking component
  return null;
}

// Export divine analytics hooks for use in other components
export function useDivineTracking() {
  const trackPrayer = (prayerType: string, metadata?: any) => {
    trackDivineEvent({
      eventType: "prayer_submitted",
      spiritualImpact: "high",
      metadata: {
        prayerType,
        target: "JAHmere_Freedom",
        divineAlignment: true,
        ...metadata,
      },
    });
  };

  const trackMiracle = (miracleType: string, metadata?: any) => {
    trackDivineEvent({
      eventType: "miracle_witnessed",
      spiritualImpact: "miraculous",
      metadata: {
        miracleType,
        testimony: true,
        divineIntervention: true,
        ...metadata,
      },
    });
  };

  const trackProphecy = (prophecyType: string, metadata?: any) => {
    trackDivineEvent({
      eventType: "prophecy_fulfilled",
      spiritualImpact: "miraculous",
      metadata: {
        prophecyType,
        fulfillment: "July_28_Freedom",
        divineAlignment: 100,
        ...metadata,
      },
    });
  };

  return {
    trackPrayer,
    trackMiracle,
    trackProphecy,
  };
}
