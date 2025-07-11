"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

// Example component that might throw an error
function ErrorProneComponent() {
  const shouldThrow = Math.random() > 0.5;

  if (shouldThrow) {
    throw new Error("Random error for demonstration");
  }

  return <div>Component rendered successfully!</div>;
}

// Example 1: Direct usage of ErrorBoundary
export function DirectUsageExample() {
  return (
    <ErrorBoundary
      componentName="ErrorProneComponent"
      fallback={<div>Something went wrong in ErrorProneComponent</div>}
    >
      <ErrorProneComponent />
    </ErrorBoundary>
  );
}

// Example 2: Using the HOC pattern
const SafeComponent = withDivineErrorBoundary(ErrorProneComponent, {
  componentName: "ErrorProneComponent",
  role: "lightworker",
});

export function HOCExample() {
  return <SafeComponent />;
}

// Example 3: Nested error boundaries
export function NestedExample() {
  return (
    <ErrorBoundary componentName="OuterComponent">
      <div>
        <h2>Outer Component</h2>
        <ErrorBoundary componentName="InnerComponent">
          <div>
            <h3>Inner Component</h3>
            <ErrorProneComponent />
          </div>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
