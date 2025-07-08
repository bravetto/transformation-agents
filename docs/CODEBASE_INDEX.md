# 🎯 CODEBASE INDEX - Cursor.ai Development Guide

## 🚀 Quick Start for Cursor.ai Development

### Core Context Files
- **Architecture**: `@src/app/globals.css` (unified spacing system)
- **Components**: `@src/components/` (established patterns)
- **Types**: `@src/types/` (shared interfaces)
- **Utils**: `@src/lib/` (helper functions)
- **Config**: `@tailwind.config.js`, `@tsconfig.json`

### Cursor.ai Development Commands
```bash
# Load project context
@codebase What is the current architecture?

# Create with context
@components/ui/button.tsx Create similar component for [purpose]

# Refactor with awareness  
@codebase Refactor to use unified spacing system

# Debug with context
@docs/PROJECT_STATUS.md What are the current known issues?
```

## 📊 Component Status Dashboard

| Component | Status | Cursor Context | Spacing System | Last Updated |
|-----------|--------|----------------|----------------|--------------|
| Header/Navigation | ✅ Production | @components/navigation.tsx | ✅ Updated | 2024-12-19 |
| Banner | ✅ Production | @components/banner.tsx | ✅ Updated | 2024-12-19 |
| Hero | ✅ Production | @components/hero.tsx | ✅ Updated | 2024-12-19 |
| BaseCard | ✅ Production | @components/ui/base-card.tsx | ✅ Native | 2024-12-19 |
| FeatureCard | ✅ Production | @components/ui/feature-card.tsx | ✅ Native | 2024-12-19 |
| Button | ✅ Production | @components/ui/button.tsx | ⚠️ Needs Update | 2024-01-14 |
| Card | ✅ Production | @components/ui/card.tsx | ⚠️ Needs Update | 2024-01-14 |
| Section | 🚧 Refactoring | @components/section.tsx | ⚠️ Needs Update | 2024-01-16 |

### Legend
- ✅ Production Ready
- 🚧 In Progress
- ⚠️ Needs Update
- ❌ Critical Issue

## 🏗️ Unified Spacing System

### CSS Custom Properties (globals.css)
```css
/* Layout Heights */
--header-height: 64px;
--banner-height: 40px;
--total-header: calc(var(--header-height) + var(--banner-height));

/* Z-Index Stack */
--z-navigation: 1000;
--z-banner: 900;
--z-modal: 2000;

/* Spacing Scale */
--space-4: 1rem;   /* 16px */
--space-8: 2rem;   /* 32px */
--space-16: 4rem;  /* 64px */
```

### Tailwind Integration
```jsx
// ✅ CORRECT - Uses CSS custom properties
<div className="p-4 m-8 h-header z-navigation">

// ❌ WRONG - Hardcoded values
<div className="p-[16px] m-[32px] h-[64px] z-[1000]">
```

## 🔧 Cursor.ai Workflow Patterns

### 1. Component Creation Pattern
```typescript
// Cursor prompt: @components/ui/button.tsx Create LoadingButton component

// Result: Follows established patterns automatically
import { withErrorBoundary } from '@/components/with-error-boundary';
import { cn } from '@/lib/utils';

interface LoadingButtonProps {
  // TypeScript interfaces required
}

// Component with error boundary
export default withErrorBoundary(LoadingButton, {
  componentName: 'LoadingButton'
});
```

### 2. Spacing Migration Pattern
```typescript
// Before: Hardcoded values
<nav className="fixed top-[64px] h-[64px] z-[1100]">

// After: Unified system
<nav className="sticky top-0 h-header z-navigation">
```

### 3. Multi-File Update Pattern
```bash
# Cursor can update multiple related files
"Update all Section components to use new spacing system"

# Files updated:
- src/components/section.tsx
- src/app/home-page.tsx (all Section usage)
- src/app/people/page.tsx (all Section usage)
```

## 📁 Project Structure

