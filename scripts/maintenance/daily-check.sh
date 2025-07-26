#!/bin/bash
# Daily validation script for transformation-agents project

echo "🔍 Transformation Agents Daily Health Check"
echo "=========================================="

# Check for build errors
echo "📦 Checking build..."
npm run build 2>&1 | grep -E "(error|Error|ERROR)" || echo "✅ Build clean"

# Find components missing "use client"
echo -e "\n🔍 Checking for missing 'use client' directives..."
# Find components using React hooks or browser APIs
grep -r --include="*.tsx" "useState\|useEffect\|useRef\|useCallback\|useMemo\|onClick\|onChange\|window\.\|document\.\|localStorage" src/components/ | cut -d':' -f1 | sort | uniq > .cursor/client-fixes/client-components.txt

# Find components that already have "use client"
grep -r --include="*.tsx" -l "use client" src/components/ | sort | uniq > .cursor/client-fixes/has-client-directive.txt

# Find components that need directive
comm -23 .cursor/client-fixes/client-components.txt .cursor/client-fixes/has-client-directive.txt > .cursor/client-fixes/needs-client-directive.txt

# Count components needing directive
TOTAL_NEEDS_DIRECTIVE=$(cat .cursor/client-fixes/needs-client-directive.txt | wc -l)
echo "⚠️  $TOTAL_NEEDS_DIRECTIVE components may need 'use client'"

# Check for TypeScript errors
echo -e "\n📝 Checking TypeScript..."
npx tsc --noEmit 2>&1 | grep -E "error TS" | wc -l | xargs -I {} echo "⚠️  {} TypeScript errors found"

# Large file check
echo -e "\n📊 Large components (>500 lines):"
find src/components -name "*.tsx" -exec wc -l {} \; | awk '$1 > 500 {print $2 ": " $1 " lines"}'

echo -e "\n✅ Check complete" 