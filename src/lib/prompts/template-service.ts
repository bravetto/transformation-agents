import {
  PromptTemplate,
  AIPersonality,
  ConversationContext,
  UserProfile,
  TemplateSection,
  PromptTemplateConfig,
} from "@/types/prompts";

/**
 * Implementation of the PromptTemplate interface for The Bridge Project
 */
export class BridgePromptTemplate implements PromptTemplate {
  private config: PromptTemplateConfig;
  public id: string;
  public name: string;
  public content: string;
  public variables: string[];
  public metadata?: any;

  constructor(config: PromptTemplateConfig) {
    this.config = config;
    this.id = config.id;
    this.name = config.name;
    this.content = config.sections.map((s) => s.content).join("\n");
    this.variables = config.variables;
    this.metadata = config.metadata;
  }

  /**
   * Compile a complete system prompt based on personality, context, and user profile
   */
  compileSystemPrompt(
    personality: AIPersonality,
    context: ConversationContext,
    userProfile?: UserProfile,
  ): string {
    // Start with core personality information
    let systemPrompt = this.buildPersonalitySection(personality);

    // Add context-specific guidance
    systemPrompt += this.buildContextSection(context);

    // Add user-specific personalization if available
    if (userProfile) {
      systemPrompt += this.buildUserProfileSection(userProfile);
    }

    // Add template sections based on priority and conditions
    systemPrompt += this.compileTemplateSections(context, userProfile);

    // Apply any context-based adaptations
    systemPrompt = this.adaptForContext(systemPrompt, {
      timeOfDay: context.timeOfDay,
      userMood: context.userMood,
      conversationStage: context.stage,
      previousTopics: context.previousTopics,
      goalProgress: context.goalProgress,
    });

    return systemPrompt.trim();
  }

  /**
   * Inject variables into a template string
   */
  injectVariables(
    template: string,
    variables: Record<string, unknown>,
  ): string {
    let result = template;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      // Handle different types of values
      let replacement = "";

      if (Array.isArray(value)) {
        replacement = value.join(", ");
      } else if (typeof value === "object" && value !== null) {
        replacement = JSON.stringify(value);
      } else {
        replacement = String(value);
      }

      // Replace all occurrences
      result = result.split(placeholder).join(replacement);
    }

