# 🔥 JAHmere Webb Freedom Portal - Development Guide

**The Single Source of Truth for Building, Deploying, and Maintaining**

## 🚀 Quick Start (2 Minutes)

```bash
# 1. Clone and setup
git clone [repo-url]
cd transformation-agents-JAHmere-bridge
npm install

# 2. Environment setup
cp .env.example .env.local
# Add your PostHog keys (see Environment Variables below)

# 3. Start development
npm run dev          # Runs on http://localhost:1357
```

**Expected Result**: Server starts in <10s, health endpoint returns 200, no PostHog errors.

## 🔧 Environment Variables

Create `.env.local` with these critical variables:

```bash
# PostHog Analytics (REQUIRED)
NEXT_PUBLIC_POSTHOG_KEY=phc_TBgkXxBpKoWWKRF2vLDn2Lss0ry032ITZlXD9daPBQm
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
POSTHOG_KEY=019836d6-0024-75b9-b1c5-d238e6c9b157
POSTHOG_HOST=https://app.posthog.com

# Development URLs
NEXT_PUBLIC_BASE_URL=http://localhost:1357
```

## 🛠️ Development Commands

```bash
# Development
npm run dev:turbo          # Turbopack dev server (fastest)
npm run dev                # Standard dev server
npm run dev:profile        # Development with profiling

# Building
npm run build              # Production build (target: <5s)
npm run build:analyze      # Bundle analysis
npm run preview            # Build + preview

# Quality
npm run type-check         # TypeScript validation
npm run lint               # ESLint check
npm run test               # Vitest tests
npm run test:coverage      # Test coverage

# Maintenance
npm run clean              # Clear .next, .turbo, cache
npm run fix:development    # Auto-fix common dev issues
```

## 🎯 Performance Targets

| Metric            | Target | Current | Status |
| ----------------- | ------ | ------- | ------ |
| Build Time        | <5s    | 5.1s    | 🟡     |
| API Response      | <7ms   | 7ms     | ✅     |
| Hot Reload        | <500ms | 400ms   | ✅     |
| Bundle Size       | <100KB | 95KB    | ✅     |
| TypeScript Errors | 0      | 0       | ✅     |

## 🔥 Troubleshooting

### PostHog 500 Errors

**Symptom**: `POST /ingest/e ... 500` in browser console  
**Fix**: Verify `.env.local` uses `https://app.posthog.com` (not `us.i.posthog.com`)

### Routes Manifest ENOENT

**Symptom**: `ENOENT: .next/routes-manifest.json`  
**Fix**: `npm run clean && npm run dev:turbo`

### Excessive Hot Reload

**Symptom**: 50+ compilation cycles  
**Fix**: `npm run fix:development`

### TypeScript Errors

**Fix**: Check `tsconfig.json` - ensure strict mode settings are compatible

## 🚀 Deployment (Vercel)

### Automated Deployment

```bash
# Push to main branch triggers auto-deployment
git push origin main
```

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables (Vercel)

Set these in Vercel dashboard:

- All `.env.local` variables
- `DATABASE_URL` (if using database)
- `VERCEL_TOKEN` (for CI/CD)

## 📊 Health Monitoring

### Local Health Check

```bash
curl http://localhost:1357/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "environment": "development",
  "performance": {
    "response_time_ms": 0,
    "divine_sync": true
  },
  "services": {
    "database": { "status": "healthy" },
    "analytics": { "status": "healthy" }
  }
}
```

### CI/CD Pipeline Status

- ✅ **Quality Gate**: TypeScript + ESLint
- ✅ **Testing**: Vitest unit tests
- ✅ **Performance**: Lighthouse audits
- ✅ **E2E**: Critical path testing
- ✅ **Deploy**: Automatic Vercel deployment

## 🎭 Key Architecture Decisions

### Why Next.js 15.4.3 + Turbopack

- **Performance**: 3x faster builds than Webpack
- **Stability**: React 19 compatibility
- **Features**: App Router, Server Components, Server Actions

### Why Server Components Default

- **Performance**: Reduced client bundle size
- **SEO**: Better initial page load
- **UX**: Instant navigation with streaming

### Why TypeScript Strict Mode

- **Quality**: Catch errors at compile time
- **AI**: Better code completion and suggestions
- **Maintenance**: Easier refactoring and debugging

## 🔄 Development Workflow

1. **Feature Branch**: `git checkout -b feature/awesome-feature`
2. **Development**: Code with hot reload, TypeScript checking
3. **Testing**: `npm run test` - ensure all tests pass
4. **Quality**: `npm run type-check && npm run lint`
5. **Review**: Create PR, automated CI/CD runs
6. **Deploy**: Merge to main triggers production deployment

## 📚 Additional Resources

- [Architecture](./ARCHITECTURE.md) - System design decisions
- [Component Patterns](.cursorrules) - AI-guided development patterns
- [Project Overview](../README.md) - Mission and quick overview
