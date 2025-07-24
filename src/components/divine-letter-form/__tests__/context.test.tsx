import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { LetterFormProvider, useLetterForm } from "../context";
import { FormStep } from "../types";

// Test component that uses the context
const TestComponent = () => {
  const {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePreviousStep,
    errors,
  } = useLetterForm();

  return (
    <div>
      <h1>Test Component</h1>
      <p data-testid="current-step">{currentStep}</p>
      <p data-testid="name-value">{formData.name || "no-name"}</p>
      <button onClick={() => updateFormData({ name: "John Doe" })}>
        Update Name
      </button>
      <button onClick={() => setCurrentStep(FormStep.Relationship)}>
        Set Step
      </button>
      <button onClick={handleNextStep}>Next Step</button>
      <button onClick={handlePreviousStep}>Previous Step</button>
      {errors.name && <p data-testid="name-error">{errors.name}</p>}
    </div>
  );
};

describe("LetterFormProvider", () => {
  const mockOnSubmit = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnSave.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("provides form data and functions to children", () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    expect(screen.getByText("Test Component")).toBeInTheDocument();
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(screen.getByTestId("name-value")).toHaveTextContent("no-name");
  });

  it("updates form data when updateFormData is called", () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    fireEvent.click(screen.getByText("Update Name"));
    expect(screen.getByTestId("name-value")).toHaveTextContent("John Doe");
  });

  it("changes step when setCurrentStep is called", () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    fireEvent.click(screen.getByText("Set Step"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
  });

  it("moves to next step when handleNextStep is called", async () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    // First, update required fields for the first step
    fireEvent.click(screen.getByText("Update Name"));

    // Then try to move to next step
    await act(async () => {
      fireEvent.click(screen.getByText("Next Step"));
    });

    // Check if step was incremented
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
  });

  it("moves to previous step when handlePreviousStep is called", () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    // First set step to 1
    fireEvent.click(screen.getByText("Set Step"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");

    // Then move back
    fireEvent.click(screen.getByText("Previous Step"));
    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
  });

  it("auto-saves form data after delay", async () => {
    render(
      <LetterFormProvider onSubmit={mockOnSubmit} onSave={mockOnSave}>
        <TestComponent />
      </LetterFormProvider>,
    );

    // Update form data
    fireEvent.click(screen.getByText("Update Name"));

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(31000); // 31 seconds
    });

    // Check if onSave was called
    expect(mockOnSave).toHaveBeenCalled();
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
      }),
    );
  });
});
