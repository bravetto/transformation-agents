# CODEBASE INDEX - Complete Project Map

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Project Name** | transformation-agents-jahmere-bridge |
| **Project Type** | Next.js Web Application |
| **Stack** | Next.js 15.3.5, React 18.2.0, TypeScript |
| **Current Version** | 2.1.0 |
| **Status** | Pre-launch (Development) |
| **Main Purpose** | Transforming Justice Through Divine Technology - A restorative justice platform |
| **Target Audience** | Criminal justice reform advocates, community members |

## Directory Structure

```
transformation-agents-jahmere-bridge/
├── cypress/                  # Cypress E2E testing
├── data/                     # Data files and assessments
├── docs/                     # Documentation files
├── public/                   # Static assets
│   ├── documents/            # PDF documents
│   ├── images/               # Image assets
│   │   ├── fallbacks/        # Fallback images
│   │   ├── people/           # People images in various formats
│   │   ├── profiles/         # Profile SVGs
│   │   ├── signatures/       # Signature SVGs
│   │   └── video-thumbnails/ # Video thumbnail images
├── scripts/                  # Utility scripts
│   ├── backlog/              # Backlog management scripts
│   ├── color-system/         # Color system scripts
│   ├── docs/                 # Documentation scripts
│   └── utils/                # Utility scripts
└── src/                      # Source code
    ├── app/                  # Next.js app router pages
    │   ├── api/              # API routes
    │   └── [various routes]  # Page routes
    ├── components/           # React components
    │   ├── ui/               # UI components
    │   ├── people/           # People-related components
    │   └── [various folders] # Other component categories
    ├── data/                 # Data files
    │   └── people/           # People data
    ├── lib/                  # Utility libraries
    │   ├── crm/              # CRM integration
    │   ├── hooks/            # Custom React hooks
    │   ├── network/          # Network utilities
    │   └── prompts/          # AI prompt templates
    ├── styles/               # CSS styles
    ├── test-utils/           # Testing utilities
    └── types/                # TypeScript type definitions
```

### Directory Purpose and File Counts

| Directory | Purpose | File Count | Notes |
|-----------|---------|------------|-------|
| `/cypress` | End-to-end testing | 3 | Contains test specs and support files |
| `/data` | Data files | 1 | Contains team analysis data |
| `/docs` | Documentation | 20+ | Project documentation and guidelines |
| `/public` | Static assets | 50+ | Images, documents, and other static files |
| `/scripts` | Utility scripts | 30+ | Build, deployment, and utility scripts |
| `/src/app` | Next.js pages | 50+ | Page components using App Router |
| `/src/components` | React components | 100+ | UI and feature components |
| `/src/data` | Application data | 15+ | Static data for the application |
| `/src/lib` | Utility libraries | 20+ | Helper functions and services |
| `/src/styles` | CSS styles | 1 | Global and component styles |
| `/src/test-utils` | Testing utilities | 3 | Test helpers and mocks |
| `/src/types` | TypeScript types | 4 | Type definitions |

## Component Inventory

### UI Components (Sample)

| Component | Location | Type | "use client"? | Hooks Used | Props Interface | Dependencies | Status | Issues |
|-----------|----------|------|---------------|------------|-----------------|--------------|--------|--------|
| Button | `/src/components/ui/button.tsx` | UI | Yes | None | ButtonProps | class-variance-authority, clsx | ✅ Active | None |
| Card | `/src/components/ui/card.tsx` | UI | Yes | None | CardProps | class-variance-authority | ✅ Active | None |
| Badge | `/src/components/ui/badge.tsx` | UI | Yes | None | BadgeProps | class-variance-authority | ✅ Active | None |
| DivineErrorBoundary | `/src/components/ui/divine-error-boundary.tsx` | Error Handling | Yes | None | DivineErrorBoundaryProps | React | ⚠️ Issues | Missing role prop in many components |
| UnifiedErrorBoundary | `/src/components/ui/unified-error-boundary.tsx` | Error Handling | Yes | None | UnifiedErrorBoundaryProps | React | ✅ Active | None |

