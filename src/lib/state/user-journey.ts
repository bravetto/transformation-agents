import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logger } from "../logger";

export type PathType = "champion" | "evidence" | "youth" | null;

interface JourneyProgress {
  stepsCompleted: string[];
  lastInteraction: Date;
  engagementScore: number;
  currentMilestone: string;
  pathStartedAt?: Date;
  completionPercentage: number;
}

interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  impactGoals?: string[];
  warriorName?: string;
  assessmentData?: Record<string, any>;
}

interface ChampionData {
  legacyAssessment?: {
    influence: number;
    platform: string[];
    commitment: string;
    mentorshipCapacity: number;
  };
  networkConnections: number;
  impactMultiplier: number;
  lettersWritten: number;
  youthMentored: number;
  championsCertified: number;
}

interface EvidenceData {
  researchContributions: number;
  dataInteractions: number;
  evidenceShared: number;
  policyEngagement: number;
  factChecksCompleted: number;
  visualizationsViewed: string[];
}

interface YouthData {
  warriorProfile?: {
    warriorName: string;
    realName: string;
    age: number;
    mission: string;
    superpower: string;
    avatar: string;
  };
  level: number;
  experience: number;
  missionsCompleted: string[];
  badgesEarned: string[];
  goodDeedsCount: number;
  mentorshipStatus: "seeking" | "matched" | "mentoring";
}

interface AnalyticsData {
  sessionStart: Date;
  totalTimeSpent: number;
  pagesVisited: string[];
  conversionsCompleted: string[];
  shareActions: number;
  impactScore: number;
}

interface UserJourneyState {
  // Core State
  selectedPath: PathType;
  journeyProgress: JourneyProgress;
  userProfile: UserProfile;

  // Path-specific Data
  championData: ChampionData;
  evidenceData: EvidenceData;
  youthData: YouthData;

  // Analytics
  analytics: AnalyticsData;

  // Actions
  selectPath: (path: PathType) => void;
  resetPath: () => void;
  updateProgress: (step: string, metadata?: Record<string, any>) => void;
  addMilestone: (milestone: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateChampionData: (updates: Partial<ChampionData>) => void;
  updateEvidenceData: (updates: Partial<EvidenceData>) => void;
  updateYouthData: (updates: Partial<YouthData>) => void;
  trackEngagement: (action: string, metadata?: Record<string, any>) => void;
  calculateImpact: () => number;
  getAnalytics: () => AnalyticsData;
  incrementShareActions: () => void;
  addConversion: (conversion: string) => void;
}

const getStepValue = (step: string): number => {
  const stepValues: Record<string, number> = {
    // Entry actions
    path_selected: 10,
    profile_created: 15,

    // Champion path
    dungy_video_watched: 25,
    legacy_assessment_completed: 50,
    letter_started: 30,
    letter_submitted: 100,
    network_activation_started: 40,
    mentor_match_started: 35,
    champion_certified: 200,

    // Evidence path
    recidivism_data_viewed: 20,
    greatness_zone_explored: 30,
    evidence_shared: 50,
    research_contributed: 75,
    policy_engagement: 100,

    // Youth path
    warrior_created: 40,
    mission_accepted: 25,
    mission_completed: 50,
    good_deed_logged: 15,
    badge_earned: 30,
    level_up: 100,

    // Convergence actions
    unity_portal_visited: 20,
    cross_path_collaboration: 75,
    final_push_action: 150,
  };

  return stepValues[step] || 5;
};

const calculatePathImpact = (
  path: PathType,
  progress: JourneyProgress,
): number => {
  if (!path) return 0;

  const baseScore = progress.engagementScore;
  const completionBonus = progress.completionPercentage * 2;
  const timeBonus = progress.stepsCompleted.length * 5;

  const pathMultipliers = {
    champion: 2.5, // High influence multiplier
    evidence: 1.8, // Research and data impact
    youth: 3.0, // Future generation multiplier
  };

  return Math.floor(
    (baseScore + completionBonus + timeBonus) * pathMultipliers[path],
  );
};

export const useUserJourney = create<UserJourneyState>()(
  persist(
    (set, get) => ({
      // Initial State
      selectedPath: null,
      journeyProgress: {
        stepsCompleted: [],
        lastInteraction: new Date(),
        engagementScore: 0,
        currentMilestone: "journey_start",
        completionPercentage: 0,
      },
      userProfile: {},

      championData: {
        networkConnections: 0,
        impactMultiplier: 1,
        lettersWritten: 0,
        youthMentored: 0,
        championsCertified: 0,
      },

      evidenceData: {
        researchContributions: 0,
        dataInteractions: 0,
        evidenceShared: 0,
        policyEngagement: 0,
        factChecksCompleted: 0,
        visualizationsViewed: [],
      },

      youthData: {
        level: 1,
        experience: 0,
        missionsCompleted: [],
        badgesEarned: [],
        goodDeedsCount: 0,
        mentorshipStatus: "seeking",
      },

      analytics: {
        sessionStart: new Date(),
        totalTimeSpent: 0,
        pagesVisited: [],
        conversionsCompleted: [],
        shareActions: 0,
        impactScore: 0,
      },

      // Actions
      selectPath: (path: PathType) => {
        logger.journey("Path selected", "user", {
          path,
          timestamp: new Date(),
        });

        set((state) => ({
          selectedPath: path,
          journeyProgress: {
            ...state.journeyProgress,
            pathStartedAt: new Date(),
            currentMilestone: path ? `${path}_path_started` : "journey_start",
            stepsCompleted: [
              ...state.journeyProgress.stepsCompleted,
              "path_selected",
            ],
            engagementScore:
              state.journeyProgress.engagementScore +
              getStepValue("path_selected"),
            lastInteraction: new Date(),
          },
        }));

        // Track in analytics
        get().trackEngagement("path_selected", { path });
      },

      resetPath: () => {
        logger.journey("Path reset", "user", { timestamp: new Date() });

        set((state) => ({
          selectedPath: null,
          journeyProgress: {
            stepsCompleted: [],
            lastInteraction: new Date(),
            engagementScore: 0,
            currentMilestone: "journey_start",
            completionPercentage: 0,
          },
          userProfile: {},
          championData: {
            networkConnections: 0,
            impactMultiplier: 1,
            lettersWritten: 0,
            youthMentored: 0,
            championsCertified: 0,
          },
          evidenceData: {
            researchContributions: 0,
            dataInteractions: 0,
            evidenceShared: 0,
            policyEngagement: 0,
            factChecksCompleted: 0,
            visualizationsViewed: [],
          },
          youthData: {
            level: 1,
            experience: 0,
            missionsCompleted: [],
            badgesEarned: [],
            goodDeedsCount: 0,
            mentorshipStatus: "seeking",
          },
        }));
      },

      updateProgress: (step: string, metadata?: Record<string, any>) => {
        logger.journey("Progress updated", "user", {
          step,
          metadata,
          timestamp: new Date(),
        });

        set((state) => {
          const newSteps = [...state.journeyProgress.stepsCompleted, step];
          const newScore =
            state.journeyProgress.engagementScore + getStepValue(step);

          // Calculate completion percentage based on path
          let completionPercentage = 0;
          if (state.selectedPath) {
            const pathSteps = {
              champion: 8, // Key milestones for champion path
              evidence: 6, // Key milestones for evidence path
              youth: 10, // Key milestones for youth path
            };

            const pathSpecificSteps = newSteps.filter((s) =>
              s.includes(state.selectedPath!),
            );

            completionPercentage = Math.min(
              (pathSpecificSteps.length / pathSteps[state.selectedPath]) * 100,
              100,
            );
          }

          return {
            journeyProgress: {
              ...state.journeyProgress,
              stepsCompleted: newSteps,
              engagementScore: newScore,
              lastInteraction: new Date(),
              completionPercentage,
            },
          };
        });
      },

      addMilestone: (milestone: string) => {
        logger.journey("Milestone achieved", "user", {
          milestone,
          timestamp: new Date(),
        });

        set((state) => ({
          journeyProgress: {
            ...state.journeyProgress,
            currentMilestone: milestone,
            lastInteraction: new Date(),
          },
        }));
      },

      updateProfile: (updates: Partial<UserProfile>) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        }));
      },

