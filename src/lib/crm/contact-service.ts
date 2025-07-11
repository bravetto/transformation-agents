import {
  ContactData,
  CreateContactRequest,
  ContactCreateResult,
  UpdateContactRequest,
  SearchContactsParams,
  createClickUpContact,
  updateClickUpContact,
  getClickUpContact,
  searchClickUpContacts,
  deleteClickUpContact,
  type ClickUpContact,
  CLICKUP_FIELD_IDS,
  BUSINESS_CATEGORIES,
  type BusinessCategory,
  mapClickUpTaskToContact,
  mapContactToClickUpTask,
} from "./clickup-field-mapping";

// Cache for contact search results
let contactCache: {
  data: ContactData[];
  timestamp: number;
} | null = null;
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Transform ContactData to ClickUp format
 */
function transformToClickUpContact(contact: ContactData): ClickUpContact {
  return {
    name:
      `${contact.firstName} ${contact.lastName}`.trim() || "Unknown Contact",
    contactPerson: `${contact.firstName} ${contact.lastName}`.trim(),
    companyEmail: contact.email,
    contactEmail: contact.email,
    phoneNumber: contact.phone,
    address: contact.zipCode,
    // Map engagement to business category
    businessCategory: mapEngagementToCategory(contact.engagementLevel),
    // Tags and other data go in keywords for searchability
    keywords: [
      contact.tags?.join(", ") || "",
      `relationship:${contact.relationship}`,
      `connection:${contact.connectionStrength}`,
      contact.letterSubmitted ? "letter_submitted" : "",
      contact.volunteerSignup ? "volunteer" : "",
      contact.willingToTestify ? "testify" : "",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

/**
 * Map engagement level to business category
 */
function mapEngagementToCategory(
  engagementLevel?: string,
): BusinessCategory | undefined {
  // Map Bridge Project engagement levels to ClickUp business categories
  const mapping: Record<string, BusinessCategory> = {
    high: "CONSULTING", // High engagement contacts
    medium: "MARKETING", // Medium engagement contacts
    low: "SOFTWARE", // Low engagement contacts
  };
  return mapping[engagementLevel || "low"];
}

/**
 * Create a new contact
 */
export async function createContact(
  contact: CreateContactRequest,
): Promise<ContactCreateResult> {
  try {
    // Create in ClickUp
    const clickUpContact = transformToClickUpContact(contact as ContactData);
    const clickUpResult = await createClickUpContact(clickUpContact);

    // Return with ClickUp ID
    return {
      id: clickUpResult.id,
      url: `https://app.clickup.com/t/${clickUpResult.id}`,
      success: true,
    };
  } catch (error) {
    console.error("Error creating contact in ClickUp:", error);
    throw error;
  }
}

/**
 * Get contact by ID
 */
export async function getContactById(id: string): Promise<ContactData> {
  try {
    // Fetch from ClickUp
    const clickUpContact = await getClickUpContact(id);

    // Transform to internal format
    return {
      id: clickUpContact.id,
      firstName: clickUpContact.contactPerson?.split(" ")[0] || "",
      lastName:
        clickUpContact.contactPerson?.split(" ").slice(1).join(" ") || "",
      email: clickUpContact.contactEmail || clickUpContact.companyEmail,
      phone: clickUpContact.phoneNumber,
      zipCode: clickUpContact.address,
      relationship: extractFromKeywords(
        clickUpContact.keywords,
        "relationship",
      ),
      connectionStrength: extractFromKeywords(
        clickUpContact.keywords,
        "connection",
      ),
      engagementLevel: mapCategoryToEngagement(clickUpContact.businessCategory),
      tags:
        clickUpContact.keywords
          ?.split(",")
          .map((t: string) => t.trim())
          .filter((t: string) => !t.includes(":")) || [],
      createdAt: clickUpContact.createdAt,
      updatedAt: clickUpContact.updatedAt,
      // Add required CRMContact fields with defaults
      pagesVisited: [],
      timeOnSite: 0,
      storiesRead: [],
      letterSubmitted:
        clickUpContact.keywords?.includes("letter_submitted") || false,
      volunteerSignup: clickUpContact.keywords?.includes("volunteer") || false,
      willingToTestify: clickUpContact.keywords?.includes("testify") || false,
      leadScore: 0,
      lastEngagement: clickUpContact.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching contact from ClickUp:", error);
    throw error;
  }
}

/**
 * Update contact
 */
export async function updateContact(
  id: string,
  updates: UpdateContactRequest,
): Promise<ContactData> {
  try {
    // Get existing contact first
    const existing = await getContactById(id);

    // Merge updates
    const updated = { ...existing, ...updates };

    // Transform and update in ClickUp
    const clickUpUpdates = transformToClickUpContact(updated as ContactData);
    const result = await updateClickUpContact(id, clickUpUpdates);

    // Return updated contact
    return getContactById(result.id);
  } catch (error) {
    console.error("Error updating contact in ClickUp:", error);
    throw error;
  }
}

/**
 * Search contacts
 */
export async function searchContacts(params: SearchContactsParams): Promise<{
  data: ContactData[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}> {
  try {
    // Search in ClickUp
    const results = await searchClickUpContacts({
      query: params.query,
      businessCategory: mapEngagementToCategory(params.engagementLevel),
      includeArchived: false,
      limit: params.limit,
      page: params.page,
      orderBy: params.sortBy,
    });

    // Transform results
    const contacts = await Promise.all(
      results.contacts.map(async (clickUpContact) => {
        return {
          id: clickUpContact.id,
          firstName: clickUpContact.contactPerson?.split(" ")[0] || "",
          lastName:
            clickUpContact.contactPerson?.split(" ").slice(1).join(" ") || "",
          email: clickUpContact.contactEmail || clickUpContact.companyEmail,
          phone: clickUpContact.phoneNumber,
          zipCode: clickUpContact.address,
          relationship: extractFromKeywords(
            clickUpContact.keywords,
            "relationship",
          ),
          connectionStrength: extractFromKeywords(
            clickUpContact.keywords,
            "connection",
          ),
          engagementLevel: mapCategoryToEngagement(
            clickUpContact.businessCategory,
          ),
          tags:
            clickUpContact.keywords
              ?.split(",")
              .map((t: string) => t.trim())
              .filter((t: string) => !t.includes(":")) || [],
          createdAt: clickUpContact.createdAt,
          updatedAt: clickUpContact.updatedAt,

          // Add required CRMContact fields
          pagesVisited: [],
          timeOnSite: 0,
          storiesRead: [],
          letterSubmitted:
            clickUpContact.keywords?.includes("letter_submitted") || false,
          volunteerSignup:
            clickUpContact.keywords?.includes("volunteer") || false,
          willingToTestify:
            clickUpContact.keywords?.includes("testify") || false,
          leadScore: 0,
          lastEngagement: clickUpContact.updatedAt || new Date().toISOString(),
        };
      }),
    );

    // Apply additional filters for Bridge Project specific fields
    let filtered = contacts;

    if (params.hasSubmittedLetter !== undefined) {
      filtered = filtered.filter(
        (c) => c.letterSubmitted === params.hasSubmittedLetter,
      );
    }
    if (params.isVolunteer !== undefined) {
      filtered = filtered.filter(
        (c) => c.volunteerSignup === params.isVolunteer,
      );
    }
    if (params.willingToTestify !== undefined) {
      filtered = filtered.filter(
        (c) => c.willingToTestify === params.willingToTestify,
      );
    }

    return {
      data: filtered,
      total: results.total,
      page: results.page,
      pageSize: results.limit,
      hasMore: results.page * results.limit < results.total,
    };
  } catch (error) {
    console.error("Error searching contacts in ClickUp:", error);
    throw error;
  }
}

/**
 * Delete contact
 */
export async function deleteContact(id: string): Promise<void> {
  try {
    await deleteClickUpContact(id);
  } catch (error) {
    console.error("Error deleting contact from ClickUp:", error);
    throw error;
  }
}

// Helper functions
function extractFromKeywords(keywords: string, type: string): string {
  if (!keywords) return "";
  const parts = keywords.split(",").map((k) => k.trim());
  const found = parts.find((p) => p.toLowerCase().includes(type));
  return found?.split(":")[1]?.trim() || "";
}

function mapCategoryToEngagement(category: string): "high" | "medium" | "low" {
  const mapping: Record<string, "high" | "medium" | "low"> = {
    CONSULTING: "high",
    MARKETING: "medium",
    SOFTWARE: "low",
  };
  return mapping[category] || "low";
}
