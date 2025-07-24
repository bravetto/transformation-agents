/**
 * Admin interface for prompt system management
 * Provides a central service for managing all aspects of the prompt system
 */

import {
  PromptTemplateConfig,
  PromptTemplateVersion,
  PromptPerformanceMetrics,
  ABTestResult,
  PromptSystemControls,
  SafetyCheckResult,
} from "@/types/prompts";

import { promptTemplateService } from "../template-service";
import { promptAnalytics } from "./analytics";
import { promptSafetyValidator } from "./safety-validator";
import { versionControl } from "./version-control";
import { systemControls } from "./system-controls";

/**
 * Comprehensive interface for admin operations
 */
export class PromptAdminService {
  /**
   * ===== Template Management =====
   */

  /**
   * Create a new template
   */
  async createTemplate(
    config: PromptTemplateConfig,
    createdBy: string,
  ): Promise<PromptTemplateVersion> {
    // Verify admin permissions
    await this.verifyAdmin(createdBy);

    // Create a new version
    return versionControl.createVersion(config, "Initial version", createdBy);
  }

  /**
   * Update an existing template
   */
  async updateTemplate(
    templateId: string,
    updates: Partial<PromptTemplateConfig>,
    notes: string,
    createdBy: string,
  ): Promise<PromptTemplateVersion> {
    // Verify admin permissions
    await this.verifyAdmin(createdBy);

    // Get the current active version
    const versions = await versionControl.getAllVersions(templateId);
    const activeVersion = versions.find((v) => v.isActive);

    if (!activeVersion) {
      throw new Error(`No active version found for template ${templateId}`);
    }

    // Create a new config with updates
    const updatedConfig: PromptTemplateConfig = {
      ...activeVersion.config,
      ...updates,
      // Don't override id from updates
      id: activeVersion.config.id,
    };

    // Create a new version
    return versionControl.createVersion(updatedConfig, notes, createdBy);
  }

  /**
   * Get all templates
   */
  async getAllTemplates(): Promise<
    Array<{
      id: string;
      name: string;
      description: string;
      activeVersion: string;
      versions: number;
      lastUpdated: Date;
    }>
  > {
    // Get all templates from the template service
    const templates = new Map<
      string,
      {
        id: string;
        name: string;
        description: string;
        activeVersion: string;
        versions: number;
        lastUpdated: Date;
      }
    >();

    // This would be more efficient with a database
    // For now, we'll iterate through all versions
    const allVersions = await this.getAllVersions();

    for (const version of allVersions) {
      const templateId = version.templateId;

      if (!templates.has(templateId)) {
        templates.set(templateId, {
          id: templateId,
          name: version.config.name,
          description: version.config.description,
          activeVersion: version.isActive ? version.version : "",
          versions: 0,
          lastUpdated: version.createdAt,
        });
      }

      const template = templates.get(templateId)!;

      // Update version count
      template.versions++;

      // Update active version
      if (version.isActive) {
        template.activeVersion = version.version;
      }

      // Update last updated date if newer
      if (version.createdAt > template.lastUpdated) {
        template.lastUpdated = version.createdAt;
      }
    }

    return Array.from(templates.values());
  }

  /**
   * Get template details
   */
  async getTemplateDetails(templateId: string): Promise<{
    id: string;
    name: string;
    description: string;
    activeVersion: string;
    versions: PromptTemplateVersion[];
    performance?: PromptPerformanceMetrics;
  }> {
    // Get all versions
    const versions = await versionControl.getAllVersions(templateId);

    if (versions.length === 0) {
      throw new Error(`Template ${templateId} not found`);
    }

    // Find active version
    const activeVersion = versions.find((v) => v.isActive);

    if (!activeVersion) {
      throw new Error(`No active version found for template ${templateId}`);
    }

    // Get performance metrics
    const performance =
      await promptAnalytics.getTemplatePerformance(templateId);

    return {
      id: templateId,
      name: activeVersion.config.name,
      description: activeVersion.config.description,
      activeVersion: activeVersion.version,
      versions,
      performance,
    };
  }

  /**
   * ===== Version Management =====
   */

  /**
   * Get all versions (across all templates)
   */
  async getAllVersions(): Promise<PromptTemplateVersion[]> {
    // This is a naive implementation
    // In a real system, this would query a database with pagination
    const templates = await this.getAllTemplates();
    const allVersions: PromptTemplateVersion[] = [];

    for (const template of templates) {
      const versions = await versionControl.getAllVersions(template.id);
      allVersions.push(...versions);
    }

    return allVersions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  /**
   * Activate a specific version
   */
  async activateVersion(
    templateId: string,
    version: string,
    updatedBy: string,
  ): Promise<boolean> {
    // Verify admin permissions
    await this.verifyAdmin(updatedBy);

    return versionControl.setActiveVersion(templateId, version);
  }

  /**
   * Compare two versions
   */
  async compareVersions(
    templateId: string,
    versionA: string,
    versionB: string,
  ) {
    return versionControl.compareVersions(templateId, versionA, versionB);
  }

  /**
   * ===== A/B Testing =====
   */

  /**
   * Start an A/B test
   */
  async startABTest(
    templateId: string,
    versionA: string,
    versionB: string,
    testName: string,
    createdBy: string,
  ): Promise<ABTestResult> {
    // Verify admin permissions
    await this.verifyAdmin(createdBy);

    return versionControl.startABTest(templateId, versionA, versionB, testName);
  }

  /**
   * Get all A/B tests
   */
  async getAllABTests(): Promise<ABTestResult[]> {
    // This would be implemented with a database query in a real system
    const allVersions = await this.getAllVersions();
    const abTests = new Set<ABTestResult>();

    for (const version of allVersions) {
      if (version.abTestResults) {
        version.abTestResults.forEach((test) => abTests.add(test));
      }
    }

    return Array.from(abTests).sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime(),
    );
  }

