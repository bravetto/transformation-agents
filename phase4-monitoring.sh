#!/bin/bash
# phase4-monitoring.sh - Setup automated Cursor.ai health monitoring

set -e

echo "🔍 SETTING UP AUTOMATED MONITORING..."
echo "===================================="

# Create monitoring directory
mkdir -p scripts/cursor-monitoring

# Create the master health check script
cat > scripts/cursor-monitoring/health-check.sh << 'EOF'
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
EOF

chmod +x scripts/cursor-monitoring/health-check.sh

# Create automated fix script
cat > scripts/cursor-monitoring/auto-fix.sh << 'EOF'
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
EOF

chmod +x scripts/cursor-monitoring/auto-fix.sh

# Create GitHub Action for CI/CD monitoring
mkdir -p .github/workflows
cat > .github/workflows/cursor-health.yml << 'EOF'
name: Cursor.ai Health Check

on:
  push:
    paths:
      - '.cursor/**'
      - '.cursorrules'
      - 'docs/**'
  pull_request:
    paths:
      - '.cursor/**'
      - '.cursorrules'
      - 'docs/**'
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday

jobs:
  health-check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run Cursor.ai Health Check
      run: |
        chmod +x scripts/cursor-monitoring/health-check.sh
        ./scripts/cursor-monitoring/health-check.sh
      
    - name: Upload Health Report
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: cursor-health-report
        path: .cursor-health-report.json
    
    - name: Comment PR with Health Status
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const report = JSON.parse(fs.readFileSync('.cursor-health-report.json', 'utf8'));
          
          const comment = `## 🏥 Cursor.ai Health Check
          
          **Score**: ${report.health_score}/100 (${report.grade})
          **Status**: ${report.status}
          
          ${report.issues.length > 0 ? '### Issues Found:\n' + report.issues.map(i => `- ${i}`).join('\n') : '✅ No issues found!'}
          
          ${report.health_score < 80 ? '⚠️ **Action Required**: Run `npm run cursor:fix` to resolve issues automatically.' : ''}`;
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: comment
          });
    
    - name: Fail if Critical
      if: failure()
      run: |
        echo "❌ Cursor.ai health check failed! Score below 70/100"
        exit 1
EOF

# Add npm scripts for easy access
echo ""
echo "📝 Adding npm scripts..."

# Check if package.json exists and add scripts
if [ -f "package.json" ]; then
    # Create temp file with new scripts using Node.js
    node -e '
    const fs = require("fs");
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts["cursor:health"] = "./scripts/cursor-monitoring/health-check.sh";
    pkg.scripts["cursor:fix"] = "./scripts/cursor-monitoring/auto-fix.sh";
    pkg.scripts["cursor:emergency"] = "./cursor-emergency-fix.sh";
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
    '
    
    echo "✅ Added npm scripts:"
    echo "   - npm run cursor:health"
    echo "   - npm run cursor:fix"
    echo "   - npm run cursor:emergency"
fi

# Create monitoring dashboard
cat > cursor-monitoring-dashboard.md << 'EOF'
# 📊 Cursor.ai Monitoring Dashboard

## Quick Commands
```bash
# Check health
npm run cursor:health

# Auto-fix issues  
npm run cursor:fix

# Emergency fix (if system is critical)
npm run cursor:emergency
```

## Health Metrics

### Current Status
See `.cursor-health-report.json` for latest metrics

### Performance Indicators
- **Token Usage**: Target <10,000 tokens
- **Tool Count**: Target <10 MCP tools
- **Doc Size**: Target <5KB per file
- **Response Quality**: Target >95% accuracy

### Monitoring Schedule
- **Continuous**: GitHub Actions on every push
- **Weekly**: Full system health check
- **Monthly**: Performance review

## Alerts
Set up alerts when:
- Health score drops below 80
- Token usage exceeds 15,000
- Legacy .cursorrules detected
- Invalid file formats found

## Recovery Procedures
1. **Score 70-89**: Run `npm run cursor:fix`
2. **Score 50-69**: Run emergency fix + manual review
3. **Score <50**: Full system reset recommended
EOF

echo ""
echo "✅ MONITORING SYSTEM INSTALLED!"
echo "=============================="
echo ""
echo "🎯 Available Commands:"
echo "   npm run cursor:health - Check system health"
echo "   npm run cursor:fix - Auto-fix common issues"
echo "   npm run cursor:emergency - Emergency recovery"
echo ""
echo "📊 See cursor-monitoring-dashboard.md for full details"
echo ""
echo "🔄 GitHub Action created for CI/CD monitoring" 