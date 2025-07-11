/**
 * ClickUp CRM Field Mapping for The Bridge Project
 * Maps ClickUp custom fields to internal data structures
 */

// Export types needed by contact-service
export interface ContactData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  relationship?: string;
  letterSubmitted?: boolean;
  volunteerSignup?: boolean;
  willingToTestify?: boolean;
  leadScore?: number;
  lastEngagement?: string;
  pagesVisited?: string[];
  storiesRead?: string[];
  timeOnSite?: number;
  connectionStrength?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  relationship?: string;
  message?: string;
}

export interface ContactCreateResult {
  success: boolean;
  contactId?: string;
  error?: string;
}

export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  relationship?: string;
  letterSubmitted?: boolean;
  volunteerSignup?: boolean;
  willingToTestify?: boolean;
  leadScore?: number;
  lastEngagement?: string;
  pagesVisited?: string[];
  storiesRead?: string[];
  timeOnSite?: number;
  connectionStrength?: string;
}

export interface SearchContactsParams {
  email?: string;
  name?: string;
  hasSubmittedLetter?: boolean;
  isVolunteer?: boolean;
  willingToTestify?: boolean;
  minLeadScore?: number;
  relationship?: string;
  limit?: number;
  offset?: number;
}

export interface ClickUpContact {
  id: string;
  name: string;
  status: string;
  custom_fields: Array<{
    id: string;
    name: string;
    value: any;
  }>;
  date_created: string;
  date_updated: string;
}

export interface ClickUpCustomFieldIds {
  companyLogo: string;
  contactPerson: string;
  faxNumber: string;
  contactPhoneNumber: string;
  productServicesDescription: string;
  businessCategory: string;
  companyEmailAddress: string;
  locationCovered: string;
  businessWebsite: string;
  contactPersonEmailAddress: string;
  phoneNumber: string;
  companyAddress: string;
  establishmentDate: string;
  keywordsForSearching: string;
  // New Bridge Project fields
  pagesVisited: string;
  timeOnSite: string;
  storiesRead: string;
  letterSubmitted: string;
  volunteerSignup: string;
  willingToTestify: string;
  leadScore: string;
  lastEngagement: string;
  relationshipType: string;
  connectionStrength: string;
}

// You'll need to get these IDs from your ClickUp workspace
// Use GET https://api.clickup.com/api/v2/list/{list_id}/field to fetch them
export const CLICKUP_FIELD_IDS: ClickUpCustomFieldIds = {
  companyLogo: "0d50c392-54ee-4d87-aea2-9b15e8ed7317",
  contactPerson: "c15332cc-4944-47ee-8b10-76333fe1edf5",
  faxNumber: "bb9d123c-37ab-41bd-9e3b-ea610872f3be",
  contactPhoneNumber: "c47d389b-6be5-49a3-90cc-c33f858a427f",
  productServicesDescription: "cb6eadb4-04a8-4c8b-9287-48a8bdc27b8d",
  businessCategory: "ea4d8b51-dc5b-44bd-abdd-131f551dc273",
  companyEmailAddress: "941730d8-944b-42cb-b919-0e8b558fb393",
  locationCovered: "361b5ee4-bf8e-47ba-ae7b-f44ed93f446d",
  businessWebsite: "168743e7-eda2-4c84-a88d-96f169e76cc8",
  contactPersonEmailAddress: "e9d84161-ae33-43d6-8b29-6df315050233",
  phoneNumber: "ed223bf2-b5c8-4130-a033-0245f5c7e429",
  companyAddress: "35d8d1c7-25fd-42f1-b14f-8a7ba26d199c",
  establishmentDate: "e065622b-5b81-4e74-a49d-4acccbdc8615",
  keywordsForSearching: "41fa7649-681e-4fe5-9444-24270f161a49",
  // New Bridge Project fields
  pagesVisited: "236bf4de-aab9-49bf-b9d9-cfdc2a73e09b",
  timeOnSite: "1e0d31e7-3e67-4856-9370-24ec0f55eda6",
  storiesRead: "0c21646f-366a-49f9-bd20-69f5fc25b5c5",
  letterSubmitted: "900cc374-2faf-42b5-8b1c-6531c89fe2f1",
  volunteerSignup: "261152e4-7b6b-461c-9873-4889382fc8cd",
  willingToTestify: "1d0cacb0-2ecf-4809-b71f-234563d3becf",
  leadScore: "d7345046-3838-4235-a5d5-7bff3c069515",
  lastEngagement: "9cbda744-5655-48ad-b39f-326ecd13bfb6",
  relationshipType: "de017996-d45e-4c62-bd0b-afd0b79f1ece",
  connectionStrength: "1a7bc483-3ef3-4624-9dca-52ccc7b24810",
};