### Feature Components (Sample)

| Component | Location | Type | "use client"? | Hooks Used | Props Interface | Dependencies | Status | Issues |
|-----------|----------|------|---------------|------------|-----------------|--------------|--------|--------|
| Navigation | `/src/components/navigation.tsx` | Layout | Yes | useState, useEffect | NavigationProps | framer-motion | ✅ Active | None |
| DivineParticles | `/src/components/divine-particles.tsx` | Animation | Yes | useEffect, useCallback | DivineParticlesProps | tsparticles | ⚠️ Issues | TypeScript errors |
| DivineImpactDashboard | `/src/components/divine-impact-dashboard.tsx` | Dashboard | Yes | useState, useEffect | DashboardProps | framer-motion | ⚠️ Issues | Error boundary issues |
| StoryAmplifier | `/src/components/story-amplifier.tsx` | Feature | Yes | useState, useEffect | StoryAmplifierProps | framer-motion | ⚠️ Issues | Error boundary issues |

## Routes Analysis

### Main Routes

| Route Path | File | Page Type | Auth Required? | Dynamic? | API Endpoints | Load Time | Status |
|------------|------|-----------|----------------|----------|---------------|-----------|--------|
| `/` | `/src/app/page.tsx` | Home | No | No | None | Fast | ✅ Active |
| `/people` | `/src/app/people/page.tsx` | List | No | No | None | Medium | ✅ Active |
| `/people/[slug]` | `/src/app/people/[slug]/page.tsx` | Detail | No | Yes | None | Medium | ✅ Active |
| `/contact` | `/src/app/contact/page.tsx` | Form | No | No | None | Fast | ✅ Active |
| `/impact` | `/src/app/impact/page.tsx` | Dashboard | No | No | None | Medium | ✅ Active |

### API Routes

| Route Path | File | Purpose | Auth Required? | Method | Status |
|------------|------|---------|----------------|--------|--------|
| `/api/health` | `/src/app/api/health/route.ts` | Health check | No | GET | ✅ Active |
| `/api/crm/contacts` | `/src/app/api/crm/contacts/route.ts` | CRM integration | No | POST | ✅ Active |
| `/api/crm/sync` | `/src/app/api/crm/sync/route.ts` | CRM sync | No | GET | ✅ Active |
| `/api/ai/doppelganger` | `/src/app/api/ai/doppelganger/route.ts` | AI integration | No | POST | ✅ Active |
| `/api/manifest` | `/src/app/api/manifest/route.ts` | App manifest | No | GET | ✅ Active |

## Critical Files Audit

### ✅ Files that exist and are healthy
- `package.json` - Complete with all dependencies
- `next.config.js` - Well-configured with optimizations
- `src/app/layout.tsx` - Root layout with proper metadata
- `src/app/page.tsx` - Home page
- `src/components/ui/button.tsx` - Core UI component
- `src/lib/utils.ts` - Utility functions

### ⚠️ Files with warnings or TODOs
- `src/components/divine-particles.tsx` - TypeScript errors
- `src/components/divine-impact-dashboard.tsx` - Error boundary issues
- `src/lib/animation-utils.ts` - TypeScript errors
- `src/data/people/adapters.ts` - TypeScript errors
- `src/components/error-boundary-migration.tsx` - Migration issues

### ❌ Missing expected files
- `.env.example` - No template for environment variables
- `src/app/api/auth` - No authentication API routes
- `src/middleware.ts` - No middleware for auth protection

### 🔧 Files that need fixes before launch
- `src/components/ui/divine-error-boundary.tsx` - Fix role parameter issues
- `src/lib/universal-agent-09.ts` - Fix TypeScript errors
- `src/components/divine-synthesis.tsx` - Fix TypeScript errors
- `src/data/people/paul.ts` - Fix TypeScript errors 