```
transformation-agents-JAHmere-bridge/
├── .cursor/                    # Cursor.ai configuration
│   └── rules/                  # Development rules
│       ├── cursor-production-master.yml
│       └── react-components.yml
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── globals.css        # ⭐ Unified spacing system
│   │   ├── layout.tsx         # ⭐ Sticky header implementation
│   │   └── page.tsx
│   ├── components/            # React components
│   │   ├── ui/               # Atomic UI components
│   │   ├── navigation.tsx    # ✅ Updated with spacing system
│   │   ├── banner.tsx        # ✅ New unified banner
│   │   └── hero.tsx          # ✅ Natural flow layout
│   └── lib/                  # Utilities
└── docs/                     # Documentation
    ├── CODEBASE_INDEX.md     # 📍 You are here
    ├── PROJECT_STATUS.md     # Current progress
    └── MASTER_PLAN.md        # Project vision
```

## 🚨 Critical Development Rules

### MANDATORY Patterns
1. **No Hardcoded Spacing**: Always use Tailwind classes or CSS variables
2. **Sticky Over Fixed**: Use sticky positioning for layout elements
3. **Natural Document Flow**: No negative margins for layout
4. **Error Boundaries**: Every client component must have one
5. **TypeScript Strict**: No `any` types, no `@ts-ignore`

### FORBIDDEN Patterns
```typescript
// ❌ NEVER DO THIS
<div className="pt-[64px]">              // Hardcoded spacing
<nav className="fixed top-[64px]">       // Fixed positioning for layout
<section className="-mt-8">              // Negative margins for spacing
const data: any = {};                    // Any type
// @ts-ignore                            // Ignoring TypeScript errors
```

## 🔄 Migration Status

### Phase 1: Unified Spacing System ✅ COMPLETE
- [x] CSS custom properties defined in globals.css
- [x] Tailwind config updated to use CSS variables
- [x] Navigation component migrated
- [x] Banner component created with new system
- [x] Hero component updated (removed negative margins)
- [x] Layout.tsx using sticky header system

### Phase 2: Component System Optimization ✅ COMPLETE
- [x] Extended CSS properties for components
- [x] Created BaseCard foundation component
- [x] Created FeatureCard specialized component
- [x] Enhanced Cursor.ai rules for component generation
- [x] Component library documentation
- [x] Performance optimization scripts
- [x] Component showcase page

### Phase 3: Full Migration (In Progress)
- [ ] All Section components using new padding system
- [ ] All Button components using new spacing
- [ ] All Card components using new spacing
- [ ] Form components migration
- [ ] Modal system update

## 💻 Daily Cursor.ai Workflow

### Morning Routine
```bash
1. Open @docs/PROJECT_STATUS.md
2. Check migration status above
3. Load @codebase for context
4. Focus on highest priority unmigrated components
```

### Development Flow
```bash
1. Identify component to update
2. @component/[name].tsx analyze current implementation
3. @codebase show me spacing system usage examples
4. Update component following patterns
5. Test across breakpoints
6. Update this index with status
```

### End of Day
```bash
1. Update component status table
2. Commit with descriptive message
3. Update @docs/PROJECT_STATUS.md if needed
```

## 🎯 Next Priority Tasks

1. **Complete Spacing Migration**
   - [ ] Update all Section components
   - [ ] Update all UI components in /ui directory
   - [ ] Remove all hardcoded spacing values

2. **Performance Optimization**
   - [ ] Implement React.memo where needed
   - [ ] Add loading states to all async operations
   - [ ] Optimize bundle size

3. **Testing Coverage**
   - [ ] Add tests for new banner component
   - [ ] Test sticky header across browsers
   - [ ] Validate spacing system on all devices

## 📚 References

- [Unified Spacing System](@src/app/globals.css)
- [Tailwind Config](@tailwind.config.js)
- [Project Status](@docs/PROJECT_STATUS.md)
- [Master Plan](@docs/MASTER_PLAN.md)
- [Cursor Rules](@.cursor/rules/)

---

*Last Updated: December 19, 2024*
*Next Review: Component migration status check* 