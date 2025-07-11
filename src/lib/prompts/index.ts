// Service exports
export {
  BridgePromptTemplate,
  PromptTemplateService,
  promptTemplateService,

// Template exports
import baseTemplate from "./templates/base";
import mentorshipTemplate from "./templates/mentorship";

// Personality exports
import coachDungyPersonality from "./personalities/coach-dungy";
import jahmereWebbPersonality from "./personalities/jahmere-webb";
import michaelMataluniPersonality from "./personalities/michael-mataluni";

// Admin system exports
export * from "./prompt-administration";

// Register default templates
import { promptTemplateService } from "./template-service";

// Initialize the service with default templates
promptTemplateService.registerTemplate(baseTemplate);
promptTemplateService.registerTemplate(mentorshipTemplate);

// Export everything
export {
  // Templates
  baseTemplate,
  mentorshipTemplate,

  // Personalities
  coachDungyPersonality,
  jahmereWebbPersonality,
  michaelMataluniPersonality,
};
