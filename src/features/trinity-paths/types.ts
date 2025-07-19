/**
 * 🌉 TRINITY UX PATH SYSTEM TYPES
 * Three Divine Paths for JAHmere's Freedom
 */

export type PathType = "champion" | "evidence" | "youth";

export interface PathUser {
  id: string;
  type: PathType;
  selectedAt: Date;
  progress: PathProgress;
  metadata: UserMetadata;
}

export interface PathProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  milestones: PathMilestone[];
  engagementScore: number;
}

export interface PathMilestone {
  id: string;
  name: string;
  description: string;
  completedAt?: Date;
  reward?: string;
}

export interface UserMetadata {
  location?: string;
  influence?: "low" | "medium" | "high";
  expertise?: string[];
  interests?: string[];
  source?: string;
}

// Champion Path Types
export interface ChampionPathData {
  legacyAssessment?: LegacyAssessment;
  networkConnections: NetworkConnection[];
  impactMetrics: ImpactMetrics;
  mentorshipStatus: MentorshipStatus;
}

export interface LegacyAssessment {
  leadership: number;
  influence: number;
  compassion: number;
  vision: number;
  results: string[];
  recommendations: string[];
}

export interface NetworkConnection {
  id: string;
  name: string;
  role: string;
  connected: boolean;
  influence: number;
}

export interface ImpactMetrics {
  lettersWritten: number;
  networksActivated: number;
  youthMentored: number;
  eventsOrganized: number;
}

export interface MentorshipStatus {
  willingToMentor: boolean;
  mentorshipStyle: string[];
  availability: string;
  commitment: string;
}

// Evidence Path Types
export interface EvidencePathData {
  dataInteractions: DataInteraction[];
  researchContributions: ResearchContribution[];
  policyEngagement: PolicyEngagement[];
  expertiseAreas: string[];
}

export interface DataInteraction {
  id: string;
  type: "visualization" | "download" | "share" | "analysis";
  dataset: string;
  timestamp: Date;
  insights?: string[];
}

export interface ResearchContribution {
  id: string;
  title: string;
  type: "study" | "report" | "analysis" | "opinion";
  status: "submitted" | "under_review" | "accepted" | "published";
  impact: number;
}

export interface PolicyEngagement {
  id: string;
  policyArea: string;
  engagementType: "comment" | "proposal" | "testimony" | "collaboration";
  status: string;
  influence: number;
}

// Youth Path Types
export interface YouthPathData {
  warriorProfile: WarriorProfile;
  goodDeeds: GoodDeed[];
  communityEngagement: CommunityEngagement;
  missionProgress: MissionProgress;
}

export interface WarriorProfile {
  name: string;
  age: number;
  location: string;
  skills: string[];
  passions: string[];
  availability: string;
  commitment: "casual" | "regular" | "dedicated" | "champion";
}

export interface GoodDeed {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: number;
  completedAt: Date;
  verified: boolean;
  points: number;
}

export interface CommunityEngagement {
  localChapter?: string;
  eventsAttended: number;
  eventsOrganized: number;
  peersRecruited: number;
  leadershipRole?: string;
}

export interface MissionProgress {
  currentMission?: string;
  completedMissions: string[];
  totalPoints: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: Date;
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

// Convergence Types
export interface ConvergenceData {
  countdown: CountdownData;
  unityFeed: UnityFeedItem[];
  finalPush: FinalPushMetrics;
  victory: VictoryPreparation;
}

export interface CountdownData {
  targetDate: Date;
  currentTime: Date;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  milestones: CountdownMilestone[];
}

export interface CountdownMilestone {
  date: Date;
  title: string;
  description: string;
  achieved: boolean;
}

export interface UnityFeedItem {
  id: string;
  pathType: PathType;
  userName: string;
  action: string;
  timestamp: Date;
  impact: number;
  message?: string;
}

export interface FinalPushMetrics {
  totalLetters: number;
  totalWarriors: number;
  totalChampions: number;
  totalEvidence: number;
  momentum: number;
  projectedImpact: number;
}

export interface VictoryPreparation {
  mediaKit: MediaKitItem[];
  testimonials: Testimonial[];
  evidencePackage: EvidencePackage;
  coalitionStatus: CoalitionStatus;
}

export interface MediaKitItem {
  id: string;
  type: "image" | "video" | "document" | "quote";
  title: string;
  url: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  pathType: PathType;
  content: string;
  verified: boolean;
}

export interface EvidencePackage {
  recidivismData: any[];
  transformationStories: any[];
  economicImpact: any[];
  communitySupport: any[];
  expertOpinions: any[];
}

export interface CoalitionStatus {
  totalMembers: number;
  organizationsEndorsed: number;
  faithLeadersEngaged: number;
  businessLeadersCommitted: number;
  youthChaptersActive: number;
}
