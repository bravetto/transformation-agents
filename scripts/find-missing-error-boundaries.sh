#!/bin/bash
# Script to find components that need error boundaries

echo "🔍 Finding components that need error boundaries..."

# Create output directory for results
mkdir -p .cursor/error-boundaries

# Find all component files
find src/components -name "*.tsx" | sort > .cursor/error-boundaries/all-components.txt

# Count the total component files
TOTAL_COMPONENTS=$(cat .cursor/error-boundaries/all-components.txt | wc -l)
echo "Found $TOTAL_COMPONENTS component files"

# Find components that already have error boundaries
grep -r --include="*.tsx" "withDivineErrorBoundary\|withErrorBoundary\|ErrorBoundary" src/components/ | cut -d':' -f1 | sort | uniq > .cursor/error-boundaries/has-error-boundary.txt

# Count components with error boundaries
TOTAL_WITH_BOUNDARY=$(cat .cursor/error-boundaries/has-error-boundary.txt | wc -l)
echo "Found $TOTAL_WITH_BOUNDARY components with error boundaries"

# Find components that need error boundaries
comm -23 .cursor/error-boundaries/all-components.txt .cursor/error-boundaries/has-error-boundary.txt > .cursor/error-boundaries/needs-error-boundary.txt

# Count components needing error boundaries
TOTAL_NEEDS_BOUNDARY=$(cat .cursor/error-boundaries/needs-error-boundary.txt | wc -l)
echo "Found $TOTAL_NEEDS_BOUNDARY components that need error boundaries"

# Generate a script to add error boundaries to each file
echo "#!/bin/bash" > .cursor/error-boundaries/add-error-boundaries.sh
echo "# Auto-generated script to add error boundaries" >> .cursor/error-boundaries/add-error-boundaries.sh
echo "" >> .cursor/error-boundaries/add-error-boundaries.sh

cat .cursor/error-boundaries/needs-error-boundary.txt | while read file; do
  echo "echo \"Adding error boundary to $file\"" >> .cursor/error-boundaries/add-error-boundaries.sh
  echo "# Manual review required for $file" >> .cursor/error-boundaries/add-error-boundaries.sh
  echo "" >> .cursor/error-boundaries/add-error-boundaries.sh
done

chmod +x .cursor/error-boundaries/add-error-boundaries.sh

echo -e "\n✅ Generated list of components needing error boundaries"
echo "Components that need error boundaries are listed in .cursor/error-boundaries/needs-error-boundary.txt" 