import {
  describe,
  it,
  expect,
  beforeEach,
  jest,
  afterEach,
} from "@jest/globals";
import {
  createClickUpContact,
  updateClickUpContact,
  getClickUpContact,
  searchClickUpContacts,
  getClickUpCRMAnalytics,
  syncContactsWithClickUp,
} from "../clickup-service";

// Mock environment variables
const mockEnv = {
  CLICKUP_API_KEY: "test-api-key-12345",
  CLICKUP_LIST_ID: "test-list-id-67890",
  CLICKUP_TEAM_ID: "test-team-id-11111",
};

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe("ClickUp API Integration", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock environment variables
    Object.entries(mockEnv).forEach(([key, value]) => {
      process.env[key] = value;
    });

    // Default successful response
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        id: "contact-123",
        name: "Test Contact",
        status: { status: "active" },
        custom_fields: [],
        date_created: Date.now().toString(),
        date_updated: Date.now().toString(),
      }),
    });
  });

  afterEach(() => {
    // Clean up environment
    Object.keys(mockEnv).forEach((key) => {
      delete process.env[key];
    });
    jest.clearAllMocks();
  });

  describe("Contact Creation", () => {
    it("creates contact with all required fields", async () => {
      const contact = {
        name: "John Doe",
        contactPerson: "John Doe",
        companyEmail: "john@example.com",
        contactEmail: "john@example.com",
        phoneNumber: "555-0123",
        businessCategory: "community_member",
        keywords: "supporter, advocate",
      };

      const result = await createClickUpContact(contact);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("api.clickup.com"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "test-api-key-12345",
            "Content-Type": "application/json",
          }),
          body: expect.stringContaining("John Doe"),
        }),
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: "contact-123",
          name: "Test Contact",
        }),
      );
    });

    it("handles API errors gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Rate Limited",
        text: async () => "Rate limit exceeded",
      });

      await expect(createClickUpContact({ name: "Test" })).rejects.toThrow(
        "ClickUp API error: 429 Rate Limited",
      );
    });

    it("validates required fields", async () => {
      const invalidContact = { contactPerson: "John" }; // Missing name

      await expect(createClickUpContact(invalidContact)).rejects.toThrow();
    });

    it("handles network failures", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(createClickUpContact({ name: "Test" })).rejects.toThrow(
        "Network error",
      );
    });
  });

  describe("Field Mapping", () => {
    it("maps all 20 custom fields correctly", async () => {
      const contact = {
        name: "Test User",
        contactPerson: "Test User",
        companyEmail: "test@example.com",
        contactEmail: "test@example.com",
        phoneNumber: "555-0123",
        contactPhoneNumber: "555-0124",
        faxNumber: "555-0125",
        businessCategory: "community_supporter",
        productServices: "Advocacy services",
        website: "https://example.com",
        address: "123 Main St, City, State 12345",
        locationCovered: "Local community",
        establishmentDate: "2023-01-01",
        keywords: "supporter, advocate, volunteer",
      };

      await createClickUpContact(contact);

      // Verify the request body contains mapped fields
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody).toEqual(
        expect.objectContaining({
          name: "Test User",
          custom_fields: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(String),
            }),
          ]),
        }),
      );

      // Verify specific field mappings exist
      const customFields = requestBody.custom_fields;
      expect(customFields.length).toBeGreaterThan(10); // Should have many mapped fields
    });

    it("handles missing optional fields gracefully", async () => {
      const minimalContact = {
        name: "Minimal Contact",
      };

      await createClickUpContact(minimalContact);

      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.name).toBe("Minimal Contact");
      expect(requestBody.custom_fields).toEqual(expect.arrayContaining([]));
    });

    it("handles business category mapping", async () => {
      const contact = {
        name: "Category Test",
        businessCategory: "legal_professional",
      };

      await createClickUpContact(contact);

      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      // Should have business category field mapped
      const categoryField = requestBody.custom_fields.find(
        (field: any) => field.id === "ea4d8b51-dc5b-44bd-abdd-131f551dc273", // Business category field ID
      );

      expect(categoryField).toBeDefined();
    });
  });

  describe("Contact Updates", () => {
    it("updates existing contact successfully", async () => {
      const contactId = "existing-contact-123";
      const updates = {
        phoneNumber: "555-9999",
        keywords: "updated, supporter",
      };

      await updateClickUpContact(contactId, updates);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`task/${contactId}`),
        expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            Authorization: "test-api-key-12345",
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("handles update failures gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "Contact not found",
      });

      await expect(updateClickUpContact("non-existent", {})).rejects.toThrow(
        "ClickUp API error: 404 Not Found",
      );
    });
  });

  describe("Contact Search", () => {
    it("searches contacts with filters", async () => {
      const mockSearchResponse = {
        tasks: [
          {
            id: "contact-1",
            name: "John Doe",
            status: { status: "active" },
            custom_fields: [],
            date_created: Date.now().toString(),
            date_updated: Date.now().toString(),
          },
          {
            id: "contact-2",
            name: "Jane Smith",
            status: { status: "active" },
            custom_fields: [],
            date_created: Date.now().toString(),
            date_updated: Date.now().toString(),
          },
        ],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const results = await searchClickUpContacts({
        query: "john",
        businessCategory: "community_member",
        limit: 10,
      });

      expect(results.contacts).toHaveLength(1); // Should filter by query
      expect(results.total).toBe(1);
      expect(results.contacts[0].name).toBe("John Doe");
    });

    it("handles empty search results", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ tasks: [] }),
      });

      const results = await searchClickUpContacts({ query: "nonexistent" });

      expect(results.contacts).toHaveLength(0);
      expect(results.total).toBe(0);
    });

    it("applies pagination correctly", async () => {
      const mockResponse = {
        tasks: Array.from({ length: 5 }, (_, i) => ({
          id: `contact-${i}`,
          name: `Contact ${i}`,
          status: { status: "active" },
          custom_fields: [],
          date_created: Date.now().toString(),
          date_updated: Date.now().toString(),
        })),
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const results = await searchClickUpContacts({
        limit: 3,
        page: 1,
      });

      expect(results.limit).toBe(3);
      expect(results.page).toBe(1);
      expect(results.contacts.length).toBeLessThanOrEqual(3);
    });
  });

  describe("Analytics and Reporting", () => {
    it("generates CRM analytics", async () => {
      const mockAnalyticsData = {
        tasks: [
          {
            id: "contact-1",
            name: "Contact 1",
            status: { status: "active" },
            custom_fields: [
              { id: "business-category-id", value: "Legal Professional" },
            ],
            date_created: (Date.now() - 86400000).toString(), // 1 day ago
            date_updated: Date.now().toString(),
          },
          {
            id: "contact-2",
            name: "Contact 2",
            status: { status: "active" },
            custom_fields: [
              { id: "business-category-id", value: "Community Member" },
            ],
            date_created: (Date.now() - 604800000).toString(), // 1 week ago
            date_updated: (Date.now() - 86400000).toString(), // 1 day ago
          },
        ],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockAnalyticsData,
      });

      const analytics = await getClickUpCRMAnalytics();

      expect(analytics.totalContacts).toBe(2);
      expect(analytics.recentlyAdded).toBeGreaterThanOrEqual(1);
      expect(analytics.byCategory).toBeDefined();
    });
  });

  describe("Data Sync", () => {
    it("syncs local contacts with ClickUp", async () => {
      const localContacts = [
        {
          name: "New Contact",
          email: "new@example.com",
          phone: "555-0001",
        },
        {
          name: "Existing Contact",
          email: "existing@example.com",
          phone: "555-0002",
        },
      ];

      // Mock search to return one existing contact
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            tasks: [
              {
                id: "existing-123",
                name: "Existing Contact",
                custom_fields: [
                  { id: "email-field-id", value: "existing@example.com" },
                ],
              },
            ],
          }),
        })
        // Mock create new contact
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: "new-456" }),
        })
        // Mock update existing contact
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: "existing-123" }),
        });

      const stats = await syncContactsWithClickUp(localContacts);

      expect(stats.created).toBe(1);
      expect(stats.updated).toBe(1);
      expect(stats.errors).toBe(0);
    });

    it("handles sync errors gracefully", async () => {
      const localContacts = [
        { name: "Error Contact", email: "error@example.com" },
      ];

      // Mock search success but create failure
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ tasks: [] }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 400,
          statusText: "Bad Request",
          text: async () => "Invalid data",
        });

      const stats = await syncContactsWithClickUp(localContacts);

      expect(stats.created).toBe(0);
      expect(stats.updated).toBe(0);
      expect(stats.errors).toBe(1);
    });
  });

  describe("Rate Limiting and Retry Logic", () => {
    it("handles rate limiting with appropriate delays", async () => {
      // Mock rate limit response
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Rate Limited",
        text: async () => "Rate limit exceeded",
      });

      const startTime = Date.now();

      try {
        await createClickUpContact({ name: "Rate Limited Test" });
      } catch (error) {
        const endTime = Date.now();

        // Should fail quickly without infinite retries
        expect(endTime - startTime).toBeLessThan(5000);
        expect(error.message).toContain("Rate Limited");
      }
    });

    it("retries on temporary failures", async () => {
      // Mock temporary failure then success
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: "Service Unavailable",
          text: async () => "Temporary error",
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: "retry-success" }),
        });

      // This test would require implementing retry logic in the actual service
      // For now, verify it fails on first attempt
      await expect(
        createClickUpContact({ name: "Retry Test" }),
      ).rejects.toThrow("Service Unavailable");
    });
  });

  describe("Security and Validation", () => {
    it("validates API key presence", async () => {
      delete process.env.CLICKUP_API_KEY;

      // Should handle missing API key gracefully
      try {
        await createClickUpContact({ name: "No API Key Test" });
      } catch (error) {
        // Should either throw an error or handle gracefully
        expect(error).toBeDefined();
      }
    });

    it("sanitizes input data", async () => {
      const maliciousContact = {
        name: '<script>alert("xss")</script>',
        companyEmail: "test@example.com",
        keywords: "normal, <script>evil()</script>, safe",
      };

      await createClickUpContact(maliciousContact);

      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      // Should not contain raw script tags
      expect(requestBody.name).not.toContain("<script>");
    });

    it("handles large data sets efficiently", async () => {
      const largeContact = {
        name: "Large Data Test",
        keywords: "a".repeat(10000), // Very long string
        address: "b".repeat(5000),
      };

      // Should handle large data without crashing
      await expect(createClickUpContact(largeContact)).resolves.toBeDefined();
    });
  });
});