      updateChampionData: (updates: Partial<ChampionData>) => {
        set((state) => ({
          championData: { ...state.championData, ...updates },
        }));
      },

      updateEvidenceData: (updates: Partial<EvidenceData>) => {
        set((state) => ({
          evidenceData: { ...state.evidenceData, ...updates },
        }));
      },

      updateYouthData: (updates: Partial<YouthData>) => {
        set((state) => ({
          youthData: { ...state.youthData, ...updates },
        }));
      },

      trackEngagement: (action: string, metadata?: Record<string, any>) => {
        logger.analytics("Engagement tracked", { action, metadata });

        set((state) => ({
          analytics: {
            ...state.analytics,
            impactScore: state.analytics.impactScore + getStepValue(action),
          },
        }));
      },

      calculateImpact: () => {
        const state = get();
        return calculatePathImpact(state.selectedPath, state.journeyProgress);
      },

      getAnalytics: () => {
        return get().analytics;
      },

      incrementShareActions: () => {
        set((state) => ({
          analytics: {
            ...state.analytics,
            shareActions: state.analytics.shareActions + 1,
          },
        }));
      },

      addConversion: (conversion: string) => {
        set((state) => ({
          analytics: {
            ...state.analytics,
            conversionsCompleted: [
              ...state.analytics.conversionsCompleted,
              conversion,
            ],
          },
        }));
      },
    }),
    {
      name: "bridge-journey-v2",
      version: 2,
    },
  ),
);

// Utility hooks for path-specific data
export const useChampionData = () => {
  const { championData, updateChampionData } = useUserJourney();
  return { championData, updateChampionData };
};

export const useEvidenceData = () => {
  const { evidenceData, updateEvidenceData } = useUserJourney();
  return { evidenceData, updateEvidenceData };
};

export const useYouthData = () => {
  const { youthData, updateYouthData } = useUserJourney();
  return { youthData, updateYouthData };
};

// Analytics helper
export const useJourneyAnalytics = () => {
  const {
    analytics,
    trackEngagement,
    incrementShareActions,
    addConversion,
    calculateImpact,
  } = useUserJourney();
  return {
    analytics,
    trackEngagement,
    incrementShareActions,
    addConversion,
    calculateImpact,
  };
};
