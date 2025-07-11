import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  CreateContactRequest,
  UpdateContactRequest,
  SearchContactsParams,
  ContactSuccessResponse,
  ContactErrorResponse,
  PaginatedContactsResponse,
} from "@/types/crm";
import {
  createContact,
  getContactById,
  updateContact,
  searchContacts,
} from "@/lib/crm/contact-service";

// Validation schemas
const contactCreateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  relationship: z.string().min(1, "Relationship is required"),
  connectionStrength: z.string().min(1, "Connection strength is required"),
  engagementLevel: z.enum(["high", "medium", "low"]),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.string(), z.any()).optional(),
});

const contactUpdateSchema = z.object({
  id: z.string().min(1, "Contact ID is required"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Valid email is required").optional(),
  zipCode: z.string().min(5, "Valid zip code is required").optional(),
  relationship: z.string().min(1, "Relationship is required").optional(),
  connectionStrength: z
    .string()
    .min(1, "Connection strength is required")
    .optional(),
  engagementLevel: z.enum(["high", "medium", "low"]).optional(),
  pagesVisited: z.array(z.string()).optional(),
  timeOnSite: z.number().optional(),
  storiesRead: z.array(z.string()).optional(),
  letterSubmitted: z.boolean().optional(),
  volunteerSignup: z.boolean().optional(),
  willingToTestify: z.boolean().optional(),
  leadScore: z.number().optional(),
  lastEngagement: z.string().optional(),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.string(), z.any()).optional(),
});

const contactSearchSchema = z.object({
  query: z.string().optional(),
  email: z.string().email().optional(),
  engagementLevel: z.enum(["high", "medium", "low"]).optional(),
  relationship: z.string().optional(),
  hasSubmittedLetter: z.boolean().optional(),
  isVolunteer: z.boolean().optional(),
  willingToTestify: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  minLeadScore: z.number().optional(),
  lastEngagementAfter: z.string().optional(),
  lastEngagementBefore: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  page: z.number().min(1).default(1),
  sortBy: z
    .enum(["leadScore", "lastEngagement", "firstName", "createdAt"])
    .optional(),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

/**
 * Handle POST request to create a new contact
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validationResult = contactCreateSchema.safeParse(body);

    if (!validationResult.success) {
      const errorResponse: ContactErrorResponse = {
        success: false,
        error: "Validation error",
        details: validationResult.error.format(),
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const contact = validationResult.data as CreateContactRequest;
    const result = await createContact(contact);

    const successResponse: ContactSuccessResponse = {
      success: true,
      message: "Contact created successfully",
      data: {
        id: result.id,
        url: result.url,
      },
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error("Error creating contact:", error);

    const errorResponse: ContactErrorResponse = {
      success: false,
      error: "Server error creating contact",
      details: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle PUT request to update an existing contact
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validationResult = contactUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      const errorResponse: ContactErrorResponse = {
        success: false,
        error: "Validation error",
        details: validationResult.error.format(),
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const contact = validationResult.data as UpdateContactRequest;
    const { id, ...updates } = contact;
    if (!id) {
      const errorResponse: ContactErrorResponse = {
        success: false,
        error: "Contact ID is required for updates",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    await updateContact(id, updates);

    const successResponse: ContactSuccessResponse = {
      success: true,
      message: "Contact updated successfully",
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error("Error updating contact:", error);

    const errorResponse: ContactErrorResponse = {
      success: false,
      error: "Server error updating contact",
      details: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle GET request to retrieve contacts
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // If ID is provided, return a single contact
    if (id) {
      const contact = await getContactById(id);
      return NextResponse.json({
        success: true,
        data: contact,
      });
    }

    // Otherwise, search contacts based on query parameters
    const params: SearchContactsParams = {
      query: searchParams.get("query") || undefined,
      email: searchParams.get("email") || undefined,
      engagementLevel:
        (searchParams.get("engagementLevel") as any) || undefined,
      relationship: searchParams.get("relationship") || undefined,
      hasSubmittedLetter: searchParams.has("hasSubmittedLetter")
        ? searchParams.get("hasSubmittedLetter") === "true"
        : undefined,
      isVolunteer: searchParams.has("isVolunteer")
        ? searchParams.get("isVolunteer") === "true"
        : undefined,
      willingToTestify: searchParams.has("willingToTestify")
        ? searchParams.get("willingToTestify") === "true"
        : undefined,
      tags: searchParams.get("tags")?.split(",") || undefined,
      minLeadScore: searchParams.has("minLeadScore")
        ? parseInt(searchParams.get("minLeadScore") || "0")
        : undefined,
      lastEngagementAfter: searchParams.get("lastEngagementAfter") || undefined,
      lastEngagementBefore:
        searchParams.get("lastEngagementBefore") || undefined,
      limit: parseInt(searchParams.get("limit") || "20"),
      page: parseInt(searchParams.get("page") || "1"),
      sortBy: (searchParams.get("sortBy") as any) || undefined,
      sortDirection:
        (searchParams.get("sortDirection") as "asc" | "desc") || "desc",
    };

    // Validate search params
    const validationResult = contactSearchSchema.safeParse(params);

    if (!validationResult.success) {
      const errorResponse: ContactErrorResponse = {
        success: false,
        error: "Invalid search parameters",
        details: validationResult.error.format(),
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const validatedParams = validationResult.data;
    const results = await searchContacts(validatedParams);

    const paginatedResponse: PaginatedContactsResponse = {
      success: true,
      data: results.data.map((contact) => ({
        ...contact,
        id: contact.id || "",
        createdAt: contact.createdAt || new Date().toISOString(),
        updatedAt: contact.updatedAt || new Date().toISOString(),
      })),
      total: results.total,
      page: results.page,
      pageSize: results.pageSize || validatedParams.limit,
      hasMore: results.hasMore,
      limit: validatedParams.limit,
      totalPages: Math.ceil(results.total / validatedParams.limit),
    };

    return NextResponse.json(paginatedResponse);
  } catch (error) {
    console.error("Error retrieving contacts:", error);

    const errorResponse: ContactErrorResponse = {
      success: false,
      error: "Server error retrieving contacts",
      details: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
