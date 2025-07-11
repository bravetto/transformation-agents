#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Create backup directory
const backupDir = `.backup-${Date.now()}`;
fs.mkdirSync(backupDir, { recursive: true });
console.log(`📁 Creating backup in: ${backupDir}\n`);

console.log('🔧 Fixing duplicate imports (with backup)...\n');

const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*']
});

let filesFixed = 0;
const fixReport = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  // Create more sophisticated import tracking
  const importGroups = new Map(); // Group imports by type
  const seenExactImports = new Set(); // Track exact import lines
  const newLines = [];
  let modified = false;
  
  lines.forEach((line, index) => {
    // Skip if we've seen this exact line before (handles exact duplicates)
    if (line.trim().startsWith('import') && seenExactImports.has(line.trim())) {
      modified = true;
      fixReport.push({
        file,
        line: index + 1,
        removed: line.trim(),
        reason: 'Exact duplicate'
      });
      return; // Skip this line
    }
    
    if (line.trim().startsWith('import')) {
      seenExactImports.add(line.trim());
    }
    
    newLines.push(line);
  });
  
  if (modified) {
    // Backup original file
    const backupPath = path.join(backupDir, file);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.copyFileSync(file, backupPath);
    
    // Write fixed content
    fs.writeFileSync(file, newLines.join('\n'));
    filesFixed++;
    
    console.log(`✅ Fixed: ${file}`);
  }
});

// Save fix report
fs.writeFileSync('fix-report.json', JSON.stringify(fixReport, null, 2));

console.log(`\n🎉 Summary:`);
console.log(`   Files fixed: ${filesFixed}`);
console.log(`   Backup created in: ${backupDir}`);
console.log(`   Fix report: fix-report.json`);
console.log(`\n💡 To restore: cp -r ${backupDir}/src/* src/`); 