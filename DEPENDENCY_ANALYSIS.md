# DEPENDENCY ANALYSIS

This document provides a comprehensive analysis of dependencies in the transformation-agents-jahmere-bridge project.

## Production Dependencies

| Package | Version | Status | Purpose | Issues |
|---------|---------|--------|---------|--------|
| @formkit/auto-animate | ^0.8.2 | Current | Animation library for automatic transitions | None |
| @hookform/resolvers | ^5.1.1 | Current | Form validation resolvers for React Hook Form | None |
| @radix-ui/react-checkbox | ^1.0.4 | Current | Accessible checkbox component | None |
| @radix-ui/react-label | ^2.0.0 | Current | Accessible label component | None |
| @radix-ui/react-popover | ^1.0.7 | Current | Accessible popover component | None |
| @radix-ui/react-radio-group | ^1.1.3 | Current | Accessible radio group component | None |
| @radix-ui/react-select | ^2.0.0 | Current | Accessible select component | None |
| @radix-ui/react-switch | ^1.0.3 | Current | Accessible switch component | None |
| @radix-ui/react-tabs | ^1.1.12 | Current | Accessible tabs component | None |
| @react-spring/web | ^10.0.1 | Outdated | Animation library | Consider updating to v10.0.2+ |
| @tsparticles/engine | ^3.8.1 | Current | Particle animation engine | API changes from earlier versions |
| @tsparticles/react | ^3.0.0 | Current | React wrapper for tsParticles | API changes from react-tsparticles |
| @tsparticles/slim | ^3.8.1 | Current | Lightweight version of tsParticles | None |
| @types/canvas-confetti | ^1.9.0 | Current | Type definitions for canvas-confetti | None |
| @use-gesture/react | ^10.3.1 | Current | Gesture recognition for React | None |
| canvas | ^3.1.2 | Current | Canvas implementation for Node.js | None |
| canvas-confetti | ^1.9.3 | Current | Canvas confetti effects | None |
| chokidar | ^3.5.3 | Current | File watcher | None |
| class-variance-authority | ^0.7.1 | Current | Utility for creating variant classes | None |
| clsx | ^2.0.0 | Current | Utility for constructing className strings | None |
| critters | ^0.0.25 | Outdated | CSS inlining tool | Consider updating |
| date-fns | ^3.3.1 | Current | Date utility library | None |
| dotenv | ^17.0.1 | Current | Environment variable loader | None |
| framer-motion | ^11.0.0 | Current | Animation library | None |
| glob | ^11.0.3 | Current | File pattern matching | None |
| gray-matter | ^4.0.3 | Current | Front matter parser | None |
| lucide-react | ^0.300.0 | Outdated | Icon library | Consider updating to latest |
| next | 15.3.5 | Current | React framework | None |
| react | ^18.2.0 | Current | UI library | None |
| react-day-picker | ^8.10.0 | Current | Date picker component | None |
| react-dom | ^18.2.0 | Current | React DOM renderer | None |
| react-hook-form | ^7.60.0 | Current | Form handling library | None |
| react-intersection-observer | ^9.16.0 | Current | Intersection observer hook | None |
| tailwind-merge | ^2.0.0 | Current | Tailwind CSS class merging utility | None |
| tailwindcss-animate | ^1.0.7 | Current | Animation utilities for Tailwind CSS | None |
| web-vitals | ^3.5.2 | Current | Core Web Vitals measurement | None |
| zod | ^3.25.74 | Current | Schema validation library | None |

### Potentially Unused Dependencies

The following dependencies might not be actively used in the codebase and could be candidates for removal:

1. `critters` - CSS inlining tool, but Next.js 15+ has built-in CSS optimization
2. `@types/canvas-confetti` - If canvas-confetti isn't being used extensively

### Security Vulnerabilities

No known high-severity security vulnerabilities were detected in the dependencies.

## Development Dependencies

