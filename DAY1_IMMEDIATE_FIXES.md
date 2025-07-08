# 🔥 DAY 1: Immediate Build & Error Fixes (2 hours)

## 1. Fix Build Issues (15 min)

```bash
# Clean and rebuild
npm run clean:cache
npm run build

# If still failing, nuclear option:
rm -rf .next node_modules/.cache
npm install
npm run build
```

## 2. Add Missing "use client" Directives (30 min)

```bash
# Find components needing "use client"
grep -r "useState\|useEffect\|framer-motion" src/components/ | grep -v "use client" | cut -d: -f1 | sort -u

# Add to top of each file found:
echo '"use client";\n' | cat - filename.tsx > temp && mv temp filename.tsx
```

## 3. Create Critical error.tsx Files (45 min)

### People Route Error
```bash
mkdir -p src/app/people
cat > src/app/people/error.tsx << 'EOF'
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { reportError } from '@/lib/analytics'

export default function PeopleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    reportError(error, { route: 'people' })
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Unable to Load People
        </h2>
        <p className="text-gray-600">
          {error.message || 'The people directory is temporarily unavailable.'}
        </p>
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
      </div>
    </div>
  )
}
EOF
```

### Contact Route Error
```bash
mkdir -p src/app/contact
cat > src/app/contact/error.tsx << 'EOF'
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { reportError } from '@/lib/analytics'

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    reportError(error, { route: 'contact' })
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Contact Form Error
        </h2>
        <p className="text-gray-600">
          We couldn't load the contact form. Please try again.
        </p>
        <Button onClick={reset} variant="primary">
          Retry
        </Button>
      </div>
    </div>
  )
}
EOF
```

### Impact Route Error
```bash
mkdir -p src/app/impact
cat > src/app/impact/error.tsx << 'EOF'
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { reportError } from '@/lib/analytics'

export default function ImpactError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    reportError(error, { route: 'impact' })
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Impact Dashboard Error
        </h2>
        <p className="text-gray-600">
          Unable to load impact metrics. Please refresh.
        </p>
        <Button onClick={reset} variant="primary">
          Refresh Dashboard
        </Button>
      </div>
    </div>
  )
}
EOF
```

## 4. Fix Divine Particles (30 min)

```typescript
// Add to src/components/divine-particles.tsx at the top
'use client';

// Wrap initialization in try-catch
useEffect(() => {
  const initParticles = async () => {
    try {
      if (!containerRef.current) return;
      
      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported, skipping particles');
        return;
      }
      
      // Your existing initialization code
      await loadSlim(engine);
      
    } catch (error) {
      console.error('Particles initialization failed:', error);
      // Gracefully degrade - component still renders without particles
    }
  };
  
  initParticles();
}, []);
```

## 5. Verify Fixes (15 min)

```bash
# Test build
npm run build

# Check error boundary coverage
find src/app -name "error.tsx" | wc -l

# Run quick test
npm test -- --testNamePattern="error|boundary" --passWithNoTests

# Start dev server
npm run dev
```

## ✅ Day 1 Success Metrics

- [ ] Build completes without errors
- [ ] 3 new error.tsx files created
- [ ] Divine particles has try-catch
- [ ] No "use client" warnings in console
- [ ] Dev server runs without crashes

## 🚀 Quick Win Commands

```bash
# Create all error files at once
for route in people contact impact admin "the-case"; do
  mkdir -p "src/app/$route"
  cp src/app/error.tsx "src/app/$route/error.tsx"
  sed -i '' "s/Application error/Error in $route/g" "src/app/$route/error.tsx"
done

# Count progress
echo "Error boundaries: $(find src/app -name 'error.tsx' | wc -l)/15 routes"
``` 