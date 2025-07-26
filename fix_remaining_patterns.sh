#!/bin/bash
echo "🎯 TARGETED FIXES FOR REMAINING PATTERNS"

# Fix multi-line patterns that sed missed
find src -name "*.tsx" -type f -exec perl -i -pe '
  # Pattern for multi-line object syntax
  s/withErrorBoundary\(([^,]+),\s*\{\s*componentName:\s*"([^"]+)",\s*(?:id|role):\s*"[^"]+",?\s*\}\);/withErrorBoundary($1, "$2");/gs;
  
  # Pattern for fallback syntax
  s/withErrorBoundary\(([^,]+),\s*\{\s*componentName:\s*"([^"]+)",\s*fallback:\s*[^}]+\}\);/withErrorBoundary($1, "$2");/gs;
' {} \;

echo "✅ Targeted fixes completed"
