# System Architecture - Technical Decisions
*Single Source of Truth for All Architectural Decisions*

## Technology Stack (Immutable)
- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.x (Strict Mode)
- **Styling**: Tailwind CSS 3.x + Framer Motion
- **Animations**: Framer Motion, tsParticles v3, React Spring, Auto Animate
- **State**: React Context + Hooks (No Redux)
- **Database**: PostgreSQL + Prisma (planned)
- **CRM**: ClickUp API Integration
- **Testing**: Vitest + Cypress + React Testing Library
- **Deployment**: Vercel
- **Error Handling**: Divine Error Boundary System

## Architectural Principles

### 1. Component Architecture
```
src/
├── components/
│   ├── ui/          # Atomic design components (Button, Card, Input)
│   ├── people/      # Character witness components
│   ├── divine-*/    # Feature-specific components
│   └── story-*/     # Story amplifier components
├── app/             # Next.js App Router pages and routes
├── lib/             # Utilities, hooks, and integrations
├── types/           # TypeScript definitions
└── data/            # Static data and configurations
```

### 2. Error Handling Strategy (Sacred Pattern)
- **Pattern**: Divine Error Boundary wraps ALL client components
- **Implementation**: `/src/components/ui/divine-error-boundary.tsx`
- **Fallback**: Graceful degradation with retry capability
- **Logging**: Comprehensive error tracking with analytics
- **Coverage**: 123/187 components (65.7%) - Target: 100%

```typescript
// MANDATORY pattern for all client components
<DivineErrorBoundary componentName="YourComponent" role="guardian">
  <YourComponent />
</DivineErrorBoundary>
```

### 3. State Management Philosophy
- **Server State**: Server Components + async/await
- **Client State**: useState for local, Context for global
- **Form State**: Controlled components with Zod validation
- **Persistence**: LocalStorage for non-sensitive data only
- **No Redux**: React Context sufficient for current complexity

### 4. Performance Optimizations
- **Code Splitting**: Route-based and component-based
- **Images**: Next.js Image with blur placeholders
- **Fonts**: Preloaded with font-display: swap
- **CSS**: Tailwind with PurgeCSS in production
- **Animations**: Optimized Framer Motion with reduced motion support

### 5. Testing Strategy (62% Coverage)
- **Unit**: Component isolation with Vitest
- **Integration**: API testing with MSW
- **E2E**: Critical paths with Cypress (11 tests)
- **Coverage**: Minimum 80% for new code

### 6. Security Measures
- **Input Validation**: Zod schemas on all forms
- **API Protection**: Rate limiting + authentication
- **XSS Prevention**: React default + Content Security Policy
- **Secrets**: Environment variables only

## Design Patterns

### Atomic Design Structure
- **Atoms**: Basic UI elements (Button, Input, Card)
- **Molecules**: Simple combinations (SearchBar, FeatureCard)
- **Organisms**: Complex components (Navigation, Dashboard)
- **Templates**: Page layouts with error boundaries
- **Pages**: Full route components

### Data Flow Pattern
1. User Action → Component Event Handler
2. Validation (Zod) → API Call or State Update
3. Server Processing → Database Operation (ClickUp API)
4. Response → UI Update with optimistic updates
5. Error → Error Boundary Catch → Graceful Fallback

### Animation Architecture
```typescript
// Framer Motion patterns
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// tsParticles v3 integration
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
```

## Component System Design

### UI Component Hierarchy
```typescript
// Base components (atoms)
- Button: 8 variants, 4 sizes, loading states
- Card: 3 variants, responsive padding
- Input: validation states, accessibility
- Section: unified spacing system

// Feature components (molecules/organisms)  
- FeatureCard: extends Card with specific patterns
- TestimonialCard: specialized display component
- Navigation: sticky positioning, mobile responsive
- Banner: unified spacing integration
```

