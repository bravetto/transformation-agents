import { z } from "zod";

// Assessment Score Types
export const TalentScore = z.object({
  score: z.number().min(0).max(20),
  title: z.string(),
  description: z.string(),
  keyWords: z.array(z.string()),
  quadrant: z.enum(["Friend", "Professor", "Emcee", "Chairman"]),
});

export const PersonalityScore = z.object({
  score: z.number().min(0).max(200),
  quadrant: z.enum(["Friend", "Professor", "Emcee", "Chairman"]),
  description: z.string(),
});

// Individual Assessment Type
export const Assessment = z.object({
  name: z.string(),
  email: z.string().email(),
  dateOfAssessment: z.date(),
  talents: z.array(TalentScore),
  personalityScore: PersonalityScore,
  primaryQuadrant: z.enum(["Directing", "Thinking", "Supporting", "Feeling"]),
  secondaryQuadrant: z.enum(["Directing", "Thinking", "Supporting", "Feeling"]),
});

// Team Member Assessments
export const teamAssessments = {
  "JAHmere Webb": {
    name: "JAHmere Webb",
    email: "jahmerewebb@icloud.com",
    dateOfAssessment: new Date("2025-02-03"),
    talents: [
      {
        score: 18,
        title: "Peacemaker",
        description:
          "Gets along with and supports others. Appreciates feelings, emotions and differences in people.",
        keyWords: [
          "appreciative",
          "open-minded",
          "considerate",
          "attentive",
          "approachable",
        ],
        quadrant: "Friend",
      },
      {
        score: 16,
        title: "Caregiver",
        description:
          "Focuses on emotions and feelings, aware of feelings in self and others.",
        keyWords: [
          "compassionate",
          "nurturing",
          "giving",
          "genuine",
          "selfless",
          "thoughtful",
        ],
        quadrant: "Friend",
      },
      {
        score: 16,
        title: "Relator",
        description: "Easily builds relationships and personal contact.",
        keyWords: [
          "supportive",
          "respectful",
          "cooperative",
          "diplomatic",
          "accepting",
        ],
        quadrant: "Friend",
      },
    ],
    personalityScore: {
      score: 62,
      quadrant: "Friend",
      description:
        "Emotional decision-maker and supporting relationship-oriented type",
    },
    primaryQuadrant: "Supporting",
    secondaryQuadrant: "Feeling",
  },

  "Michael Mataluni": {
    name: "Michael Mataluni",
    email: "mike@bravetto.com",
    dateOfAssessment: new Date("2024-12-12"),
    talents: [
      {
        score: 20,
        title: "Winner",
        description:
          "Likes to win, achieve and be noticed. Takes pride in achievements.",
        keyWords: [
          "competitive",
          "ambitious",
          "persuasive",
          "persistent",
          "opportunistic",
        ],
        quadrant: "Emcee",
      },
      {
        score: 18,
        title: "Adapter",
        description: "Influences others to move and be adaptable.",
        keyWords: [
          "popular",
          "charismatic",
          "energetic",
          "dynamic",
          "influential",
        ],
        quadrant: "Emcee",
      },
      {
        score: 18,
        title: "Inventor",
        description: "Independent, creative and on-demand thinker.",
        keyWords: [
          "innovative",
          "imaginative",
          "non-conventional",
          "creative",
          "artistic",
          "resourceful",
          "original",
        ],
        quadrant: "Professor",
      },
    ],
    personalityScore: {
      score: 68,
      quadrant: "Emcee",
      description:
        "Dominant emotional decision-maker with independent approach",
    },
    primaryQuadrant: "Directing",
    secondaryQuadrant: "Feeling",
  },

  "John Forte": {
    name: "John Forte",
    email: "Jay@thegreatnesszone.com",
    dateOfAssessment: new Date("2025-01-05"),
    talents: [
      {
        score: 19,
        title: "Peacemaker",
        description:
          "Gets along with and supports others. Appreciates feelings and emotions.",
        keyWords: [
          "appreciative",
          "open-minded",
          "considerate",
          "attentive",
          "approachable",
        ],
        quadrant: "Friend",
      },
      {
        score: 18,
        title: "Caregiver",
        description:
          "Focuses on emotions and feelings, aware of feelings in self and others.",
        keyWords: [
          "compassionate",
          "nurturing",
          "giving",
          "genuine",
          "selfless",
          "thoughtful",
        ],
        quadrant: "Friend",
      },
      {
        score: 18,
        title: "Relator",
        description: "Easily builds relationships and personal contact.",
        keyWords: [
          "supportive",
          "respectful",
          "cooperative",
          "diplomatic",
          "accepting",
        ],
        quadrant: "Friend",
      },
    ],
    personalityScore: {
      score: 71,
      quadrant: "Friend",
      description:
        "Emotional decision-maker and supporting relationship-oriented type",
    },
    primaryQuadrant: "Supporting",
    secondaryQuadrant: "Feeling",
  },
};

// Team Analysis Functions
export const analyzeTeamDynamics = () => {
  const quadrantDistribution = Object.values(teamAssessments).reduce(
    (acc, assessment) => {
      acc[assessment.primaryQuadrant] =
        (acc[assessment.primaryQuadrant] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const personalityDistribution = Object.values(teamAssessments).reduce(
    (acc, assessment) => {
      acc[assessment.personalityScore.quadrant] =
        (acc[assessment.personalityScore.quadrant] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    quadrantDistribution,
    personalityDistribution,
    teamSize: Object.keys(teamAssessments).length,
    averageScores: calculateAverageScores(),
    complementaryStrengths: identifyComplementaryStrengths(),
  };
};

const calculateAverageScores = () => {
  // Implementation for calculating average scores across the team
};

const identifyComplementaryStrengths = () => {
  // Implementation for identifying complementary strengths
};

// Export types
export type AssessmentType = z.infer<typeof Assessment>;
export type TalentScoreType = z.infer<typeof TalentScore>;
export type PersonalityScoreType = z.infer<typeof PersonalityScore>;