// Business category mapping with actual ClickUp label IDs
export const BUSINESS_CATEGORIES = {
  SOFTWARE: {
    id: "78cf22be-c96d-4a70-a3df-82255f6f1df0",
    color: "#f900ea",
    label: "Software",
  },
  CONSULTING: {
    id: "a42ab540-c598-444c-b63a-ad087e4fb09c",
    color: "#FF7FAB",
    label: "Consulting",
  },
  MARKETING: {
    id: "506a29cd-9c37-4bf0-bfd0-b33f77c875be",
    color: "#0231E8",
    label: "Marketing",
  },
  LEGAL: {
    id: "4291b5c2-afa4-4185-a97a-13d196a4a294",
    color: "#7C4DFF",
    label: "Legal",
  },
  DESIGN: {
    id: "34d1b992-8858-4290-ab84-21df2aaff2d3",
    color: "#ff7800",
    label: "Design",
  },
  REAL_ESTATE: {
    id: "23760492-2335-4cb1-a307-fdf7764ad4ca",
    color: "#3082B7",
    label: "Real estate",
  },
  CHILD_CARE: {
    id: "ef3c2b59-a7fc-4d97-bbe0-fe9f6a55763a",
    color: "#AF7E2E",
    label: "Child care",
  },
  BOOKKEEPING: {
    id: "a236a834-e57a-4dab-9711-80b17494ab11",
    color: "#bf55ec",
    label: "Bookkeeping",
  },
  BEAUTY: {
    id: "9e8c2231-d7e9-42e0-8b9e-31312f0805ee",
    color: "#f900ea",
    label: "Beauty and Cosmetics",
  },
  SECURITY: {
    id: "a5d8d52f-23d4-4e11-8006-bf0822ed312d",
    color: "#e50000",
    label: "Security",
  },
  PRINTING: {
    id: "78267bf5-c059-4e1f-a42f-1452460f0fbe",
    color: "#3397dd",
    label: "Printing",
  },
  TECHNOLOGY: {
    id: "6000a103-9072-417a-b963-4809e4dbc365",
    color: "#1bbc9c",
    label: "Technology",
  },
} as const;

export type BusinessCategory = keyof typeof BUSINESS_CATEGORIES;

/**
 * Maps ClickUp task data to Bridge Project CRM contact format
 */
export function mapClickUpTaskToContact(clickUpTask: any): any {
  const customFields = clickUpTask.custom_fields || [];

  const getFieldValue = (fieldId: string) => {
    const field = customFields.find((f: any) => f.id === fieldId);
    return field?.value || field?.value?.[0]?.name || null;
  };

  return {
    // Basic info from task
    id: clickUpTask.id,
    name: clickUpTask.name,
    status: clickUpTask.status?.status,

    // Map custom fields
    contactPerson: getFieldValue(CLICKUP_FIELD_IDS.contactPerson),
    companyEmail: getFieldValue(CLICKUP_FIELD_IDS.companyEmailAddress),
    contactEmail: getFieldValue(CLICKUP_FIELD_IDS.contactPersonEmailAddress),
    phoneNumber: getFieldValue(CLICKUP_FIELD_IDS.phoneNumber),
    contactPhoneNumber: getFieldValue(CLICKUP_FIELD_IDS.contactPhoneNumber),
    faxNumber: getFieldValue(CLICKUP_FIELD_IDS.faxNumber),

    // Business details
    businessCategory: getFieldValue(CLICKUP_FIELD_IDS.businessCategory),
    productServices: getFieldValue(
      CLICKUP_FIELD_IDS.productServicesDescription,
    ),
    website: getFieldValue(CLICKUP_FIELD_IDS.businessWebsite),

    // Location
    address: getFieldValue(CLICKUP_FIELD_IDS.companyAddress),
    locationCovered: getFieldValue(CLICKUP_FIELD_IDS.locationCovered),

    // Additional info
    establishmentDate: getFieldValue(CLICKUP_FIELD_IDS.establishmentDate),
    keywords: getFieldValue(CLICKUP_FIELD_IDS.keywordsForSearching),

    // Bridge Project specific fields
    pagesVisited:
      getFieldValue(CLICKUP_FIELD_IDS.pagesVisited)
        ?.split(", ")
        .filter(Boolean) || [],
    timeOnSite: getFieldValue(CLICKUP_FIELD_IDS.timeOnSite),
    storiesRead:
      getFieldValue(CLICKUP_FIELD_IDS.storiesRead)
        ?.split(", ")
        .filter(Boolean) || [],
    letterSubmitted: getFieldValue(CLICKUP_FIELD_IDS.letterSubmitted),
    volunteerSignup: getFieldValue(CLICKUP_FIELD_IDS.volunteerSignup),
    willingToTestify: getFieldValue(CLICKUP_FIELD_IDS.willingToTestify),
    leadScore: getFieldValue(CLICKUP_FIELD_IDS.leadScore),
    lastEngagement: getFieldValue(CLICKUP_FIELD_IDS.lastEngagement),
    relationship: getFieldValue(CLICKUP_FIELD_IDS.relationshipType),
    connectionStrength: getFieldValue(CLICKUP_FIELD_IDS.connectionStrength),

    // Metadata
    createdAt: new Date(parseInt(clickUpTask.date_created)).toISOString(),
    updatedAt: new Date(parseInt(clickUpTask.date_updated)).toISOString(),
  };
}

