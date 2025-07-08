/**
 * System controls for prompt management
 * Provides emergency controls and environment management
 */

import { PromptSystemControls, SafetyCheckResult } from "@/types/prompts";
import { promptSafetyValidator } from "./safety-validator";

/**
 * Interface for prompt system controls
 */
interface PromptControlSystem {
  // Get current system controls
  getSystemControls(): Promise<PromptSystemControls>;

  // Update system controls
  updateSystemControls(
    updates: Partial<PromptSystemControls>,
    updatedBy: string,
  ): Promise<PromptSystemControls>;

  // Enable emergency shutoff
  enableEmergencyShutoff(reason: string, updatedBy: string): Promise<void>;

  // Disable emergency shutoff
  disableEmergencyShutoff(updatedBy: string): Promise<void>;

  // Change active environment
  setActiveEnvironment(
    environment: "development" | "staging" | "production",
    updatedBy: string,
  ): Promise<void>;

  // Check if a prompt is allowed to be used (based on safety, shutoff, etc.)
  checkPromptAllowed(
    promptContent: string,
    topic?: string,
  ): Promise<{
    allowed: boolean;
    reason?: string;
    safetyCheckResult?: SafetyCheckResult;
  }>;

  // Log usage of a prompt
  logPromptUsage(
    templateId: string,
    templateVersion: string,
    tokens: number,
  ): Promise<void>;

  // Check if user is an approved admin
  isApprovedAdmin(userId: string): Promise<boolean>;
}

/**
 * Implementation of prompt control system
 */
export class PromptControlService implements PromptControlSystem {
  // Default system controls
  private systemControls: PromptSystemControls = {
    emergencyShutoff: false,
    activeEnvironment: "development",
    maxTokensPerPrompt: 2000,
    requireSafetyCheck: true,
    sensitiveTopicsRequireApproval: true,
    sensitiveTopics: [
      "politics",
      "religion",
      "race",
      "sexual content",
      "terrorism",
      "violence",
      "self-harm",
    ],
    approvedAdmins: ["admin1", "admin2"],
    lastUpdated: new Date(),
  };

  // Emergency events log
  private emergencyLog: Array<{
    timestamp: Date;
    action: "enable" | "disable";
    reason?: string;
    updatedBy: string;
  }> = [];

  // Usage statistics
  private usageStats = {
    totalPrompts: 0,
    totalTokens: 0,
    byTemplate: new Map<string, { count: number; tokens: number }>(),
  };

  /**
   * Get current system controls
   */
  async getSystemControls(): Promise<PromptSystemControls> {
    return { ...this.systemControls };
  }

  /**
   * Update system controls
   */
  async updateSystemControls(
    updates: Partial<PromptSystemControls>,
    updatedBy: string,
  ): Promise<PromptSystemControls> {
    // Validate updater is an admin
    const isAdmin = await this.isApprovedAdmin(updatedBy);
    if (!isAdmin) {
      throw new Error(
        `User ${updatedBy} is not authorized to update system controls`,
      );
    }

    // Apply updates
    this.systemControls = {
      ...this.systemControls,
      ...updates,
      lastUpdated: new Date(),
      updatedBy,
    };

    return { ...this.systemControls };
  }

  /**
   * Enable emergency shutoff
   */
  async enableEmergencyShutoff(
    reason: string,
    updatedBy: string,
  ): Promise<void> {
    // Validate updater is an admin
    const isAdmin = await this.isApprovedAdmin(updatedBy);
    if (!isAdmin) {
      throw new Error(
        `User ${updatedBy} is not authorized to enable emergency shutoff`,
      );
    }

    // Update system controls
    this.systemControls.emergencyShutoff = true;
    this.systemControls.lastUpdated = new Date();
    this.systemControls.updatedBy = updatedBy;

    // Log emergency event
    this.emergencyLog.push({
      timestamp: new Date(),
      action: "enable",
      reason,
      updatedBy,
    });

    // In a real system, this would trigger notifications, etc.
    console.warn(`🚨 EMERGENCY SHUTOFF ENABLED: ${reason} (by ${updatedBy})`);
  }

