#!/bin/bash
# Script to standardize dynamic imports across the codebase

echo "🔍 Standardizing dynamic imports..."

# Create output directory for results
mkdir -p .cursor/dynamic-imports

# Find all dynamic imports
grep -r --include="*.tsx" --include="*.ts" "dynamic(" src/ | cut -d':' -f1 | sort | uniq > .cursor/dynamic-imports/files-with-dynamic-imports.txt

# Count the total files with dynamic imports
TOTAL_FILES=$(cat .cursor/dynamic-imports/files-with-dynamic-imports.txt | wc -l)
echo "Found $TOTAL_FILES files with dynamic imports"

# Generate standardized dynamic import template
cat > .cursor/dynamic-imports/standard-template.txt << 'EOL'
// Standard dynamic import pattern
const ComponentName = dynamic(() => import('@/components/path-to-component'), {
  ssr: false, // Set to true for components that don't use browser APIs
  loading: () => <div className="min-h-[100px] animate-pulse bg-gray-100 rounded-md"></div>
});
EOL

echo -e "\n📋 Standard template created at .cursor/dynamic-imports/standard-template.txt"

# Generate a script to fix each file
echo "#!/bin/bash" > .cursor/dynamic-imports/fix-dynamic-imports.sh
echo "# Auto-generated script to fix dynamic imports" >> .cursor/dynamic-imports/fix-dynamic-imports.sh
echo "" >> .cursor/dynamic-imports/fix-dynamic-imports.sh

for file in $(cat .cursor/dynamic-imports/files-with-dynamic-imports.txt); do
  echo "echo \"Processing $file...\"" >> .cursor/dynamic-imports/fix-dynamic-imports.sh
  echo "# Manual review required for $file" >> .cursor/dynamic-imports/fix-dynamic-imports.sh
  echo "" >> .cursor/dynamic-imports/fix-dynamic-imports.sh
done

chmod +x .cursor/dynamic-imports/fix-dynamic-imports.sh

echo -e "\n✅ Generated template for standardizing dynamic imports"
echo "Review each file manually and apply the standard pattern" 