  /**
   * End an A/B test
   */
  async endABTest(
    testId: string,
    winningVersion?: string,
    updatedBy?: string,
  ): Promise<ABTestResult> {
    // Verify admin permissions if provided
    if (updatedBy) {
      await this.verifyAdmin(updatedBy);
    }

    return versionControl.endABTest(testId, winningVersion);
  }

  /**
   * ===== Safety Management =====
   */

  /**
   * Validate a prompt for safety
   */
  async validatePrompt(promptContent: string): Promise<SafetyCheckResult> {
    return promptSafetyValidator.validatePrompt(promptContent);
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
    return systemControls.checkPromptAllowed(promptContent, topic);
  }

  /**
   * Fix safety issues in a prompt
   */
  async suggestSafetyFixes(promptContent: string): Promise<{
    originalContent: string;
    fixedContent: string;
    safetyCheckResult: SafetyCheckResult;
  }> {
    const safetyCheckResult =
      await promptSafetyValidator.validatePrompt(promptContent);

    if (safetyCheckResult.isPassing) {
      return {
        originalContent: promptContent,
        fixedContent: promptContent,
        safetyCheckResult,
      };
    }

    const fixedContent = await promptSafetyValidator.suggestFixes(
      promptContent,
      safetyCheckResult,
    );

    return {
      originalContent: promptContent,
      fixedContent,
      safetyCheckResult,
    };
  }

  /**
   * ===== System Controls =====
   */

  /**
   * Get system controls
   */
  async getSystemControls(): Promise<PromptSystemControls> {
    return systemControls.getSystemControls();
  }

  /**
   * Update system controls
   */
  async updateSystemControls(
    updates: Partial<PromptSystemControls>,
    updatedBy: string,
  ): Promise<PromptSystemControls> {
    // Verify admin permissions
    await this.verifyAdmin(updatedBy);

    return systemControls.updateSystemControls(updates, updatedBy);
  }

  /**
   * Enable emergency shutoff
   */
  async enableEmergencyShutoff(
    reason: string,
    updatedBy: string,
  ): Promise<void> {
    // Verify admin permissions
    await this.verifyAdmin(updatedBy);

    return systemControls.enableEmergencyShutoff(reason, updatedBy);
  }

  /**
   * Disable emergency shutoff
   */
  async disableEmergencyShutoff(updatedBy: string): Promise<void> {
    // Verify admin permissions
    await this.verifyAdmin(updatedBy);

    return systemControls.disableEmergencyShutoff(updatedBy);
  }

  /**
   * Change active environment
   */
  async setActiveEnvironment(
    environment: "development" | "staging" | "production",
    updatedBy: string,
  ): Promise<void> {
    // Verify admin permissions
    await this.verifyAdmin(updatedBy);

    return systemControls.setActiveEnvironment(environment, updatedBy);
  }

  /**
   * ===== Analytics =====
   */

  /**
   * Get template performance metrics
   */
  async getTemplatePerformance(
    templateId: string,
    timeRange?: { start: Date; end: Date },
  ): Promise<PromptPerformanceMetrics> {
    return promptAnalytics.getTemplatePerformance(templateId, timeRange);
  }

  /**
   * Get personality performance metrics
   */
  async getPersonalityPerformance(
    personalityId: string,
    timeRange?: { start: Date; end: Date },
  ): Promise<PromptPerformanceMetrics> {
    return promptAnalytics.getPersonalityPerformance(personalityId, timeRange);
  }

  /**
   * Get aggregated performance metrics
   */
  async getAggregatedPerformance(timeRange?: {
    start: Date;
    end: Date;
  }): Promise<PromptPerformanceMetrics> {
    return promptAnalytics.getAggregatedPerformance(timeRange);
  }

  /**
   * Compare two templates
   */
  async compareTemplatePerformance(
    templateId1: string,
    templateId2: string,
    timeRange?: { start: Date; end: Date },
  ) {
    return promptAnalytics.compareTemplates(
      templateId1,
      templateId2,
      timeRange,
    );
  }

  /**
   * ===== Helper Methods =====
   */

  /**
   * Verify user is an admin
   */
  private async verifyAdmin(userId: string): Promise<void> {
    const isAdmin = await systemControls.isApprovedAdmin(userId);

    if (!isAdmin) {
      throw new Error(
        `User ${userId} is not authorized to perform admin operations`,
      );
    }
  }
}

// Create singleton instance
export const promptAdmin = new PromptAdminService();
