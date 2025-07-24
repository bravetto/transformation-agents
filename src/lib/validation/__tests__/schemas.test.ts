import { describe, it, expect } from "vitest";
import {
  prayerSubmissionSchema,
  characterWitnessSchema,
  contactFormSchema,
  emailSchema,
  phoneSchema,
} from "../schemas";

describe("🙏 Prayer Submission Schema", () => {
  it("should validate valid prayer submission", () => {
    const validPrayer = {
      name: "Divine Warrior",
      email: "warrior@freedom.com",
      message: "Praying for JAHmere's freedom on July 28, 2025",
      isPublic: true,
      category: "justice" as const,
    };

    const result = prayerSubmissionSchema.parse(validPrayer);
    expect(result).toEqual(validPrayer);
  });

  it("should reject prayer with invalid email", () => {
    const invalidPrayer = {
      name: "Test User",
      email: "invalid-email",
      message: "Valid prayer message for testing",
      isPublic: true,
      category: "support" as const,
    };

    expect(() => prayerSubmissionSchema.parse(invalidPrayer)).toThrow();
  });

  it("should reject prayer message too short", () => {
    const invalidPrayer = {
      name: "Test User",
      email: "test@example.com",
      message: "Short",
      isPublic: true,
      category: "healing" as const,
    };

    expect(() => prayerSubmissionSchema.parse(invalidPrayer)).toThrow(
      "Prayer message must be at least 10 characters",
    );
  });

  it("should validate all prayer categories", () => {
    const categories = [
      "support",
      "justice",
      "transformation",
      "healing",
      "gratitude",
    ];

    categories.forEach((category) => {
      const prayer = {
        name: "Test User",
        email: "test@example.com",
        message: "Valid prayer message for category testing",
        isPublic: true,
        category: category as any,
      };

      expect(() => prayerSubmissionSchema.parse(prayer)).not.toThrow();
    });
  });

  it("should default isPublic to true", () => {
    const prayer = {
      name: "Test User",
      email: "test@example.com",
      message: "Valid prayer message",
      category: "gratitude" as const,
    };

    const result = prayerSubmissionSchema.parse(prayer);
    expect(result.isPublic).toBe(true);
  });
});

describe("⚖️ Character Witness Schema", () => {
  it("should validate complete character witness", () => {
    const validWitness = {
      fullName: "John Justice Advocate",
      email: "john@advocate.com",
      phone: "+1-555-123-4567",
      relationship: "Community mentor and friend",
      yearsKnown: 5,
      testimony:
        "I have known JAHmere for 5 years and can attest to his character and transformation. He has consistently demonstrated integrity, compassion, and dedication to community service. His commitment to positive change is evident in every interaction I have witnessed.",
      willTestifyInCourt: true,
      canBeContacted: true,
      consent: true,
    };

    const result = characterWitnessSchema.parse(validWitness);
    expect(result).toEqual(validWitness);
  });

  it("should require consent to be true", () => {
    const witnessWithoutConsent = {
      fullName: "Test Witness",
      email: "test@example.com",
      relationship: "Friend",
      yearsKnown: 3,
      testimony:
        "This is a substantial testimony that meets the minimum character requirements for the character witness submission system.",
      willTestifyInCourt: false,
      canBeContacted: true,
      consent: false,
    };

    expect(() => characterWitnessSchema.parse(witnessWithoutConsent)).toThrow(
      "You must consent to share your testimony",
    );
  });

  it("should reject testimony too short", () => {
    const witnessShortTestimony = {
      fullName: "Test Witness",
      email: "test@example.com",
      relationship: "Friend",
      yearsKnown: 2,
      testimony: "Too short",
      willTestifyInCourt: true,
      canBeContacted: true,
      consent: true,
    };

    expect(() => characterWitnessSchema.parse(witnessShortTestimony)).toThrow(
      "Please provide at least 100 characters",
    );
  });

  it("should reject testimony too long", () => {
    const witnessLongTestimony = {
      fullName: "Test Witness",
      email: "test@example.com",
      relationship: "Friend",
      yearsKnown: 2,
      testimony: "x".repeat(5001), // Exceeds 5000 character limit
      willTestifyInCourt: true,
      canBeContacted: true,
      consent: true,
    };

    expect(() => characterWitnessSchema.parse(witnessLongTestimony)).toThrow(
      "Testimony should not exceed 5000 characters",
    );
  });

  it("should validate years known range", () => {
    const validRanges = [0, 1, 50, 100];
    const invalidRanges = [-1, 101];

    validRanges.forEach((years) => {
      const witness = {
        fullName: "Test Witness",
        email: "test@example.com",
        relationship: "Friend",
        yearsKnown: years,
        testimony:
          "Valid testimony that meets the minimum character requirement for testing the years known validation.",
        willTestifyInCourt: true,
        canBeContacted: true,
        consent: true,
      };

      expect(() => characterWitnessSchema.parse(witness)).not.toThrow();
    });

    invalidRanges.forEach((years) => {
      const witness = {
        fullName: "Test Witness",
        email: "test@example.com",
        relationship: "Friend",
        yearsKnown: years,
        testimony: "Valid testimony that meets requirements",
        willTestifyInCourt: true,
        canBeContacted: true,
        consent: true,
      };

      expect(() => characterWitnessSchema.parse(witness)).toThrow();
    });
  });

  it("should make phone optional", () => {
    const witnessWithoutPhone = {
      fullName: "Test Witness",
      email: "test@example.com",
      relationship: "Friend",
      yearsKnown: 3,
      testimony:
        "This is a substantial testimony that meets the minimum character requirements for testing phone optionality.",
      willTestifyInCourt: false,
      canBeContacted: true,
      consent: true,
    };

    expect(() =>
      characterWitnessSchema.parse(witnessWithoutPhone),
    ).not.toThrow();
  });
});

