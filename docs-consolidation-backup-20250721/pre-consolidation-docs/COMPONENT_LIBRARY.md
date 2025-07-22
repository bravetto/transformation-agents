# 📚 Component Library - Unified Spacing System

## Overview

This component library leverages our unified spacing system to provide consistent, scalable, and maintainable UI components. Every component follows the same patterns, making development exponentially faster.

## Core Components

### BaseCard

Foundation card component with spacing presets and visual variants.

```tsx
import { BaseCard } from '@/components/ui/base-card';

// Basic usage
<BaseCard spacing="comfortable" variant="elevated">
  Card content
</BaseCard>

// Interactive card
<BaseCard 
  spacing="spacious" 
  variant="divine"
  onClick={() => console.log('Clicked')}
  interactive
>
  Click me!
</BaseCard>
```

**Props:**
- `spacing`: 'compact' | 'comfortable' | 'spacious'
- `variant`: 'default' | 'elevated' | 'outlined' | 'divine'
- `onClick`: Optional click handler
- `interactive`: Boolean for interactive state
- `className`: Additional CSS classes

### FeatureCard

Specialized card for displaying features with icons and metrics.

```tsx
import { FeatureCard } from '@/components/ui/feature-card';
import { Shield } from 'lucide-react';

<FeatureCard
  icon={Shield}
  title="Real-time Monitoring"
  description="Track every interaction with complete transparency"
  metrics={[
    { value: "24/7", label: "Monitoring" },
    { value: "100%", label: "Transparency" }
  ]}
  variant="elevated"
  onClick={() => router.push('/features/monitoring')}
/>
```

**Props:**
- All BaseCard props
- `icon`: LucideIcon component
- `title`: Feature title
- `description`: Feature description
- `metrics`: Array of { value, label }

## Spacing System Integration

### Using CSS Custom Properties

All components use our unified spacing system:

```css
/* Available spacing values */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Spacing Presets

Components offer three spacing presets:

1. **Compact**: Minimal spacing for dense layouts
   - Padding: `var(--space-4)`
   - Gap: `var(--space-3)`

2. **Comfortable**: Default balanced spacing
   - Padding: `var(--space-6)`
   - Gap: `var(--space-4)`

3. **Spacious**: Generous spacing for emphasis
   - Padding: `var(--space-8)`
   - Gap: `var(--space-6)`

## Visual Variants

### Default
Basic appearance with no elevation or borders.

### Elevated
Includes shadow for depth perception:
- Shadow: `var(--card-shadow-lg)`
- Hover: `var(--card-shadow-xl)`

### Outlined
Border-based design:
- Border: `2px solid var(--card-border-color)`
- Background: Transparent

### Divine
Special gradient variant for emphasis:
- Background: Gradient from hope-gold to courage-blue
- Border: Semi-transparent hope-gold

## Performance Patterns

### Memoization
All components use React.memo for optimal re-render performance:

```tsx
const Component = memo<Props>(({ ...props }) => {
  // Component logic
});
```

### Will-change Optimization
Interactive elements use will-change for smooth animations:

```css
.card-interactive {
  will-change: transform;
}
```

### Lazy Loading
Heavy components support dynamic imports:

```tsx
const LazyFeatureCard = lazy(() => import('./feature-card'));
```

## Accessibility Features

### Keyboard Navigation
- All interactive elements support keyboard navigation
- Enter and Space keys trigger click handlers
- Tab navigation follows logical order

### ARIA Attributes
- Proper roles (button, region, etc.)
- Descriptive aria-labels
- Focus management

### Focus States
Consistent focus indicators:
```css
.focus-ring {
  focus:outline-none 
  focus:ring-2 
  focus:ring-hope-gold 
  focus:ring-offset-2
}
```

## Cursor.ai Workflow

### Component Creation
```bash
# Create new component using BaseCard
@components/ui/base-card.tsx Create testimonial card component

# Add spacing variant
@codebase Add 'minimal' spacing option to BaseCard

# Create component with metrics
@components/ui/feature-card.tsx Create stats card with 4 metrics
```

### Component Migration
```bash
# Migrate existing component to unified spacing
@components/old-card.tsx Refactor to use BaseCard and unified spacing

# Update all cards in a file
@app/home-page.tsx Update all Card components to use FeatureCard
```

## Best Practices

### 1. Always Use Presets
```tsx
// ✅ Good
<BaseCard spacing="comfortable">

// ❌ Bad
<div className="p-[24px]">
```

### 2. Compose, Don't Duplicate
```tsx
// ✅ Good - Compose using BaseCard
export const TestimonialCard = (props) => (
  <BaseCard variant="outlined" spacing="spacious">
    {/* Testimonial content */}
  </BaseCard>
);

// ❌ Bad - Duplicating card logic
export const TestimonialCard = (props) => (
  <div className="p-8 border-2 rounded-lg">
    {/* Testimonial content */}
  </div>
);
```

### 3. Maintain Consistency
- Use the same spacing preset across similar components
- Keep visual variants consistent within sections
- Follow established interaction patterns

## Component Status

| Component | Unified Spacing | Error Boundary | Performance | Accessibility |
|-----------|----------------|----------------|-------------|---------------|
| BaseCard | ✅ | ✅ | ✅ | ✅ |
| FeatureCard | ✅ | ✅ | ✅ | ✅ |
| Button | ⏳ | ✅ | ⏳ | ✅ |
| Input | ⏳ | ✅ | ✅ | ✅ |
| Modal | ⏳ | ✅ | ⏳ | ⏳ |

## Next Components to Build

1. **BaseButton** - Unified button with size presets
2. **BaseInput** - Form input with consistent spacing
3. **BaseModal** - Modal with proper z-index management
4. **BaseToast** - Notification system
5. **BaseLayout** - Page layout components

---

*Component Library Version: 1.0.0*
*Last Updated: December 19, 2024* 