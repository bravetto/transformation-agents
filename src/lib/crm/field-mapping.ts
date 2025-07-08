import { ClickUpFieldMapping } from "@/types/crm";

/**
 * ClickUp field mappings for CRM contacts
 * These values should be set in environment variables
 */
export const CLICKUP_FIELD_MAPPING: ClickUpFieldMapping = {
  emailField: process.env.CLICKUP_EMAIL_FIELD_ID || "email",
  relationshipField:
    process.env.CLICKUP_RELATIONSHIP_FIELD_ID || "relationship",
  connectionStrengthField:
    process.env.CLICKUP_CONNECTION_STRENGTH_FIELD_ID || "connection_strength",
  engagementLevelField:
    process.env.CLICKUP_ENGAGEMENT_LEVEL_FIELD_ID || "engagement_level",
  pagesVisitedField:
    process.env.CLICKUP_PAGES_VISITED_FIELD_ID || "pages_visited",
  timeOnSiteField: process.env.CLICKUP_TIME_ON_SITE_FIELD_ID || "time_on_site",
  storiesReadField: process.env.CLICKUP_STORIES_READ_FIELD_ID || "stories_read",
  letterSubmittedField:
    process.env.CLICKUP_LETTER_SUBMITTED_FIELD_ID || "letter_submitted",
  volunteerSignupField:
    process.env.CLICKUP_VOLUNTEER_SIGNUP_FIELD_ID || "volunteer_signup",
  willingToTestifyField:
    process.env.CLICKUP_WILLING_TO_TESTIFY_FIELD_ID || "willing_to_testify",
  leadScoreField: process.env.CLICKUP_LEAD_SCORE_FIELD_ID || "lead_score",
  lastEngagementField:
    process.env.CLICKUP_LAST_ENGAGEMENT_FIELD_ID || "last_engagement",
};

/**
 * ClickUp list ID for contacts
 */
export const CLICKUP_CONTACTS_LIST_ID =
  process.env.CLICKUP_CONTACTS_LIST_ID || "";

/**
 * Get custom field ID mapping
 */
export function getCustomFieldId(fieldKey: keyof ClickUpFieldMapping): string {
  return CLICKUP_FIELD_MAPPING[fieldKey] || "";
}

/**
 * Format date for ClickUp
 */
export function formatDateForClickUp(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getTime();
}

/**
 * Format engagement level for ClickUp
 */
export function formatEngagementLevel(
  level: "high" | "medium" | "low",
): string {
  const engagementLevelMap: Record<string, string> = {
    high: "3",
    medium: "2",
    low: "1",
  };

  return engagementLevelMap[level] || "1";
}

/**
 * Format connection strength for ClickUp
 */
export function formatConnectionStrength(strength: string): string {
  // Map string values to the expected ClickUp numeric values
  const strengthMap: Record<string, string> = {
    strong: "3",
    medium: "2",
    weak: "1",
  };

  return strengthMap[strength.toLowerCase()] || strength;
}

/**
 * Format boolean for ClickUp
 */
export function formatBooleanForClickUp(value: boolean): string {
  return value ? "true" : "false";
}

/**
 * Format array for ClickUp
 */
export function formatArrayForClickUp(array: string[]): string {
  return array.join(",");
}