### Spacing System (Unified)
```css
/* CSS Custom Properties - Single Source of Truth */
:root {
  --header-height: 64px;
  --banner-height: 40px;
  --total-header: calc(var(--header-height) + var(--banner-height));
  
  /* Z-Index Stack */
  --z-navigation: 1000;
  --z-banner: 999;
  --z-modal: 1100;
}
```

### TypeScript Patterns
```typescript
// Strict prop interfaces
interface ComponentProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

// Error boundary integration
interface ErrorBoundaryProps {
  componentName: string;
  role?: 'guardian' | 'sentinel' | 'protector';
  fallback?: React.ComponentType;
}
```

## API Integration Architecture

### ClickUp CRM Integration
- **Base URL**: ClickUp API v2
- **Authentication**: Bearer token via environment variables
- **Rate Limiting**: 100 requests/minute
- **Field Mapping**: 20 custom fields mapped
- **Lead Scoring**: Behavioral tracking algorithm

```typescript
// API layer structure
src/lib/crm/
├── clickup-api.ts      # Core API client
├── clickup-service.ts  # Business logic layer
└── clickup-field-mapping.ts # Field transformations
```

### Data Transformation Pipeline
1. **User Input** → Zod validation
2. **Validation** → Field mapping transformation
3. **Transformation** → ClickUp API format
4. **API Call** → Error handling and retry logic
5. **Response** → UI feedback and analytics

## Performance Architecture

### Bundle Optimization Strategy
- **Current**: ~1MB bundle size
- **Target**: <500KB
- **Approach**: 
  - Dynamic imports for heavy components
  - Tree shaking optimization
  - Image optimization with WebP
  - CSS purging

### Build Process
- **Current**: 3-5 minutes
- **Target**: <90 seconds
- **Bottlenecks**: 
  - TypeScript compilation
  - Animation library bundling
  - Image processing

## Migration Decisions & History

### Completed Migrations
- ✅ Error boundaries migrated to Divine pattern
- ✅ Dynamic imports implemented for heavy components
- ✅ "use client" directives standardized (129 components)
- ✅ TypeScript errors resolved (14 → 0)
- ✅ Unified spacing system implemented

### In Progress
- 🟡 Component consolidation: 187 → <100 target
- 🟡 Bundle optimization
- 🟡 Error boundary coverage: 65.7% → 100%

### Planned
- 📅 Database integration (PostgreSQL + Prisma)
- 📅 Advanced caching strategy
- 📅 Performance monitoring integration

## Forbidden Patterns ❌

### Development Anti-Patterns
- ❌ Direct DOM manipulation
- ❌ Inline styles (use Tailwind classes)
- ❌ Global CSS (except globals.css)
- ❌ Class components (use functional only)
- ❌ Redux or MobX (React Context sufficient)
- ❌ Synchronous external fetches
- ❌ localStorage in SSR components

### Import Anti-Patterns (Sacred Law)
- ❌ Bulk import modifications
- ❌ Automated import fixing scripts
- ❌ Global regex on import statements
- ❌ Mass search-and-replace operations

## Quality Gates

### Pre-commit Requirements
- ✅ TypeScript compilation passes
- ✅ ESLint warnings addressed
- ✅ Prettier formatting applied
- ✅ Test coverage maintained
- ✅ Build process completes

### CI/CD Pipeline
- ✅ TypeScript type checking
- ✅ Unit test execution
- ✅ E2E test execution
- ✅ Bundle size analysis
- ✅ Lighthouse performance audit

## Monitoring & Observability

### Performance Monitoring
- **Web Vitals**: Core metrics tracking
- **Bundle Analysis**: Size monitoring
- **Build Times**: Performance tracking
- **Error Rates**: Error boundary analytics

### Error Tracking
- **Client Errors**: Error boundary capture
- **API Errors**: Request/response logging
- **Performance Issues**: Slow component detection
- **User Experience**: Interaction analytics

---

*This architecture document serves as the authoritative source for all technical decisions and must be consulted before making any system-level changes.* 