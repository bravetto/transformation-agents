#!/bin/bash
# 🔍 SIMPLE AI VALIDATION
# Pragmatic validation following KISS principles
# NO over-optimization, NO complex monitoring
# Human-controlled, enterprise-grade security

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo "🔍 SIMPLE AI VALIDATION"
echo "======================="
echo "Pragmatic checks for JAHmere Webb Freedom Portal"
echo ""

# Simple validation checks - NO over-optimization
VALIDATION_SCORE=0
TOTAL_CHECKS=5

# 1. TypeScript Check
echo "1. TypeScript Validation..."
if npm run type-check > /dev/null 2>&1; then
    log_success "TypeScript validation passed"
    ((VALIDATION_SCORE++))
else
    log_error "TypeScript validation failed"
fi

# 2. Build Check
echo "2. Build Validation..."
if npm run build > /dev/null 2>&1; then
    log_success "Build completed successfully"
    ((VALIDATION_SCORE++))
else
    log_error "Build failed"
fi

# 3. Basic Security Check (Simple)
echo "3. Basic Security Check..."
SECURITY_ISSUES=0

# Check for obvious security anti-patterns
if grep -r "eval(" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
    log_warning "Found eval() usage - security risk"
    ((SECURITY_ISSUES++))
fi

if grep -r "innerHTML.*=" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
    log_warning "Found innerHTML usage - potential XSS risk"
    ((SECURITY_ISSUES++))
fi

if [ $SECURITY_ISSUES -eq 0 ]; then
    log_success "Basic security check passed"
    ((VALIDATION_SCORE++))
else
    log_warning "Security issues found - human review required"
fi

# 4. Mission Context Check (Simple)
echo "4. Mission Context Check..."
MISSION_FILES=0

# Check for mission context in key files
if find src/app -name "*.tsx" -exec grep -l "july\|freedom\|jahmere\|divine" {} \; | head -3 > /dev/null 2>&1; then
    MISSION_FILES=1
fi

if [ $MISSION_FILES -eq 1 ]; then
    log_success "Mission context found in components"
    ((VALIDATION_SCORE++))
else
    log_warning "Mission context could be strengthened"
fi

# 5. Package Dependencies Check
echo "5. Dependencies Check..."
if [ -f "package-lock.json" ]; then
    log_success "Package lock file present"
    ((VALIDATION_SCORE++))
else
    log_error "Package lock file missing - run npm install"
fi

# Calculate simple score
PERCENTAGE=$((VALIDATION_SCORE * 100 / TOTAL_CHECKS))

echo ""
echo "📊 VALIDATION RESULTS"
echo "===================="
echo "Score: $VALIDATION_SCORE/$TOTAL_CHECKS ($PERCENTAGE%)"

if [ $PERCENTAGE -ge 80 ]; then
    log_success "VALIDATION PASSED - Ready for human review"
    echo "Next step: Human validation and deployment approval"
elif [ $PERCENTAGE -ge 60 ]; then
    log_warning "VALIDATION PARTIAL - Address issues before deployment"
    echo "Next step: Fix issues and re-run validation"
else
    log_error "VALIDATION FAILED - Significant issues require attention"
    echo "Next step: Address critical issues before proceeding"
fi

echo ""
echo "🎯 HUMAN CHECKPOINTS REQUIRED:"
echo "- Code review by human developer"
echo "- Manual testing of new features"
echo "- Security review for sensitive changes"
echo "- Performance validation if needed"
echo ""
echo "Remember: AI suggests, humans decide. Keep it simple. 🙏"

exit 0 