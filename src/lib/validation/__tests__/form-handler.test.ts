import { describe, it, expect } from "vitest";
import { validateFormData } from "../form-handler";
import { prayerSubmissionSchema, characterWitnessSchema } from "../schemas";

describe("🔧 Form Handler", () => {
  describe("validateFormData", () => {
    it("should validate and convert FormData for prayer submission", async () => {
      const formData = new FormData();
      formData.set("name", "Divine Warrior");
      formData.set("email", "warrior@freedom.com");
      formData.set("message", "Praying for JAHmere's freedom on July 28, 2025");
      formData.set("isPublic", "true");
      formData.set("category", "justice");

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: "Divine Warrior",
        email: "warrior@freedom.com",
        message: "Praying for JAHmere's freedom on July 28, 2025",
        isPublic: true,
        category: "justice",
      });
      expect(result.errors).toBeUndefined();
    });

    it('should handle boolean conversion from "on" (checkbox value)', async () => {
      const formData = new FormData();
      formData.set("name", "Test User");
      formData.set("email", "test@example.com");
      formData.set("message", "Test prayer message for boolean conversion");
      formData.set("isPublic", "on"); // Checkbox "on" value
      formData.set("category", "support");

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(true);
      expect(result.data?.isPublic).toBe(true);
    });

    it("should handle numeric conversion for yearsKnown", async () => {
      const formData = new FormData();
      formData.set("fullName", "John Justice Advocate");
      formData.set("email", "john@advocate.com");
      formData.set("relationship", "Community mentor");
      formData.set("yearsKnown", "5"); // String number from form
      formData.set(
        "testimony",
        "I have known JAHmere for 5 years and can attest to his character and transformation. He has consistently demonstrated integrity and compassion.",
      );
      formData.set("willTestifyInCourt", "true");
      formData.set("canBeContacted", "true");
      formData.set("consent", "true");

      const result = await validateFormData(formData, characterWitnessSchema);

      expect(result.success).toBe(true);
      expect(result.data?.yearsKnown).toBe(5);
      expect(typeof result.data?.yearsKnown).toBe("number");
    });

    it("should return validation errors for invalid data", async () => {
      const formData = new FormData();
      formData.set("name", "A"); // Too short
      formData.set("email", "invalid-email"); // Invalid email
      formData.set("message", "Short"); // Too short
      formData.set("category", "justice");

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.name).toBe("Name must be at least 2 characters");
      expect(result.errors?.email).toBe("Please enter a valid email address");
      expect(result.errors?.message).toBe(
        "Prayer message must be at least 10 characters",
      );
      expect(result.message).toBe("Please check the form for errors");
    });

    it("should handle multiple validation errors", async () => {
      const formData = new FormData();
      formData.set("fullName", "Jo"); // Too short
      formData.set("email", "bad-email"); // Invalid
      formData.set("relationship", "Fr"); // Too short
      formData.set("yearsKnown", "150"); // Out of range
      formData.set("testimony", "Too short"); // Too short
      formData.set("willTestifyInCourt", "true");
      formData.set("canBeContacted", "true");
      formData.set("consent", "false"); // Must be true

      const result = await validateFormData(formData, characterWitnessSchema);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(Object.keys(result.errors!)).toHaveLength(6); // All failed validations
      expect(result.errors?.consent).toBe(
        "You must consent to share your testimony",
      );
    });

    it("should handle missing required fields", async () => {
      const formData = new FormData();
      // Only set category, missing name, email, message

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.name).toBeDefined();
      expect(result.errors?.email).toBeDefined();
      expect(result.errors?.message).toBeDefined();
    });

    it("should apply default values when not provided", async () => {
      const formData = new FormData();
      formData.set("name", "Test User");
      formData.set("email", "test@example.com");
      formData.set("message", "Valid prayer message without isPublic set");
      formData.set("category", "gratitude");
      // Note: isPublic not set, should default to true

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(true);
      expect(result.data?.isPublic).toBe(true); // Default value applied
    });

    it("should handle unexpected errors gracefully", async () => {
      // Create a mock schema that throws a non-ZodError
      const mockSchema = {
        parse: () => {
          throw new Error("Unexpected error");
        },
      };

      const formData = new FormData();
      const result = await validateFormData(formData, mockSchema as any);

      expect(result.success).toBe(false);
      expect(result.message).toBe("An unexpected error occurred");
      expect(result.errors).toBeUndefined();
    });

    it("should handle empty FormData", async () => {
      const formData = new FormData();

      const result = await validateFormData(formData, prayerSubmissionSchema);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.message).toBe("Please check the form for errors");
    });

    it("should handle boolean fields correctly for character witness", async () => {
      const formData = new FormData();
      formData.set("fullName", "Complete Witness");
      formData.set("email", "witness@test.com");
      formData.set("relationship", "Close friend");
      formData.set("yearsKnown", "3");
      formData.set(
        "testimony",
        "Complete testimony that meets all the minimum requirements for character witness validation and processing system.",
      );
      formData.set("willTestifyInCourt", "on"); // Checkbox on
      formData.set("canBeContacted", "true"); // String true
      formData.set("consent", "on"); // Checkbox on

      const result = await validateFormData(formData, characterWitnessSchema);

      expect(result.success).toBe(true);
      expect(result.data?.willTestifyInCourt).toBe(true);
      expect(result.data?.canBeContacted).toBe(true);
      expect(result.data?.consent).toBe(true);
    });
  });
});
