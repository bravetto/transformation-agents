import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PersonalInfo from "../components/form-steps/personal-info";
import { LetterFormProvider } from "../context";

// Mock the withSafeUI HOC
jest.mock("@/components/ui/with-safe-ui", () => ({
  withSafeUI: (component: React.ComponentType) => component,
}));

// Mock the context values
const mockUpdateFormData = jest.fn();
const mockContextValue = {
  formData: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  updateFormData: mockUpdateFormData,
  errors: {},
  currentStep: 0,
  setCurrentStep: jest.fn(),
  isPreviewMode: false,
  setIsPreviewMode: jest.fn(),
  autoSaveStatus: "idle",
  impactScore: null,
  calculateImpactScore: jest.fn(),
  handleNextStep: jest.fn(),
  handlePreviousStep: jest.fn(),
  handleSubmit: jest.fn(),
};

// Mock the context hook
jest.mock("../context", () => ({
  useLetterForm: () => mockContextValue,
}));

describe("PersonalInfo", () => {
  beforeEach(() => {
    mockUpdateFormData.mockClear();
  });

  it("renders the personal info form", () => {
    render(<PersonalInfo />);

    expect(screen.getByText("Your Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText("Full Address")).toBeInTheDocument();
  });

  it("displays field values from context", () => {
    const customMockContextValue = {
      ...mockContextValue,
      formData: {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
      },
    };

    jest.mocked(useLetterForm).mockReturnValue(customMockContextValue);

    render(<PersonalInfo />);

    expect(screen.getByLabelText("Full Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email Address")).toHaveValue(
      "john@example.com",
    );
    expect(screen.getByLabelText(/Phone Number/)).toHaveValue("123-456-7890");
    expect(screen.getByLabelText("Full Address")).toHaveValue(
      "123 Main St, Anytown, USA",
    );
  });

  it("calls updateFormData when fields change", () => {
    render(<PersonalInfo />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });

    expect(mockUpdateFormData).toHaveBeenCalledWith({ name: "John Doe" });

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      email: "john@example.com",
    });
  });

  it("displays error messages when errors exist", () => {
    const customMockContextValue = {
      ...mockContextValue,
      errors: {
        name: "Name is required",
        email: "Invalid email address",
      },
    };

    jest.mocked(useLetterForm).mockReturnValue(customMockContextValue);

    render(<PersonalInfo />);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });
});

// Import at the bottom to avoid reference error
import { useLetterForm } from "../context";
