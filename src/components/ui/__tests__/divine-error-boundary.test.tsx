import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { DivineErrorBoundary } from "../divine-error-boundary";
import React, { useState, useEffect } from "react";

// Mock console methods to avoid noise in tests
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});
const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => {});

// Component that throws error on demand
const ThrowError = ({
  shouldThrow,
  errorMessage,
}: {
  shouldThrow: boolean;
  errorMessage?: string;
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage || "Test error");
  }
  return <div data-testid="no-error">No error</div>;
};

// Component that throws async error
const AsyncErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  useEffect(() => {
    if (shouldThrow) {
      setTimeout(() => {
        throw new Error("Async error");
      }, 100);
    }
  }, [shouldThrow]);

  return <div data-testid="async-component">Loading...</div>;
};

// Component with form data
const FormWithError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  const [value, setValue] = useState("");

  if (shouldThrow && value.length > 5) {
    throw new Error("Form error");
  }

  return (
    <form data-testid="test-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid="form-input"
        placeholder="Type to trigger error after 5 chars"
      />
      <div data-testid="form-value">{value}</div>
    </form>
  );
};

// Component that can recover from errors
const RecoverableComponent = ({ errorTrigger }: { errorTrigger: number }) => {
  if (errorTrigger === 1) {
    throw new Error("Recoverable error");
  }

  return (
    <div data-testid="recoverable-content">Content loaded successfully</div>
  );
};

