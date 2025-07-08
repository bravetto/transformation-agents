import { render, screen, fireEvent, waitFor } from "@/test-utils";
import LettersOfHope from "../letters-of-hope";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    path: (props: any) => <path {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the impact events
jest.mock("../impact-dashboard", () => ({
  impactEvents: {
    addLetter: jest.fn(),
  },
}));

// Mock sacred animations
jest.mock("../sacred-animations", () => ({
  SacredReveal: ({ children }: any) => <div>{children}</div>,
  MagneticButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  FloatingElement: ({ children }: any) => <div>{children}</div>,
}));

// Mock auto-animate-wrapper
jest.mock("../auto-animate-wrapper", () => ({
  AutoAnimateList: ({ items, renderItem }: any) => (
    <div>
      {items.map((item: any, index: number) => (
        <div key={item.id}>{renderItem(item, index)}</div>
      ))}
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe("LettersOfHope", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ letters: 89 }));
  });

  it("renders letters of hope section", () => {
    render(<LettersOfHope />);
    expect(screen.getByText("Letters of Hope")).toBeInTheDocument();
    expect(
      screen.getByText(/Every letter to Judge Ferrero/i),
    ).toBeInTheDocument();
  });

  it("displays initial letter count", () => {
    render(<LettersOfHope />);
    expect(screen.getByText("89")).toBeInTheDocument();
    expect(screen.getByText("Voices for Transformation")).toBeInTheDocument();
  });

  it("shows write letter button initially", () => {
    render(<LettersOfHope />);
    const writeButton = screen.getByRole("button", {
      name: /write your letter now/i,
    });
    expect(writeButton).toBeInTheDocument();
  });

  it("opens letter form when write button is clicked", () => {
    render(<LettersOfHope />);
    const writeButton = screen.getByRole("button", {
      name: /write your letter now/i,
    });

    fireEvent.click(writeButton);

    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your City")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Your message to Judge Ferrero/i),
    ).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    const { impactEvents } = require("../impact-dashboard");
    render(<LettersOfHope />);

    // Open form
    fireEvent.click(
      screen.getByRole("button", { name: /write your letter now/i }),
    );

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("Your Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your City"), {
      target: { value: "Test City" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Your message to Judge Ferrero/i),
      {
        target: { value: "This is a test message for the judge." },
      },
    );

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /send letter/i }));

    expect(impactEvents.addLetter).toHaveBeenCalled();
    expect(screen.getByText(/Your letter is on its way!/i)).toBeInTheDocument();
  });

  it("cancels form when cancel button is clicked", () => {
    render(<LettersOfHope />);

    // Open form
    fireEvent.click(
      screen.getByRole("button", { name: /write your letter now/i }),
    );
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();

    // Cancel
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    // Form should be hidden
    expect(screen.queryByPlaceholderText("Your Name")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /write your letter now/i }),
    ).toBeInTheDocument();
  });

  it("displays empty state when no recent letters", () => {
    render(<LettersOfHope />);
    expect(
      screen.getByText("Be the first to write today!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Your words matter.")).toBeInTheDocument();
  });

  it("shows quote about impact", () => {
    render(<LettersOfHope />);
    expect(
      screen.getByText(
        /"Your letter could be the one that tips the scales of justice."/i,
      ),
    ).toBeInTheDocument();
  });

  it("validates form fields are required", () => {
    render(<LettersOfHope />);

    // Open form
    fireEvent.click(
      screen.getByRole("button", { name: /write your letter now/i }),
    );

    // Try to submit empty form
    const form = screen
      .getByRole("button", { name: /send letter/i })
      .closest("form");
    expect(form).toHaveAttribute("onSubmit");

    // Check that inputs have required attribute
    expect(screen.getByPlaceholderText("Your Name")).toHaveAttribute(
      "required",
    );
    expect(screen.getByPlaceholderText("Your City")).toHaveAttribute(
      "required",
    );
    expect(
      screen.getByPlaceholderText(/Your message to Judge Ferrero/i),
    ).toHaveAttribute("required");
  });
});
