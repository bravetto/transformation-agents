export interface ImpactData {
  title: string;
  description: string;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
}

// Define filter-related types
export type PersonRole = "lightworker" | "messenger" | "witness" | "guardian";
export type JourneyStage = "seeker" | "awakening" | "serving" | "guiding";
export type PersonTheme =
  | "faith"
  | "courage"
  | "transformation"
  | "leadership"
  | "unity"
  | "wisdom";
export type PersonImpactLevel = "local" | "regional" | "global" | "eternal";

// Define content types for each section type
interface HeroSectionContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface TestimonySectionContent {
  title: string;
  description?: string;
  testimonies: Array<{
    id: string;
    quote: string;
    author: string;
    role?: string;
    date?: string;
  }>;
}

interface ImpactSectionContent {
  title: string;
  description?: string;
  stats: Array<{
    id: string;
    value: string;
    label: string;
    description?: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    description: string;
    year?: string;
    date?: string;
  }>;
}

interface LetterSectionContent {
  title: string;
  body: string;
  date?: string;
  recipient?: string;
  signature?:
    | string
    | {
        name: string;
        title: string;
        image: string;
      };
}

interface VideoSectionContent {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface CustomSectionContent {
  title: string;
  description?: string;
  component: string;
  props?: Record<string, unknown>;
  [key: string]: unknown; // Allow any additional props for custom components
}

// Define discriminated union for sections
type PersonSection =
  | { id?: string; type: "hero"; content: HeroSectionContent }
  | { id?: string; type: "testimony"; content: TestimonySectionContent }
  | { id?: string; type: "impact"; content: ImpactSectionContent }
  | { id?: string; type: "letter"; content: LetterSectionContent }
  | { id?: string; type: "video"; content: VideoSectionContent }
  | { id?: string; type: "custom"; content: CustomSectionContent };

export interface PersonData {
  id: string;
  slug: string;
  name: string;
  title: string;
  heroImage?: string;
  localImage?: boolean;

  // Bio information
  bio?: string;
  extendedBio?: string;
  quote?: string;

  // Images
  image?: string;
  thumbnail?: string;

  // Skills and values
  expertise?: string[];
  values?: string[];

  // Background information
  background?: {
    education?: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    experience?: Array<{
      position: string;
      company: string;
      duration: string;
      description: string;
    }>;
  };

  // Achievements and testimonials
  achievements?: Array<{
    title: string;
    description: string;
    year?: number;
    impact?: string;
  }>;

  testimonials?: Array<{
    author: string;
    role: string;
    content: string;
  }>;

  // Primary testimony
  testimony?: {
    quote: string;
    context: string;
    date: string;
  };

  // Impact metrics
  impact: ImpactData;

  // Contact and social
  contact?: {
    email?: string;
    location?: string;
  };

  social?: Record<string, string>;

  // Media
  media?: Array<{
    type: string;
    url: string;
    title?: string;
    description?: string;
  }>;

  // Custom sections
  customSections?: Array<{
    title: string;
    content: string;
  }>;

  // Sections for the person's page
  sections?: PersonSection[];

  // Metadata for SEO and display
  metadata?: {
    title: string;
    description: string;
    ogImage?: string;
    featured?: boolean;
    order?: number;
    category?: string;
  };

  // Filter properties
  role?: PersonRole;
  journeyStage?: JourneyStage;
  themes?: PersonTheme[];
  impactLevel?: PersonImpactLevel;
}
