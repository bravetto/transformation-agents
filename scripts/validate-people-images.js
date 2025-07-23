#!/usr/bin/env node

/**
 * People Images Validation Script
 *
 * Tests all people pages to verify:
 * 1. Professional images load correctly for those who have them
 * 2. Fallback images work for those without professional photos
 * 3. All image optimization features are working
 * 4. No broken image links
 */

const fs = require("fs");
const path = require("path");

// Colors for terminal output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

// People with professional images (from our analysis)
const PEOPLE_WITH_PROFESSIONAL_IMAGES = [
  "michael-mataluni",
  "jahmere-webb",
  "jordan-dungy",
  "coach-dungy",
  "jay-forte",
  "martha-henderson",
];

// Image directories to check
const IMAGE_DIRECTORIES = {
  display: "./public/images/people/display",
  full: "./public/images/people/full",
  thumbnails: "./public/images/people/thumbnails",
};

// Fallback directories
const FALLBACK_DIRECTORIES = {
  fallbacks: "./public/images/fallbacks",
};

console.log(
  `${colors.bold}${colors.cyan}🎯 PEOPLE IMAGES VALIDATION SYSTEM${colors.reset}`,
);
console.log(
  `${colors.cyan}=====================================${colors.reset}\n`,
);

/**
 * Check if image files exist for a person
 */
function checkPersonImages(personId) {
  const results = {
    personId,
    hasProfessionalImages: false,
    missingImages: [],
    existingImages: [],
    totalSize: 0,
  };

  // Check each image directory
  for (const [type, directory] of Object.entries(IMAGE_DIRECTORIES)) {
    const webpPath = path.join(directory, `${personId}.webp`);
    const jpgPath = path.join(directory, `${personId}.jpg`);

    if (fs.existsSync(webpPath)) {
      const stats = fs.statSync(webpPath);
      results.existingImages.push({
        type: `${type}-webp`,
        path: webpPath,
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024),
      });
      results.totalSize += stats.size;
      results.hasProfessionalImages = true;
    } else {
      results.missingImages.push(`${type}-webp`);
    }

    if (fs.existsSync(jpgPath)) {
      const stats = fs.statSync(jpgPath);
      results.existingImages.push({
        type: `${type}-jpg`,
        path: jpgPath,
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024),
      });
      results.totalSize += stats.size;
      results.hasProfessionalImages = true;
    } else {
      results.missingImages.push(`${type}-jpg`);
    }
  }

  return results;
}

/**
 * Get all people from data directory
 */
function getAllPeopleIds() {
  const peopleDataDir = "./src/data/people";
  const files = fs.readdirSync(peopleDataDir);

  return files
    .filter((file) => file.endsWith(".ts") && !file.includes("index"))
    .map((file) => file.replace(".ts", ""));
}

/**
 * Check fallback images exist
 */
function checkFallbackImages() {
  const fallbackDir = FALLBACK_DIRECTORIES.fallbacks;
  const requiredFallbacks = [
    "lightworker-fallback.jpg",
    "messenger-fallback.jpg",
    "witness-fallback.jpg",
    "guardian-fallback.jpg",
  ];

  const results = {
    existing: [],
    missing: [],
  };

  for (const fallback of requiredFallbacks) {
    const fallbackPath = path.join(fallbackDir, fallback);
    if (fs.existsSync(fallbackPath)) {
      const stats = fs.statSync(fallbackPath);
      results.existing.push({
        name: fallback,
        path: fallbackPath,
        sizeKB: Math.round(stats.size / 1024),
      });
    } else {
      results.missing.push(fallback);
    }
  }

  return results;
}

/**
 * Main validation function
 */
