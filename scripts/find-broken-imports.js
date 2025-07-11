#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Searching for broken import statements...\n');

// Find all TypeScript/TSX files with potential import issues
function findFilesWithImportIssues() {
  try {
    // Look for lines that have } from but don't start with import or export
    const command = "grep -r '^[[:space:]]*[^import^export].*}[[:space:]]*from' --include='*.ts' --include='*.tsx' src/ | grep -v '//'";
    const result = execSync(command).toString().trim();
    
    if (!result) return [];
    
    // Parse the results into a structured format
    return result.split('\n').map(line => {
      const [filePath, content] = line.split(':', 2);
      return {
        file: filePath,
        content: content.trim()
      };
    });
  } catch (error) {
    // If grep doesn't find anything, it returns non-zero exit code
    return [];
  }
}

// Find files with duplicate default exports
function findDuplicateDefaultExports() {
  try {
    const command = "grep -r 'export default' --include='*.ts' --include='*.tsx' src/ | cut -d':' -f1 | sort | uniq -c | grep -v '^ *1 ' | awk '{print $2}'";
    const result = execSync(command).toString().trim();
    
    if (!result) return [];
    
    return result.split('\n').map(file => ({
      file,
      issue: 'Multiple default exports detected'
    }));
  } catch (error) {
    return [];
  }
}

const importIssues = findFilesWithImportIssues();
const duplicateExports = findDuplicateDefaultExports();
const allIssues = [...importIssues, ...duplicateExports];

if (allIssues.length > 0) {
  console.log(`Found ${allIssues.length} issues:\n`);
  
  allIssues.forEach(issue => {
    console.log(`📄 ${issue.file}`);
    if (issue.content) {
      console.log(`   ${issue.content}`);
    } else if (issue.issue) {
      console.log(`   ${issue.issue}`);
    }
    console.log('');
  });
  
  console.log('Run the fix script to resolve these issues:');
  console.log('node scripts/fix-all-import-syntax.js');
} else {
  console.log('✅ No broken import statements or duplicate exports found!');
} 