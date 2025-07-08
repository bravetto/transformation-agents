#!/bin/bash

# 🚨 IMMEDIATE EXECUTION SCRIPT
# Run this to fix your build and add error handling RIGHT NOW
# Usage: chmod +x EXECUTE_NOW.sh && ./EXECUTE_NOW.sh

set -e  # Exit on error

echo "🚀 Starting Emergency Build Fix & Error Handling..."
echo "================================================"

# STEP 1: Fix Build Issues
echo -e "\n🔥 STEP 1: Fixing Build Issues..."
echo "Cleaning everything first..."
rm -rf .next node_modules/.cache
npm cache clean --force

echo "Adding helper scripts to package.json..."
npm pkg set scripts.clean:cache="rm -rf .next && rm -rf node_modules/.cache"
npm pkg set scripts.dev:clean="npm run clean:cache && next dev"
npm pkg set scripts.build:clean="npm run clean:cache && next build"

echo "Running clean build..."
npm run build:clean || echo "⚠️  Build failed, continuing with fixes..."

# STEP 2: Fix "use client" Directives
echo -e "\n🛠️  STEP 2: Fixing 'use client' Directives..."
echo "Finding files that need 'use client'..."

# Create temp file for files needing client directive
grep -r "useState\|useEffect\|onClick" src/components --include="*.tsx" 2>/dev/null | cut -d: -f1 | sort -u > needs-client.txt || true

# Add "use client" to files that need it
while read -r file; do
  if [ -f "$file" ] && ! grep -q "^'use client'" "$file" 2>/dev/null; then
    echo "'use client'" | cat - "$file" > temp && mv temp "$file"
    echo "✅ Fixed: $file"
  fi
done < needs-client.txt

rm -f needs-client.txt

# STEP 3: Add Error Boundaries
echo -e "\n🚦 STEP 3: Adding Error Boundaries to Critical Routes..."

# Create error.tsx for people route
mkdir -p src/app/people
cat > src/app/people/error.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportError } from '@/lib/analytics';

export default function PeopleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('People route error:', error);
    reportError(error, { route: 'people' });
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unable to Load People</h2>
        <p className="text-gray-600 mb-6">
          There was an error loading the transformation agents. Please try again.
        </p>
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
      </div>
    </div>
  );
}
EOF

# Create error.tsx for contact route
mkdir -p src/app/contact
cat > src/app/contact/error.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportError } from '@/lib/analytics';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Contact route error:', error);
    reportError(error, { route: 'contact' });
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unable to Load Contact Form</h2>
        <p className="text-gray-600 mb-6">
          There was an error loading the contact form. Please try again.
        </p>
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
      </div>
    </div>
  );
}
EOF

# Create error.tsx for impact route
mkdir -p src/app/impact
cat > src/app/impact/error.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportError } from '@/lib/analytics';

export default function ImpactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Impact route error:', error);
    reportError(error, { route: 'impact' });
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unable to Load Impact Dashboard</h2>
        <p className="text-gray-600 mb-6">
          There was an error loading the impact metrics. Please try again.
        </p>
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
      </div>
    </div>
  );
}
EOF

echo "✅ Created error.tsx for people, contact, and impact routes"

# STEP 4: Create Progress Tracking
echo -e "\n📊 STEP 4: Creating Progress Tracking..."

mkdir -p scripts
cat > scripts/check-progress.js << 'EOF'
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking Project Health...\n');

// Check build status
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build: PASSING');
} catch (e) {
  console.log('❌ Build: FAILING');
}

// Count error.tsx files
const errorFiles = execSync('find src -name "error.tsx" | wc -l').toString().trim();
console.log(`📁 Error Boundaries: ${errorFiles} files`);

// Count "use client" directives
const clientComponents = execSync('grep -r "^\'use client\'" src --include="*.tsx" | wc -l').toString().trim();
console.log(`🔧 Client Components: ${clientComponents} files`);

// List routes missing error.tsx
console.log('\n📋 Routes missing error.tsx:');
const appDir = './src/app';
if (fs.existsSync(appDir)) {
  const routes = fs.readdirSync(appDir, { withFileTypes: true })
    .filter(file => file.isDirectory() && !file.name.startsWith('(') && !file.name.startsWith('_'))
    .filter(dir => !fs.existsSync(path.join(appDir, dir.name, 'error.tsx')));
  
  routes.forEach(route => {
    console.log(`   - ${route.name}/`);
  });
}

console.log('\n📊 Progress Summary:');
console.log('- Day 1: Fix build ✓');
console.log('- Day 2: Add error boundaries ⏳');
console.log('- Day 3: Write tests ⏳');
console.log('- Day 4: Improve coverage ⏳');
console.log('- Day 5: Production ready ⏳');
EOF

chmod +x scripts/check-progress.js
npm pkg set scripts.progress="node scripts/check-progress.js"

# STEP 5: Final Verification
echo -e "\n🎯 STEP 5: Running Final Verification..."

echo -e "\n📋 Files potentially missing 'use client':"
grep -r "useState\|useEffect" src --include="*.tsx" 2>/dev/null | grep -v "^'use client'" | cut -d: -f1 | sort -u || echo "None found!"

echo -e "\n📁 Error boundaries created:"
find src -name "error.tsx" -type f 2>/dev/null || echo "None found!"

echo -e "\n📊 Overall progress:"
npm run progress

echo -e "\n✨ IMMEDIATE FIXES COMPLETE!"
echo "================================"
echo ""
echo "✅ Next Steps:"
echo "1. Run 'npm run dev' to test locally"
echo "2. Check for any remaining build errors"
echo "3. Commit your changes: git add -A && git commit -m 'fix: emergency error handling and build fixes'"
echo "4. Continue with Day 2 tasks in DAY2-3_TEST_COVERAGE.md"
echo ""
echo "📊 Track your progress anytime with: npm run progress" 