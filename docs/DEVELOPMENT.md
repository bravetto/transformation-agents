# Development Guide

## Quick Start (2 minutes)
```bash
git clone [repo]
cd jahmere-webb-platform
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Project Structure
```
src/
├── app/              # Next.js 15.4 App Router
├── components/       # Reusable divine components
├── lib/             
│   ├── actions/     # Server Actions
│   ├── db/          # Database (Prisma)
│   └── divine/      # Divine utilities
└── types/           # TypeScript types
```

## Key Commands
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run test         # Run test suite
npm run divine:check # Validate divine alignment
```

## 🚀 DEPLOYMENT PIPELINE (MISSION CRITICAL)

### Pre-Deployment Checklist
```bash
# MANDATORY before every deployment
npm run type-check    # TypeScript validation
npm run build        # Verify production build
npm run lint         # Code quality check
git status           # Verify clean working directory
```

### Critical Deployment Issues & Solutions

#### 1. **Package Lock Synchronization**
**Issue:** `npm ci` fails with "package.json and package-lock.json out of sync"
```bash
# SOLUTION: Always sync before deployment
npm install          # Updates package-lock.json
git add package-lock.json
git commit -m "🔧 SYNC: Update package-lock.json"
```

#### 2. **Content Security Policy (CSP) Font Loading**
**Issue:** Google Fonts blocked by restrictive CSP
```javascript
// SOLUTION: Update next.config.mjs CSP headers
"font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;"
```

#### 3. **MetadataBase Configuration**
**Issue:** Social media sharing fails without metadataBase
```typescript
// SOLUTION: Add to app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.vercel.app'),
  // ... rest of metadata
}
```

### Deployment Commands
```bash
# Standard deployment
git add .
git commit -m "feat: description"
git push origin main
vercel --prod

# Emergency deployment with verification
npm run build && npm run type-check
git add . && git commit -m "🚨 URGENT: fix description"
git push origin main && vercel --prod
```

### Vercel Configuration Essentials
```json
// vercel.json - Critical settings
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/**/*.tsx": {
      "maxDuration": 30
    }
  }
}
```

## Adding Features

### New Page
```typescript
// app/divine-feature/page.tsx
export default async function Page() {
  return <h1>Divine Feature</h1>;
}
```

### New Server Action
```typescript
// app/divine-feature/actions.ts
'use server';
export async function createDivineRecord(data: FormData) {
  // Implementation
}
```

### Database Changes
```bash
# Edit prisma/schema.prisma
npm run db:push     # Development
npm run db:migrate  # Production
```

## Divine Deployment
- Push to main → Auto-deploy to Vercel
- Divine protection via automated tests

## 🛡️ EMERGENCY PROCEDURES

### Deployment Failure Recovery
```bash
# 1. Check Vercel logs
vercel logs [deployment-url]

# 2. Verify local build
npm run build

# 3. Check for common issues
npm install  # Sync package-lock.json
npm run type-check  # TypeScript errors
npm run lint  # Code quality

# 4. Emergency rollback
vercel rollback [previous-deployment-url]
```

### Package Dependency Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify dependency versions
npm ls --depth=0
npm audit
```

### CSP and Security Headers
```bash
# Test CSP configuration
curl -I https://your-domain.vercel.app/

# Verify font loading
# Check browser console for CSP violations
```

---
*Updated: July 25, 2025 - Deployment Pipeline Excellence*
