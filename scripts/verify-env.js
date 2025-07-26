#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 * Ensures all required variables are set and not placeholders
 */

const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'DIRECT_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_POSTHOG_KEY',
  'CLICKUP_API_KEY',
  'PUSHER_APP_ID',
  'PUSHER_KEY',
  'PUSHER_SECRET',
  'NEXT_PUBLIC_PUSHER_KEY'
];

const missing = REQUIRED_ENV_VARS.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.error(`   - ${key}`));
  process.exit(1);
}

// Check for placeholder values
const placeholders = REQUIRED_ENV_VARS.filter(key => {
  const value = process.env[key];
  return value && (
    value.includes('XXXXXXXXXX') || 
    value.includes('placeholder') ||
    value === 'your-value-here' ||
    value.startsWith('G-XXXX') ||
    value === 'pk_test_placeholder'
  );
});

if (placeholders.length > 0) {
  console.error('❌ Placeholder values detected:');
  placeholders.forEach(key => console.error(`   - ${key} = ${process.env[key]}`));
  process.exit(1);
}

console.log('✅ All environment variables verified');
console.log(`✅ Total checked: ${REQUIRED_ENV_VARS.length}`);
console.log('✅ No placeholders detected');
console.log('✅ Ready for deployment');
