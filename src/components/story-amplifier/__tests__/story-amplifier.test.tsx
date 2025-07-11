import React from "react";
import { render, screen } from "@testing-library/react";
import StoryAmplifier from "../index";
import { StoryContent } from "../types";

// Mock the divine-particles component
jest.mock("@/components/divine-particles", () => ({
  __esModule: true,
  default: () => <div data-testid="divine-particles" />,
}));

// Sample story data for testing
const mockStory: StoryContent = {
  id: "1",
  title: "Test Story Title",
  subtitle: "Test Story Subtitle",
  content: "This is a test paragraph.\n\nThis is another paragraph.",
  author: {
    name: "Test Author",
    role: "Test Role",
  },
  publishedDate: "January 1, 2023",
  readingTime: 5,
  slug: "test-story",
  tags: ["Test", "Story"],
  quotes: [
    {
      id: "q1",
      text: "This is a test quote",
      attribution: "Test Attribution",
      position: 50,
    },
  ],
  relatedStories: [
    {
      id: "rs1",
      title: "Related Story 1",
      slug: "related-story-1",
      excerpt: "This is a related story excerpt.",
    },
  ],
  seoMetadata: {
    title: "Test SEO Title",
    description: "Test SEO Description",
    keywords: ["test", "seo"],
  },
  socialSharing: {
    title: "Test Social Title",
    description: "Test Social Description",
    hashtags: ["test", "share"],
    platforms: {
      twitter: {
        text: "Check out this test story!",
        hashtags: ["test", "story"],
      },
    },
  },
};

describe("StoryAmplifier", () => {
  it("renders the story title and subtitle", () => {
    render(<StoryAmplifier story={mockStory} />);
    
    expect(screen.getByText("Test Story Title")).toBeInTheDocument();
    expect(screen.getByText("Test Story Subtitle")).toBeInTheDocument();
  });
  
  it("renders the author information", () => {
    render(<StoryAmplifier story={mockStory} />);
    
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Role")).toBeInTheDocument();
  });
  
  it("renders the story content", () => {
    render(<StoryAmplifier story={mockStory} />);
    
    expect(screen.getByText("This is a test paragraph.")).toBeInTheDocument();
    expect(screen.getByText("This is another paragraph.")).toBeInTheDocument();
  });
  
  it("renders related stories section", () => {
    render(<StoryAmplifier story={mockStory} />);
    
    expect(screen.getByText("Related Stories")).toBeInTheDocument();
    expect(screen.getByText("Related Story 1")).toBeInTheDocument();
  });
  
  it("renders call to action section", () => {
    render(<StoryAmplifier story={mockStory} />);
    
    expect(screen.getByText("Be Part of The Bridge Project")).toBeInTheDocument();
    expect(screen.getByText("Submit Your Letter")).toBeInTheDocument();
  });
}); 