# JAHmere Webb Freedom Portal

A Next.js advocacy platform supporting JAHmere Webb's freedom case and criminal justice reform.

## Quick Start

```bash
# Setup and run locally
git clone <repository>
cd transformation-agents-JAHmere-bridge
npm install
npm run dev
```

Visit `http://localhost:1437` - the app will be running in development mode.

## What This Is

The JAHmere Webb Freedom Portal is an advocacy website that:
- Shares JAHmere Webb's story and legal case
- Provides resources for community supporters  
- Facilitates petition and letter-writing campaigns
- Educates about criminal justice reform

**Target court date**: July 28, 2025

## Tech Stack

- **Next.js 15.4.2** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (styling)
- **Vercel** (hosting)

## Key Features

- Responsive design for all devices
- Performance optimized (27-131ms API responses)
- Character witness profiles
- Letter submission portal  
- Analytics dashboard
- Mobile-first design

## Project Structure

```
src/app/           # Next.js 15 pages (App Router)
src/components/    # React components
src/components/ui/ # Reusable UI components  
src/lib/          # Utilities and helpers
public/           # Static assets
```

## Development

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run type-check # TypeScript validation
npm run lint       # ESLint check
```

## Deployment

The app is deployed on Vercel at `july28freedom.vercel.app`

Production deployment automatically happens on push to main branch.

## Contributing

1. Create feature branch from `main`
2. Make changes and test locally
3. Run `npm run build` to verify production build
4. Submit pull request

## Documentation

- **Full Developer Guide**: `docs/DEVELOPMENT.md` (setup, workflow, architecture)
- **API Reference**: `docs/API.md` (endpoints, authentication)  
- **AI Assistant Rules**: `.cursorrules` (Cursor IDE optimization)

## Performance

- Build time: ~9 seconds
- API responses: 27-131ms  
- Core Web Vitals: Optimized
- Bundle size: Production optimized

---

**Mission**: Supporting JAHmere Webb's freedom through technology and community advocacy. 