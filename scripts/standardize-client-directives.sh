#!/bin/bash
# Script to standardize "use client" directives to use double quotes

echo "🔍 Standardizing 'use client' directives to use double quotes..."

# Find components with single-quoted 'use client'
grep -r --include="*.tsx" "'use client'" src/components/ | cut -d':' -f1 | sort | uniq > .cursor/client-fixes/single-quote-directives.txt

# Count components with single quotes
TOTAL_SINGLE_QUOTES=$(cat .cursor/client-fixes/single-quote-directives.txt | wc -l)
echo "Found $TOTAL_SINGLE_QUOTES components with single-quoted 'use client'"

# Generate a script to standardize directives
echo "#!/bin/bash" > .cursor/client-fixes/standardize-directives.sh
echo "# Auto-generated script to standardize 'use client' directives" >> .cursor/client-fixes/standardize-directives.sh
echo "" >> .cursor/client-fixes/standardize-directives.sh

cat .cursor/client-fixes/single-quote-directives.txt | while read file; do
  echo "echo \"Standardizing 'use client' in $file\"" >> .cursor/client-fixes/standardize-directives.sh
  echo "sed -i '' \"s/'use client'/\\\"use client\\\"/\" \"$file\"" >> .cursor/client-fixes/standardize-directives.sh
  echo "" >> .cursor/client-fixes/standardize-directives.sh
done

chmod +x .cursor/client-fixes/standardize-directives.sh

echo "✅ Generated standardization script at .cursor/client-fixes/standardize-directives.sh"
echo "⚠️  Review the list of files before running the script!" 