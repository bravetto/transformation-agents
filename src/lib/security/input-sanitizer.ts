import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

/**
 * 🛡️ DIVINE SECURITY FRAMEWORK
 * Comprehensive input sanitization and validation system
 */

export interface SanitizationOptions {
  allowHtml?: boolean;
  stripTags?: boolean;
  maxLength?: number;
  allowedTags?: string[];
  forbiddenPatterns?: RegExp[];
}

export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  warnings: string[];
  errors: string[];
  originalLength: number;
  sanitizedLength: number;
}

/**
 * Divine Input Sanitizer - Protection against all forms of injection
 */
export class DivineInputSanitizer {
  private static instance: DivineInputSanitizer;
  private securityPatterns: RegExp[] = [];
  private xssPatterns: RegExp[] = [];
  private sqlInjectionPatterns: RegExp[] = [];

  private constructor() {
    this.initializeSecurityPatterns();
  }

  public static getInstance(): DivineInputSanitizer {
    if (!DivineInputSanitizer.instance) {
      DivineInputSanitizer.instance = new DivineInputSanitizer();
    }
    return DivineInputSanitizer.instance;
  }

  private initializeSecurityPatterns(): void {
    // XSS Prevention Patterns
    this.xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
    ];

    // SQL Injection Prevention Patterns
    this.sqlInjectionPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /('|(\\x27)|(\\x2D\\x2D)|(%27)|(%2D%2D))/gi,
      /((\%3D)|(=))[^\n]*((\%27)|(\\x27)|(')|(\-\-)|(%3B)|(;))/gi,
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi,
    ];

    // General Security Patterns
    this.securityPatterns = [
      ...this.xssPatterns,
      ...this.sqlInjectionPatterns,
      /<\?php/gi,
      /<%/gi,
      /\${/gi, // Template injection
      /{{/gi, // Template injection
    ];
  }

  /**
   * Sanitize user input with comprehensive security checks
   */
  public sanitize(
    input: string,
    options: SanitizationOptions = {},
  ): ValidationResult {
    const originalLength = input.length;
    const warnings: string[] = [];
    const errors: string[] = [];

    // Step 1: Length validation
    if (options.maxLength && input.length > options.maxLength) {
      errors.push(
        `Input exceeds maximum length of ${options.maxLength} characters`,
      );
      input = input.substring(0, options.maxLength);
      warnings.push("Input was truncated to maximum length");
    }

    // Step 2: Security pattern detection
    for (const pattern of this.securityPatterns) {
      if (pattern.test(input)) {
        errors.push(
          `Potentially malicious pattern detected: ${pattern.source}`,
        );
      }
    }

    // Step 3: Forbidden pattern checking
    if (options.forbiddenPatterns) {
      for (const pattern of options.forbiddenPatterns) {
        if (pattern.test(input)) {
          errors.push(`Forbidden pattern detected: ${pattern.source}`);
        }
      }
    }

    // Step 4: HTML sanitization
    let sanitized = input;
    if (options.allowHtml) {
      const allowedTags = options.allowedTags || [
        "b",
        "i",
        "em",
        "strong",
        "p",
        "br",
      ];
      sanitized = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: ["href", "title"],
        FORBID_TAGS: ["script", "object", "embed", "iframe"],
      });
    } else if (options.stripTags) {
      sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    } else {
      // Escape HTML entities
      sanitized = this.escapeHtml(input);
    }

    // Step 5: Additional sanitization
    sanitized = this.sanitizeSpecialCharacters(sanitized);

    return {
      isValid: errors.length === 0,
      sanitized,
      warnings,
      errors,
      originalLength,
      sanitizedLength: sanitized.length,
    };
  }

  /**
   * Sanitize form data with field-specific rules
   */
  public sanitizeFormData(
    data: Record<string, any>,
    fieldRules: Record<string, SanitizationOptions> = {},
  ): {
    sanitized: Record<string, any>;
    isValid: boolean;
    fieldResults: Record<string, ValidationResult>;
  } {
    const sanitized: Record<string, any> = {};
    const fieldResults: Record<string, ValidationResult> = {};
    let isValid = true;

    for (const [field, value] of Object.entries(data)) {
      if (typeof value === "string") {
        const rules = fieldRules[field] || {};
        const result = this.sanitize(value, rules);

        sanitized[field] = result.sanitized;
        fieldResults[field] = result;

        if (!result.isValid) {
          isValid = false;
        }
      } else {
        sanitized[field] = value;
      }
    }

    return { sanitized, isValid, fieldResults };
  }

  /**
   * Validate and sanitize email addresses
   */
  public sanitizeEmail(email: string): ValidationResult {
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      return {
        isValid: false,
        sanitized: "",
        warnings: [],
        errors: ["Invalid email format"],
        originalLength: email.length,
        sanitizedLength: 0,
      };
    }

    return this.sanitize(email.toLowerCase().trim(), {
      maxLength: 254,
      forbiddenPatterns: [/[<>]/g],
    });
  }

  /**
   * Validate and sanitize phone numbers
   */
  public sanitizePhone(phone: string): ValidationResult {
    // Remove all non-digit characters except + and -
    const cleaned = phone.replace(/[^\d+\-\s()]/g, "");

    return {
      isValid: /^[\+]?[\d\s\-()]{10,15}$/.test(cleaned),
      sanitized: cleaned,
      warnings: cleaned !== phone ? ["Phone number was cleaned"] : [],
      errors: [],
      originalLength: phone.length,
      sanitizedLength: cleaned.length,
    };
  }

  /**
   * Sanitize URLs with protocol validation
   */
  public sanitizeUrl(url: string): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      const urlObj = new URL(url);

      // Allow only safe protocols
      const allowedProtocols = ["http:", "https:", "mailto:"];
      if (!allowedProtocols.includes(urlObj.protocol)) {
        errors.push(`Unsafe protocol: ${urlObj.protocol}`);
      }

      // Check for suspicious patterns
      if (
        urlObj.hostname.includes("localhost") &&
        process.env.NODE_ENV === "production"
      ) {
        warnings.push("Localhost URL in production environment");
      }

      return {
        isValid: errors.length === 0,
        sanitized: urlObj.toString(),
        warnings,
        errors,
        originalLength: url.length,
        sanitizedLength: urlObj.toString().length,
      };
    } catch (error) {
      return {
        isValid: false,
        sanitized: "",
        warnings: [],
        errors: ["Invalid URL format"],
        originalLength: url.length,
        sanitizedLength: 0,
      };
    }
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  private sanitizeSpecialCharacters(text: string): string {
    // Remove null bytes and other control characters
    return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }
}

// Export singleton instance
export const divineInputSanitizer = DivineInputSanitizer.getInstance();

// Convenience functions
export const sanitizeInput = (input: string, options?: SanitizationOptions) =>
  divineInputSanitizer.sanitize(input, options);

export const sanitizeFormData = (
  data: Record<string, any>,
  fieldRules?: Record<string, SanitizationOptions>,
) => divineInputSanitizer.sanitizeFormData(data, fieldRules);

export const sanitizeEmail = (email: string) =>
  divineInputSanitizer.sanitizeEmail(email);

export const sanitizePhone = (phone: string) =>
  divineInputSanitizer.sanitizePhone(phone);

export const sanitizeUrl = (url: string) =>
  divineInputSanitizer.sanitizeUrl(url);