| Package | Version | Status | Purpose | Issues |
|---------|---------|--------|---------|--------|
| @babel/parser | ^7.23.0 | Outdated | JavaScript parser | Consider updating to latest |
| @babel/traverse | ^7.23.0 | Outdated | AST traversal | Consider updating to latest |
| @next/bundle-analyzer | ^15.3.5 | Current | Bundle size analyzer | None |
| @testing-library/cypress | ^10.0.1 | Current | Cypress testing utilities | None |
| @testing-library/jest-dom | ^6.1.5 | Outdated | DOM testing utilities | Consider updating to latest |
| @testing-library/react | ^14.1.2 | Outdated | React testing utilities | Consider updating to latest |
| @testing-library/user-event | ^14.5.1 | Current | User event simulation | None |
| @types/jest | ^29.5.11 | Outdated | TypeScript definitions for Jest | Consider updating to latest |
| @types/node | ^20.0.0 | Current | TypeScript definitions for Node.js | None |
| @types/react | ^18.2.0 | Current | TypeScript definitions for React | None |
| @types/react-dom | ^18.2.0 | Current | TypeScript definitions for React DOM | None |
| autoprefixer | ^10.4.0 | Current | CSS autoprefixer | None |
| chalk | ^4.1.2 | Outdated | Terminal styling | Consider updating to v5 |
| cypress | ^13.6.1 | Outdated | End-to-end testing | Consider updating to latest |
| eslint | 8.57.1 | Current | Linting | None |
| eslint-config-next | 15.3.4 | Current | Next.js ESLint config | None |
| glob | ^11.0.3 | Current | File pattern matching | Duplicate with production dependencies |
| husky | ^8.0.3 | Current | Git hooks | None |
| jest | ^29.7.0 | Current | Testing framework | None |
| jest-environment-jsdom | ^29.7.0 | Current | JSDOM environment for Jest | None |
| lint-staged | ^15.2.0 | Current | Run linters on staged files | None |
| local-ssl-proxy | ^2.0.5 | Current | Local SSL proxy | None |
| markdown-link-check | ^3.11.2 | Current | Check markdown links | None |
| msw | ^2.10.3 | Current | API mocking | None |
| postcss | ^8.4.0 | Current | CSS post-processor | None |
| prettier | ^3.6.2 | Current | Code formatter | None |
| sharp | ^0.34.2 | Current | Image processing | None |
| start-server-and-test | ^2.0.3 | Current | Start server and run tests | None |
| tailwindcss | ^3.4.0 | Current | Utility-first CSS framework | None |
| ts-jest | ^29.1.1 | Current | TypeScript preprocessor for Jest | None |
| typescript | ^5.0.0 | Current | TypeScript language | None |

## Import Graph Analysis

### Circular Dependencies

Potential circular dependencies were detected in the following areas:

1. **Error Boundary Components**
   - `src/components/error-boundary-migration.tsx` imports from `src/components/ui/divine-error-boundary.tsx`
   - `src/components/ui/divine-error-boundary.tsx` might be imported by components that also import the migration file

2. **Component Cross-Imports**
   - Some components in the people directory may have circular references

### Broken Imports

Several broken imports were detected:

1. **Missing Module Imports**
   - `import { ResonanceState, LivingCode } from "@/lib/divine-resonance-engine"` - These types are declared but not exported
   - `import { DivinePattern, PatternEcho } from "@/lib/universal-agent-09"` - These types are declared but not exported

2. **Missing Utility Functions**
   - `src/lib/__tests__/utils.test.ts` imports functions that don't exist in the utils module:
     - `getMoodScore`
     - `getMoodEmoji`
     - `getRoleGradient`
     - `getRoleTextColor`
     - `getRoleBorderColor`

### Over-complicated Import Paths

The codebase generally uses path aliases (`@/components`, `@/lib`, etc.) which is good practice. However, there are some inconsistencies:

1. **Inconsistent Import Styles**
   - Some files use relative imports (`../../components`) while others use path aliases (`@/components`)
   - This inconsistency makes refactoring more difficult

2. **Deep Nesting**
   - Some imports traverse multiple directory levels, which could be simplified with better organization

## Dependency Optimization Recommendations

1. **Update Outdated Dependencies**
   - Update `@react-spring/web` to latest version
   - Update `critters` or remove if not needed
   - Update `lucide-react` to latest version
   - Update development dependencies like `@babel/parser`, `@babel/traverse`, and testing libraries

2. **Fix Broken Imports**
   - Export the missing types from `divine-resonance-engine.ts` and `universal-agent-09.ts`
   - Fix or remove the missing utility functions in the utils tests

3. **Resolve Circular Dependencies**
   - Refactor the error boundary system to eliminate potential circular references
   - Consider creating a shared types file for error boundary related types

4. **Standardize Import Paths**
   - Consistently use path aliases (`@/components/*`) instead of relative imports
   - Create an import ordering standard (React imports first, then external libraries, then internal modules)

5. **Bundle Size Optimization**
   - Implement code splitting for large components
   - Lazy load non-critical components and libraries
   - Consider using the slim version of framer-motion for production 