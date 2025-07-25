#!/bin/bash
# auto-fix.sh - Automatically fix common Cursor.ai issues

echo "🔧 CURSOR.AI AUTO-FIX"
echo "===================="

# Read health report
if [ ! -f ".cursor-health-report.json" ]; then
    echo "❌ No health report found. Run health-check.sh first!"
    exit 1
fi

HEALTH_SCORE=$(jq -r '.health_score' .cursor-health-report.json)
echo "Current health score: $HEALTH_SCORE/100"
echo ""

# Fix 1: Remove legacy .cursorrules
if [ -f ".cursorrules" ]; then
    echo "🔧 Fixing: Legacy .cursorrules"
    mv .cursorrules .cursorrules.backup.$(date +%Y%m%d)
    echo "   ✅ Moved to backup"
fi

# Fix 2: Remove invalid files from rules
find .cursor/rules -name "*.yml" -o -name "*.yaml" 2>/dev/null | while read file; do
    echo "🔧 Fixing: Invalid file $file"
    rm "$file"
    echo "   ✅ Removed"
done

# Fix 3: Fix MDC frontmatter
for mdc in .cursor/rules/*.mdc; do
    if [ -f "$mdc" ]; then
        NEEDS_FIX=false
        
        # Check each required field
        grep -q "^description:" "$mdc" || NEEDS_FIX=true
        grep -q "^globs:" "$mdc" || NEEDS_FIX=true
        grep -q "^alwaysApply:" "$mdc" || NEEDS_FIX=true
        
        if [ "$NEEDS_FIX" = true ]; then
            echo "🔧 Fixing: $(basename $mdc) frontmatter"
            
            # Create temp file with proper frontmatter
            cat > "$mdc.tmp" << FRONT
---
description: "$(basename $mdc .mdc) rules - auto-fixed"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
---

FRONT
            
            # Append existing content after frontmatter
            if grep -q "^---" "$mdc"; then
                sed '1,/^---$/d' "$mdc" | sed '1,/^---$/d' >> "$mdc.tmp"
            else
                cat "$mdc" >> "$mdc.tmp"
            fi
            
            mv "$mdc.tmp" "$mdc"
            echo "   ✅ Fixed frontmatter"
        fi
    fi
done

# Fix 4: Optimize MCP if needed
if [ -f ".cursor/mcp.json" ]; then
    TOOL_COUNT=$(grep -o '"id"' .cursor/mcp.json | wc -l)
    if [ $TOOL_COUNT -gt 10 ]; then
        echo "🔧 Fixing: MCP tool overload ($TOOL_COUNT > 10)"
        echo "   ⚠️  Manual review recommended for MCP optimization"
        echo "   📝 See scripts/optimize-mcp.js for automated optimization"
    fi
fi

# Re-run health check
echo ""
echo "🔄 Re-running health check..."
./scripts/cursor-monitoring/health-check.sh

NEW_SCORE=$(jq -r '.health_score' .cursor-health-report.json)
IMPROVEMENT=$((NEW_SCORE - HEALTH_SCORE))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "IMPROVEMENT: +$IMPROVEMENT points"
echo "NEW SCORE: $NEW_SCORE/100"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
