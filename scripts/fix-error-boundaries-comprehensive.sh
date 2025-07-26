#!/bin/bash

# Comprehensive fix for withErrorBoundary signature mismatch
# Handles both single-line and multi-line patterns

echo "🔧 COMPREHENSIVE WITHERROR BOUNDARY FIX"
echo "========================================"

# Count files before fix
BEFORE_COUNT=$(find src -name "*.tsx" -exec grep -l "withErrorBoundary.*{" {} \; | wc -l)
echo "Files to fix: $BEFORE_COUNT"

# List the problematic files for tracking
echo ""
echo "Files with incorrect patterns:"
find src -name "*.tsx" -exec grep -l "withErrorBoundary.*{" {} \;

echo ""
echo "Applying fixes..."

# Use perl for multiline pattern matching and replacement
find src -name "*.tsx" -exec perl -i -pe '
  # Handle multiline patterns
  BEGIN { undef $/; }
  s/withErrorBoundary\(([^,]+),\s*\{\s*componentName:\s*"([^"]+)"[^}]*\}\s*\)/withErrorBoundary($1, "$2")/gs;
' {} \;

# Count files after fix
AFTER_COUNT=$(find src -name "*.tsx" -exec grep -l "withErrorBoundary.*{" {} \; | wc -l)
echo ""
echo "Files remaining with issues: $AFTER_COUNT"

# Show some examples of fixed patterns
echo ""
echo "✅ SAMPLE FIXED PATTERNS:"
echo "========================="
grep -r "withErrorBoundary(" src/ --include="*.tsx" | head -5

echo ""
echo "🎯 FINAL VALIDATION:"
echo "===================="
echo "TypeScript errors:"
npm run type-check 2>&1 | grep -c "error TS" || echo "0 errors"

echo ""
echo "Ready for Fast Refresh test: npm run dev" 