/**
 * Core CRM Contact interface for The Bridge Project
 */
export interface CRMContact {
  // Basic personal information
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  relationship: string;
  connectionStrength: string;
  engagementLevel: "high" | "medium" | "low";

  // Behavior tracking
  pagesVisited: string[];
  timeOnSite: number;
  storiesRead: string[];

  // Conversion data
  letterSubmitted: boolean;
  volunteerSignup: boolean;
  willingToTestify: boolean;

  // Lifecycle
  leadScore: number;
  lastEngagement: string;
  tags: string[];
}

/**
 * ContactData type alias for backward compatibility
 */
export type ContactData = CRMContact & {
  id?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Extended CRM Contact with ID and timestamps
 */
export interface CRMContactWithMeta extends CRMContact {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request to create a new CRM contact
 */
export interface CreateContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  relationship: string;
  connectionStrength: string;
  engagementLevel: "high" | "medium" | "low";
  tags?: string[];
  customFields?: Record<string, any>;
}

/**
 * Result of contact creation
 */
export interface ContactCreateResult {
  success?: boolean;
  id: string;
  url?: string;
  message?: string;
  error?: string;
  contact?: ContactData;
}

/**
 * Request to update an existing CRM contact
 */
export interface UpdateContactRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  zipCode?: string;
  relationship?: string;
  connectionStrength?: string;
  engagementLevel?: "high" | "medium" | "low";
  pagesVisited?: string[];
  timeOnSite?: number;
  storiesRead?: string[];
  letterSubmitted?: boolean;
  volunteerSignup?: boolean;
  willingToTestify?: boolean;
  leadScore?: number;
  lastEngagement?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

/**
 * Parameters for searching CRM contacts
 */
export interface SearchContactsParams {
  query?: string;
  email?: string;
  engagementLevel?: "high" | "medium" | "low";
  relationship?: string;
  hasSubmittedLetter?: boolean;
  isVolunteer?: boolean;
  willingToTestify?: boolean;
  tags?: string[];
  minLeadScore?: number;
  lastEngagementAfter?: string;
  lastEngagementBefore?: string;
  limit?: number;
  page?: number;
  sortBy?: "leadScore" | "lastEngagement" | "firstName" | "createdAt";
  sortDirection?: "asc" | "desc";
}

/**
 * Response for successful contact operations
 */
export interface ContactSuccessResponse {
  success: true;
  message: string;
  data?: {
    id: string;
    url?: string;
  };
}

/**
 * Error response for contact operations
 */
export interface ContactErrorResponse {
  success: false;
  error: string;
  details?: any;
}

/**
 * Paginated response for contact search
 */
export interface PaginatedContactsResponse {
  success: true;
  data: CRMContactWithMeta[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pageSize?: number;
  hasMore?: boolean;
}

/**
 * ClickUp custom field mapping for CRM contacts
 */
export interface ClickUpFieldMapping {
  emailField: string;
  relationshipField: string;
  connectionStrengthField: string;
  engagementLevelField: string;
  pagesVisitedField: string;
  timeOnSiteField: string;
  storiesReadField: string;
  letterSubmittedField: string;
  volunteerSignupField: string;
  willingToTestifyField: string;
  leadScoreField: string;
  lastEngagementField: string;
}
