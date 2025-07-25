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