    return result;
  }

  /**
   * Adapt a prompt based on contextual factors
   */
  adaptForContext(
    basePrompt: string,
    context: {
      timeOfDay?: string;
      userMood?: string;
      conversationStage?: string;
      previousTopics?: string[];
      goalProgress?: number;
    },
  ): string {
    let adaptedPrompt = basePrompt;
    const adaptations = this.config.contextAdaptations || {};

    // Time of day adaptations
    if (context.timeOfDay && adaptations.timeOfDay?.[context.timeOfDay]) {
      adaptedPrompt += `\n\n${adaptations.timeOfDay[context.timeOfDay]}`;
    }

    // User mood adaptations
    if (context.userMood && adaptations.userMood?.[context.userMood]) {
      adaptedPrompt += `\n\n${adaptations.userMood[context.userMood]}`;
    }

    // Conversation stage adaptations
    if (
      context.conversationStage &&
      adaptations.conversationStage?.[context.conversationStage]
    ) {
      adaptedPrompt += `\n\n${adaptations.conversationStage[context.conversationStage]}`;
    }

    // Low engagement adaptation
    if (
      context.goalProgress !== undefined &&
      context.goalProgress < 0.3 &&
      adaptations.lowEngagement
    ) {
      adaptedPrompt += `\n\n${adaptations.lowEngagement}`;
    }

    // High progress adaptation
    if (
      context.goalProgress !== undefined &&
      context.goalProgress > 0.7 &&
      adaptations.highProgress
    ) {
      adaptedPrompt += `\n\n${adaptations.highProgress}`;
    }

    return adaptedPrompt;
  }

  /**
   * Build the personality section of the prompt
   */
  private buildPersonalitySection(personality: AIPersonality): string {
    return `# ${personality.name} - ${personality.role}

## Background
${personality.background}

## Core Traits & Style
- Expertise: ${personality.expertise.join(", ")}
- Values: ${personality.values.join(", ")}
- Communication Style: ${personality.communicationStyle}
- Key Traits: ${personality.traits.join(", ")}
${personality.faithPerspective ? `- Faith Perspective: ${personality.faithPerspective}` : ""}
${personality.leadershipStyle ? `- Leadership Style: ${personality.leadershipStyle}` : ""}
${personality.mentorshipApproach ? `- Mentorship Approach: ${personality.mentorshipApproach}` : ""}
${personality.technicalExpertise ? `- Technical Focus: ${personality.technicalExpertise}` : ""}
${personality.advocacyStyle ? `- Advocacy Approach: ${personality.advocacyStyle}` : ""}

## Voice Examples
${personality.voiceExamples.map((example: string) => `"${example}"`).join("\n")}

## Avoids
- ${personality.avoids.join("\n- ")}

`;
  }

  /**
   * Build the context section of the prompt
   */
  private buildContextSection(context: ConversationContext): string {
    const { goals, stage, currentTopic, settings } = context;

    return `## Conversation Context
- Goals: ${goals?.join(", ") || "No specific goals set"}
- Current Stage: ${stage}
${currentTopic ? `- Current Topic: ${currentTopic}` : ""}
${
  context.previousTopics && context.previousTopics.length > 0
    ? `- Previous Topics: ${context.previousTopics.join(", ")}`
    : ""
}
${
  settings
    ? `
- Formality: ${settings.formality || "neutral"}
- Detail Level: ${settings.detailLevel || "balanced"}
- Tone: ${settings.tone || "neutral"}
`
    : ""
}

`;
  }

  /**
   * Build the user profile section of the prompt
   */
  private buildUserProfileSection(userProfile: UserProfile): string {
    return `## User Profile
${userProfile.firstName ? `- Name: ${userProfile.firstName}${userProfile.lastName ? ` ${userProfile.lastName}` : ""}` : ""}
${userProfile.relationshipToProject ? `- Relationship to Project: ${userProfile.relationshipToProject}` : ""}
${userProfile.interests && userProfile.interests.length > 0 ? `- Interests: ${userProfile.interests.join(", ")}` : ""}
${userProfile.personalValues && userProfile.personalValues.length > 0 ? `- Values: ${userProfile.personalValues.join(", ")}` : ""}
${userProfile.preferredCommunicationStyle ? `- Preferred Communication: ${userProfile.preferredCommunicationStyle}` : ""}
${userProfile.background ? `- Background: ${userProfile.background}` : ""}

`;
  }

  /**
   * Compile all applicable template sections based on priority and conditions
   */
  private compileTemplateSections(
    context: ConversationContext,
    userProfile?: UserProfile,
  ): string {
    // Filter sections based on conditions
    const applicableSections = this.config.sections.filter(
      (section: TemplateSection) => {
        if (!section.condition) return true;
        return section.condition(context, userProfile);
      },
    );

    // Sort by priority (higher number = higher priority)
    const sortedSections = [...applicableSections].sort(
      (a, b) => b.priority - a.priority,
    );

    // Compile sections
    return sortedSections
      .map((section) => {
        // Check if there are any variables to inject
        const variables: Record<string, unknown> = {
          // Context variables
          goals: context.goals,
          stage: context.stage,
          currentTopic: context.currentTopic || "",
          previousTopics: context.previousTopics || [],
          timeOfDay: context.timeOfDay || "",
          userMood: context.userMood || "",

          // User profile variables
          userName: userProfile?.firstName || "the user",
          userInterests: userProfile?.interests || [],
          userValues: userProfile?.personalValues || [],
          userBackground: userProfile?.background || "",
          userRelationship: userProfile?.relationshipToProject || "",
        };

        return `## ${section.name}\n${this.injectVariables(section.content, variables)}\n\n`;
      })
      .join("");
  }

  /**
   * Create a template from a configuration object
   */
  static fromConfig(config: PromptTemplateConfig): BridgePromptTemplate {
    return new BridgePromptTemplate(config);
  }
}

/**
 * Template service for managing and creating prompt templates
 */
export class PromptTemplateService {
  private templates: Map<string, BridgePromptTemplate> = new Map();

  /**
   * Register a template with the service
   */
  registerTemplate(config: PromptTemplateConfig): void {
    this.templates.set(config.id, BridgePromptTemplate.fromConfig(config));
  }

  /**
   * Get a template by ID
   */
  getTemplate(id: string): BridgePromptTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * Generate a prompt using a specific template
   */
  generatePrompt(
    templateId: string,
    personality: AIPersonality,
    context: ConversationContext,
    userProfile?: UserProfile,
  ): string {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template with ID "${templateId}" not found`);
    }

    return template.compileSystemPrompt(personality, context, userProfile);
  }
}

// Create and export a singleton instance
export const promptTemplateService = new PromptTemplateService();
