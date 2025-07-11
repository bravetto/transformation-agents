#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing all malformed import statements...\n');

// Find all TypeScript/TSX files with potential import issues
function findFilesWithImportIssues() {
  try {
    const command = "grep -r '^[[:space:]]*}[[:space:]]*from' --include='*.ts' --include='*.tsx' src/ | cut -d':' -f1 | sort | uniq";
    const result = execSync(command).toString().trim();
    return result.split('\n').filter(Boolean);
  } catch (error) {
    // If grep doesn't find anything, it returns non-zero exit code
    return [];
  }
}

const filesToFix = findFilesWithImportIssues();
console.log(`Found ${filesToFix.length} files with potential import issues`);

let filesFixed = 0;
let totalFixCount = 0;

filesToFix.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    let fileFixCount = 0;
    
    const fixedLines = lines.map(line => {
      const trimmed = line.trim();
      
      // Pattern 1: Line starts with } from
      if (trimmed.match(/^}\s*from\s*['"]/)) {
        modified = true;
        fileFixCount++;
        return line.replace(/^(\s*)}\s*from/, '$1import { } from');
      }
      
      // Pattern 2: Line starts with identifier followed by } from
      // e.g., "Something } from './path'"
      if (trimmed.match(/^[A-Za-z0-9_,\s]+}\s*from\s*['"]/)) {
        modified = true;
        fileFixCount++;
        return line.replace(/^(\s*)([A-Za-z0-9_,\s]+})\s*from/, '$1import { $2 from');
      }
      
      return line;
    });
    
    if (modified) {
      fs.writeFileSync(file, fixedLines.join('\n'));
      filesFixed++;
      totalFixCount += fileFixCount;
      console.log(`✅ Fixed ${file} (${fileFixCount} fixes)`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}: ${error.message}`);
  }
});

console.log(`\n🎉 Summary:`);
console.log(`   Files fixed: ${filesFixed}`);
console.log(`   Total fixes: ${totalFixCount}`); 