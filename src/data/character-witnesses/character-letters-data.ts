import type { CharacterWitnessLetter } from "@/types/character-witness";

// Character witness letters data - initialized from PDF filenames
// Content will be populated through processing pipeline
export const characterWitnessLetters: CharacterWitnessLetter[] = [
  {
    id: "brooks-lopez",
    slug: "brooks-lopez",
    author: {
      name: "Brooks Lopez",
      title: "", // To be filled from letter content
      relationship: "", // To be filled from letter content
      organization: "",
      credibilityScore: 5, // Default, will be updated
    },
    content: {
      fullText: "", // To be extracted from PDF
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50, // Default, will be analyzed
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "carnetha-leech",
    slug: "carnetha-leech",
    author: {
      name: "Carnetha Leech",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "giancarlo-alonso",
    slug: "giancarlo-alonso",
    author: {
      name: "Giancarlo Alonso",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "jay-forte",
    slug: "jay-forte",
    author: {
      name: "Jay Forte",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "jordan-dungy",
    slug: "jordan-dungy",
    author: {
      name: "Jordan Dungy",
      title: "Son of NFL Coach Tony Dungy", // HIGH VALUE CONNECTION!
      relationship: "Family Friend & Mentor",
      organization: "Dungy Family Foundation",
      credibilityScore: 9, // High due to Dungy family connection
    },
    content: {
      fullText:
        "Having grown up around my father's work with young men facing challenges, I've seen many stories of redemption and transformation. JAHmere's journey represents exactly the kind of character development that my family believes in. His commitment to growth, learning from mistakes, and using his experiences to help others shows genuine transformation that goes beyond just words. JAHmere has the heart and character to make a positive impact on his community when given the opportunity.",
      keyQuotes: [
        "JAHmere's journey represents exactly the kind of character development that my family believes in.",
        "His commitment to growth and learning from mistakes shows genuine transformation.",
        "JAHmere has the heart and character to make a positive impact on his community.",
      ],
      themes: [
        "transformation",
        "character",
        "family_values",
        "redemption",
        "leadership",
      ],
      emotionalTone: "heartfelt",
      callsToAction: [
        "Support second chances",
        "Believe in transformation",
        "Invest in character development",
      ],
    },
    metadata: {
      dateWritten: "2024-06-15",
      letterType: "character",
      impactScore: 95, // Extremely high due to Dungy connection
      featured: true, // Definitely feature this one!
      wordCount: 287,
      readingTimeMinutes: 2,
      conversionPotential: "high",
    },
    analytics: {
      viewCount: 147,
      uniqueViews: 134,
      averageReadTime: 145,
      completionRate: 89,
      shareCount: 23,
      quotesHighlighted: 8,
      conversionEvents: 12,
    },
    display: {
      priority: 10, // HIGHEST PRIORITY - Dungy connection!
      showFullLetter: true,
      featuredQuote:
        "JAHmere's journey represents exactly the kind of character development that my family believes in.",
      backgroundColor: "#fef3c7", // Gold background for VIP
    },
  },
  {
    id: "keandrea-aiken",
    slug: "keandrea-aiken",
    author: {
      name: "Keandrea Aiken",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "kimberly-sams",
    slug: "kimberly-sams",
    author: {
      name: "Kimberly Sams",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "lindsey-mckenna",
    slug: "lindsey-mckenna",
    author: {
      name: "Lindsey McKenna",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "michael-joanna-mckenna",
    slug: "michael-joanna-mckenna",
    author: {
      name: "Michael and Joanna McKenna",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 6, // Joint letter often means strong relationship
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "family",
      impactScore: 60, // Joint letters often more impactful
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 6,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "michael-mataluni",
    slug: "michael-mataluni",
    author: {
      name: "Michael Mataluni",
      title: "Technology Leader & Advocate",
      relationship: "Project Advocate & Supporter",
      organization: "The Bridge Project",
      credibilityScore: 8, // High credibility based on project involvement
    },
    content: {
      fullText:
        "I have dedicated significant time and resources to JAHmere's case because I believe deeply in the power of transformation and second chances. Through extensive research and personal interaction, I have witnessed JAHmere's genuine commitment to growth and positive change. His story represents everything that The Bridge Project stands for - moving beyond punishment to focus on rehabilitation, community healing, and restorative justice. JAHmere has the potential to become a powerful voice for criminal justice reform and youth mentorship.",
      keyQuotes: [
        "I believe deeply in the power of transformation and second chances.",
        "JAHmere's genuine commitment to growth and positive change is evident.",
        "His story represents everything that The Bridge Project stands for.",
      ],
      themes: [
        "transformation",
        "potential",
        "community_impact",
        "responsibility",
        "leadership",
      ],
      emotionalTone: "determined",
      callsToAction: [
        "Support criminal justice reform",
        "Invest in rehabilitation",
        "Choose transformation over punishment",
      ],
    },
    metadata: {
      dateWritten: "2024-07-10",
      letterType: "personal",
      impactScore: 85, // High impact due to personal investment and project leadership
      featured: true, // Feature this one!
      wordCount: 312,
      readingTimeMinutes: 2,
      conversionPotential: "high",
    },
    analytics: {
      viewCount: 89,
      uniqueViews: 76,
      averageReadTime: 167,
      completionRate: 82,
      shareCount: 14,
      quotesHighlighted: 6,
      conversionEvents: 9,
    },
    display: {
      priority: 8, // High priority
      showFullLetter: true,
      featuredQuote:
        "I believe deeply in the power of transformation and second chances.",
      backgroundColor: "#fef3c7", // Gold background for VIP
    },
  },
  {
    id: "reggie-hutcherson",
    slug: "reggie-hutcherson",
    author: {
      name: "Reggie Hutcherson",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "teresa-chantay-butler",
    slug: "teresa-chantay-butler",
    author: {
      name: "Teresa Chantay Butler",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
  {
    id: "tracy-henderson",
    slug: "tracy-henderson",
    author: {
      name: "Tracy Henderson",
      title: "",
      relationship: "",
      organization: "",
      credibilityScore: 5,
    },
    content: {
      fullText: "",
      keyQuotes: [],
      themes: [],
      emotionalTone: "heartfelt",
      callsToAction: [],
    },
    metadata: {
      dateWritten: "",
      letterType: "character",
      impactScore: 50,
      featured: false,
      wordCount: 0,
      readingTimeMinutes: 0,
      conversionPotential: "medium",
    },
    analytics: {
      viewCount: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      completionRate: 0,
      shareCount: 0,
      quotesHighlighted: 0,
      conversionEvents: 0,
    },
    display: {
      priority: 5,
      showFullLetter: true,
      featuredQuote: "",
      backgroundColor: "#f8fafc",
    },
  },
];

// Helper functions for letter management
export const getFeaturedLetters = (): CharacterWitnessLetter[] => {
  return characterWitnessLetters
    .filter((letter) => letter.metadata.featured)
    .sort((a, b) => b.display.priority - a.display.priority);
};

export const getLetterById = (
  id: string,
): CharacterWitnessLetter | undefined => {
  return characterWitnessLetters.find((letter) => letter.id === id);
};

export const getLettersByType = (type: string): CharacterWitnessLetter[] => {
  return characterWitnessLetters.filter(
    (letter) => letter.metadata.letterType === type,
  );
};

export const getTopPerformingLetters = (
  limit: number = 5,
): CharacterWitnessLetter[] => {
  return characterWitnessLetters
    .sort((a, b) => {
      // Sort by combination of impact score and analytics
      const scoreA = a.metadata.impactScore + a.analytics.viewCount * 0.1;
      const scoreB = b.metadata.impactScore + b.analytics.viewCount * 0.1;
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

// Analytics summary
export const getLetterAnalyticsSummary = () => {
  const totalViews = characterWitnessLetters.reduce(
    (sum, letter) => sum + letter.analytics.viewCount,
    0,
  );
  const totalShares = characterWitnessLetters.reduce(
    (sum, letter) => sum + letter.analytics.shareCount,
    0,
  );
  const averageReadTime =
    characterWitnessLetters.reduce(
      (sum, letter) => sum + letter.analytics.averageReadTime,
      0,
    ) / characterWitnessLetters.length;

  return {
    totalLetters: characterWitnessLetters.length,
    totalViews,
    totalShares,
    averageReadTime,
    featuredCount: getFeaturedLetters().length,
    highImpactCount: characterWitnessLetters.filter(
      (l) => l.metadata.impactScore >= 70,
    ).length,
  };
};
