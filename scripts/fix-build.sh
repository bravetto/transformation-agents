#!/bin/bash
set -e

echo "🚀 Starting complete build fix..."

# Make scripts executable
chmod +x scripts/fix-all-import-syntax.js
chmod +x scripts/find-broken-imports.js

# 1. Find issues
echo -e "\n📋 Finding broken imports..."
node scripts/find-broken-imports.js

# 2. Fix all imports
echo -e "\n🔧 Fixing all import statements..."
node scripts/fix-all-import-syntax.js

# 3. Fix specific files that we know have issues
echo -e "\n🔧 Fixing specific known issues..."

# Fix FilterBar.tsx if it exists
if [ -f src/components/people/FilterBar.tsx ]; then
  echo "Fixing src/components/people/FilterBar.tsx"
  sed -i '' 's/^[[:space:]]*}\s*from/import { } from/g' src/components/people/FilterBar.tsx 2>/dev/null || true
fi

# Fix navigation.tsx if it exists
if [ -f src/components/navigation.tsx ]; then
  echo "Fixing src/components/navigation.tsx"
  sed -i '' 's/^[[:space:]]*}\s*from/import { } from/g' src/components/navigation.tsx 2>/dev/null || true
fi

# Fix route.ts files
echo "Fixing route.ts files"
find src -name "route.ts" -exec sed -i '' 's/^[[:space:]]*}\s*from/import { } from/g' {} \; 2>/dev/null || true

# 4. Check for any remaining issues
echo -e "\n📋 Checking for remaining issues..."
node scripts/find-broken-imports.js

# 5. Try building
echo -e "\n🏗️ Attempting build..."
npm run build

echo -e "\n✨ Build fix complete!" 