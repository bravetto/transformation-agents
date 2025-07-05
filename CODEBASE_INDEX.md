# 🌟 THE BRIDGE PROJECT - CODEBASE INDEX

## 📚 Project Overview

The Bridge Project is a transformative justice platform built to support JAHmere Webb and create a new approach to criminal justice. The platform serves as a digital testimony showcasing the Trinity of Witnesses (Michael Mataluni, JAHmere Webb, and Jordan Dungy) to transform the justice system through truth, testimony, and technology.

### Core Purpose
- Provide testimony from Michael Mataluni, JAHmere Webb, and Jordan Dungy
- Get the attention of Tony Dungy (Jordan's father) to amplify the message
- Create a movement to transform the justice system
- Gather community support through hearts, letters, and engagement

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + Framer Motion
- **Animations**: Framer Motion, Lottie, tsParticles
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel-ready

## 📁 Directory Structure

### `/src` - Main Source Code

#### `/src/app` - Next.js App Router Pages
- ✅ **`layout.tsx`**: Root layout with navigation, impact dashboard, and footer
- ✅ **`page.tsx`**: Root page that dynamically imports HomePage
- ✅ **`home-page.tsx`**: Main landing page with all key sections
- ✅ **`globals.css`**: Global CSS styles and Tailwind directives
- ✅ **`contact/`**: Contact form page
- ✅ **`dashboard/judge/`**: Dashboard for Judge Ferrero
- ✅ **`jordan-letter/`**: Jordan Dungy's testimony
- ✅ **`letter-to-dungy/`**: JAHmere's letter to Tony Dungy
- ✅ **`reset/`**: Reset functionality page

#### `/src/components` - Reusable Components

##### Feature Components
- ✅ **`auto-animate-wrapper.tsx`**: Animation container using FormKit's auto-animate
- ✅ **`client-dynamic-components.tsx`**: Client-side dynamic component loader
- ✅ **`cursor-trail.tsx`**: Creates interactive cursor trails with hope words
- ✅ **`divine-particles.tsx`**: Background particle effects
- ✅ **`dungy-wisdom.tsx`**: Tony Dungy quotes and wisdom section
- ✅ **`feature-card.tsx`**: Card component for feature highlights
- ✅ **`floating-testimony.tsx`**: Floating quotes from testimonials
- ✅ **`footer.tsx`**: Site footer with navigation and information
- ✅ **`form-builder.tsx`**: Dynamic form building component
- ✅ **`heartbeat-monitor.tsx`**: Visual heartbeat counter and animation
- ✅ **`hero.tsx`**: Main hero section component
- ✅ **`impact-dashboard.tsx`**: Real-time impact metrics dashboard
- ✅ **`layout-wrapper.tsx`**: Layout wrapper for consistent spacing
- ✅ **`letters-of-hope.tsx`**: Letters of support visualization
- 🚧 **`lottie-animations.tsx`**: Lottie animation integrations (not currently imported)
- ✅ **`michael-testament.tsx`**: Michael Mataluni's testimony component
- ✅ **`navigation.tsx`**: Main navigation bar
- ✅ **`prophetic-moment.tsx`**: Jordan's prophetic moment animation/experience
- ✅ **`risk-mitigation.tsx`**: Risk mitigation plan visualization
- ✅ **`sacred-animations.tsx`**: Sacred/divine animation effects
- ✅ **`section.tsx`**: Reusable section layout component
- ✅ **`smart-cta.tsx`**: Smart call-to-action components
- ✅ **`social-amplification.tsx`**: Social media sharing functionality
- ✅ **`testimonial-card.tsx`**: Testimonial display card
- ✅ **`youth-mentorship.tsx`**: Youth mentorship program details

##### UI Components (`/src/components/ui`)
- ✅ **`badge.tsx`**: Badge/tag component
- ✅ **`button.tsx`**: Button component with variants
- ✅ **`calendar.tsx`**: Calendar component based on react-day-picker
- ✅ **`card.tsx`**: Card component with variants
- ✅ **`checkbox.tsx`**: Checkbox input component
- ✅ **`container.tsx`**: Container with responsive padding
- ✅ **`date-picker.tsx`**: Date picker component
- ✅ **`file-upload.tsx`**: File upload component
- ✅ **`form.tsx`**: Form components using react-hook-form
- ✅ **`index.ts`**: Exports all UI components
- ✅ **`input.tsx`**: Text input component
- ✅ **`label.tsx`**: Form label component
- ✅ **`page-transition.tsx`**: Page transition animations
- ✅ **`popover.tsx`**: Popover component
- ✅ **`progress.tsx`**: Progress bar component
- ✅ **`radio-group.tsx`**: Radio button group
- ✅ **`select.tsx`**: Select dropdown component
- ✅ **`stack.tsx`**: Vertical/horizontal stack layout
- ✅ **`switch.tsx`**: Toggle switch component
- ✅ **`textarea.tsx`**: Multiline text input
- ✅ **`typography.tsx`**: Typography components (headings, text)

#### `/src/lib` - Utilities and Configuration
- ✅ **`design-system.ts`**: Design system tokens and configuration
- ✅ **`utils.ts`**: Utility functions
- ✅ **`build-config.ts`**: Build configuration utilities

## 🎨 Design System

The project uses a "Truth in Light" design system that has evolved from a darker, more mystical aesthetic to a lighter, more transparent approach.

### Color Palette
- **Primary**: Light colors (pureWhite, comfortCream, softCloud)
- **Accents**: hopeGold (#F59E0B), courageBlue (#2563EB), growthGreen (#10B981)
- **Text**: gentleCharcoal (#374151), softShadow (#6B7280)

### Typography
- **Font Family**: Inter, system fonts
- **Scale**: 1.25 type scale (major third)
- **Weights**: 400 (normal), 500 (medium), 700 (bold)

### Animation System
- **Durations**: instant (0.1s), fast (0.2s), normal (0.5s), slow (0.8s)
- **Presets**: fadeIn, slideUp, slideIn, scale, pulse, float

## 📊 Client-Side Components

All interactive components use the `"use client"` directive for Next.js App Router compatibility. Main client components include:

- All pages under `/src/app/`
- All interactive UI components
- Animation components (prophetic-moment, divine-particles, cursor-trail)
- Dashboard components (impact-dashboard, heartbeat-monitor)
- Testimony components (michael-testament, dungy-wisdom, floating-testimony)

## 🔗 Component Dependency Graph

### Core Flows
1. **User Journey**: layout → home-page → prophetic-moment → testimony sections → call to actions
2. **Testimony Flow**: michael-testament → jordan-letter → letter-to-dungy
3. **Impact Flow**: heartbeat-monitor → letters-of-hope → impact-dashboard

### Key Component Dependencies
- **home-page.tsx**: Imports most feature components via dynamic imports
- **layout.tsx**: Imports navigation, impact-dashboard, and footer
- **prophetic-moment.tsx**: Central experience that introduces Jordan's testimony

## 🧩 Component Categories

### Testimony Components (Core Mission)
- ✅ **michael-testament.tsx**: Michael Mataluni's witness
- ✅ **jordan-letter/page.tsx**: Jordan Dungy's witness
- ✅ **letter-to-dungy/page.tsx**: JAHmere's letter to Coach Dungy
- ✅ **floating-testimony.tsx**: Tony Dungy quotes
- ✅ **dungy-wisdom.tsx**: Tony Dungy wisdom section

### Engagement Components
- ✅ **heartbeat-monitor.tsx**: Community support visualization
- ✅ **letters-of-hope.tsx**: Letter submission and tracking
- ✅ **impact-dashboard.tsx**: Impact metrics dashboard
- ✅ **social-amplification.tsx**: Social sharing
- ✅ **smart-cta.tsx**: Call to action components

### Visual Experience Components
- ✅ **prophetic-moment.tsx**: Jordan's prophetic experience
- ✅ **divine-particles.tsx**: Particle animations
- ✅ **sacred-animations.tsx**: Divine animations
- ✅ **cursor-trail.tsx**: Interactive cursor effects
- 🚧 **lottie-animations.tsx**: Lottie animation integrations (not currently imported)

## 📱 Responsive Considerations

The project uses Tailwind's responsive classes for mobile-first design:
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (large displays)
- **2xl**: 1536px (extra large displays)

## 🔄 Implementation Status

### Completed Features
- ✅ Core UI Components and Design System
- ✅ Homepage with all key sections
- ✅ Prophetic Moment experience
- ✅ Testimony components (Michael, Jordan, JAHmere)
- ✅ Impact Dashboard with hearts counter
- ✅ Letters of Hope component
- ✅ Navigation and Footer
- ✅ Reset functionality for demos

### Pending Features
- 🚧 Judge's Dashboard functionality (needs improvement)
- 🚧 Lottie animations integration (not currently used)

### Removed Features
- ❌ Check-in system (removed)
- ❌ Minimal page (removed)
- ❌ Logo test page (removed)
- ❌ Test page (removed)
- ❌ Duplicate Prophetic Moment component (removed)

## 🔍 Technical Considerations

### Client-Side Rendering
- Components that use browser APIs have `"use client"` directives
- Many components are dynamically imported with `{ ssr: false }` to prevent hydration errors
- Animations and interactive elements are properly isolated to client components

### Performance Optimization
- Dynamic imports for larger components
- Progressive enhancement for interactive elements
- Client-side rendering for animations and effects

### Accessibility
- Contrast ratios meet WCAG standards
- Interactive elements have proper ARIA attributes
- Focus management for keyboard navigation

## 🚀 Getting Started

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start on specific port
npm run dev -- -p 4932
```

### Production
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📋 Actual Files Snapshot

This is a complete list of all TypeScript files that currently exist in the project:

```
src/app/contact/page.tsx
src/app/dashboard/judge/page.tsx
src/app/home-page.tsx
src/app/jordan-letter/page.tsx
src/app/layout.tsx
src/app/letter-to-dungy/page.tsx
src/app/page.tsx
src/app/reset/page.tsx
src/components/auto-animate-wrapper.tsx
src/components/client-dynamic-components.tsx
src/components/cursor-trail.tsx
src/components/divine-particles.tsx
src/components/dungy-wisdom.tsx
src/components/feature-card.tsx
src/components/floating-testimony.tsx
src/components/footer.tsx
src/components/form-builder.tsx
src/components/heartbeat-monitor.tsx
src/components/hero.tsx
src/components/impact-dashboard.tsx
src/components/layout-wrapper.tsx
src/components/letters-of-hope.tsx
src/components/lottie-animations.tsx
src/components/michael-testament.tsx
src/components/navigation.tsx
src/components/prophetic-moment.tsx
src/components/risk-mitigation.tsx
src/components/sacred-animations.tsx
src/components/section.tsx
src/components/smart-cta.tsx
src/components/social-amplification.tsx
src/components/testimonial-card.tsx
src/components/ui/badge.tsx
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/card.tsx
src/components/ui/checkbox.tsx
src/components/ui/container.tsx
src/components/ui/date-picker.tsx
src/components/ui/file-upload.tsx
src/components/ui/form.tsx
src/components/ui/index.ts
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/page-transition.tsx
src/components/ui/popover.tsx
src/components/ui/progress.tsx
src/components/ui/radio-group.tsx
src/components/ui/select.tsx
src/components/ui/stack.tsx
src/components/ui/switch.tsx
src/components/ui/textarea.tsx
src/components/ui/typography.tsx
src/components/youth-mentorship.tsx
src/lib/build-config.ts
src/lib/design-system.ts
src/lib/utils.ts
```

---

*This index was generated to provide a comprehensive understanding of The Bridge Project codebase structure, designed to be a resource for both developers and AI assistants working on the project. It has been updated to reflect the current state of the project after cleanup and optimization.* 