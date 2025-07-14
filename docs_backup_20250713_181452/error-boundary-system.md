# Divine Error Boundary System

This document outlines the new consolidated error boundary system for The Bridge Project and provides guidance on migrating from the old error boundary implementations.

## Overview

The Divine Error Boundary System provides a unified, role-based approach to error handling throughout the application. It combines the best features of our previous error boundary implementations while adding consistent styling, better error reporting, and improved developer experience.

## Key Features

- **Role-based styling:** Error boundaries are styled according to the divine role (lightworker, messenger, witness, guardian)
- **Comprehensive error reporting:** Automatic integration with analytics
- **Consistent API:** Simplified and standardized API for all error boundary needs
- **Improved UX:** Beautiful, consistent error UIs with helpful recovery options
- **TypeScript support:** Full TypeScript type definitions
- **Backward compatibility:** Migration helpers to make the transition smooth

## Components

The system consists of the following key components:

### 1. `DivineErrorBoundary`

The core error boundary component with role-based styling:

```tsx
<DivineErrorBoundary
  role="messenger" 
  componentName="MyComponent"
>
  <YourComponent />
</DivineErrorBoundary>
```

#### Props

| Prop           | Type                | Description                                          | Default     |
|----------------|---------------------|------------------------------------------------------|-------------|
| `children`     | `ReactNode`         | Components to be wrapped by the error boundary       | (required)  |
| `role`         | `DivineRole`        | The divine role used for styling                     | `'default'` |
| `componentName`| `string`            | Name of the component (for error messages)           | -           |
| `fallback`     | `ReactNode`         | Custom fallback UI when an error occurs              | -           |
| `onError`      | `function`          | Custom error handler                                 | -           |
| `onReset`      | `function`          | Function to call when resetting the error boundary   | -           |
| `resetKey`     | `string` or `number`| Key that will trigger a reset when changed           | -           |
| `id`           | `string`            | Unique identifier for analytics                      | -           |
| `className`    | `string`            | Additional CSS classes to apply                      | -           |

### 2. `withDivineErrorBoundary` HOC

Higher-order component for wrapping components with error boundaries:

```tsx
export default withDivineErrorBoundary(MyComponent, 'messenger');

// Or with options
export default withDivineErrorBoundary(MyComponent, {
  role: 'guardian',
  componentName: 'CustomName',
  id: 'unique-id'
});
```

### 3. `withSafeErrorHandling` HOC

Simplified HOC for quick error boundary wrapping:

```tsx
export default withSafeErrorHandling(MyComponent);
```

### 4. `ErrorFallback` Component

Customizable error fallback with role-based styling:

```tsx
<ErrorFallback
  error={error}
  resetErrorBoundary={resetErrorBoundary}
  componentName="MyComponent"
  role="witness"
/>
```

## Migration Guide

We've created tools to make migrating from the old error boundary implementations as smooth as possible:

### Using the Migration Script

We provide a script that will automatically update your components to use the new system:

```bash
# Run the migration script
node scripts/update-error-boundaries.js
```

The script will:
1. Find files using old error boundary implementations
2. Update imports and component usage
3. Create backup files (.bak extension) of all modified files
4. Report which files were updated

### Manual Migration

If you prefer to migrate manually, here are the changes needed:

#### 1. Update imports

```tsx
// Old
import { ErrorBoundary } from '@/components/error-boundary';
import { withErrorBoundary } from '@/components/with-error-boundary';

// New
import { DivineErrorBoundary, withDivineErrorBoundary } from '@/components/error-boundary-migration';
```

#### 2. Update component usage

```tsx
// Old
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// New
<DivineErrorBoundary role="messenger">
  <MyComponent />
</DivineErrorBoundary>
```

#### 3. Update HOC usage

```tsx
// Old
export default withErrorBoundary(MyComponent);

// New
export default withDivineErrorBoundary(MyComponent, 'messenger');
```

### Backward Compatibility

For temporary backward compatibility, we provide:

- `ErrorBoundary`: Re-export of `DivineErrorBoundary`
- `withErrorBoundary`: Compatibility wrapper around `withDivineErrorBoundary`
- `ErrorBoundaryWrapper`: Compatibility component

These are available in `src/components/error-boundary-migration.tsx` but should only be used during migration.

## Divine Roles

The system supports the following divine roles:

| Role          | Description                               | Colors                                          |
|---------------|-------------------------------------------|------------------------------------------------|
| `lightworker` | Golden/amber styling for enlightening     | `from-amber-500 via-orange-500 to-yellow-500`  |
| `messenger`   | Blue/indigo styling for communication     | `from-blue-500 via-indigo-500 to-purple-500`   |
| `witness`     | Green/emerald styling for observation     | `from-emerald-500 via-teal-500 to-cyan-500`    |
| `guardian`    | Purple/pink styling for protection        | `from-purple-500 via-pink-500 to-rose-500`     |
| `default`     | Red styling for generic errors            | `from-red-500 to-rose-600`                     |

## Best Practices

1. **Use role-based styling consistently:**
   - Match the role to the component's purpose
   - Keep role styling consistent across related components

2. **Add informative component names:**
   - Always provide a descriptive `componentName` for better error messages
   - This helps users understand where the error occurred

3. **Wrap client components:**
   - Wrap all client components with error boundaries
   - This prevents client-side errors from breaking the entire page

4. **Use the HOC pattern:**
   - Prefer the HOC pattern for cleaner code
   - Export wrapped components directly

5. **Custom fallbacks:**
   - Create custom fallbacks for critical components
   - For standard components, the default fallback is usually sufficient

## Examples

### Basic Usage

```tsx
// Simple component with error boundary
export default withDivineErrorBoundary(MyComponent, 'messenger');
```

### With Custom Error Handling

```tsx
export default withDivineErrorBoundary(MyComponent, {
  role: 'guardian',
  componentName: 'MyCustomComponent',
  onError: (error, errorInfo) => {
    // Custom error handling
    customErrorReporting(error, {
      component: 'MyCustomComponent',
      errorInfo
    });
  }
});
```

### Complex Example

```tsx
"use client";

import { useState } from 'react';
import { withDivineErrorBoundary } from '@/components/error-boundary-migration';

function DataVisualization({ data }) {
  // Component logic...
  
  if (!data) {
    throw new Error('Data is required for visualization');
  }
  
  return (
    // Component render...
  );
}

export default withDivineErrorBoundary(DataVisualization, {
  role: 'witness',
  componentName: 'DataVisualization',
  id: 'data-viz-component'
});
```

## Conclusion

The Divine Error Boundary System provides a unified, consistent approach to error handling throughout The Bridge Project. By migrating to this system, we improve user experience, developer experience, and code maintainability. 