/**
 * Maps Bridge Project contact data to ClickUp task format
 */
export function mapContactToClickUpTask(contact: any): any {
  const customFields: Array<{ id: string; value: any }> = [];

  // Helper to add custom field if value exists
  const addField = (fieldId: string, value: any) => {
    if (value !== null && value !== undefined && value !== "") {
      customFields.push({ id: fieldId, value });
    }
  };

  // Map all fields
  addField(CLICKUP_FIELD_IDS.contactPerson, contact.contactPerson);
  addField(CLICKUP_FIELD_IDS.companyEmailAddress, contact.companyEmail);
  addField(CLICKUP_FIELD_IDS.contactPersonEmailAddress, contact.contactEmail);
  addField(CLICKUP_FIELD_IDS.phoneNumber, contact.phoneNumber);
  addField(CLICKUP_FIELD_IDS.contactPhoneNumber, contact.contactPhoneNumber);
  addField(CLICKUP_FIELD_IDS.faxNumber, contact.faxNumber);
  addField(
    CLICKUP_FIELD_IDS.productServicesDescription,
    contact.productServices,
  );
  addField(CLICKUP_FIELD_IDS.businessWebsite, contact.website);
  addField(CLICKUP_FIELD_IDS.companyAddress, contact.address);
  addField(CLICKUP_FIELD_IDS.locationCovered, contact.locationCovered);
  addField(CLICKUP_FIELD_IDS.establishmentDate, contact.establishmentDate);
  addField(CLICKUP_FIELD_IDS.keywordsForSearching, contact.keywords);

  // Handle business category label
  if (contact.businessCategory) {
    const category =
      BUSINESS_CATEGORIES[contact.businessCategory as BusinessCategory];
    if (category) {
      // Labels need to be sent as an array containing the label ID
      addField(CLICKUP_FIELD_IDS.businessCategory, [category.id]);
    }
  }

  // Map new Bridge Project fields
  addField(CLICKUP_FIELD_IDS.pagesVisited, contact.pagesVisited?.join(", "));
  addField(CLICKUP_FIELD_IDS.timeOnSite, contact.timeOnSite);
  addField(CLICKUP_FIELD_IDS.storiesRead, contact.storiesRead?.join(", "));
  addField(CLICKUP_FIELD_IDS.letterSubmitted, contact.letterSubmitted);
  addField(CLICKUP_FIELD_IDS.volunteerSignup, contact.volunteerSignup);
  addField(CLICKUP_FIELD_IDS.willingToTestify, contact.willingToTestify);
  addField(CLICKUP_FIELD_IDS.leadScore, contact.leadScore);
  addField(CLICKUP_FIELD_IDS.lastEngagement, contact.lastEngagement);

  // Use dedicated dropdown fields for relationship and connection
  if (contact.relationship) {
    addField(CLICKUP_FIELD_IDS.relationshipType, contact.relationship);
  }
  if (contact.connectionStrength) {
    addField(CLICKUP_FIELD_IDS.connectionStrength, contact.connectionStrength);
  }

  return {
    name: contact.name || contact.contactPerson || "New Contact",
    custom_fields: customFields,
  };
}

// Placeholder functions for contact-service.ts compatibility
export async function createClickUpContact(
  data: CreateContactRequest,
): Promise<ContactCreateResult> {
  // This would implement the actual ClickUp API call
  console.warn("createClickUpContact not implemented");
  return { success: false, error: "Not implemented" };
}

export async function updateClickUpContact(
  id: string,
  data: UpdateContactRequest,
): Promise<ContactCreateResult> {
  // This would implement the actual ClickUp API call
  console.warn("updateClickUpContact not implemented");
  return { success: false, error: "Not implemented" };
}

export async function getClickUpContact(
  id: string,
): Promise<ContactData | null> {
  // This would implement the actual ClickUp API call
  console.warn("getClickUpContact not implemented");
  return null;
}

export async function searchClickUpContacts(
  params: SearchContactsParams,
): Promise<{ contacts: ContactData[]; total: number }> {
  // This would implement the actual ClickUp API call
  console.warn("searchClickUpContacts not implemented");
  return { contacts: [], total: 0 };
}

export async function deleteClickUpContact(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  // This would implement the actual ClickUp API call
  console.warn("deleteClickUpContact not implemented");
  return { success: false, error: "Not implemented" };
}
