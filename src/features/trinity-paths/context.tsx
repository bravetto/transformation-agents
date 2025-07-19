"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { logger } from "@/lib/logger";
import type {
  PathType,
  PathUser,
  ChampionPathData,
  EvidencePathData,
  YouthPathData,
  ConvergenceData,
} from "./types";

interface TrinityPathContextType {
  // User State
  currentUser: PathUser | null;
  isPathSelected: boolean;

  // Path Selection
  selectPath: (pathType: PathType, metadata?: any) => void;
  resetPath: () => void;

  // Path Data
  championData: ChampionPathData | null;
  evidenceData: EvidencePathData | null;
  youthData: YouthPathData | null;

  // Convergence
  convergenceData: ConvergenceData | null;

  // Actions
  updateProgress: (stepId: string) => void;
  addMilestone: (milestone: any) => void;
  trackEngagement: (action: string, data?: any) => void;

  // Analytics
  getAnalytics: () => any;

  // Utilities
  isLoading: boolean;
  error: string | null;
}

const TrinityPathContext = createContext<TrinityPathContextType | undefined>(
  undefined,
);

export function TrinityPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<PathUser | null>(null);
  const [championData, setChampionData] = useState<ChampionPathData | null>(
    null,
  );
  const [evidenceData, setEvidenceData] = useState<EvidencePathData | null>(
    null,
  );
  const [youthData, setYouthData] = useState<YouthPathData | null>(null);
  const [convergenceData, setConvergenceData] =
    useState<ConvergenceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("trinity-path-user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        logger.info("Trinity path user loaded from storage", {
          pathType: user.type,
        });
      } catch (err) {
        logger.error("Failed to load user from storage", err);
      }
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("trinity-path-user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const selectPath = useCallback((pathType: PathType, metadata?: any) => {
    const newUser: PathUser = {
      id: `user-${Date.now()}`,
      type: pathType,
      selectedAt: new Date(),
      progress: {
        currentStep: 0,
        totalSteps: getStepsForPath(pathType),
        completedSteps: [],
        milestones: [],
        engagementScore: 0,
      },
      metadata: metadata || {},
    };

    setCurrentUser(newUser);

    // Initialize path-specific data
    switch (pathType) {
      case "champion":
        setChampionData({
          networkConnections: [],
          impactMetrics: {
            lettersWritten: 0,
            networksActivated: 0,
            youthMentored: 0,
            eventsOrganized: 0,
          },
          mentorshipStatus: {
            willingToMentor: false,
            mentorshipStyle: [],
            availability: "",
            commitment: "",
          },
        });
        break;
      case "evidence":
        setEvidenceData({
          dataInteractions: [],
          researchContributions: [],
          policyEngagement: [],
          expertiseAreas: [],
        });
        break;
      case "youth":
        setYouthData({
          warriorProfile: {
            name: "",
            age: 0,
            location: "",
            skills: [],
            passions: [],
            availability: "",
            commitment: "casual",
          },
          goodDeeds: [],
          communityEngagement: {
            eventsAttended: 0,
            eventsOrganized: 0,
            peersRecruited: 0,
          },
          missionProgress: {
            completedMissions: [],
            totalPoints: 0,
            level: 1,
            badges: [],
          },
        });
        break;
    }

    logger.journey("Path Selected", pathType, { metadata });

    // Track analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "path_selected", {
        event_category: "user_journey",
        event_label: pathType,
        value: 1,
      });
    }
  }, []);

  const resetPath = useCallback(() => {
    setCurrentUser(null);
    setChampionData(null);
    setEvidenceData(null);
    setYouthData(null);
    localStorage.removeItem("trinity-path-user");
    logger.info("Trinity path reset");
  }, []);

  const updateProgress = useCallback(
    (stepId: string) => {
      if (!currentUser) return;

      const updatedUser = {
        ...currentUser,
        progress: {
          ...currentUser.progress,
          currentStep: currentUser.progress.currentStep + 1,
          completedSteps: [...currentUser.progress.completedSteps, stepId],
          engagementScore: currentUser.progress.engagementScore + 10,
        },
      };

      setCurrentUser(updatedUser);
      logger.journey("Progress Updated", currentUser.type, {
        stepId,
        newStep: updatedUser.progress.currentStep,
      });
    },
    [currentUser],
  );

  const addMilestone = useCallback(
    (milestone: any) => {
      if (!currentUser) return;

      const updatedUser = {
        ...currentUser,
        progress: {
          ...currentUser.progress,
          milestones: [...currentUser.progress.milestones, milestone],
          engagementScore: currentUser.progress.engagementScore + 25,
        },
      };

      setCurrentUser(updatedUser);
      logger.divine("Milestone Achieved", {
        milestone,
        pathType: currentUser.type,
      });
    },
    [currentUser],
  );

  const trackEngagement = useCallback(
    (action: string, data?: any) => {
      if (!currentUser) return;

      const updatedUser = {
        ...currentUser,
        progress: {
          ...currentUser.progress,
          engagementScore: currentUser.progress.engagementScore + 5,
        },
      };

      setCurrentUser(updatedUser);
      logger.analytics("Engagement Tracked", {
        action,
        data,
        pathType: currentUser.type,
      });
    },
    [currentUser],
  );

  const getAnalytics = useCallback(() => {
    if (!currentUser) return null;

    return {
      pathType: currentUser.type,
      progress: currentUser.progress,
      timeSpent: Date.now() - currentUser.selectedAt.getTime(),
      engagementLevel: getEngagementLevel(currentUser.progress.engagementScore),
      completionRate:
        currentUser.progress.currentStep / currentUser.progress.totalSteps,
    };
  }, [currentUser]);

  const isPathSelected = !!currentUser;

  const contextValue: TrinityPathContextType = {
    currentUser,
    isPathSelected,
    selectPath,
    resetPath,
    championData,
    evidenceData,
    youthData,
    convergenceData,
    updateProgress,
    addMilestone,
    trackEngagement,
    getAnalytics,
    isLoading,
    error,
  };

  return (
    <TrinityPathContext.Provider value={contextValue}>
      {children}
    </TrinityPathContext.Provider>
  );
}

export function useTrinityPath() {
  const context = useContext(TrinityPathContext);
  if (context === undefined) {
    throw new Error("useTrinityPath must be used within a TrinityPathProvider");
  }
  return context;
}

// Helper functions
function getStepsForPath(pathType: PathType): number {
  switch (pathType) {
    case "champion":
      return 8; // Legacy assessment → Network activation → Mentorship → Impact
    case "evidence":
      return 6; // Data exploration → Research → Policy engagement → Testimony
    case "youth":
      return 10; // Warrior creation → Missions → Community → Leadership
    default:
      return 5;
  }
}

function getEngagementLevel(
  score: number,
): "low" | "medium" | "high" | "champion" {
  if (score < 50) return "low";
  if (score < 150) return "medium";
  if (score < 300) return "high";
  return "champion";
}
