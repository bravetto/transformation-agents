#!/bin/bash
# cursor-health-check.sh - Comprehensive Cursor.ai health monitoring

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🏥 CURSOR.AI HEALTH CHECK"
echo "========================="
echo "Timestamp: $(date)"
echo ""

# Initialize health score
HEALTH_SCORE=100
ISSUES=()

# Check 1: Legacy .cursorrules detection
echo -n "Checking for legacy .cursorrules... "
if [ -f ".cursorrules" ]; then
    echo -e "${RED}FOUND${NC}"
    HEALTH_SCORE=$((HEALTH_SCORE - 40))
    ISSUES+=("Legacy .cursorrules causing 40% performance degradation")
else
    echo -e "${GREEN}CLEAN${NC}"
fi

# Check 2: MDC file validation
echo -n "Validating MDC files... "
MDC_ERRORS=0
for mdc_file in .cursor/rules/*.mdc; do
    if [ -f "$mdc_file" ]; then
        # Check for required frontmatter fields
        if ! grep -q "^description:" "$mdc_file"; then
            MDC_ERRORS=$((MDC_ERRORS + 1))
            ISSUES+=("Missing description in $(basename $mdc_file)")
        fi
        if ! grep -q "^globs:" "$mdc_file"; then
            MDC_ERRORS=$((MDC_ERRORS + 1))
            ISSUES+=("Missing globs in $(basename $mdc_file)")
        fi
        if ! grep -q "^alwaysApply:" "$mdc_file"; then
            MDC_ERRORS=$((MDC_ERRORS + 1))
            ISSUES+=("Missing alwaysApply in $(basename $mdc_file)")
        fi
    fi
done

if [ $MDC_ERRORS -eq 0 ]; then
    echo -e "${GREEN}VALID${NC}"
else
    echo -e "${RED}$MDC_ERRORS ERRORS${NC}"
    HEALTH_SCORE=$((HEALTH_SCORE - MDC_ERRORS * 5))
fi

# Check 3: Wrong file formats in rules directory
echo -n "Checking for invalid file formats... "
INVALID_FILES=$(find .cursor/rules -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)
if [ $INVALID_FILES -eq 0 ]; then
    echo -e "${GREEN}CLEAN${NC}"
else
    echo -e "${RED}$INVALID_FILES FOUND${NC}"
    HEALTH_SCORE=$((HEALTH_SCORE - 15))
    ISSUES+=("$INVALID_FILES YAML files in rules directory")
fi

# Check 4: MCP tool count
echo -n "Checking MCP tool count... "
if [ -f ".cursor/mcp.json" ]; then
    # Count total active tools (simplified check)
    TOOL_COUNT=$(grep -o '"id"' .cursor/mcp.json | wc -l)
    if [ $TOOL_COUNT -le 10 ]; then
        echo -e "${GREEN}$TOOL_COUNT tools (optimal)${NC}"
    else
        echo -e "${YELLOW}$TOOL_COUNT tools (>10 recommended)${NC}"
        HEALTH_SCORE=$((HEALTH_SCORE - (TOOL_COUNT - 10) * 2))
        ISSUES+=("MCP tools: $TOOL_COUNT (optimal is <10)")
    fi
else
    echo -e "${YELLOW}No MCP config${NC}"
fi

# Check 5: Documentation size
echo -n "Checking documentation health... "
DOC_ISSUES=0
find docs -name "*.md" 2>/dev/null | while read doc; do
    SIZE_KB=$(du -k "$doc" | cut -f1)
    if [ $SIZE_KB -gt 5 ]; then
        DOC_ISSUES=$((DOC_ISSUES + 1))
        ISSUES+=("$(basename $doc) is ${SIZE_KB}KB (>5KB)")
    fi
done

if [ $DOC_ISSUES -eq 0 ]; then
    echo -e "${GREEN}OPTIMAL${NC}"
else
    echo -e "${YELLOW}$DOC_ISSUES oversized${NC}"
    HEALTH_SCORE=$((HEALTH_SCORE - DOC_ISSUES * 2))
fi

# Check 6: Token usage estimate
echo -n "Estimating token usage... "
TOTAL_TOKENS=0

# Count .cursorrules tokens (if exists)
if [ -f ".cursorrules" ]; then
    CURSORRULES_TOKENS=$(wc -w < .cursorrules)
    TOTAL_TOKENS=$((TOTAL_TOKENS + CURSORRULES_TOKENS * 2))
fi

# Count MDC tokens
for mdc in .cursor/rules/*.mdc; do
    if [ -f "$mdc" ]; then
        MDC_TOKENS=$(wc -w < "$mdc")
        TOTAL_TOKENS=$((TOTAL_TOKENS + MDC_TOKENS))
    fi
done

if [ $TOTAL_TOKENS -lt 10000 ]; then
    echo -e "${GREEN}~$TOTAL_TOKENS tokens${NC}"
elif [ $TOTAL_TOKENS -lt 20000 ]; then
    echo -e "${YELLOW}~$TOTAL_TOKENS tokens${NC}"
else
    echo -e "${RED}~$TOTAL_TOKENS tokens (excessive)${NC}"
    HEALTH_SCORE=$((HEALTH_SCORE - 10))
    ISSUES+=("Token usage: ~$TOTAL_TOKENS (excessive)")
fi

# Calculate final health grade
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "OVERALL HEALTH SCORE: $HEALTH_SCORE/100"

if [ $HEALTH_SCORE -ge 90 ]; then
    GRADE="${GREEN}A${NC}"
    STATUS="EXCELLENT"
elif [ $HEALTH_SCORE -ge 80 ]; then
    GRADE="${GREEN}B${NC}"
    STATUS="GOOD"
elif [ $HEALTH_SCORE -ge 70 ]; then
    GRADE="${YELLOW}C${NC}"
    STATUS="NEEDS ATTENTION"
elif [ $HEALTH_SCORE -ge 60 ]; then
    GRADE="${YELLOW}D${NC}"
    STATUS="POOR"
else
    GRADE="${RED}F${NC}"
    STATUS="CRITICAL"
fi

echo -e "GRADE: $GRADE ($STATUS)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Report issues
if [ ${#ISSUES[@]} -gt 0 ]; then
    echo ""
    echo "🚨 ISSUES FOUND:"
    for issue in "${ISSUES[@]}"; do
        echo "  - $issue"
    done
    echo ""
    echo "💡 Run cursor-fix.sh to automatically resolve these issues"
else
    echo ""
    echo "✅ No issues found! Cursor.ai is operating at peak divine performance."
fi

# Generate JSON report for automation
cat > .cursor-health-report.json << JSON
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "health_score": $HEALTH_SCORE,
  "grade": "$(echo $GRADE | sed 's/\x1b\[[0-9;]*m//g')",
  "status": "$STATUS",
  "issues": $(printf '%s\n' "${ISSUES[@]}" | jq -R . | jq -s .),
  "metrics": {
    "legacy_cursorrules": $([ -f ".cursorrules" ] && echo "true" || echo "false"),
    "mdc_errors": $MDC_ERRORS,
    "invalid_files": $INVALID_FILES,
    "tool_count": ${TOOL_COUNT:-0},
    "token_estimate": $TOTAL_TOKENS
  }
}
JSON

exit $([ $HEALTH_SCORE -lt 70 ] && echo 1 || echo 0)
