import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StoryProvider, useStory } from "../context";
import { StoryContent } from "../types";

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

// Mock external handlers
const mockOnShare = jest.fn();
const mockOnQuoteShare = jest.fn();
const mockOnRelatedStoryClick = jest.fn();
const mockOnCallToAction = jest.fn();

// Test component that uses the context
const TestComponent = () => {
  const {
    story,
    shareVisible,
    setShareVisible,
    showRelatedStories,
    setShowRelatedStories,
    handleShare,
    handleQuoteShare,
    handleRelatedStoryClick,
    handleCallToAction,
    formatReadingTime,
  } = useStory();

  return (
    <div>
      <h1>{story.title}</h1>
      <button onClick={() => setShareVisible(!shareVisible)}>
        Toggle Share Panel
      </button>
      <div data-testid="share-visible">{shareVisible.toString()}</div>
      
      <button onClick={() => setShowRelatedStories(!showRelatedStories)}>
        Toggle Related Stories
      </button>
      <div data-testid="show-related-stories">{showRelatedStories.toString()}</div>
      
      <button onClick={() => handleShare("twitter")}>
        Share on Twitter
      </button>
      
      <button onClick={() => handleQuoteShare(story.quotes[0])}>
        Share Quote
      </button>
      
      <button onClick={() => handleRelatedStoryClick(story.relatedStories[0])}>
        Click Related Story
      </button>
      
      <button onClick={handleCallToAction}>
        Call To Action
      </button>
      
      <div data-testid="reading-time">
        {formatReadingTime(10)}
      </div>
    </div>
  );
};

describe("StoryContext", () => {
  it("provides story data to components", () => {
    render(
      <StoryProvider story={mockStory}>
        <TestComponent />
      </StoryProvider>
    );
    
    expect(screen.getByText("Test Story Title")).toBeInTheDocument();
  });
  
  it("toggles share visibility state", () => {
    render(
      <StoryProvider story={mockStory}>
        <TestComponent />
      </StoryProvider>
    );
    
    expect(screen.getByTestId("share-visible").textContent).toBe("false");
    
    fireEvent.click(screen.getByText("Toggle Share Panel"));
    
    expect(screen.getByTestId("share-visible").textContent).toBe("true");
  });
  
  it("toggles related stories visibility state", () => {
    render(
      <StoryProvider story={mockStory}>
        <TestComponent />
      </StoryProvider>
    );
    
    expect(screen.getByTestId("show-related-stories").textContent).toBe("false");
    
    fireEvent.click(screen.getByText("Toggle Related Stories"));
    
    expect(screen.getByTestId("show-related-stories").textContent).toBe("true");
  });
  
  it("calls external handlers when actions are triggered", () => {
    render(
      <StoryProvider 
        story={mockStory}
        onShare={mockOnShare}
        onQuoteShare={mockOnQuoteShare}
        onRelatedStoryClick={mockOnRelatedStoryClick}
        onCallToAction={mockOnCallToAction}
      >
        <TestComponent />
      </StoryProvider>
    );
    
    fireEvent.click(screen.getByText("Share on Twitter"));
    expect(mockOnShare).toHaveBeenCalledWith("twitter");
    
    fireEvent.click(screen.getByText("Share Quote"));
    expect(mockOnQuoteShare).toHaveBeenCalledWith(mockStory.quotes[0]);
    
    fireEvent.click(screen.getByText("Click Related Story"));
    expect(mockOnRelatedStoryClick).toHaveBeenCalledWith(mockStory.relatedStories[0]);
    
    fireEvent.click(screen.getByText("Call To Action"));
    expect(mockOnCallToAction).toHaveBeenCalled();
  });
  
  it("formats reading time correctly", () => {
    render(
      <StoryProvider story={mockStory}>
        <TestComponent />
      </StoryProvider>
    );
    
    expect(screen.getByTestId("reading-time").textContent).toBe("10 minutes");
  });
}); 