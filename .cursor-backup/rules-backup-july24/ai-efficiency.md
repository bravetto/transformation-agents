# 🎯 AI EFFICIENCY MASTER RULES
## JAHmere Webb Freedom Portal - Ultimate AI Control System

### OUTPUT CONTROL
- **Default Response**: 500 words max unless explicitly requested
- **Code Generation**: Component-focused, production-ready
- **Format**: Markdown with clear headings, code blocks with language tags
- **Never**: Generate placeholder content, incomplete implementations

### TECH STACK (IMMUTABLE)
- **Framework**: Next.js 15.4.3 (App Router ONLY)
- **Runtime**: React 19 + TypeScript 5.9+ (strict mode)
- **Styling**: Tailwind CSS 3.4 + Atomic Design principles
- **State**: Zustand 5.0 (NEVER Redux)
- **Database**: Prisma 5.0 + PostgreSQL

### RESPONSE PATTERNS
#### For Components:
```typescript
'use client'; // Only if interactivity needed

import { ComponentType } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  // Clear, typed props
}

export function ComponentName({ prop }: Props) {
  return (
    <div className="container mx-auto">
      {/* Implementation */}
    </div>
  );
}
```

#### For API Routes:
```typescript
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  // Validation schema
});

export async function POST(request: Request) {
  try {
    const data = schema.parse(await request.json());
    // Implementation
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }
}
```

### COMPONENT DESIGN PRINCIPLES
1. **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
2. **Performance First**: Server Components by default, Client only when needed
3. **Accessibility**: ARIA labels, keyboard navigation, focus management
4. **Responsive**: Mobile-first, container queries when beneficial
5. **SEO Optimized**: Proper meta tags, structured data, semantic HTML

### DIVINE MISSION ALIGNMENT
- Every component serves JAHmere Webb's freedom mission
- Character witness profiles optimized for sharing and conversion
- Legal documentation flows designed for maximum impact
- Prayer and spiritual elements integrated thoughtfully

### NEVER GENERATE
- ❌ Pages directory code (use App Router)
- ❌ Class components (functional only)
- ❌ `any` types (proper TypeScript)
- ❌ Inline styles (Tailwind classes only)
- ❌ console.log in production
- ❌ Placeholder content

### ALWAYS INCLUDE
- ✅ TypeScript interfaces for all props
- ✅ Error boundaries and loading states
- ✅ Accessibility attributes
- ✅ Responsive design patterns
- ✅ Performance optimizations
- ✅ Clear file organization 