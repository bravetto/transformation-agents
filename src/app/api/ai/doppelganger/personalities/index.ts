import { PersonalityConfig } from "@/types/personality";
import coachDungyPersonality from "./coach-dungy";
import jahmereWebbPersonality from "./jahmere-webb";
import michaelMataluniPersonality from "./michael-mataluni";

/**
 * Map of personality slugs to their configurations
 */
const personalities: Record<string, PersonalityConfig> = {
  "coach-dungy": coachDungyPersonality,
  "jahmere-webb": jahmereWebbPersonality,
  "michael-mataluni": michaelMataluniPersonality,
};

/**
 * Get a personality configuration by slug
 */
export function getPersonalityBySlug(
  slug: string,
): PersonalityConfig | undefined {
  return personalities[slug];
}

/**
 * Get all available personalities
 */
export function getAvailablePersonalities(): Array<{
  slug: string;
  name: string;
  role: string;
  background: string;
}> {
  return Object.entries(personalities).map(([slug, config]) => ({
    slug,
    name: config.personality?.name || config.name || slug,
    role: config.role || "lightworker",
    background: config.personality?.background || config.background || "",
  }));
}

/**
 * Get a summary of all available personalities
 */
export function getPersonalitySummaries(): Array<{
  slug: string;
  name: string;
  role: string;
  background: string;
}> {
  return Object.entries(personalities)
    .filter(([_, config]) => config.personality !== undefined)
    .map(([slug, config]) => ({
      slug,
      name: config.personality!.name,
      role: config.role || "lightworker",
      background: config.personality!.background,
    }));
}

export default personalities;
