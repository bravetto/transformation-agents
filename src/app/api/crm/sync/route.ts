import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  syncContactsWithClickUp,
  getClickUpCRMAnalytics,
  bulkImportContacts,
  initializeFieldIds,
} from "@/lib/crm/clickup-service";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_WINDOW,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Validation schemas
const syncRequestSchema = z.object({
  contacts: z.array(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      relationship: z.string(),
      connectionStrength: z.string(),
      engagementLevel: z.enum(["high", "medium", "low"]),
      tags: z.array(z.string()).optional(),
    }),
  ),
  mode: z.enum(["sync", "import"]).default("sync"),
});

/**
 * POST /api/crm/sync
 * Sync contacts with ClickUp CRM
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const clientIp = request.headers.get("x-forwarded-for") || "anonymous";
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 },
      );
    }

    // Validate request body
    const body = await request.json();
    const validationResult = syncRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const { contacts, mode } = validationResult.data;

    // Perform sync or import based on mode
    let result;

    if (mode === "import") {
      // Transform contacts to ClickUp format
      const clickUpContacts = contacts.map((contact) => ({
        name: `${contact.firstName} ${contact.lastName}`,
        contactPerson: `${contact.firstName} ${contact.lastName}`,
        companyEmail: contact.email,
        contactEmail: contact.email,
        phoneNumber: contact.phone,
        // Map engagement level to business category
        businessCategory: (contact.engagementLevel === "high"
          ? "CONSULTING"
          : contact.engagementLevel === "medium"
            ? "MARKETING"
            : "SOFTWARE") as any,
        keywords: contact.tags?.join(", ") || "",
      }));

      // Bulk import new contacts
      result = await bulkImportContacts(clickUpContacts);

      return NextResponse.json({
        success: true,
        message: "Bulk import completed",
        data: {
          succeeded: result.succeeded.length,
          failed: result.failed.length,
          failedContacts: result.failed,
        },
      });
    } else {
      // Sync existing contacts
      result = await syncContactsWithClickUp(contacts);

      return NextResponse.json({
        success: true,
        message: "Sync completed successfully",
        data: result,
      });
    }
  } catch (error) {
    console.error("Error in CRM sync:", error);

    // Audit log for failures
    console.log("[AUDIT] CRM sync failed:", {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
      ip: request.headers.get("x-forwarded-for") || "anonymous",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Server error during sync",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/crm/sync
 * Get CRM sync status and analytics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    // Initialize field IDs (admin action)
    if (action === "init-fields") {
      // Check for admin authorization (implement your auth check)
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.includes("admin-key")) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 },
        );
      }

      await initializeFieldIds();

      return NextResponse.json({
        success: true,
        message: "Field IDs logged to console. Check server logs.",
      });
    }

    // Get analytics
    const analytics = await getClickUpCRMAnalytics();

    return NextResponse.json({
      success: true,
      data: {
        analytics,
        lastSync: new Date().toISOString(),
        syncEnabled: !!process.env.CLICKUP_API_KEY,
      },
    });
  } catch (error) {
    console.error("Error fetching CRM sync status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error fetching sync status",
      },
      { status: 500 },
    );
  }
}
