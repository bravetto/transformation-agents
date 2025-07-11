# IMMEDIATE FIXES

This document outlines the exact code changes needed to fix the critical TypeScript errors preventing the build from passing.

## 1. Error Boundary Implementation Fix

The main issue is that the `withDivineErrorBoundary` function requires a `role` parameter, but many components are calling it without this parameter.

### Fix for divine-error-boundary.tsx

```typescript
// src/components/ui/divine-error-boundary.tsx
// Make role parameter optional with default value

// Before:
export function withDivineErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role: DivineRole;
    fallback?: ReactNode;
  }
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <DivineErrorBoundary {...options}>
      <Component {...props} />
    </DivineErrorBoundary>
  );

// After:
export function withDivineErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role?: DivineRole;  // Make role optional
    fallback?: ReactNode;
  }
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <DivineErrorBoundary 
      componentName={options.componentName}
      role={options.role || "default"}  // Provide default value
      fallback={options.fallback}
    >
      <Component {...props} />
    </DivineErrorBoundary>
  );
```

### Fix for unified-error-boundary.tsx

```typescript
// src/components/ui/unified-error-boundary.tsx
// Make role parameter optional with default value

// Before:
export function withUnifiedErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role: DivineRole;
    fallback?: ReactNode;
  }
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <UnifiedErrorBoundaryBase {...options}>
      <Component {...props} />
    </UnifiedErrorBoundaryBase>
  );

// After:
export function withUnifiedErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role?: DivineRole;  // Make role optional
    fallback?: ReactNode;
  }
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <UnifiedErrorBoundaryBase 
      componentName={options.componentName}
      role={options.role || "default"}  // Provide default value
      fallback={options.fallback}
    >
      <Component {...props} />
    </UnifiedErrorBoundaryBase>
  );
```

### Fix for error-boundary-migration.tsx

```typescript
// src/components/error-boundary-migration.tsx
// Fix the DivineRole import and update the ErrorBoundaryWrapper component

// Before:
import {
  DivineErrorBoundary,
  withDivineErrorBoundary,
  type DivineRole,
} from "./ui/divine-error-boundary";

// After:
import {
  DivineErrorBoundary,
  withDivineErrorBoundary,
} from "./ui/divine-error-boundary";
import type { DivineRole } from "@/lib/design-system";

// Before:
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorBoundaryOptions = {},
): React.ComponentType<P> {
  return withDivineErrorBoundary(Component, options);
}

// After:
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorBoundaryOptions = {},
): React.ComponentType<P> {
  // Convert old options format to new format
  const newOptions = {
    componentName: options.componentName || "UnnamedComponent",
    role: options.role,
    fallback: options.fallback
  };
  
  return withDivineErrorBoundary(Component, newOptions);
}

// Before:
export function ErrorBoundaryWrapper({
  children,
  componentName,
  fallback,
  id,
  role,
  onError,
}: React.PropsWithChildren<DivineErrorBoundaryOptions>) {
  return (
    <DivineErrorBoundary
      componentName={componentName}
      fallback={fallback}
      id={id}
      role={role}
      onError={onError}
    >
      {children}
    </DivineErrorBoundary>
  );
}

// After:
export function ErrorBoundaryWrapper({
  children,
  componentName,
  fallback,
  id,
  role,
  onError,
}: React.PropsWithChildren<ErrorBoundaryOptions>) {
  return (
    <DivineErrorBoundary
      componentName={componentName || "UnnamedComponent"}
      fallback={fallback}
      role={role || "default"}
    >
      {children}
    </DivineErrorBoundary>
  );
}
```

## 2. Fix DivineParticles Component

The `DivineParticles` component has several issues with variant types and is missing the required error boundary options.

