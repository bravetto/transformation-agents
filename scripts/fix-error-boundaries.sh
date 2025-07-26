#!/bin/bash

# Fix withErrorBoundary signature mismatch across all components
# Converts: withErrorBoundary(Component, {componentName: "X", id: "Y"})
# To: withErrorBoundary(Component, "X")

echo "🔧 FIXING WITHERROR BOUNDARY SIGNATURE MISMATCH"
echo "================================================"

# Count files before fix
BEFORE_COUNT=$(find src -name "*.tsx" -exec grep -l "withErrorBoundary.*{" {} \; | wc -l)
echo "Files to fix: $BEFORE_COUNT"

# Apply the fix using sed
find src -name "*.tsx" -exec sed -i '' 's/withErrorBoundary(\([^,]*\), {[[:space:]]*componentName: "\([^"]*\)"[^}]*});/withErrorBoundary(\1, "\2");/g' {} \;

# Count files after fix
AFTER_COUNT=$(find src -name "*.tsx" -exec grep -l "withErrorBoundary.*{" {} \; | wc -l)
echo "Files remaining: $AFTER_COUNT"

# Show specific fixes applied
echo ""
echo "✅ FIXES APPLIED:"
echo "=================="

# Find all withErrorBoundary usages now (should be clean)
grep -r "withErrorBoundary(" src/ --include="*.tsx" | head -10

echo ""
echo "🎯 VALIDATION:"
echo "=============="
echo "TypeScript check:"
npm run type-check 2>&1 | grep -c "error TS" || echo "0 errors"

echo ""
echo "Fast Refresh test - start dev server and watch for errors:"
echo "npm run dev" 