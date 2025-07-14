# 🛡️ CASCADE PREVENTION SYSTEM - ABSOLUTE AUTHORITY

## ⚠️ ZERO TOLERANCE POLICY

This system has **ABSOLUTE AUTHORITY** over all import-related operations. Violation of these rules will result in **IMMEDIATE ROLLBACK** and **MANDATORY REVIEW**.

## 🚫 FORBIDDEN OPERATIONS (CAPITAL OFFENSES)

### NEVER PERMITTED UNDER ANY CIRCUMSTANCES:
- ❌ **Global regex on import statements** - CAPITAL OFFENSE
- ❌ **Sed operations on TypeScript files** - CAPITAL OFFENSE  
- ❌ **Bulk import modifications** - CAPITAL OFFENSE
- ❌ **Automated import fixing scripts** - CAPITAL OFFENSE
- ❌ **Mass search-and-replace on imports** - CAPITAL OFFENSE
- ❌ **"Emergency" bulk fixes** - CAPITAL OFFENSE
- ❌ **Grep-based import modifications** - CAPITAL OFFENSE
- ❌ **Find-exec operations on .ts/.tsx** - CAPITAL OFFENSE

### FORBIDDEN SCRIPT PATTERNS:
- Any script containing `fix-all-*`
- Any script containing `batch-*`
- Any script containing `bulk-*`
- Any script containing `mass-*`
- Any script containing `migrate-*`
- Any script with `sed.*\.tsx`
- Any script with `grep.*import.*-r`

## ✅ MANDATORY PROCEDURES (NO EXCEPTIONS)

### THE SACRED PROTOCOL:
1. **IDENTIFY** - Find the specific broken file via build error
2. **ISOLATE** - Open ONLY that one file in your editor
3. **REPAIR** - Fix the import syntax manually by hand
4. **VALIDATE** - Run `npm run build` to confirm fix
5. **COMMIT** - Commit only that single file with descriptive message
6. **REPEAT** - If more files need fixing, repeat from step 1

### REQUIRED COMMANDS AFTER ANY IMPORT CHANGE:
```bash
npm run type-check  # MANDATORY
npm run build       # MANDATORY
git add [single-file]
git commit -m "fix: manual import correction in [filename]"
```

## 🔍 CASCADE DETECTION TRIGGERS

### AUTOMATIC VIOLATION DETECTION:
- Any script that modifies >1 file = **FORBIDDEN**
- Any regex on import statements = **FORBIDDEN**
- Any sed operation on .ts/.tsx = **FORBIDDEN**
- Any bulk operation without validation = **FORBIDDEN**
- Any script bypassing build validation = **FORBIDDEN**

### EARLY WARNING INDICATORS:
- Multiple files with syntax errors
- Build failures across components
- Import blocks missing closing braces
- Malformed import statements

## ⚡ VIOLATION RESPONSE PROTOCOL

### IMMEDIATE ACTIONS REQUIRED:
1. **STOP ALL OPERATIONS** - Cease any ongoing modifications
2. **ROLLBACK IMMEDIATELY** - Revert all changes to last known good state
3. **AUDIT FULL CODEBASE** - Check for cascade spread
4. **REBUILD FROM CLEAN STATE** - Ensure no contamination remains
5. **REPORT INCIDENT** - Document what caused the violation

### RECOVERY PROCEDURE:
```bash
# 1. Immediate rollback
git reset --hard [last-good-commit]

# 2. Clean everything
rm -rf .next node_modules/.cache
npm install

# 3. Validate clean state
npm run build

# 4. Fix issues manually, one by one
# NO SHORTCUTS, NO BULK OPERATIONS
```

## 🏰 PROTECTION SYSTEMS

### PRE-COMMIT PROTECTION:
- Husky hooks scan for dangerous patterns
- TypeScript validation required
- Build validation required
- Single-file commit enforcement

### CI/CD PROTECTION:
- GitHub Actions scan for dangerous scripts
- Automated detection of bulk operations
- Build validation on every commit
- Cascade pattern detection

### DAILY MONITORING:
- Health check scans for dangerous files
- Protection system integrity verification
- Build status monitoring
- Developer compliance tracking

## 📚 DEVELOPER EDUCATION

### GOLDEN RULES FOR DEVELOPERS:
1. **ONE FILE AT A TIME** - Never modify multiple files simultaneously
2. **MANUAL FIXES ONLY** - No automated tools for import repairs
3. **ALWAYS VALIDATE** - Build must pass after every change
4. **NO SHORTCUTS** - Emergency situations require same safety protocols
5. **WHEN IN DOUBT, ASK** - Better to ask than cause a cascade

### SAFE IMPORT REPAIR EXAMPLE:
```bash
# ✅ CORRECT PROCEDURE
npm run build 2>&1 | grep "Error:"
# See: Error in src/components/navigation.tsx

code src/components/navigation.tsx
# Manually fix: import { Button, } from "@/ui"
# To:           import { Button } from "@/ui"

npm run build  # Validate fix
git add src/components/navigation.tsx
git commit -m "fix: remove trailing comma in navigation import"
```

## 🚨 EMERGENCY PROTOCOLS

### WHAT TO DO IN A CASCADE EVENT:
1. **DO NOT PANIC** - Cascades are recoverable
2. **DO NOT USE BULK FIXES** - This will make it worse
3. **FOLLOW THE SACRED PROTOCOL** - One file at a time
4. **VALIDATE EACH FIX** - Build must pass before proceeding
5. **DOCUMENT THE INCIDENT** - Learn from what caused it

### EMERGENCY CONTACTS:
- Senior Developer: Manual review required
- DevOps Team: Build system issues
- Project Lead: Cascade incident reporting

## 📊 SUCCESS METRICS

### ZERO TOLERANCE TARGETS:
- **Cascade Incidents**: 0 per month
- **Bulk Operations**: 0 per month  
- **Dangerous Scripts**: 0 in codebase
- **Build Failures from Imports**: 0 per week

### COMPLIANCE INDICATORS:
- 100% manual import fixes
- 100% build validation compliance
- 100% single-file commits for imports
- 100% developer training completion

## ⚖️ ENFORCEMENT

This system has **ABSOLUTE AUTHORITY** over all import-related operations. 

**REMEMBER**: The cascade failure was caused by shortcuts and bulk operations. **NEVER AGAIN.**

---

*"In manual precision, we trust. In bulk operations, we fall."* 