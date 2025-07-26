#!/bin/bash
echo "🔧 SYSTEMATIC ERROR BOUNDARY FIX - AI ALIGNMENT PROTOCOL"

# Pattern 1: { componentName: "X", id: "Y" } -> "X"
find src -name "*.tsx" -exec sed -i '' 's/withErrorBoundary(\([^,]*\), {[[:space:]]*componentName: "\([^"]*\)",[[:space:]]*id: "[^"]*",[[:space:]]*});/withErrorBoundary(\1, "\2");/g' {} \;

# Pattern 2: { componentName: "X", role: "Y" } -> "X"  
find src -name "*.tsx" -exec sed -i '' 's/withErrorBoundary(\([^,]*\), {[[:space:]]*componentName: "\([^"]*\)",[[:space:]]*role: "[^"]*",[[:space:]]*});/withErrorBoundary(\1, "\2");/g' {} \;

# Pattern 3: { componentName: "X", fallback: <div>...</div> } -> "X"
find src -name "*.tsx" -exec sed -i '' 's/withErrorBoundary(\([^,]*\), {[[:space:]]*componentName: "\([^"]*\)",[[:space:]]*fallback: [^}]*});/withErrorBoundary(\1, "\2");/g' {} \;

echo "✅ Batch fix completed"
