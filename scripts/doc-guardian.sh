#!/bin/bash
# doc-guardian.sh - Prevent documentation bloat

MAX_DOCS=5
MAX_SIZE_KB=5

echo "🛡️  Documentation Guardian Active"

# Count docs
DOC_COUNT=$(find docs -name "*.md" | wc -l)
if [ $DOC_COUNT -gt $MAX_DOCS ]; then
    echo "❌ Too many docs! ($DOC_COUNT > $MAX_DOCS)"
    exit 1
fi

# Check sizes
find docs -name "*.md" | while read file; do
    SIZE_KB=$(du -k "$file" | cut -f1)
    if [ $SIZE_KB -gt $MAX_SIZE_KB ]; then
        echo "❌ $file is too large! (${SIZE_KB}KB > ${MAX_SIZE_KB}KB)"
        exit 1
    fi
done

echo "✅ Documentation healthy!"
