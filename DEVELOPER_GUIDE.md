# The Bridge Project: Developer Guide

## Project Overview
The Bridge Project is a transformative justice platform built with Next.js and TypeScript that showcases the stories of JAHmere Webb, Jordan Dungy, and Michael Mataluni. It serves as a digital testimony to the power of second chances and the potential for restorative approaches to justice.

## Quick Start

### Prerequisites
- Node.js >= 18.18.0
- npm

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd transformation-agents-JAHmere-bridge

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at http://localhost:3000

### Key Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run type-check` - Check TypeScript types
- `npm test` - Run Jest tests
- `npm run cypress` - Run Cypress E2E tests

## Project Structure
- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable React components
- `/src/components/ui`: Base UI components
- `/src/lib`: Utility functions and shared logic
- `/docs`: Project documentation
- `/public`: Static assets
- `/cypress`: E2E tests

## Key Technologies
- **Next.js 14.2**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **tsParticles**: Interactive particle backgrounds
- **Jest & React Testing Library**: Unit testing
- **Cypress**: End-to-end testing

## Component Architecture
The project follows a component-based architecture with a focus on reusability and composition:

1. **Base UI Components**: Located in `/src/components/ui`, these are the foundational building blocks like Button, Card, Typography, etc.

2. **Feature Components**: Located in `/src/components`, these combine base UI components to create more complex features like testimonials, letters, and interactive elements.

3. **Page Components**: Located in `/src/app`, these compose feature components into complete pages.

## Development Guidelines

### Component Development
1. **Create New Components in Appropriate Folder**:
   - UI primitives go in `/src/components/ui`
   - Feature components go in `/src/components`

2. **Follow TypeScript Patterns**:
   - Define interfaces for component props
   - Use strict type checking
   - Avoid `any` types where possible

3. **Client vs Server Components**:
   - Use `"use client"` directive only when needed
   - Keep components server-side by default
   - Client components should be as small as possible

### CSS & Styling
1. **Use Tailwind CSS Utilities**:
   - Follow the project's color palette
   - Use responsive classes (sm:, md:, lg:)
   - Leverage the design system

2. **Component Variants**:
   - Use class-variance-authority for component variants
   - Follow established patterns in UI components

### Animation Guidelines
1. **Simple Animations**: Use Framer Motion's basic animations
2. **Complex Animations**: Use sacred-animations.tsx components
3. **Background Effects**: Use divine-particles.tsx

### Testing Strategy
1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test critical user journeys

## Known Issues & Workarounds

### TypeScript Errors
The project has some TypeScript errors in animation components that are bypassed in the build. When working with these components:

1. **divine-particles.tsx**:
   - Uses `any` type for tsParticles configuration
   - Requires careful updates to avoid runtime errors

2. **sacred-animations.tsx**:
   - Has compatibility issues with React Spring
   - Uses `@ts-ignore` in some places

3. **michael-testament.tsx**:
   - Simplified to avoid runtime errors
   - Careful modification needed

### Build Process
The build process uses `ignoreBuildErrors: true` for TypeScript and `ignoreDuringBuilds: true` for ESLint to allow successful builds despite errors. Long-term, these errors should be resolved properly.

## Documentation
- `docs/scope.md`: Project scope and objectives
- `docs/technical.md`: Technical specifications
- `TYPE_FIXES_SUMMARY.md`: Summary of TypeScript fixes
- `PROGRESS_REPORT.md`: Current project status

## Getting Help
If you encounter issues:
1. Check the documentation
2. Review known issues section
3. Check the TYPE_FIXES_SUMMARY.md file for recent changes
4. Review PROGRESS_REPORT.md for current status

## Feature Development Workflow
1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Develop your feature**: Follow component architecture
3. **Add tests**: Write tests for your feature
4. **Run type checks**: `npm run type-check`
5. **Run tests**: `npm test`
6. **Create a pull request**: Follow PR template

## Deployment
The project is deployed automatically to Vercel when changes are pushed to the main branch. The deployment process includes:
1. Running TypeScript validation (with errors ignored)
2. Running ESLint validation (with errors ignored)
3. Running tests
4. Building the project
5. Deploying to Vercel 