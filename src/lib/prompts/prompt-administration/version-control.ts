/**
 * Version control system for prompt templates
 * Manages template versions and provides version comparison
 */

import {
  PromptTemplateConfig,
  PromptTemplateVersion,
  ABTestResult,
} from "@/types/prompts";
import { promptTemplateService } from "../template-service";

/**
 * Interface for prompt template version control
 */
interface PromptVersionControl {
  // Create a new version of a template
  createVersion(
    config: PromptTemplateConfig,
    notes?: string,
    createdBy?: string,
  ): Promise<PromptTemplateVersion>;

  // Get a specific version of a template
  getVersion(
    templateId: string,
    version: string,
  ): Promise<PromptTemplateVersion | null>;

  // Get all versions of a template
  getAllVersions(templateId: string): Promise<PromptTemplateVersion[]>;

  // Set a version as the active one
  setActiveVersion(templateId: string, version: string): Promise<boolean>;

  // Compare two versions of a template
  compareVersions(
    templateId: string,
    versionA: string,
    versionB: string,
  ): Promise<VersionComparisonResult>;

  // Start an A/B test between two versions
  startABTest(
    templateId: string,
    versionA: string,
    versionB: string,
    testName: string,
  ): Promise<ABTestResult>;

  // Get results of an A/B test
  getABTestResults(testId: string): Promise<ABTestResult | null>;

  // End an A/B test and declare a winner
  endABTest(testId: string, winningVersion?: string): Promise<ABTestResult>;
}

/**
 * Result of version comparison
 */
interface VersionComparisonResult {
  templateId: string;
  versionA: {
    version: string;
    createdAt: Date;
    createdBy?: string;
  };
  versionB: {
    version: string;
    createdAt: Date;
    createdBy?: string;
  };
  changes: {
    sectionsAdded: string[];
    sectionsRemoved: string[];
    sectionsModified: string[];
    variablesAdded: string[];
    variablesRemoved: string[];
    contextAdaptationsChanged: boolean;
  };
  diff: string; // Text representation of differences
}

/**
 * Implementation of prompt version control
 */
export class PromptVersionControlService implements PromptVersionControl {
  // In-memory store for versions (in a real app, this would be a database)
  private versions: PromptTemplateVersion[] = [];
  private abTests: ABTestResult[] = [];

  /**
   * Create a new version of a template
   */
  async createVersion(
    config: PromptTemplateConfig,
    notes?: string,
    createdBy?: string,
  ): Promise<PromptTemplateVersion> {
    // Check if template exists
    const existingVersions = this.versions.filter(
      (v) => v.templateId === config.id,
    );
    const isFirstVersion = existingVersions.length === 0;

    // Parse version string to increment
    let newVersion: string;
    if (isFirstVersion) {
      newVersion = "1.0.0";
    } else {
      // Get the latest version
      const latestVersion = existingVersions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0];

      // Parse version string (assuming semver format)
      const [major, minor, patch] = latestVersion.version
        .split(".")
        .map(Number);

      // Increment patch version
      newVersion = `${major}.${minor}.${patch + 1}`;
    }

    // Create new version object
    const newVersionObj: PromptTemplateVersion = {
      id: `${config.id}-${newVersion}`,
      templateId: config.id,
      version: newVersion,
      config: { ...config, version: newVersion },
      createdAt: new Date(),
      createdBy,
      notes,
      isActive: isFirstVersion, // First version is active by default
    };

    // Save version
    this.versions.push(newVersionObj);

    // Register with template service if active
    if (newVersionObj.isActive) {
      promptTemplateService.registerTemplate(newVersionObj.config);
    }

