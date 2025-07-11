/**
 * ClickUp CRM Service for The Bridge Project
 * Handles all ClickUp API interactions with proper error handling and data mapping
 */

import { z } from "zod";
import {
  mapClickUpTaskToContact,
  mapContactToClickUpTask,
  CLICKUP_FIELD_IDS,
  BusinessCategory,
  BUSINESS_CATEGORIES,

// Environment validation
const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID;
const CLICKUP_API_URL = "https://api.clickup.com/api/v2";

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error("Missing required ClickUp environment variables");
}

// Validation schemas
export const clickUpContactSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  contactPerson: z.string().optional(),
  companyEmail: z.string().email().optional(),
  contactEmail: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  contactPhoneNumber: z.string().optional(),
  faxNumber: z.string().optional(),
  businessCategory: z
    .enum(
      Object.keys(BUSINESS_CATEGORIES) as [
        BusinessCategory,
        ...BusinessCategory[],
      ],
    )
    .optional(),
  productServices: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().optional(),
  locationCovered: z.string().optional(),
  establishmentDate: z.string().optional(),
  keywords: z.string().optional(),
});

export type ClickUpContact = z.infer<typeof clickUpContactSchema>;

/**
 * Base ClickUp API request helper
 */
async function clickUpRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const url = `${CLICKUP_API_URL}${endpoint}`;

  const headers = {
    Authorization: CLICKUP_API_KEY || "",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  console.log(`ClickUp Request: ${options.method || "GET"} ${url}`);
  if (options.body) {
    console.log("Request body:", options.body);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = errorText;
      }
      console.error(`ClickUp API error (${response.status}):`, errorData);
      throw new Error(
        `ClickUp API error: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ClickUp request to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get custom field IDs from ClickUp list
 * Run this once to get your actual field IDs
 */
export async function getClickUpCustomFields(): Promise<any> {
  try {
    const response = await clickUpRequest(`/list/${CLICKUP_LIST_ID}/field`);
    console.log(
      "ClickUp Custom Fields:",
      JSON.stringify(response.fields, null, 2),
    );
    return response.fields;
  } catch (error) {
    console.error("Error fetching custom fields:", error);
    throw error;
  }
}

/**
 * Create a new contact in ClickUp CRM
 */
export async function createClickUpContact(
  contact: ClickUpContact,
): Promise<any> {
  try {
    // Validate input
    const validated = clickUpContactSchema.parse(contact);
    console.log("Validated contact data:", JSON.stringify(validated, null, 2));

    // Map to ClickUp format
    const taskData = mapContactToClickUpTask(validated);
    console.log(
      "Mapped task data for ClickUp:",
      JSON.stringify(taskData, null, 2),
    );

    // Create task in ClickUp
    const response = await clickUpRequest(`/list/${CLICKUP_LIST_ID}/task`, {
      method: "POST",
      body: JSON.stringify(taskData),
    });

    // Map response back to our format
    return mapClickUpTaskToContact(response);
  } catch (error) {
    console.error("Error creating ClickUp contact:", error);
    throw error;
  }
}

/**
 * Get a contact by ID from ClickUp
 */
export async function getClickUpContact(taskId: string): Promise<any> {
  try {
    const response = await clickUpRequest(`/task/${taskId}`);
    return mapClickUpTaskToContact(response);
  } catch (error) {
    console.error("Error fetching ClickUp contact:", error);
    throw error;
  }
}

/**
 * Update an existing contact in ClickUp
 */
export async function updateClickUpContact(
  taskId: string,
  updates: Partial<ClickUpContact>,
): Promise<any> {
  try {
    // Map updates to ClickUp format
    const taskData = mapContactToClickUpTask(updates);

    // Update task in ClickUp
    const response = await clickUpRequest(`/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({
        name: taskData.name,
        custom_fields: taskData.custom_fields,
      }),
    });

    return mapClickUpTaskToContact(response);
  } catch (error) {
    console.error("Error updating ClickUp contact:", error);
    throw error;
  }
}

/**
 * Search contacts in ClickUp CRM
 */
export async function searchClickUpContacts(params: {
  query?: string;
  businessCategory?: BusinessCategory;
  includeArchived?: boolean;
  orderBy?: string;
  limit?: number;
  page?: number;
}): Promise<{
  contacts: any[];
  total: number;
  page: number;
  limit: number;
}> {
  try {
    const searchParams = new URLSearchParams();

    // Build query parameters
    if (params.includeArchived !== undefined) {
      searchParams.set("include_closed", params.includeArchived.toString());
    }
    if (params.orderBy) {
      searchParams.set("order_by", params.orderBy);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.page && params.limit) {
      searchParams.set("page", params.page.toString());
    }

    // Get tasks from ClickUp
    const response = await clickUpRequest(
      `/list/${CLICKUP_LIST_ID}/task?${searchParams.toString()}`,
    );

    let tasks = response.tasks || [];

    // Filter by query if provided
    if (params.query) {
      const query = params.query.toLowerCase();
      tasks = tasks.filter((task: any) => {
        const contact = mapClickUpTaskToContact(task);
        return (
          contact.name?.toLowerCase().includes(query) ||
          contact.contactPerson?.toLowerCase().includes(query) ||
          contact.companyEmail?.toLowerCase().includes(query) ||
          contact.keywords?.toLowerCase().includes(query)
        );
      });
    }

    // Filter by business category if provided
    if (params.businessCategory) {
      const categoryLabel = BUSINESS_CATEGORIES[params.businessCategory].label;
      tasks = tasks.filter((task: any) => {
        const contact = mapClickUpTaskToContact(task);
        return contact.businessCategory === categoryLabel;
      });
    }

    // Map tasks to contacts
    const contacts = tasks.map(mapClickUpTaskToContact);

    return {
      contacts,
      total: tasks.length,
      page: params.page || 1,
      limit: params.limit || tasks.length,
    };
  } catch (error) {
    console.error("Error searching ClickUp contacts:", error);
    throw error;
  }
}

