# Error Handling Guide for The Bridge Project

This guide explains how to implement error boundaries throughout the application to create a robust, error-resistant user experience.

## Overview

Error boundaries provide a way to catch JavaScript errors anywhere in the component tree, log those errors, and display a fallback UI instead of crashing the whole app. This is especially important for a client-facing application like The Bridge Project.

## Available Error Handling Components

1. **`<ErrorBoundary>`**: Base error boundary component
2. **`<ErrorBoundaryWrapper>`**: Wrapper with analytics integration
3. **`<ErrorFallback>`**: Reusable fallback UI component
4. **`withErrorBoundary()`**: HOC for wrapping components
5. **`withSafeErrorHandling()`**: Simplified HOC with default settings

## Implementation Approaches

### Approach 1: Direct Component Wrapping

For individual component instances:

```tsx
// In your page or parent component
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorFallback from '@/components/error-fallback';

function ParentComponent() {
  return (
    <div>
      <ErrorBoundary
        fallback={<ErrorFallback componentName="ComplexComponent" />}
      >
        <ComplexComponent />
      </ErrorBoundary>
    </div>
  );
}
```

### Approach 2: Using the Wrapper Component

For components where you want analytics tracking:

```tsx
// In your page or parent component
import ErrorBoundaryWrapper from '@/components/error-boundary-wrapper';
import ErrorFallback from '@/components/error-fallback';

function ParentComponent() {
  return (
    <div>
      <ErrorBoundaryWrapper
        id="complex-component"
        fallback={<ErrorFallback componentName="ComplexComponent" />}
      >
        <ComplexComponent />
      </ErrorBoundaryWrapper>
    </div>
  );
}
```

### Approach 3: Higher-Order Component (Recommended)

For component definitions (most flexible approach):

```tsx
// In your component file
import { withErrorBoundary } from '@/components/with-error-boundary';

function YourComponent(props) {
  // Component implementation
}

// Export the wrapped version
export default withErrorBoundary(YourComponent, {
  componentName: 'YourComponent',
  id: 'your-component-instance'
});
```

Or use the simplified version:

```tsx
import { withSafeErrorHandling } from '@/components/with-error-boundary';

function YourComponent(props) {
  // Component implementation
}

export default withSafeErrorHandling(YourComponent);
```

## Best Practices

1. **Granular Boundaries**: Place error boundaries strategically to isolate failures to the smallest possible parts of the UI.

2. **Critical vs. Non-Critical Components**: Apply error boundaries more aggressively to non-critical UI elements (like a sidebar widget) compared to mission-critical elements.

3. **Component-Level vs. Page-Level**: 
   - Use component-level boundaries for isolated features
   - Use page-level boundaries as a last resort catch-all

4. **Meaningful Fallbacks**: Create context-specific fallback UIs that help users understand what went wrong and how to proceed.

5. **Recovery Options**: Provide clear recovery actions in your fallback UIs (reload, retry, go back, etc.).

## Implementation Priority

1. **High Priority**:
   - Dynamic data-dependent components
   - Interactive features (forms, buttons with complex logic)
   - Third-party integrations
   - Animation-heavy components

2. **Medium Priority**:
   - Navigation components
   - Content containers
   - Utility components

3. **Low Priority**:
   - Static content displays
   - Simple UI elements

## Example Component Transformation

Before:
```tsx
// Before: No error handling
export default function RiskWidget({ data }) {
  // Logic that might fail
  const processedData = processData(data);
  
  return <div>{processedData.map(item => <Item key={item.id} {...item} />)}</div>;
}
```

After:
```tsx
// After: With error handling
function RiskWidget({ data }) {
  // Logic that might fail
  const processedData = processData(data);
  
  return <div>{processedData.map(item => <Item key={item.id} {...item} />)}</div>;
}

// Export with error boundary
export default withErrorBoundary(RiskWidget, {
  componentName: 'Risk Assessment Widget'
});
```

## Testing Error Boundaries

To test your error boundaries:

```tsx
// Component that will trigger an error
function BuggyComponent() {
  throw new Error('Test error');
  return <div>This won't render</div>;
}

// Wrap with error boundary for testing
const SafeBuggyComponent = withErrorBoundary(BuggyComponent);

// Use in your app to test error handling
<SafeBuggyComponent />
``` 