```typescript
// src/components/divine-particles.tsx

// Before:
interface DivineParticlesProps {
  variant?: 'light' | 'dark' | 'sacred';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

// After:
interface DivineParticlesProps {
  variant?: 'light' | 'dark' | 'sacred' | 'divine' | 'minimal' | 'flame' | 'starfield' | 'rain';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

// Add missing color variants
const colors = useMemo(() => ({
  light: {
    background: '#FFFBF5',
    particles: ['#4C1D95', '#6D28D9', '#7C3AED']
  },
  dark: {
    background: '#1F2937',
    particles: ['#9333EA', '#A855F7', '#C084FC']
  },
  sacred: {
    background: '#FAF5FF',
    particles: ['#6D28D9', '#7C3AED', '#8B5CF6']
  },
  divine: {
    background: '#FAF5FF',
    particles: ['#FFD700', '#FFA500', '#FF8C00']
  },
  minimal: {
    background: '#FFFFFF',
    particles: ['#E2E8F0', '#CBD5E1', '#94A3B8']
  },
  flame: {
    background: '#FEF2F2',
    particles: ['#DC2626', '#EF4444', '#F87171']
  },
  starfield: {
    background: '#030712',
    particles: ['#FFFFFF', '#E2E8F0', '#CBD5E1']
  },
  rain: {
    background: '#F0F9FF',
    particles: ['#0EA5E9', '#38BDF8', '#7DD3FC']
  }
}), []);

// Add safe variant handling
const safeVariant = variant in colors ? variant : 'light';

// Before:
export const DivineParticles = withDivineErrorBoundary(DivineParticlesBase);

// After:
export const DivineParticles = withDivineErrorBoundary(DivineParticlesBase, {
  componentName: "DivineParticles",
  role: "guardian"
});
```

## 3. Fix Component Usage of withDivineErrorBoundary

Update components that are using string literals instead of objects for the second parameter:

```typescript
// Before (examples of incorrect usage):
export default withDivineErrorBoundary(Navigation, 'guardian');
export default withDivineErrorBoundary(SmartCTA, "lightworker");
export default withDivineErrorBoundary(ImpactDashboard, "messenger");

// After (correct usage):
export default withDivineErrorBoundary(Navigation, {
  componentName: "Navigation",
  role: "guardian"
});

export default withDivineErrorBoundary(SmartCTA, {
  componentName: "SmartCTA",
  role: "lightworker"
});

export default withDivineErrorBoundary(ImpactDashboard, {
  componentName: "ImpactDashboard",
  role: "messenger"
});
```

## 4. Fix Components Missing Second Parameter

```typescript
// Before:
export default withDivineErrorBoundary(DivineLetterForm);
export default withDivineErrorBoundary(StoryAmplifier);

// After:
export default withDivineErrorBoundary(DivineLetterForm, {
  componentName: "DivineLetterForm",
  role: "messenger"
});

export default withDivineErrorBoundary(StoryAmplifier, {
  componentName: "StoryAmplifier",
  role: "messenger"
});
```

## 5. Fix Direct Usage of DivineErrorBoundary Component

```typescript
// Before:
<DivineErrorBoundary role="guardian">
  <YourComponent />
</DivineErrorBoundary>

// After:
<DivineErrorBoundary 
  componentName="YourComponentName"
  role="guardian"
>
  <YourComponent />
</DivineErrorBoundary>
```

## 6. Create .env.example File

```
# API Keys
CLICKUP_API_KEY=your_clickup_api_key
CLICKUP_LIST_ID=your_clickup_list_id

# Public URLs
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Authentication
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database
DATABASE_URL=your_database_url

# External Services
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Feature Flags
ENABLE_DIVINE_PARTICLES=true
ENABLE_ADVANCED_ANALYTICS=false
ENABLE_ERROR_MONITORING=true

# Performance Settings
OPTIMIZE_IMAGES=true
CACHE_DURATION=3600
```

## Implementation Strategy

1. First, fix the core error boundary components:
   - src/components/ui/divine-error-boundary.tsx
   - src/components/ui/unified-error-boundary.tsx
   - src/components/error-boundary-migration.tsx

2. Then fix the DivineParticles component:
   - src/components/divine-particles.tsx

3. Fix components that are missing the required parameters:
   - src/components/divine-letter-form.tsx
   - src/components/story-amplifier.tsx
   - And others identified in the type-check output

4. Fix components that are using string literals instead of objects:
   - src/components/navigation.tsx
   - src/components/smart-cta.tsx
   - src/components/impact-dashboard.tsx
   - And others identified in the type-check output

5. Fix direct usage of DivineErrorBoundary component:
   - src/app/divine-revelation/page.tsx
   - src/app/sacred-experience/page.tsx
   - src/app/way-home/page.tsx
   - src/app/test-recovery/page.tsx
   - And others identified in the type-check output

6. Create the .env.example file in the root directory

By implementing these fixes, we should be able to resolve the most critical TypeScript errors and get the build passing. 