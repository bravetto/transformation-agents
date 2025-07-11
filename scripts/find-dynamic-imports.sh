#!/bin/bash
# Script to find dynamic imports that need to be simplified

echo "🔍 Finding dynamic imports in the codebase..."

# Create output directory for results
mkdir -p .cursor/dynamic-imports

# Find all dynamic imports
grep -r --include="*.tsx" --include="*.ts" "dynamic(" src/ | cut -d':' -f1 | sort | uniq > .cursor/dynamic-imports/files-with-dynamic-imports.txt

# Count the total files with dynamic imports
TOTAL_FILES=$(cat .cursor/dynamic-imports/files-with-dynamic-imports.txt | wc -l)
echo "Found $TOTAL_FILES files with dynamic imports"

# Extract dynamic import patterns
echo -e "\n📊 Sample dynamic imports:"
for file in $(head -n 5 .cursor/dynamic-imports/files-with-dynamic-imports.txt); do
  echo -e "\n$file:"
  grep -A 3 "dynamic(" "$file" | head -n 4
done

echo -e "\n✅ Check complete"
echo "Dynamic import files listed in .cursor/dynamic-imports/files-with-dynamic-imports.txt" 