# Developer Guide - JAHmere Webb Freedom Portal

Complete development setup, workflow, and architecture guide.

## Quick Setup

```bash
# Clone and setup
git clone <repository-url>
cd transformation-agents-JAHmere-bridge
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with your values (see Environment Variables section)

# Start development
npm run dev
```

Visit `http://localhost:1437` - the app runs on this port specifically.

## Requirements

- **Node.js**: >= 18.18.0 (project uses 20.x)
- **npm**: >= 9.0.0  
- **Git**: Latest version
- **Editor**: VS Code recommended (Cursor AI optimized)

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.4.2 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.0
- **Deployment**: Vercel Edge Network
- **Performance**: 27-131ms API responses, 9s builds

### Directory Structure
```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout  
│   ├── globals.css        # Global styles
│   └── [feature]/         # Feature pages
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix + Tailwind)
│   └── [feature]/        # Feature-specific components  
├── lib/                  # Utilities, helpers, configuration
├── types/                # TypeScript type definitions
└── styles/               # Additional CSS files

public/                   # Static assets (images, documents)
docs/                     # Documentation (consolidated)
scripts/                  # Build and deployment scripts
```

### Architecture Principles
- **Static Site**: No backend database, Vercel-hosted
- **Component-Based**: Reusable UI components with TypeScript
- **Performance-First**: Optimized for Core Web Vitals
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant

## Development Workflow

### Daily Development
```bash
npm run dev              # Start development server (port 1437)
npm run build            # Test production build
npm run type-check       # Validate TypeScript
npm run lint             # Run ESLint checks
```

### Code Standards
- **TypeScript**: Strict mode, no `any` types
- **Components**: Arrow functions with interfaces
- **Styling**: Tailwind classes only
- **Imports**: Use `@/` path aliases
- **Client Components**: Add `'use client'` only when needed

### Example Component Pattern
```typescript
// Server Component (default)
export default function PageComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Page Title</h1>
    </div>
  )
}

// Client Component (when interactive)
'use client'
import { useState } from 'react'

interface InteractiveProps {
  initialValue?: string
  children: React.ReactNode
}

export default function InteractiveComponent({ 
  initialValue = '', 
  children 
}: InteractiveProps) {
  const [value, setValue] = useState(initialValue)
  
  return (
    <div className="space-y-4">
      <button 
        onClick={() => setValue('clicked')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {children}
      </button>
      <p>{value}</p>
    </div>
  )
}
```

## Environment Variables

Required environment variables for local development:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:1437
NEXT_PUBLIC_VERCEL_URL=${VERCEL_URL}

# Analytics (optional for local development)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Build optimization
NODE_ENV=development
```

For production deployment, these are automatically set by Vercel.

## Key Features & Components

### Core Components
- **Navigation**: Main navigation with mobile responsiveness
- **Character Witnesses**: Profile cards with fallback images
- **Letter Portal**: Form for community letter submissions
- **Analytics Dashboard**: Performance monitoring
- **Error Boundaries**: Graceful error handling

### UI Component System
Located in `src/components/ui/`:
- `button.tsx` - Reusable button variants
- `card.tsx` - Content containers
- `container.tsx` - Layout wrapper
- `popover.tsx` - Dropdown menus
- `typography.tsx` - Text components (Heading, Text, Quote)

## Testing

```bash
npm test                 # Run unit tests (Jest)
npm run test:coverage    # Test coverage report
npm run type-check       # TypeScript validation
npm run lint             # ESLint checks
```

### Testing Strategy
- **Unit Tests**: Component testing with Jest/React Testing Library
- **Type Safety**: Strict TypeScript compilation
- **Build Testing**: Production build validation
- **Performance Testing**: Core Web Vitals monitoring

## Build & Deployment

### Local Production Build
```bash
npm run build            # Create production build
npm start               # Serve production build locally
```

### Vercel Deployment
- **Automatic**: Push to `main` branch triggers deployment
- **Manual**: Use `vercel --prod` command
- **Preview**: All branch pushes get preview deployments

### Build Optimization
- Automatic code splitting by route
- Image optimization with Next.js Image component
- Bundle analysis available with `npm run analyze`
- Vercel Edge Network CDN

## Performance Standards

### Current Metrics (Targets)
- **Build Time**: ~9 seconds (target: <15s)
- **API Response**: 27-131ms (target: <100ms)
- **Bundle Size**: Optimized with code splitting
- **Core Web Vitals**: Green scores required

### Performance Monitoring
- Vercel Analytics integrated
- Real-time performance monitoring
- Core Web Vitals tracking
- Build performance analysis

## Troubleshooting

### Common Issues

**Port 1437 in use:**
```bash
lsof -ti:1437 | xargs kill -9
npm run dev
```

**TypeScript errors:**
```bash
npm run type-check
# Fix reported issues, avoid using 'any' types
```

**Build failures:**
```bash
rm -rf .next node_modules/.cache
npm install
npm run build
```

**Import resolution issues:**
- Check file paths are correct
- Use `@/` prefix for src/ imports
- Verify component exports match imports

## Contributing

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with proper TypeScript types
3. Test locally: `npm run build && npm run type-check`
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

### Code Review Checklist
- [ ] TypeScript compilation passes
- [ ] Components have proper interfaces
- [ ] Tailwind classes used (no inline styles)
- [ ] Mobile responsiveness tested
- [ ] Error boundaries implemented for client components
- [ ] Performance impact considered

## Getting Help

### Documentation
- **README.md**: Project overview and quick start
- **API.md**: API reference and endpoints
- **.cursorrules**: AI assistant optimization

### Resources  
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vercel Platform Documentation](https://vercel.com/docs)

### Support
- Check existing documentation first
- Search codebase for similar implementations  
- Create GitHub issue for bugs
- Ask team for architecture decisions

---

**Mission**: Supporting JAHmere Webb's freedom through technology and community advocacy. 