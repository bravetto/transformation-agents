#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Searching for files with duplicate imports...\n');

// Find all TypeScript/TSX files
const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*']
});

let filesWithDuplicates = 0;
const duplicateReport = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  // Track imports by module path
  const importMap = new Map();
  const duplicates = [];
  
  lines.forEach((line, index) => {
    // Match various import patterns
    const importMatch = line.match(/^import\s+(?:(?:\{[^}]*\})|(?:\*\s+as\s+\w+)|(?:\w+))\s+from\s+['"]([^'"]+)['"]/);
    
    if (importMatch) {
      const modulePath = importMatch[1];
      
      if (importMap.has(modulePath)) {
        duplicates.push({
          line: index + 1,
          text: line.trim(),
          firstOccurrence: importMap.get(modulePath).line
        });
      } else {
        importMap.set(modulePath, { line: index + 1, text: line.trim() });
      }
    }
  });
  
  if (duplicates.length > 0) {
    filesWithDuplicates++;
    duplicateReport.push({
      file,
      duplicates,
      importMap
    });
    
    console.log(`📄 ${file}`);
    duplicates.forEach(dup => {
      console.log(`   Line ${dup.line}: ${dup.text}`);
      console.log(`   ⚠️  Duplicate of line ${dup.firstOccurrence}`);
    });
    console.log('');
  }
});

console.log(`\n📊 Summary: Found ${filesWithDuplicates} files with duplicate imports`);

// Save report
fs.writeFileSync('duplicate-imports-report.json', JSON.stringify(duplicateReport, null, 2));
console.log('\n💾 Detailed report saved to: duplicate-imports-report.json'); 