describe("📧 Email Schema", () => {
  it("should validate correct email formats", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.org",
      "freedom@jahmere-webb.net",
      "justice+advocate@legal.gov",
    ];

    validEmails.forEach((email) => {
      expect(() => emailSchema.parse(email)).not.toThrow();
    });
  });

  it("should reject invalid email formats", () => {
    const invalidEmails = [
      "invalid",
      "@domain.com",
      "user@",
      "user..name@domain.com",
      "user@domain",
    ];

    invalidEmails.forEach((email) => {
      expect(() => emailSchema.parse(email)).toThrow(
        "Please enter a valid email address",
      );
    });
  });
});

describe("📞 Phone Schema", () => {
  it("should validate phone number formats", () => {
    const validPhones = [
      "+1-555-123-4567",
      "555-123-4567",
      "(555) 123-4567",
      "+44 20 7123 4567",
      "555 123 4567",
      "15551234567",
    ];

    validPhones.forEach((phone) => {
      expect(() => phoneSchema.parse(phone)).not.toThrow();
    });
  });

  it("should reject invalid phone formats", () => {
    const invalidPhones = ["abc-def-ghij", "555-123-456a", "++1-555-123-4567"];

    invalidPhones.forEach((phone) => {
      expect(() => phoneSchema.parse(phone)).toThrow(
        "Please enter a valid phone number",
      );
    });
  });

  it("should be optional", () => {
    expect(phoneSchema.parse(undefined)).toBeUndefined();
  });
});

describe("📝 Contact Form Schema", () => {
  it("should validate complete contact form", () => {
    const validContact = {
      name: "Justice Advocate",
      email: "advocate@justice.org",
      subject: "Support for JAHmere Webb Freedom Campaign",
      message: "I am writing to express my support for the freedom campaign.",
      category: "legal" as const,
    };

    const result = contactFormSchema.parse(validContact);
    expect(result).toEqual(validContact);
  });

  it("should default category to general", () => {
    const contact = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message for the contact form validation.",
    };

    const result = contactFormSchema.parse(contact);
    expect(result.category).toBe("general");
  });

  it("should validate all contact categories", () => {
    const categories = ["legal", "media", "support", "general"];

    categories.forEach((category) => {
      const contact = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message for category validation.",
        category: category as any,
      };

      expect(() => contactFormSchema.parse(contact)).not.toThrow();
    });
  });
});
