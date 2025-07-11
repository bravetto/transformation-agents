#!/bin/bash
# Script to identify and help fix missing "use client" directives

echo "🔍 Finding components that need 'use client' directives..."

# Create output directory for results
mkdir -p .cursor/client-fixes

# Find components using React hooks or browser APIs
grep -r --include="*.tsx" "useState\|useEffect\|useRef\|useCallback\|useMemo\|onClick\|onChange\|window\.\|document\.\|localStorage" src/components/ | cut -d':' -f1 | sort | uniq > .cursor/client-fixes/client-components.txt

# Count the total client components
TOTAL_CLIENT=$(cat .cursor/client-fixes/client-components.txt | wc -l)
echo "Found $TOTAL_CLIENT client components"

# Find components that already have "use client"
grep -r --include="*.tsx" -l "use client" src/components/ | sort | uniq > .cursor/client-fixes/has-client-directive.txt

# Count components with directive
TOTAL_WITH_DIRECTIVE=$(cat .cursor/client-fixes/has-client-directive.txt | wc -l)
echo "Found $TOTAL_WITH_DIRECTIVE components with 'use client' directive"

# Find components with duplicate "use client" directives
grep -r --include="*.tsx" -A 1 "use client" src/components/ | grep -B 1 "use client" | grep -v -- "--" | cut -d':' -f1 | sort | uniq > .cursor/client-fixes/duplicate-directives.txt

# Count components with duplicate directives
TOTAL_DUPLICATES=$(cat .cursor/client-fixes/duplicate-directives.txt | wc -l)
echo "Found $TOTAL_DUPLICATES components with duplicate 'use client' directives"

# Find components that need directive
comm -23 .cursor/client-fixes/client-components.txt .cursor/client-fixes/has-client-directive.txt > .cursor/client-fixes/needs-client-directive.txt

# Count components needing directive
TOTAL_NEEDS_DIRECTIVE=$(cat .cursor/client-fixes/needs-client-directive.txt | wc -l)
echo "Found $TOTAL_NEEDS_DIRECTIVE components that need 'use client' directive"

# Generate a script to add "use client" to each file
echo "#!/bin/bash" > .cursor/client-fixes/add-client-directives.sh
echo "# Auto-generated script to add 'use client' directives" >> .cursor/client-fixes/add-client-directives.sh
echo "" >> .cursor/client-fixes/add-client-directives.sh

cat .cursor/client-fixes/needs-client-directive.txt | while read file; do
  echo "echo \"Adding 'use client' to $file\"" >> .cursor/client-fixes/add-client-directives.sh
  echo "sed -i '' '1s/^/\"use client\";\\n\\n/' \"$file\"" >> .cursor/client-fixes/add-client-directives.sh
  echo "" >> .cursor/client-fixes/add-client-directives.sh
done

# Generate a script to fix duplicate directives
echo "#!/bin/bash" > .cursor/client-fixes/fix-duplicate-directives.sh
echo "# Auto-generated script to fix duplicate 'use client' directives" >> .cursor/client-fixes/fix-duplicate-directives.sh
echo "" >> .cursor/client-fixes/fix-duplicate-directives.sh

cat .cursor/client-fixes/duplicate-directives.txt | while read file; do
  echo "echo \"Fixing duplicate 'use client' in $file\"" >> .cursor/client-fixes/fix-duplicate-directives.sh
  echo "sed -i '' '2s/\"use client\";//' \"$file\"" >> .cursor/client-fixes/fix-duplicate-directives.sh
  echo "" >> .cursor/client-fixes/fix-duplicate-directives.sh
done

chmod +x .cursor/client-fixes/add-client-directives.sh
chmod +x .cursor/client-fixes/fix-duplicate-directives.sh

echo "✅ Generated fix scripts:"
echo "   - .cursor/client-fixes/add-client-directives.sh"
echo "   - .cursor/client-fixes/fix-duplicate-directives.sh"
echo "⚠️  Review the list of files before running the fix scripts!" 