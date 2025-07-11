#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing duplicate default exports...\n');

const filesToFix = [
  'src/components/cursor-trail.tsx',
  'src/components/dungy-wisdom.tsx',
  'src/components/error-fallback.tsx',
  'src/components/examples/clickup-crm-demo.tsx',
  'src/components/feature-card.tsx',
  'src/components/floating-cta.tsx',
  'src/components/floating-testimony.tsx',
  'src/components/heartbeat-monitor.tsx',
  'src/components/layout-wrapper.tsx',
  'src/components/michael-testament.tsx'
];

let filesFixed = 0;

filesToFix.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Pattern: Replace "export default function ComponentName" with "function ComponentNameExported"
    // and keep the withErrorBoundary export
    const componentNameRegex = /export default function ([A-Za-z0-9_]+)(\(|\<)/;
    const match = content.match(componentNameRegex);
    
    if (match) {
      const componentName = match[1];
      const modified = content.replace(
        `export default function ${componentName}`,
        `function ${componentName}Exported`
      );
      
      fs.writeFileSync(file, modified);
      console.log(`✅ Fixed ${file} - Renamed component to ${componentName}Exported`);
      filesFixed++;
    } else {
      console.log(`⚠️ Could not find component name in ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}: ${error.message}`);
  }
});

console.log(`\n🎉 Summary:`);
console.log(`   Files fixed: ${filesFixed}/${filesToFix.length}`);
console.log(`   Files with issues: ${filesToFix.length - filesFixed}`);

if (filesFixed < filesToFix.length) {
  console.log('\nSome files could not be fixed automatically. Please check them manually:');
  console.log('grep -r "export default" --include="*.tsx" ' + filesToFix.filter((_, i) => i >= filesFixed).join(' '));
} 