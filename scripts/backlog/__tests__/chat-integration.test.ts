import { chatBacklog } from "../chat-integration";

describe("ChatBacklogIntegration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("suggests relevant backlog items based on chat context", async () => {
    // Example chat messages
    const messages = [
      "I need to improve our assessment visualization system",
      "Let's automate our documentation process",
      "Can we analyze the team performance data?",
    ];

    for (const message of messages) {
      const suggestion = await chatBacklog.analyzeChatContext(message);

      // Verify suggestion format
      expect(suggestion).toContain("Related Backlog Item Found");
      expect(suggestion).toContain("Why it matters now:");
      expect(suggestion).toContain("When to consider:");

      // Advance time by 6 minutes to allow new suggestions
      jest.advanceTimersByTime(6 * 60 * 1000);
    }
  });

  it("respects minimum suggestion interval", async () => {
    const message = "Let's work on the assessment system";

    // First suggestion
    const suggestion1 = await chatBacklog.analyzeChatContext(message);
    expect(suggestion1).toBeTruthy();

    // Immediate second attempt
    const suggestion2 = await chatBacklog.analyzeChatContext(message);
    expect(suggestion2).toBeNull();

    // After 6 minutes
    jest.advanceTimersByTime(6 * 60 * 1000);
    const suggestion3 = await chatBacklog.analyzeChatContext(message);
    expect(suggestion3).toBeTruthy();
  });

  it("explains relevance clearly", async () => {
    const message =
      "We need to improve our assessment visualization and team analysis";
    const suggestion = await chatBacklog.analyzeChatContext(message);

    expect(suggestion).toContain("assessment");
    expect(suggestion).toContain("visualization");
    expect(suggestion).toContain("team");
    expect(suggestion).toContain("relates to your current work");
  });
});

// Example usage in chat:
async function exampleChatInteraction() {
  const userMessage =
    "I want to improve how we visualize our assessment data for better team analysis";

  // This will trigger a suggestion about the Enhanced Assessment Analysis System
  // or Quadrant System Visualizations backlog items, explaining:
  // - How they relate to the current discussion
  // - When they were added to the backlog
  // - Why they're relevant now
  // - What conditions should trigger their implementation
  const suggestion = await chatBacklog.analyzeChatContext(userMessage);

  if (suggestion) {
    console.log(suggestion);
  }
}
