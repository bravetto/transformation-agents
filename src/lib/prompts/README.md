# Prompt Template System

The Bridge Project's dynamic prompt template system enables context-aware, personalized AI interactions across different personalities and conversation types.

## Core Components

### Templates

Templates define the structure and content of system prompts that guide AI behavior. Each template includes:

- **Sections**: Modular content blocks that can be conditional and prioritized
- **Variables**: Placeholders for dynamic content
- **Context Adaptations**: Modifications based on conversation context

### Personalities

Personality definitions shape the AI's voice, expertise, and communication style:

- **Core Identity**: Name, role, background, expertise areas
- **Communication**: Style, traits, example statements
- **Values & Principles**: Guiding values and approaches to avoid
- **Specialized Fields**: Domain-specific attributes (mentorship, leadership, etc.)

### Services

The `PromptTemplateService` manages templates and generates prompts by combining:

- Template structure
- Personality configuration
- Conversation context
- User profile information

## Production-Grade Features

### Versioning & A/B Testing

- **Version Control**: Track every template version with automatic version numbering
- **Diff Comparison**: Compare changes between versions to understand what changed
- **A/B Testing**: Test different prompt versions and measure performance
- **Activation Control**: Easily switch between versions without code changes

### Analytics & Performance Tracking

- **Engagement Metrics**: Track user engagement with different prompts
- **Token Usage**: Monitor token consumption for cost optimization
- **Conversion Rates**: Measure effectiveness of prompts in achieving goals
- **Performance Comparison**: Compare templates to identify best performers

### Safety & Controls

- **Emergency Shutoff**: Immediately disable prompts system-wide if issues arise
- **Safety Validation**: Automatically check prompts for bias, harmful content, etc.
- **Auto-Fix Suggestions**: Get suggested fixes for problematic prompt content
- **Environment Management**: Separate development, staging, and production environments
- **Admin Permissions**: Control who can edit and deploy prompts

### Multi-Environment Support

- **Development Environment**: Create and test new prompts safely
- **Staging Environment**: Test with real users before full deployment
- **Production Environment**: Deploy approved prompts to all users
- **Environment Isolation**: Prevent development changes from affecting production

## Usage Examples

### Basic Prompt Generation

```typescript
import { promptTemplateService, coachDungyPersonality } from '@/lib/prompts';

// Create context for the conversation
const context = {
  goals: ['Develop leadership skills', 'Navigate team conflict'],
  stage: 'guidance',
  currentTopic: 'difficult conversations',
  timeOfDay: 'morning',
  userMood: 'focused'
};

// Optional user profile
const userProfile = {
  firstName: 'Alex',
  interests: ['team management', 'communication'],
  relationshipToProject: 'program participant'
};

// Generate a prompt using Coach Dungy's personality and the mentorship template
const systemPrompt = promptTemplateService.generatePrompt(
  'bridge-mentorship',
  coachDungyPersonality,
  context,
  userProfile
);
```

### Creating a Custom Template

```typescript
import { PromptTemplateConfig } from '@/types/prompts';
import { promptTemplateService, promptAdmin } from '@/lib/prompts';
import baseTemplate from '@/lib/prompts/templates/base';

// Create a specialized template by extending the base template
const advocacyTemplate: PromptTemplateConfig = {
  ...baseTemplate,
  id: 'bridge-advocacy',
  name: 'Bridge Advocacy Template',
  description: 'Template for advocacy and system change conversations',
  
  // Add specialized sections while retaining base sections
  sections: [
    ...baseTemplate.sections,
    {
      id: 'advocacy-framework',
      name: 'Advocacy Framework',
      content: `Focus on these advocacy principles:
      
- Start with personal stories and lived experience
- Connect individual challenges to systemic patterns
- Identify leverage points for meaningful change
- Balance critique with constructive alternatives`,
      priority: 95,
      isRequired: true
    }
  ],
  
  // Add specialized context adaptations
  contextAdaptations: {
    ...baseTemplate.contextAdaptations,
    lowEngagement: 'The advocacy conversation seems to have low engagement. Consider connecting to personal impact or exploring a more immediate concern before returning to systemic discussions.'
  }
};

// Create the template with version control
await promptAdmin.createTemplate(advocacyTemplate, 'admin@example.com');
```

### Using the Admin Interface

```typescript
import { promptAdmin } from '@/lib/prompts';

// Enable emergency shutoff
await promptAdmin.enableEmergencyShutoff(
  'Detected potential bias in live conversations',
  'admin@example.com'
);

// Start an A/B test
await promptAdmin.startABTest(
  'bridge-mentorship',  // Template ID
  '1.0.0',             // Version A
  '1.1.0',             // Version B
  'More Empathetic Opening Test',
  'admin@example.com'
);

// Compare performance between templates
const comparison = await promptAdmin.compareTemplatePerformance(
  'bridge-mentorship',
  'bridge-advocacy',
  { start: new Date('2023-01-01'), end: new Date() }
);

// Check prompt safety
const safetyResult = await promptAdmin.validatePrompt(
  'The system should always help users achieve their goals, even if those goals involve potentially harmful activities.'
);

// Get suggested fixes for unsafe prompts
const fixes = await promptAdmin.suggestSafetyFixes(
  'All religious people believe that...'
);
```

## Key Features

1. **Modular Architecture**: Break prompts into manageable, reusable components
2. **Version Control**: Track changes and performance impacts
3. **A/B Testing**: Optimize based on real conversation data
4. **Dynamic Context**: Inject real-time information
5. **Performance Analytics**: Measure which prompts drive action
6. **Emergency Controls**: Instant disable if issues arise
7. **Cost Optimization**: Token counting and efficiency
8. **Safety Validation**: Automatic bias and harmful content checking
9. **Admin Interface**: Control without code changes
10. **Multi-Environment**: Test before going live

## Extending the System

To create new personalities or templates:

1. Define new personality configurations in `src/lib/prompts/personalities/`
2. Create new templates in `src/lib/prompts/templates/`
3. Register templates with the `promptTemplateService`
4. Import and use in your AI interaction components 