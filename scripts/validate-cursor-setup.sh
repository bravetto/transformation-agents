#!/bin/bash

# 🚀 Cursor.ai Setup Validation Script
# Verifies the Documentation Revolution implementation

echo "🧠 CURSOR.AI REVOLUTION - SETUP VALIDATION"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0

# Function to check if file exists and has content
check_file() {
    local file_path=$1
    local description=$2
    local min_lines=${3:-10}
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [[ -f "$file_path" ]]; then
        local line_count=$(wc -l < "$file_path")
        if [[ $line_count -gt $min_lines ]]; then
            echo -e "${GREEN}✅ $description${NC} ($line_count lines)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            echo -e "${YELLOW}⚠️  $description exists but seems incomplete${NC} ($line_count lines)"
        fi
    else
        echo -e "${RED}❌ $description${NC}"
    fi
}

# Function to check directory exists
check_directory() {
    local dir_path=$1
    local description=$2
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [[ -d "$dir_path" ]]; then
        echo -e "${GREEN}✅ $description${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ $description${NC}"
    fi
}

echo ""
echo "📁 CHECKING DOCUMENTATION STRUCTURE..."
echo "--------------------------------------"

# Check documentation files
check_file "docs/CURSOR_AI_REVOLUTION.md" "Cursor.ai Revolution Guide" 50
check_file "docs/TECH_STACK.md" "Tech Stack Documentation" 50  
check_file "docs/ARCHITECTURE.md" "Architecture Documentation" 20
check_file "docs/DEVELOPMENT.md" "Development Guide" 50
check_file "README.md" "Project README" 15

echo ""
echo "🧠 CHECKING CURSOR.AI CONFIGURATION..."
echo "---------------------------------------"

# Check .cursor directory structure
check_directory ".cursor" ".cursor directory"
check_directory ".cursor/rules" ".cursor/rules directory"

# Check rule files
check_file ".cursor/rules/main.mdc" "Main AI Rules" 30
check_file ".cursor/rules/frontend.mdc" "Frontend Rules" 30
check_file ".cursor/rules/backend.mdc" "Backend Rules" 30
check_file ".cursor/rules/testing.mdc" "Testing Rules" 30
check_file ".cursor/rules/security.mdc" "Security Rules" 30

echo ""
echo "⚙️  CHECKING TECHNICAL CONFIGURATION..."
echo "---------------------------------------"

# Check package.json for required dependencies
if [[ -f "package.json" ]]; then
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if grep -q "next" package.json && grep -q "typescript" package.json; then
        echo -e "${GREEN}✅ Package.json with Next.js + TypeScript${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${YELLOW}⚠️  Package.json exists but missing key dependencies${NC}"
    fi
else
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo -e "${RED}❌ Package.json${NC}"
fi

# Check TypeScript config
check_file "tsconfig.json" "TypeScript Configuration" 5

# Check Tailwind config
if [[ -f "tailwind.config.ts" ]] || [[ -f "tailwind.config.js" ]]; then
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo -e "${GREEN}✅ Tailwind CSS Configuration${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo -e "${RED}❌ Tailwind CSS Configuration${NC}"
fi

echo ""
echo "📊 VALIDATING CONTENT QUALITY..."
echo "--------------------------------"

# Check for common documentation issues
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if find docs/ -name "*.md" -exec grep -l "TODO\|FIXME\|TBD\|XXX" {} \; 2>/dev/null | grep -q .; then
    echo -e "${YELLOW}⚠️  Found TODO/FIXME items in documentation${NC}"
else
    echo -e "${GREEN}✅ No TODO/FIXME items found${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
fi

# Check documentation file count (should be lean)
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
doc_count=$(find . -name "*.md" -not -path "./node_modules/*" | wc -l)
if [[ $doc_count -le 10 ]]; then
    echo -e "${GREEN}✅ Documentation count optimal${NC} ($doc_count files)"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️  Too many documentation files${NC} ($doc_count files - aim for ≤10)"
fi

# Check for .cursorrules file (legacy - should be migrated)
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if [[ -f ".cursorrules" ]]; then
    echo -e "${YELLOW}⚠️  Legacy .cursorrules file found - consider migrating to .cursor/rules/${NC}"
else
    echo -e "${GREEN}✅ No legacy .cursorrules file${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
fi

echo ""
echo "🎯 CHECKING JAHmere WEBB SPECIFIC CONTENT..."
echo "--------------------------------------------"

# Check for JAHmere Webb specific content
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if grep -r "JAHmere Webb" docs/ >/dev/null 2>&1; then
    echo -e "${GREEN}✅ JAHmere Webb context found in documentation${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️  JAHmere Webb context missing in documentation${NC}"
fi

# Check for July 28th court date references
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if grep -r "July.*28" docs/ >/dev/null 2>&1 || grep -r "2025.*court" docs/ >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Court date context found${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️  Court date context missing${NC}"
fi

echo ""
echo "================================================"
echo "🏆 VALIDATION RESULTS"
echo "================================================"

# Calculate score
SCORE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC} / $TOTAL_CHECKS checks"
echo -e "Score: ${BLUE}$SCORE%${NC}"

if [[ $SCORE -ge 95 ]]; then
    echo -e "${GREEN}🎉 EXCELLENT! Your Cursor.ai setup is revolutionary!${NC}"
    echo "✨ You're ready for 95%+ AI code generation accuracy"
elif [[ $SCORE -ge 80 ]]; then
    echo -e "${YELLOW}🚀 GOOD! Almost there - fix remaining issues for optimal AI performance${NC}"
else
    echo -e "${RED}⚠️  NEEDS WORK: Complete the missing setup steps for maximum AI productivity${NC}"
fi

echo ""
echo "📖 NEXT STEPS:"
echo "- Read docs/CURSOR_AI_REVOLUTION.md for complete implementation guide"
echo "- Configure Cursor.ai settings (YOLO mode, documentation references)"
echo "- Test AI generation with project-specific prompts"
echo ""
echo "🌟 Join the revolution at: https://july28freedom.vercel.app"
echo "" 