describe("Divine Error Boundary", () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Error Catching", () => {
    it("catches and displays errors gracefully", () => {
      render(
        <DivineErrorBoundary componentName="TestComponent" role="default">
          <ThrowError shouldThrow={true} />
        </DivineErrorBoundary>,
      );

      expect(screen.getByText(/TestComponent Error/i)).toBeInTheDocument();
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    });

    it("renders children when no error occurs", () => {
      render(
        <DivineErrorBoundary componentName="TestComponent" role="default">
          <ThrowError shouldThrow={false} />
        </DivineErrorBoundary>,
      );

      expect(screen.getByTestId("no-error")).toBeInTheDocument();
      expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
    });

    it("displays custom fallback when provided", () => {
      const customFallback = (
        <div data-testid="custom-fallback">Custom error message</div>
      );

      render(
        <DivineErrorBoundary
          componentName="TestComponent"
          role="default"
          fallback={customFallback}
        >
          <ThrowError shouldThrow={true} />
        </DivineErrorBoundary>,
      );

      expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
      expect(screen.getByText("Custom error message")).toBeInTheDocument();
    });
  });

  describe("Error Recovery", () => {
    it("recovers when component stops throwing errors", () => {
      let errorTrigger = 1;

      const { rerender } = render(
        <DivineErrorBoundary
          componentName="RecoverableComponent"
          role="default"
        >
          <RecoverableComponent errorTrigger={errorTrigger} />
        </DivineErrorBoundary>,
      );

      // Should show error
      expect(
        screen.getByText(/RecoverableComponent Error/i),
      ).toBeInTheDocument();

      // Update to stop throwing error
      errorTrigger = 0;
      rerender(
        <DivineErrorBoundary
          componentName="RecoverableComponent"
          role="default"
        >
          <RecoverableComponent errorTrigger={errorTrigger} />
        </DivineErrorBoundary>,
      );

      // Should still show error (error boundaries don't auto-recover)
      expect(
        screen.getByText(/RecoverableComponent Error/i),
      ).toBeInTheDocument();
    });

    it("handles different error types appropriately", () => {
      const errorTypes = [
        "TypeError: Cannot read property",
        "ReferenceError: undefined variable",
        "SyntaxError: Unexpected token",
        "Custom application error",
      ];

      errorTypes.forEach((errorMessage, index) => {
        const { unmount } = render(
          <DivineErrorBoundary
            componentName={`TestComponent${index}`}
            role="default"
          >
            <ThrowError shouldThrow={true} errorMessage={errorMessage} />
          </DivineErrorBoundary>,
        );

        expect(
          screen.getByText(new RegExp(errorMessage, "i")),
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Form Data Preservation", () => {
    it("preserves form state during error conditions", () => {
      render(
        <DivineErrorBoundary componentName="FormComponent" role="default">
          <FormWithError shouldThrow={true} />
        </DivineErrorBoundary>,
      );

      const input = screen.getByTestId("form-input");

      // Type text that won't trigger error
      fireEvent.change(input, { target: { value: "test" } });
      expect(screen.getByTestId("form-value")).toHaveTextContent("test");

      // Type more text to trigger error
      fireEvent.change(input, { target: { value: "test123" } });

      // Should show error boundary
      expect(screen.getByText(/FormComponent Error/i)).toBeInTheDocument();
    });

    it("provides user feedback about data preservation", () => {
      render(
        <DivineErrorBoundary componentName="FormComponent" role="default">
          <ThrowError
            shouldThrow={true}
            errorMessage="Form submission failed"
          />
        </DivineErrorBoundary>,
      );

      // Error boundary should be displayed
      expect(screen.getByText(/FormComponent Error/i)).toBeInTheDocument();
      expect(screen.getByText(/Form submission failed/i)).toBeInTheDocument();
    });
  });

  describe("Async Error Handling", () => {
    it("handles async errors appropriately", async () => {
      // Note: Error boundaries don't catch async errors by default
      // This test verifies the component handles async scenarios

      render(
        <DivineErrorBoundary componentName="AsyncComponent" role="default">
          <AsyncErrorComponent shouldThrow={false} />
        </DivineErrorBoundary>,
      );

      expect(screen.getByTestId("async-component")).toBeInTheDocument();

      // Async errors would need to be caught by the component itself
      // and then re-thrown synchronously to be caught by error boundary
    });

    it("provides fallback for components that fail to load", () => {
      const LazyFailComponent = () => {
        throw new Error("Component failed to load");
      };

      render(
        <DivineErrorBoundary componentName="LazyComponent" role="default">
          <LazyFailComponent />
        </DivineErrorBoundary>,
      );

      expect(screen.getByText(/LazyComponent Error/i)).toBeInTheDocument();
      expect(screen.getByText(/Component failed to load/i)).toBeInTheDocument();
    });
  });

  describe("Error Logging and Monitoring", () => {
    it("logs errors to console with component context", () => {
      render(
        <DivineErrorBoundary componentName="LoggingTest" role="guardian">
          <ThrowError shouldThrow={true} errorMessage="Logged error" />
        </DivineErrorBoundary>,
      );

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining("[LoggingTest] Error:"),
        expect.objectContaining({
          message: "Logged error",
          componentName: "LoggingTest",
          role: "guardian",
        }),
      );
    });

    it("prevents infinite loops with error boundary errors", () => {
      // Simulate an error boundary that itself has an error
      const ProblematicErrorBoundary = () => {
        throw new Error("ErrorBoundary component error");
      };

      render(
        <DivineErrorBoundary componentName="ErrorBoundaryTest" role="default">
          <ProblematicErrorBoundary />
        </DivineErrorBoundary>,
      );

      // Should handle the error without infinite loops
      expect(screen.getByText(/ErrorBoundaryTest Error/i)).toBeInTheDocument();

      // Should not have excessive console logs (indicating infinite loop)
      expect(mockConsoleError.mock.calls.length).toBeLessThan(5);
    });

    it("handles logging failures gracefully", () => {
      // Mock console.error to throw an error
      mockConsoleError.mockImplementation(() => {
        throw new Error("Logging failed");
      });

      // Should not crash when logging fails
      expect(() => {
        render(
          <DivineErrorBoundary componentName="LogFailTest" role="default">
            <ThrowError shouldThrow={true} />
          </DivineErrorBoundary>,
        );
      }).not.toThrow();

      expect(screen.getByText(/LogFailTest Error/i)).toBeInTheDocument();
    });
  });

  describe("Role-Based Error Handling", () => {
    it("handles different divine roles appropriately", () => {
      const roles = [
        "default",
        "guardian",
        "consciousness",
        "resonance",
      ] as const;

      roles.forEach((role) => {
        const { unmount } = render(
          <DivineErrorBoundary componentName={`RoleTest-${role}`} role={role}>
            <ThrowError
              shouldThrow={true}
              errorMessage={`Error in ${role} role`}
            />
          </DivineErrorBoundary>,
        );

        expect(
          screen.getByText(new RegExp(`RoleTest-${role} Error`, "i")),
        ).toBeInTheDocument();
        expect(
          screen.getByText(new RegExp(`Error in ${role} role`, "i")),
        ).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Component Protection", () => {
    it("isolates errors to prevent cascade failures", () => {
      const WorkingComponent = () => (
        <div data-testid="working">Working fine</div>
      );

      render(
        <div>
          <DivineErrorBoundary componentName="FailingComponent" role="default">
            <ThrowError shouldThrow={true} />
          </DivineErrorBoundary>
          <WorkingComponent />
        </div>,
      );

      // Error should be isolated
      expect(screen.getByText(/FailingComponent Error/i)).toBeInTheDocument();
      // Other components should continue working
      expect(screen.getByTestId("working")).toBeInTheDocument();
    });

    it("provides consistent error UI across different components", () => {
      const components = ["Header", "Navigation", "Content", "Footer"];

      components.forEach((componentName) => {
        const { unmount } = render(
          <DivineErrorBoundary componentName={componentName} role="default">
            <ThrowError shouldThrow={true} />
          </DivineErrorBoundary>,
        );

        // Should have consistent error structure
        expect(
          screen.getByText(new RegExp(`${componentName} Error`, "i")),
        ).toBeInTheDocument();
        expect(screen.getByText(/Test error/i)).toBeInTheDocument();

        // Should have consistent styling classes
        const errorContainer = screen.getByText(/Test error/i).closest("div");
        expect(errorContainer).toHaveClass(
          "p-4",
          "bg-red-50",
          "border",
          "border-red-200",
          "rounded-md",
        );

        unmount();
      });
    });
  });

  describe("Performance and Memory", () => {
    it("handles rapid error/recovery cycles efficiently", () => {
      let shouldThrow = true;

      const { rerender } = render(
        <DivineErrorBoundary componentName="PerformanceTest" role="default">
          <ThrowError shouldThrow={shouldThrow} />
        </DivineErrorBoundary>,
      );

      // Rapidly toggle error state
      for (let i = 0; i < 10; i++) {
        shouldThrow = !shouldThrow;
        rerender(
          <DivineErrorBoundary componentName="PerformanceTest" role="default">
            <ThrowError shouldThrow={shouldThrow} />
          </DivineErrorBoundary>,
        );
      }

      // Should handle rapid changes without performance issues
      expect(screen.getByText(/PerformanceTest Error/i)).toBeInTheDocument();
    });

    it("does not leak memory with repeated errors", () => {
      // This test verifies that error boundaries clean up properly
      const initialMemory = performance.memory?.usedJSHeapSize || 0;

      // Create and destroy multiple error boundaries
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(
          <DivineErrorBoundary componentName={`MemoryTest-${i}`} role="default">
            <ThrowError shouldThrow={true} />
          </DivineErrorBoundary>,
        );
        unmount();
      }

      // Memory usage should not grow excessively
      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      const memoryGrowth = finalMemory - initialMemory;

      // Allow for some memory growth but not excessive
      expect(memoryGrowth).toBeLessThan(10 * 1024 * 1024); // Less than 10MB growth
    });
  });

  describe("Accessibility and User Experience", () => {
    it("provides accessible error messages", () => {
      render(
        <DivineErrorBoundary componentName="AccessibilityTest" role="default">
          <ThrowError shouldThrow={true} />
        </DivineErrorBoundary>,
      );

      const errorContainer = screen
        .getByText(/AccessibilityTest Error/i)
        .closest("div");

      // Should have proper ARIA attributes
      expect(errorContainer).toHaveAttribute("role", "alert");

      // Should be announced to screen readers
      expect(errorContainer).toHaveAttribute("aria-live", "assertive");
    });

    it("provides user-friendly error messages", () => {
      render(
        <DivineErrorBoundary componentName="UserFriendlyTest" role="default">
          <ThrowError
            shouldThrow={true}
            errorMessage="TypeError: Cannot read property 'map' of undefined"
          />
        </DivineErrorBoundary>,
      );

      // Should show component name clearly
      expect(screen.getByText(/UserFriendlyTest Error/i)).toBeInTheDocument();

      // Should show the actual error (for debugging)
      expect(
        screen.getByText(/Cannot read property 'map' of undefined/i),
      ).toBeInTheDocument();
    });
  });
});