/**
 * Delete a contact from ClickUp
 */
export async function deleteClickUpContact(taskId: string): Promise<void> {
  try {
    await clickUpRequest(`/task/${taskId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting ClickUp contact:", error);
    throw error;
  }
}

/**
 * Bulk operations
 */

/**
 * Import multiple contacts to ClickUp
 */
export async function bulkImportContacts(contacts: ClickUpContact[]): Promise<{
  succeeded: any[];
  failed: Array<{ contact: ClickUpContact; error: string }>;
}> {
  const results = {
    succeeded: [] as any[],
    failed: [] as Array<{ contact: ClickUpContact; error: string }>,
  };

  // Process contacts in batches to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (contact) => {
        try {
          const created = await createClickUpContact(contact);
          results.succeeded.push(created);
        } catch (error) {
          results.failed.push({
            contact,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }),
    );

    // Add delay between batches to respect rate limits
    if (i + batchSize < contacts.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * Sync Bridge Project contacts with ClickUp
 */
export async function syncContactsWithClickUp(localContacts: any[]): Promise<{
  created: number;
  updated: number;
  errors: number;
}> {
  const stats = {
    created: 0,
    updated: 0,
    errors: 0,
  };

  try {
    // Get all existing contacts from ClickUp
    const { contacts: clickUpContacts } = await searchClickUpContacts({
      includeArchived: false,
      limit: 100,
    });

    // Create mapping of emails to ClickUp task IDs
    const emailToTaskId = new Map<string, string>();
    clickUpContacts.forEach((contact) => {
      if (contact.companyEmail) {
        emailToTaskId.set(contact.companyEmail, contact.id);
      }
    });

    // Process local contacts
    for (const localContact of localContacts) {
      try {
        const existingTaskId = emailToTaskId.get(localContact.email);

        if (existingTaskId) {
          // Update existing contact
          await updateClickUpContact(existingTaskId, localContact);
          stats.updated++;
        } else {
          // Create new contact
          await createClickUpContact(localContact);
          stats.created++;
        }
      } catch (error) {
        console.error("Error syncing contact:", error);
        stats.errors++;
      }
    }
  } catch (error) {
    console.error("Error during sync:", error);
    throw error;
  }

  return stats;
}

/**
 * Analytics and reporting
 */

/**
 * Get CRM analytics from ClickUp
 */
export async function getClickUpCRMAnalytics(): Promise<{
  totalContacts: number;
  byCategory: Record<string, number>;
  recentlyAdded: number;
  recentlyUpdated: number;
}> {
  try {
    const { contacts } = await searchClickUpContacts({
      includeArchived: false,
      limit: 1000,
    });

    // Calculate analytics
    const analytics = {
      totalContacts: contacts.length,
      byCategory: {} as Record<string, number>,
      recentlyAdded: 0,
      recentlyUpdated: 0,
    };

    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    contacts.forEach((contact) => {
      // Count by category
      if (contact.businessCategory) {
        analytics.byCategory[contact.businessCategory] =
          (analytics.byCategory[contact.businessCategory] || 0) + 1;
      }

      // Count recent additions
      const createdTime = new Date(contact.createdAt).getTime();
      if (createdTime > weekAgo) {
        analytics.recentlyAdded++;
      }

      // Count recent updates
      const updatedTime = new Date(contact.updatedAt).getTime();
      if (updatedTime > dayAgo && updatedTime !== createdTime) {
        analytics.recentlyUpdated++;
      }
    });

    return analytics;
  } catch (error) {
    console.error("Error getting CRM analytics:", error);
    throw error;
  }
}

/**
 * Utility function to initialize field IDs
 * Run this once and update clickup-field-mapping.ts with actual IDs
 */
export async function initializeFieldIds(): Promise<void> {
  console.log("Fetching ClickUp custom field IDs...");
  console.log("List ID:", CLICKUP_LIST_ID);

  try {
    const fields = await getClickUpCustomFields();

    console.log(
      "\nUpdate CLICKUP_FIELD_IDS in clickup-field-mapping.ts with these values:",
    );
    console.log("export const CLICKUP_FIELD_IDS: ClickUpCustomFieldIds = {");

    fields.forEach((field: any) => {
      const fieldName = field.name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, "");
      console.log(
        `  ${fieldName}: '${field.id}', // ${field.name} (${field.type})`,
      );
    });

    console.log("};");
  } catch (error) {
    console.error("Failed to fetch field IDs:", error);
  }
}
