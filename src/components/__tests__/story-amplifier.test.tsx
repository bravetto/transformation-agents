import { render, screen, fireEvent, waitFor } from "@/test-utils";
import StoryAmplifier from "../story-amplifier";
import type { StoryContent } from "../story-amplifier";

const mockStory: StoryContent = {
  id: "test-story",
  title: "Test Story",
  content: "This is a test story content.\n\nThis is the second paragraph.",
  author: {
    name: "Test Author",
    role: "Writer",
  },
  publishedDate: "January 15, 2024",
  readingTime: 5,
  slug: "test-story",
  tags: ["transformation", "justice"],
  quotes: [],
  relatedStories: [],
  seoMetadata: {
    title: "Test Story",
    description: "Test description",
    keywords: ["test"],
  },
  socialSharing: {
    title: "Test Story",
    description: "Test description",
    hashtags: ["test"],
    platforms: {},
  },
};

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

describe("StoryAmplifier", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders story content", () => {
    render(<StoryAmplifier story={mockStory} />);
    expect(screen.getByText("Test Story")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test story content/),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("displays author information", () => {
    render(<StoryAmplifier story={mockStory} />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Writer")).toBeInTheDocument();
  });

  it("displays publish date and reading time", () => {
    render(<StoryAmplifier story={mockStory} />);
    expect(screen.getByText("January 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("renders sharing buttons", () => {
    render(<StoryAmplifier story={mockStory} />);

    // Desktop sharing buttons
    const shareButtons = screen.getAllByLabelText(
      /Share on|Share via|Copy Link/,
    );
    expect(shareButtons.length).toBeGreaterThan(0);
  });

  it("handles copy to clipboard", async () => {
    render(<StoryAmplifier story={mockStory} />);

    const copyButton = screen.getByLabelText("Copy Link");
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("displays story tags", () => {
    render(<StoryAmplifier story={mockStory} />);

    expect(screen.getByText("transformation")).toBeInTheDocument();
    expect(screen.getByText("justice")).toBeInTheDocument();
  });

  it("renders call to action section", () => {
    render(<StoryAmplifier story={mockStory} />);

    expect(
      screen.getByText(/Be Part of The Bridge Project/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Submit Your Letter")).toBeInTheDocument();
  });

  it("handles call to action click", () => {
    const handleCallToAction = jest.fn();
    render(
      <StoryAmplifier story={mockStory} onCallToAction={handleCallToAction} />,
    );

    const ctaButton = screen.getByText("Submit Your Letter");
    fireEvent.click(ctaButton);

    expect(handleCallToAction).toHaveBeenCalled();
  });

  it("displays related stories section", () => {
    const storyWithRelated = {
      ...mockStory,
      relatedStories: [
        { id: "1", title: "Related Story 1", slug: "related-1" },
        { id: "2", title: "Related Story 2", slug: "related-2" },
      ],
    };

    render(<StoryAmplifier story={storyWithRelated} />);

    expect(screen.getByText("Related Stories")).toBeInTheDocument();
    expect(screen.getByText("Related Story 1")).toBeInTheDocument();
    expect(screen.getByText("Related Story 2")).toBeInTheDocument();
  });

  it("handles share button clicks", () => {
    const handleShare = jest.fn();
    render(<StoryAmplifier story={mockStory} onShare={handleShare} />);

    const twitterButton = screen.getByLabelText("Share on Twitter");
    fireEvent.click(twitterButton);

    expect(handleShare).toHaveBeenCalledWith("twitter");
  });
});
