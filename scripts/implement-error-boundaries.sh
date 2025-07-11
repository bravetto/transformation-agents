#!/bin/bash
# Script to help implement error boundaries for components

echo "🔍 Implementing error boundaries for components..."

# Create output directory for results
mkdir -p .cursor/error-boundaries/templates

# Create a template for implementing error boundaries
cat > .cursor/error-boundaries/templates/component-template.txt << 'EOL'
// Original component code...

// Export with divine error boundary for production safety
export default withDivineErrorBoundary(ComponentName, {
  componentName: "ComponentName",
  role: "guardian" // Choose appropriate role: lightworker, messenger, witness, guardian
});
EOL

# Create a template for implementing error boundaries with named exports
cat > .cursor/error-boundaries/templates/named-export-template.txt << 'EOL'
// Original component code...

// Wrap with divine error boundary
const SafeComponentName = withDivineErrorBoundary(ComponentName, {
  componentName: "ComponentName",
  role: "guardian" // Choose appropriate role: lightworker, messenger, witness, guardian
});

// Export the safe version
export { SafeComponentName as ComponentName };
EOL

echo -e "\n📋 Templates created:"
echo "- Component template: .cursor/error-boundaries/templates/component-template.txt"
echo "- Named export template: .cursor/error-boundaries/templates/named-export-template.txt"

# Generate a script to implement error boundaries
echo "#!/bin/bash" > .cursor/error-boundaries/implement-error-boundaries.sh
echo "# Auto-generated script to implement error boundaries" >> .cursor/error-boundaries/implement-error-boundaries.sh
echo "" >> .cursor/error-boundaries/implement-error-boundaries.sh

# Skip test files
grep -v "__tests__" .cursor/error-boundaries/needs-error-boundary.txt > .cursor/error-boundaries/needs-error-boundary-no-tests.txt

# Count components needing error boundaries (excluding tests)
TOTAL_NEEDS_BOUNDARY=$(cat .cursor/error-boundaries/needs-error-boundary-no-tests.txt | wc -l)
echo "Found $TOTAL_NEEDS_BOUNDARY components that need error boundaries (excluding tests)"

# Process each file
cat .cursor/error-boundaries/needs-error-boundary-no-tests.txt | while read file; do
  # Extract component name from file path
  component_name=$(basename "$file" .tsx)
  
  # Convert to PascalCase if needed
  pascal_case=$(echo "$component_name" | sed -E 's/(^|-)([a-z])/\U\2/g')
  
  echo "echo \"Implementing error boundary for $pascal_case in $file\"" >> .cursor/error-boundaries/implement-error-boundaries.sh
  echo "# Manual implementation required" >> .cursor/error-boundaries/implement-error-boundaries.sh
  echo "" >> .cursor/error-boundaries/implement-error-boundaries.sh
done

chmod +x .cursor/error-boundaries/implement-error-boundaries.sh

echo -e "\n✅ Generated implementation script"
echo "Review and implement error boundaries using the templates provided" 