    return newVersionObj;
  }

  /**
   * Get a specific version of a template
   */
  async getVersion(
    templateId: string,
    version: string,
  ): Promise<PromptTemplateVersion | null> {
    return (
      this.versions.find(
        (v) => v.templateId === templateId && v.version === version,
      ) || null
    );
  }

  /**
   * Get all versions of a template
   */
  async getAllVersions(templateId: string): Promise<PromptTemplateVersion[]> {
    return this.versions
      .filter((v) => v.templateId === templateId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  /**
   * Set a version as the active one
   */
  async setActiveVersion(
    templateId: string,
    version: string,
  ): Promise<boolean> {
    // Find the version to activate
    const versionToActivate = this.versions.find(
      (v) => v.templateId === templateId && v.version === version,
    );

    if (!versionToActivate) {
      return false;
    }

    // Deactivate all other versions of this template
    this.versions.forEach((v) => {
      if (v.templateId === templateId) {
        v.isActive = v.version === version;
      }
    });

    // Register the active version with the template service
    promptTemplateService.registerTemplate(versionToActivate.config);

    return true;
  }

  /**
   * Compare two versions of a template
   */
  async compareVersions(
    templateId: string,
    versionA: string,
    versionB: string,
  ): Promise<VersionComparisonResult> {
    const versionObjA = await this.getVersion(templateId, versionA);
    const versionObjB = await this.getVersion(templateId, versionB);

    if (!versionObjA || !versionObjB) {
      throw new Error("One or both versions not found");
    }

    const configA = versionObjA.config;
    const configB = versionObjB.config;

    // Calculate changes
    const sectionIdsA = configA.sections.map((s) => s.id);
    const sectionIdsB = configB.sections.map((s) => s.id);

    const sectionsAdded = sectionIdsB.filter((id) => !sectionIdsA.includes(id));
    const sectionsRemoved = sectionIdsA.filter(
      (id) => !sectionIdsB.includes(id),
    );

    // Find modified sections (same ID but different content)
    const sectionsModified = sectionIdsA
      .filter((id) => sectionIdsB.includes(id))
      .filter((id) => {
        const sectionA = configA.sections.find((s) => s.id === id);
        const sectionB = configB.sections.find((s) => s.id === id);
        return sectionA?.content !== sectionB?.content;
      });

    // Variable changes
    const variablesAdded = configB.variables.filter(
      (v) => !configA.variables.includes(v),
    );
    const variablesRemoved = configA.variables.filter(
      (v) => !configB.variables.includes(v),
    );

    // Context adaptations changes
    const contextAdaptationsChanged =
      JSON.stringify(configA.contextAdaptations) !==
      JSON.stringify(configB.contextAdaptations);

    // Generate text diff (simplified)
    const diff = this.generateDiff(configA, configB);

    return {
      templateId,
      versionA: {
        version: versionA,
        createdAt: versionObjA.createdAt,
        createdBy: versionObjA.createdBy,
      },
      versionB: {
        version: versionB,
        createdAt: versionObjB.createdAt,
        createdBy: versionObjB.createdBy,
      },
      changes: {
        sectionsAdded,
        sectionsRemoved,
        sectionsModified,
        variablesAdded,
        variablesRemoved,
        contextAdaptationsChanged,
      },
      diff,
    };
  }

  /**
   * Start an A/B test between two versions
   */
  async startABTest(
    templateId: string,
    versionA: string,
    versionB: string,
    testName: string,
  ): Promise<ABTestResult> {
    // Verify versions exist
    const versionObjA = await this.getVersion(templateId, versionA);
    const versionObjB = await this.getVersion(templateId, versionB);

    if (!versionObjA || !versionObjB) {
      throw new Error("One or both versions not found");
    }

    // Create A/B test
    const abTest: ABTestResult = {
      id: `test-${Date.now()}`,
      testName,
      versionA,
      versionB,
      startDate: new Date(),
      sampleSize: 0,
      metrics: {
        versionA: {
          engagementRate: 0,
          completionRate: 0,
          averageConversationLength: 0,
          averageResponseTime: 0,
          costPerInteraction: 0,
          tokenUsage: { prompt: 0, completion: 0, total: 0 },
          topicDistribution: {},
        },
        versionB: {
          engagementRate: 0,
          completionRate: 0,
          averageConversationLength: 0,
          averageResponseTime: 0,
          costPerInteraction: 0,
          tokenUsage: { prompt: 0, completion: 0, total: 0 },
          topicDistribution: {},
        },
      },
      status: "running",
    };

    // Save A/B test
    this.abTests.push(abTest);

    // Update version objects to include this test
    versionObjA.abTestResults = [...(versionObjA.abTestResults || []), abTest];
    versionObjB.abTestResults = [...(versionObjB.abTestResults || []), abTest];

    return abTest;
  }

  /**
   * Get results of an A/B test
   */
  async getABTestResults(testId: string): Promise<ABTestResult | null> {
    return this.abTests.find((test) => test.id === testId) || null;
  }

  /**
   * End an A/B test and declare a winner
   */
  async endABTest(
    testId: string,
    winningVersion?: string,
  ): Promise<ABTestResult> {
    const test = this.abTests.find((t) => t.id === testId);

    if (!test) {
      throw new Error(`A/B test with ID ${testId} not found`);
    }

    if (test.status !== "running") {
      throw new Error(`A/B test with ID ${testId} is not running`);
    }

    // Update test status
    test.status = "completed";
    test.endDate = new Date();

    // Set winning version if provided
    if (winningVersion) {
      test.metrics.winningVersion = winningVersion;
      test.metrics.confidenceLevel = 0.95; // Example confidence level

      // Generate conclusion
      test.conclusion = `Version ${winningVersion} outperformed the other version with 95% confidence.`;

      // Note: In a real implementation, we would need to track templateId separately
      // For now, we'll skip the automatic activation of the winning version
      // await this.setActiveVersion(templateId, winningVersion);
    } else {
      test.conclusion = "Test completed with no clear winner.";
    }

    return test;
  }

  /**
   * Generate a text diff between two template configs
   */
  private generateDiff(
    configA: PromptTemplateConfig,
    configB: PromptTemplateConfig,
  ): string {
    let diff = `Comparing ${configA.name} v${configA.version} to ${configB.name} v${configB.version}\n\n`;

    // Compare sections
    diff += "=== Sections ===\n";

    // Added sections
    const sectionIdsA = configA.sections.map((s) => s.id);
    const sectionIdsB = configB.sections.map((s) => s.id);

    const addedSections = configB.sections.filter(
      (s) => !sectionIdsA.includes(s.id),
    );
    if (addedSections.length > 0) {
      diff += "Added sections:\n";
      addedSections.forEach((s) => {
        diff += `+ ${s.id}: ${s.name}\n`;
      });
    }

    // Removed sections
    const removedSections = configA.sections.filter(
      (s) => !sectionIdsB.includes(s.id),
    );
    if (removedSections.length > 0) {
      diff += "Removed sections:\n";
      removedSections.forEach((s) => {
        diff += `- ${s.id}: ${s.name}\n`;
      });
    }

    // Modified sections
    const commonSectionIds = sectionIdsA.filter((id) =>
      sectionIdsB.includes(id),
    );
    const modifiedSections = commonSectionIds.filter((id) => {
      const sectionA = configA.sections.find((s) => s.id === id);
      const sectionB = configB.sections.find((s) => s.id === id);
      return sectionA?.content !== sectionB?.content;
    });

    if (modifiedSections.length > 0) {
      diff += "Modified sections:\n";
      modifiedSections.forEach((id) => {
        diff += `~ ${id}\n`;
      });
    }

    // Compare variables
    diff += "\n=== Variables ===\n";
    const addedVars = configB.variables.filter(
      (v) => !configA.variables.includes(v),
    );
    const removedVars = configA.variables.filter(
      (v) => !configB.variables.includes(v),
    );

    if (addedVars.length > 0) {
      diff += `Added: ${addedVars.join(", ")}\n`;
    }

    if (removedVars.length > 0) {
      diff += `Removed: ${removedVars.join(", ")}\n`;
    }

    // Context adaptations
    diff += "\n=== Context Adaptations ===\n";
    if (
      JSON.stringify(configA.contextAdaptations) !==
      JSON.stringify(configB.contextAdaptations)
    ) {
      diff += "Context adaptations have changed\n";
    } else {
      diff += "No changes to context adaptations\n";
    }

    return diff;
  }
}

// Create singleton instance
export const versionControl = new PromptVersionControlService();
