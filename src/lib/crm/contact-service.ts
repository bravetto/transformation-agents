import {
  ContactData,
  CreateContactRequest,
  ContactCreateResult,
  UpdateContactRequest,
  SearchContactsParams,
} from "../../types/crm";
import {
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
function transformToClickUpContact(contact: ContactData): any {
  return {
    name:
      `${contact.firstName} ${contact.lastName}`.trim() || "Unknown Contact",
    contactEmail: contact.email,
    phoneNumber: contact.phone,
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
      id: clickUpResult.contactId || "unknown",
      url: `https://app.clickup.com/t/${clickUpResult.contactId || "unknown"}`,
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
    // Fetch from ClickUp (stub implementation currently returns null)
    const mappingContact = await getClickUpContact(id);

    // For now, since getClickUpContact is not implemented, return a default contact
    // TODO: Implement proper ClickUp integration
    if (!mappingContact) {
      // Create a default contact structure that matches CRMContact interface
      return {
        id,
        firstName: "Unknown",
        lastName: "User",
        email: "unknown@example.com",
        zipCode: "",
        relationship: "supporter",
        connectionStrength: "medium",
        engagementLevel: "medium",
        pagesVisited: [],
        timeOnSite: 0,
        storiesRead: [],
        letterSubmitted: false,
        volunteerSignup: false,
        willingToTestify: false,
        leadScore: 0,
        lastEngagement: new Date().toISOString(),
        tags: [],
        phone: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // If we have mapping data, transform it to match CRMContact interface
    return {
      id: mappingContact.id || id,
      firstName: mappingContact.name?.split(" ")[0] || "Unknown",
      lastName: mappingContact.name?.split(" ").slice(1).join(" ") || "User",
      email: mappingContact.email,
      zipCode: mappingContact.address || "",
      relationship: mappingContact.relationship || "supporter",
      connectionStrength: mappingContact.connectionStrength || "medium",
      engagementLevel: "medium", // Default engagement level
      pagesVisited: mappingContact.pagesVisited || [],
      timeOnSite: mappingContact.timeOnSite || 0,
      storiesRead: mappingContact.storiesRead || [],
      letterSubmitted: mappingContact.letterSubmitted || false,
      volunteerSignup: mappingContact.volunteerSignup || false,
      willingToTestify: mappingContact.willingToTestify || false,
      leadScore: mappingContact.leadScore || 0,
      lastEngagement: mappingContact.lastEngagement || new Date().toISOString(),
      tags: [], // Default empty tags
      phone: mappingContact.phone,
      createdAt: mappingContact.createdAt || new Date().toISOString(),
      updatedAt: mappingContact.updatedAt || new Date().toISOString(),
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

    // Return updated contact - use original id if result doesn't have one
    return getContactById(result.contactId || id);
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
    // Search in ClickUp - only pass valid parameters
    const results = await searchClickUpContacts({
      limit: params.limit || 10,
    });

    // Transform results
    const contacts = await Promise.all(
      results.contacts.map(async (clickUpContact) => {
        return {
          id: clickUpContact.id,
          firstName: (clickUpContact as any).contactPerson?.split(" ")[0] || "",
          lastName:
            (clickUpContact as any).contactPerson
              ?.split(" ")
              .slice(1)
              .join(" ") || "",
          email:
            (clickUpContact as any).contactEmail ||
            (clickUpContact as any).companyEmail ||
            clickUpContact.email,
          phone: (clickUpContact as any).phoneNumber || clickUpContact.phone,
          zipCode: clickUpContact.address || "",
          relationship: extractFromKeywords(
            (clickUpContact as any).keywords,
            "relationship",
          ),
          connectionStrength: extractFromKeywords(
            (clickUpContact as any).keywords,
            "connection",
          ),
          engagementLevel: mapCategoryToEngagement(
            (clickUpContact as any).businessCategory,
          ),
          tags:
            (clickUpContact as any).keywords
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
            (clickUpContact as any).keywords?.includes("letter_submitted") ||
            false,
          volunteerSignup:
            (clickUpContact as any).keywords?.includes("volunteer") || false,
          willingToTestify:
            (clickUpContact as any).keywords?.includes("testify") || false,
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
      total: results.total || filtered.length,
      page: params.page || 1,
      pageSize: params.limit || 10,
      hasMore: filtered.length >= (params.limit || 10),
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
