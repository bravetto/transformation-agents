import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock personality API
  http.get("/api/ai/doppelganger/personalities/*", () => {
    return HttpResponse.json({
      personality: {
        name: "Test Personality",
        traits: {
          openness: 0.8,
          conscientiousness: 0.7,
          extraversion: 0.6,
          agreeableness: 0.9,
          neuroticism: 0.3,
        },
        description: "A test personality for testing purposes",
      },
    });
  }),

  // Mock contact form
  http.post("/api/contact", () => {
    return HttpResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  }),

  // Mock analytics
  http.get("/api/analytics/impact", () => {
    return HttpResponse.json({
      totalImpact: 1000,
      activeUsers: 150,
      transformations: 45,
      growthRate: 0.15,
    });
  }),

  // Mock health check
  http.get("/api/health", () => {
    return HttpResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
  }),
];