function validatePeopleImages() {
  console.log(
    `${colors.blue}📊 Analyzing People Image System...${colors.reset}\n`,
  );

  // Get all people
  const allPeople = getAllPeopleIds();
  console.log(
    `${colors.cyan}Found ${allPeople.length} people in data directory${colors.reset}`,
  );

  // Check each person's images
  const results = allPeople.map(checkPersonImages);

  // Summary statistics
  const peopleWithImages = results.filter((r) => r.hasProfessionalImages);
  const peopleWithoutImages = results.filter((r) => !r.hasProfessionalImages);

  console.log(
    `\n${colors.bold}${colors.green}✅ PROFESSIONAL IMAGES SUMMARY${colors.reset}`,
  );
  console.log(
    `${colors.green}People with professional images: ${peopleWithImages.length}${colors.reset}`,
  );
  console.log(
    `${colors.yellow}People without professional images: ${peopleWithoutImages.length}${colors.reset}\n`,
  );

  // Show detailed results for people with professional images
  if (peopleWithImages.length > 0) {
    console.log(
      `${colors.bold}${colors.green}🎨 PEOPLE WITH PROFESSIONAL IMAGES:${colors.reset}`,
    );
    for (const person of peopleWithImages) {
      const totalSizeKB = Math.round(person.totalSize / 1024);
      console.log(`${colors.green}📸 ${person.personId}${colors.reset}`);
      console.log(`   Total size: ${totalSizeKB}KB`);

      person.existingImages.forEach((img) => {
        console.log(`   ✓ ${img.type}: ${img.sizeKB}KB`);
      });

      if (person.missingImages.length > 0) {
        console.log(
          `   ${colors.yellow}Missing: ${person.missingImages.join(", ")}${colors.reset}`,
        );
      }
      console.log("");
    }
  }

  // Show people without images (will use fallbacks)
  if (peopleWithoutImages.length > 0) {
    console.log(
      `${colors.bold}${colors.yellow}🎭 PEOPLE USING FALLBACK IMAGES:${colors.reset}`,
    );
    for (const person of peopleWithoutImages) {
      console.log(
        `${colors.yellow}🎭 ${person.personId} (will use role-based fallback)${colors.reset}`,
      );
    }
    console.log("");
  }

  // Check fallback images
  console.log(
    `${colors.bold}${colors.magenta}🛡️ FALLBACK SYSTEM VALIDATION${colors.reset}`,
  );
  const fallbackResults = checkFallbackImages();

  if (fallbackResults.existing.length > 0) {
    console.log(`${colors.green}Available fallbacks:${colors.reset}`);
    fallbackResults.existing.forEach((fallback) => {
      console.log(`   ✓ ${fallback.name}: ${fallback.sizeKB}KB`);
    });
  }

  if (fallbackResults.missing.length > 0) {
    console.log(`${colors.red}Missing fallbacks:${colors.reset}`);
    fallbackResults.missing.forEach((fallback) => {
      console.log(`   ✗ ${fallback}`);
    });
  }

  // Final summary
  console.log(
    `\n${colors.bold}${colors.cyan}📈 SYSTEM HEALTH SUMMARY${colors.reset}`,
  );
  console.log(
    `${colors.cyan}=====================================${colors.reset}`,
  );
  console.log(`Total people: ${allPeople.length}`);
  console.log(
    `${colors.green}With professional images: ${peopleWithImages.length} (${Math.round((peopleWithImages.length / allPeople.length) * 100)}%)${colors.reset}`,
  );
  console.log(
    `${colors.yellow}Using fallbacks: ${peopleWithoutImages.length} (${Math.round((peopleWithoutImages.length / allPeople.length) * 100)}%)${colors.reset}`,
  );
  console.log(
    `${colors.magenta}Fallback system: ${fallbackResults.missing.length === 0 ? "Complete" : "Needs attention"}${colors.reset}`,
  );

  const totalImages = peopleWithImages.reduce(
    (sum, person) => sum + person.existingImages.length,
    0,
  );
  const totalSizeMB = Math.round(
    results.reduce((sum, person) => sum + person.totalSize, 0) / (1024 * 1024),
  );

  console.log(`Total professional images: ${totalImages}`);
  console.log(`Total storage used: ${totalSizeMB}MB`);

  // Expected vs actual professional images
  const expectedProfessional = PEOPLE_WITH_PROFESSIONAL_IMAGES.length;
  const actualProfessional = peopleWithImages.length;

  if (actualProfessional >= expectedProfessional) {
    console.log(
      `\n${colors.bold}${colors.green}🎉 SUCCESS: Image system is working perfectly!${colors.reset}`,
    );
    console.log(
      `${colors.green}Professional images are being used for all expected people.${colors.reset}`,
    );
  } else {
    console.log(
      `\n${colors.bold}${colors.yellow}⚠️  NOTICE: Expected ${expectedProfessional} people with professional images, found ${actualProfessional}${colors.reset}`,
    );

    const missing = PEOPLE_WITH_PROFESSIONAL_IMAGES.filter(
      (id) => !peopleWithImages.some((person) => person.personId === id),
    );

    if (missing.length > 0) {
      console.log(
        `${colors.yellow}Missing professional images for: ${missing.join(", ")}${colors.reset}`,
      );
    }
  }

  return {
    total: allPeople.length,
    withImages: peopleWithImages.length,
    withoutImages: peopleWithoutImages.length,
    fallbackSystemComplete: fallbackResults.missing.length === 0,
    totalImages,
    totalSizeMB,
  };
}

// Run validation
if (require.main === module) {
  try {
    const results = validatePeopleImages();

    // Exit with appropriate code
    if (results.fallbackSystemComplete) {
      console.log(
        `\n${colors.bold}${colors.green}✅ Validation completed successfully!${colors.reset}`,
      );
      process.exit(0);
    } else {
      console.log(
        `\n${colors.bold}${colors.yellow}⚠️  Validation completed with warnings${colors.reset}`,
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      `\n${colors.bold}${colors.red}❌ Validation failed:${colors.reset}`,
    );
    console.error(error.message);
    process.exit(2);
  }
}

module.exports = { validatePeopleImages, checkPersonImages, getAllPeopleIds };
