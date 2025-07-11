import { RelationshipGuidance, RelationshipType } from "../types";

/**
 * Relationship-specific guidance for letter writers
 * Provides customized prompts based on the writer's relationship to JAHmere
 */
export const relationshipGuidance: Record<
  RelationshipType,
  RelationshipGuidance
> = {
  youth_helped: {
    title: "Youth JAHmere Has Helped",
    description:
      "As someone who has been personally mentored by JAHmere, your perspective is incredibly valuable.",
    prompts: {
      howYouMet:
        "Describe your situation before meeting JAHmere. Where were you in life? What challenges were you facing?",
      specificExample1:
        "Describe a specific time when JAHmere helped you make a better decision. What was the date? What might have happened without his guidance?",
      specificExample2:
        "Share a specific example of how JAHmere's mentorship changed your perspective or behavior. What specific advice did he give?",
      specificExample3:
        "Describe the difference in your life trajectory now compared to before meeting JAHmere. What specific goals are you now pursuing?",
      ongoingSupport:
        "How do you plan to stay connected with JAHmere, and how will you continue the positive path he helped you find?",
    },
  },
  employer: {
    title: "Employer",
    description:
      "Your perspective on JAHmere's work ethic and character in a professional setting carries significant weight.",
    prompts: {
      howYouMet:
        "Describe how JAHmere came to work for you. What was the hiring process like? What qualities made him stand out?",
      specificExample1:
        "Describe a specific situation that demonstrated JAHmere's reliability and work ethic. Include dates and specific responsibilities.",
      specificExample2:
        "Share an example of JAHmere handling a challenging situation at work. How did he resolve it? What skills did he demonstrate?",
      specificExample3:
        "Describe any leadership qualities or mentorship JAHmere has shown in the workplace. How has he influenced other employees?",
      ongoingSupport:
        "Describe your plans for JAHmere's continued employment and professional development. What future do you see for him in your organization?",
    },
  },
  colleague: {
    title: "Colleague",
    description:
      "Your observations of JAHmere in a professional setting provide important context about his character and work ethic.",
    prompts: {
      howYouMet:
        "Describe when you began working with JAHmere. What project or department brought you together? What was your initial impression?",
      specificExample1:
        "Share a specific work situation where JAHmere demonstrated exceptional qualities. What was the project, date, and outcome?",
      specificExample2:
        "Describe how JAHmere handles workplace challenges or conflicts. Provide a specific example with dates and resolution.",
      specificExample3:
        "Share how JAHmere has contributed to your workplace culture or team dynamic. What specific impact has he had?",
      ongoingSupport:
        "How do you plan to continue supporting JAHmere professionally? What qualities make him valuable to your organization?",
    },
  },
  mentor: {
    title: "Mentor",
    description:
      "As someone who has guided JAHmere, your insights into his growth and character development are extremely valuable.",
    prompts: {
      howYouMet:
        "Describe how you began mentoring JAHmere. What program or circumstances brought you together? What were your initial goals?",
      specificExample1:
        "Share a specific challenge JAHmere faced and how he worked to overcome it. What guidance did you provide and how did he respond?",
      specificExample2:
        "Describe a moment when you observed significant growth or change in JAHmere. What specific behaviors or attitudes shifted?",
      specificExample3:
        "Share how JAHmere has exceeded your expectations or surprised you as a mentee. What specific accomplishments demonstrate this?",
      ongoingSupport:
        "How do you plan to continue mentoring JAHmere? What specific goals are you working toward together?",
    },
  },
  community_leader: {
    title: "Community Leader",
    description:
      "Your assessment of JAHmere's community impact and character carries significant influence.",
    prompts: {
      howYouMet:
        "Describe how JAHmere became involved with your community organization or initiative. What motivated his involvement?",
      specificExample1:
        "Share a specific community project or initiative JAHmere has contributed to. Include dates, his specific role, and the impact.",
      specificExample2:
        "Compare JAHmere to others you've worked with in community service. What makes his contribution unique or exceptional?",
      specificExample3:
        "Describe how JAHmere's work has specifically enhanced community safety or well-being. What measurable outcomes can you point to?",
      ongoingSupport:
        "What future community involvement do you see for JAHmere? How will you continue to work together for community improvement?",
    },
  },
  friend: {
    title: "Friend",
    description:
      "Your personal observations of JAHmere's character and growth over time provide valuable context.",
    prompts: {
      howYouMet:
        "Describe how you met JAHmere. What were the circumstances? What were your first impressions?",
      specificExample1:
        "Share a specific situation where JAHmere demonstrated exceptional character. Include the date and specific details.",
      specificExample2:
        "Describe how JAHmere has grown or changed during the time you've known him. What specific improvements have you observed?",
      specificExample3:
        "Share a time when JAHmere helped others or demonstrated community leadership. What specific impact did his actions have?",
      ongoingSupport:
        "How do you plan to support JAHmere going forward? What specific role will you play in his continued success?",
    },
  },
  family: {
    title: "Family Member",
    description:
      "Your intimate knowledge of JAHmere's character, values, and growth provides essential context for the court.",
    prompts: {
      howYouMet:
        "Describe your family relationship to JAHmere and how long you've known him. What role have you played in his life?",
      specificExample1:
        "Share a specific example of JAHmere's character growth and maturity. Include dates and specific changes you've observed.",
      specificExample2:
        "Describe JAHmere's role in your family. What responsibilities does he take on? How does he contribute to family well-being?",
      specificExample3:
        "Share a specific example of how JAHmere has overcome challenges or adversity. What specific strengths did he demonstrate?",
      ongoingSupport:
        "How will you specifically support JAHmere going forward? What family resources and support systems are in place for him?",
    },
  },
  other: {
    title: "Other Relationship",
    description:
      "Your unique perspective on JAHmere's character and impact is valuable to providing a complete picture.",
    prompts: {
      howYouMet:
        "Describe how you know JAHmere. What is the nature of your relationship? How long have you known him?",
      specificExample1:
        "Share a specific example that demonstrates JAHmere's positive character. Include dates and specific details.",
      specificExample2:
        "Describe a situation where you observed JAHmere making a positive impact on others. What specific actions did he take?",
      specificExample3:
        "Share any observations about JAHmere's growth, maturity, or positive change over time. What specific improvements have you noticed?",
      ongoingSupport:
        "How do you plan to support JAHmere going forward? What specific role will you play in his continued success?",
    },
  },
};

/**
 * Get guidance for a specific relationship type
 * @param relationship The relationship type
 * @returns The guidance for the specified relationship
 */
export function getGuidanceForRelationship(
  relationship: RelationshipType,
): RelationshipGuidance {
  return relationshipGuidance[relationship] || relationshipGuidance.other;
}