  /**
   * Disable emergency shutoff
   */
  async disableEmergencyShutoff(updatedBy: string): Promise<void> {
    // Validate updater is an admin
    const isAdmin = await this.isApprovedAdmin(updatedBy);
    if (!isAdmin) {
      throw new Error(
        `User ${updatedBy} is not authorized to disable emergency shutoff`,
      );
    }

    // Update system controls
    this.systemControls.emergencyShutoff = false;
    this.systemControls.lastUpdated = new Date();
    this.systemControls.updatedBy = updatedBy;

    // Log emergency event
    this.emergencyLog.push({
      timestamp: new Date(),
      action: "disable",
      updatedBy,
    });

    console.info(`✅ Emergency shutoff disabled (by ${updatedBy})`);
  }

  /**
   * Change active environment
   */
  async setActiveEnvironment(
    environment: "development" | "staging" | "production",
    updatedBy: string,
  ): Promise<void> {
    // Validate updater is an admin
    const isAdmin = await this.isApprovedAdmin(updatedBy);
    if (!isAdmin) {
      throw new Error(
        `User ${updatedBy} is not authorized to change environment`,
      );
    }

    // Update system controls
    this.systemControls.activeEnvironment = environment;
    this.systemControls.lastUpdated = new Date();
    this.systemControls.updatedBy = updatedBy;

    console.info(
      `🔄 Active environment changed to ${environment} (by ${updatedBy})`,
    );
  }

  /**
   * Check if a prompt is allowed to be used
   */
  async checkPromptAllowed(
    promptContent: string,
    topic?: string,
  ): Promise<{
    allowed: boolean;
    reason?: string;
    safetyCheckResult?: SafetyCheckResult;
  }> {
    // Check for emergency shutoff
    if (this.systemControls.emergencyShutoff) {
      return {
        allowed: false,
        reason: "Emergency shutoff is active. All prompts are disabled.",
      };
    }

    // Check for sensitive topics if required
    if (this.systemControls.sensitiveTopicsRequireApproval && topic) {
      const hasSensitiveTopic = this.systemControls.sensitiveTopics.some((t) =>
        topic.toLowerCase().includes(t.toLowerCase()),
      );

      if (hasSensitiveTopic) {
        return {
          allowed: false,
          reason: `Topic "${topic}" contains sensitive content that requires approval.`,
        };
      }
    }

    // Check token limit
    const estimatedTokens = Math.ceil(promptContent.length / 4); // Very rough estimate
    if (estimatedTokens > this.systemControls.maxTokensPerPrompt) {
      return {
        allowed: false,
        reason: `Prompt exceeds maximum token limit of ${this.systemControls.maxTokensPerPrompt}.`,
      };
    }

    // Run safety check if required
    if (this.systemControls.requireSafetyCheck) {
      const safetyCheckResult =
        await promptSafetyValidator.validatePrompt(promptContent);

      if (!safetyCheckResult.isPassing) {
        return {
          allowed: false,
          reason: "Prompt failed safety check.",
          safetyCheckResult,
        };
      }

      // Allowed, but include safety check result
      return {
        allowed: true,
        safetyCheckResult,
      };
    }

    // All checks passed
    return { allowed: true };
  }

  /**
   * Log usage of a prompt
   */
  async logPromptUsage(
    templateId: string,
    templateVersion: string,
    tokens: number,
  ): Promise<void> {
    // Update global stats
    this.usageStats.totalPrompts++;
    this.usageStats.totalTokens += tokens;

    // Update template-specific stats
    const templateKey = `${templateId}@${templateVersion}`;
    const templateStats = this.usageStats.byTemplate.get(templateKey) || {
      count: 0,
      tokens: 0,
    };

    templateStats.count++;
    templateStats.tokens += tokens;

    this.usageStats.byTemplate.set(templateKey, templateStats);

    // In a real system, this would be stored in a database
    console.debug(`📊 Logged usage: ${templateKey}, ${tokens} tokens`);
  }

  /**
   * Check if user is an approved admin
   */
  async isApprovedAdmin(userId: string): Promise<boolean> {
    return this.systemControls.approvedAdmins.includes(userId);
  }

  /**
   * Get usage statistics (not part of interface, but useful for admin dashboard)
   */
  async getUsageStats() {
    return {
      totalPrompts: this.usageStats.totalPrompts,
      totalTokens: this.usageStats.totalTokens,
      byTemplate: Object.fromEntries(this.usageStats.byTemplate),
    };
  }

  /**
   * Get emergency log (not part of interface, but useful for admin dashboard)
   */
  async getEmergencyLog() {
    return [...this.emergencyLog];
  }
}

// Create singleton instance
export const systemControls = new PromptControlService();
