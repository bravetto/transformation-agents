import { POST } from "../route";
import { NextRequest } from "next/server";

describe("AI Doppelganger API Route", () => {
  it("returns personality response for valid request", async () => {
    const requestBody = {
      personalitySlug: "jahmere-webb",
      message: "Tell me about transformation",
      context: {
        previousMessages: [],
        userIntent: "learn",
      },
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("response");
    expect(data).toHaveProperty("personality");
    expect(data).toHaveProperty("timestamp");
    expect(data.personality.slug).toBe("jahmere-webb");
  });

  it("validates required personalitySlug", async () => {
    const requestBody = {
      message: "Test message",
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("personalitySlug");
  });

  it("validates required message", async () => {
    const requestBody = {
      personalitySlug: "jahmere-webb",
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("message");
  });

  it("handles invalid personality slug", async () => {
    const requestBody = {
      personalitySlug: "non-existent-personality",
      message: "Test message",
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain("Personality not found");
  });

  it("respects personality attributes in response", async () => {
    const requestBody = {
      personalitySlug: "coach-dungy",
      message: "How do I lead my team?",
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.personality.attributes).toBeDefined();
    expect(data.personality.attributes.tone).toBe("wise");
    expect(data.personality.attributes.style).toBe("mentoring");
  });

  it("handles context in request", async () => {
    const requestBody = {
      personalitySlug: "michael-mataluni",
      message: "What about the technical implementation?",
      context: {
        previousMessages: [
          { role: "user", content: "Tell me about the Bridge project" },
          {
            role: "assistant",
            content: "The Bridge project is about transformation...",
          },
        ],
        userIntent: "technical-details",
      },
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toBeDefined();
    // Response should be technical given the context
    expect(data.personality.attributes.expertise).toContain("technology");
  });

  it("handles malformed JSON gracefully", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: "invalid json",
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Invalid request");
  });

  it("enforces message length limits", async () => {
    const requestBody = {
      personalitySlug: "jahmere-webb",
      message: "a".repeat(5001), // Exceeds 5000 char limit
    };

    const request = new NextRequest(
      "http://localhost:3000/api/ai/doppelganger",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Message too long");
  });
});
