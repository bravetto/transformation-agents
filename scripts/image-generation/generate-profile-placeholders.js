#!/usr/bin/env node

/**
 * 🖼️ PROFESSIONAL PROFILE PLACEHOLDER GENERATOR
 * Production-ready solution for missing profile images
 * Generates elegant SVG-based placeholder images with initials
 */

const fs = require("fs");
const path = require("path");

// Color schemes for different roles/people
const colorSchemes = {
  "jahmere-webb": {
    gradient: ["#3B82F6", "#1E40AF"], // Blue gradient - Trust & Hope
    textColor: "#FFFFFF",
    accent: "#60A5FA",
  },
  "tony-dungy": {
    gradient: ["#059669", "#047857"], // Green gradient - Growth & Wisdom
    textColor: "#FFFFFF",
    accent: "#34D399",
  },
  "jordan-dungy": {
    gradient: ["#7C3AED", "#5B21B6"], // Purple gradient - Innovation & Vision
    textColor: "#FFFFFF",
    accent: "#A78BFA",
  },
  "michael-mataluni": {
    gradient: ["#DC2626", "#B91C1C"], // Red gradient - Passion & Leadership
    textColor: "#FFFFFF",
    accent: "#F87171",
  },
  "coach-dungy": {
    gradient: ["#D97706", "#92400E"], // Orange gradient - Mentorship & Guidance
    textColor: "#FFFFFF",
    accent: "#FBBF24",
  },
  "jay-forte": {
    gradient: ["#0891B2", "#0E7490"], // Cyan gradient - Communication & Clarity
    textColor: "#FFFFFF",
    accent: "#22D3EE",
  },
};

// Profile information
const profiles = {
  "jahmere-webb": {
    name: "JAHmere Webb",
    initials: "JW",
    title: "Bridge Project Founder",
    subtitle: "Transformation Advocate",
  },
  "tony-dungy": {
    name: "Tony Dungy",
    initials: "TD",
    title: "NFL Hall of Fame Coach",
    subtitle: "Leadership Mentor",
  },
  "jordan-dungy": {
    name: "Jordan Dungy",
    initials: "JD",
    title: "Community Advocate",
    subtitle: "Next Generation Leader",
  },
  "michael-mataluni": {
    name: "Michael Mataluni",
    initials: "MM",
    title: "Technology Leader",
    subtitle: "Innovation Architect",
  },
  "coach-dungy": {
    name: "Coach Tony Dungy",
    initials: "TD",
    title: "Legendary Coach",
    subtitle: "Character Developer",
  },
  "jay-forte": {
    name: "Jay Forte",
    initials: "JF",
    title: "Community Builder",
    subtitle: "Strategic Advisor",
  },
};

/**
 * Generate professional SVG placeholder
 */
function generateSVGPlaceholder(personId, profile, colorScheme) {
  const { initials, name, title } = profile;
  const { gradient, textColor, accent } = colorScheme;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient background -->
    <linearGradient id="mainGradient-${personId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
    </linearGradient>
    
    <!-- Subtle inner glow -->
    <radialGradient id="innerGlow-${personId}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0" />
    </radialGradient>
    
    <!-- Elegant shadow filter -->
    <filter id="softShadow-${personId}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <!-- Background circle with gradient -->
  <circle cx="200" cy="200" r="200" fill="url(#mainGradient-${personId})" />
  
  <!-- Inner glow overlay -->
  <circle cx="200" cy="200" r="180" fill="url(#innerGlow-${personId})" />
  
  <!-- Subtle geometric pattern -->
  <g opacity="0.1">
    <polygon points="200,50 350,200 200,350 50,200" fill="${textColor}" />
  </g>
  
  <!-- Main initials -->
  <text x="200" y="230" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="120" 
        font-weight="700"
        text-anchor="middle" 
        dominant-baseline="middle"
        fill="${textColor}"
        filter="url(#softShadow-${personId})">
    ${initials}
  </text>
  
  <!-- Subtle accent line -->
  <line x1="120" y1="280" x2="280" y2="280" 
        stroke="${accent}" 
        stroke-width="3" 
        stroke-linecap="round" 
        opacity="0.7" />
        
  <!-- Professional border -->
  <circle cx="200" cy="200" r="195" 
          fill="none" 
          stroke="${textColor}" 
          stroke-width="2" 
          opacity="0.3" />
</svg>`;
}

/**
 * Convert SVG to different formats if needed
 */
async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Main generation function
 */
async function generateAllPlaceholders() {
  console.log("🖼️ Generating professional profile placeholders...\n");

  const outputDir = path.join(process.cwd(), "public/images/people");
  await ensureDirectoryExists(outputDir);

  let successCount = 0;
  let errorCount = 0;

  for (const [personId, profile] of Object.entries(profiles)) {
    try {
      const colorScheme = colorSchemes[personId];
      const svg = generateSVGPlaceholder(personId, profile, colorScheme);

      // Generate multiple filename variations that might be expected
      const filenames = [
        `${personId}-profile.svg`,
        `${personId}.svg`,
        `${personId}-profile.jpg`, // SVG content but with .jpg extension for compatibility
      ];

      for (const filename of filenames) {
        const filepath = path.join(outputDir, filename);
        fs.writeFileSync(filepath, svg, "utf8");
      }

      console.log(`✅ Generated: ${profile.name} (${profile.initials})`);
      console.log(`   Files: ${filenames.join(", ")}`);
      console.log(`   Colors: ${colorScheme.gradient.join(" → ")}\n`);

      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${personId}:`, error.message);
      errorCount++;
    }
  }

  // Generate index file for reference
  const indexContent = `# Generated Profile Placeholders

Generated on: ${new Date().toISOString()}

## Available Images:

${Object.entries(profiles)
  .map(
    ([personId, profile]) =>
      `- **${profile.name}** (${profile.initials}): ${personId}-profile.svg`,
  )
  .join("\n")}

## Usage:

These are professional-grade SVG placeholders that can be used anywhere a profile image is expected. They're designed to:

- Scale perfectly at any size
- Maintain consistent branding
- Provide immediate visual identification
- Look professional in production

## Integration:

The placeholders are automatically detected by the existing image fallback system.
`;

  fs.writeFileSync(
    path.join(outputDir, "GENERATED_PLACEHOLDERS.md"),
    indexContent,
  );

  console.log(`🎉 Generation complete!`);
  console.log(`✅ Success: ${successCount} profiles`);
  console.log(`❌ Errors: ${errorCount} profiles`);
  console.log(`📂 Location: ${outputDir}`);

  if (successCount > 0) {
    console.log("\n🚀 Professional placeholders ready for production!");
    console.log("   • Zero 404 errors on profile images");
    console.log("   • Consistent professional branding");
    console.log("   • Scalable SVG format");
    console.log("   • Immediate visual identification");
  }
}

// Run the generator
if (require.main === module) {
  generateAllPlaceholders().catch(console.error);
}

module.exports = { generateAllPlaceholders };
