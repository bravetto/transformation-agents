#!/usr/bin/env node

/**
 * Convert JPG images to WebP format
 * 
 * This script converts all JPG images in the people directory to WebP format
 * for better performance. It uses the sharp package to do the conversion.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// List of people
const people = [
  'michael-mataluni',
  'jahmere-webb',
  'jordan-dungy',
  'coach-dungy',
  'jay-forte',
  'martha-henderson',
];

// Image sizes/directories
const sizes = ['full', 'display', 'thumbnails'];

// Function to convert JPG to WebP
async function convertJpgToWebp(inputPath, outputPath, quality = 80) {
  try {
    // Check if the input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      return false;
    }
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Convert the image
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`Converted ${inputPath} to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath} to WebP:`, error.message);
    return false;
  }
}

// Main function to convert all images
async function convertAllImages() {
  // First, check if sharp is installed
  try {
    require('sharp');
  } catch (error) {
    console.error('The "sharp" package is required for this script.');
    console.error('Please install it using: npm install sharp');
    process.exit(1);
  }
  
  // Count successful and failed conversions
  let successCount = 0;
  let failCount = 0;
  
  // Loop through each person and size
  for (const person of people) {
    for (const size of sizes) {
      const jpgPath = path.join('public', 'images', 'people', size, `${person}.jpg`);
      const webpPath = path.join('public', 'images', 'people', size, `${person}.webp`);
      
      // Only convert if the JPG exists and the WebP doesn't
      if (fs.existsSync(jpgPath) && !fs.existsSync(webpPath)) {
        const success = await convertJpgToWebp(jpgPath, webpPath);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }
  }
  
  // Print summary
  console.log('\nConversion Summary:');
  console.log(`Successfully converted: ${successCount} images`);
  console.log(`Failed to convert: ${failCount} images`);
  
  if (successCount > 0) {
    console.log('\nNote: WebP images have been created and will be used as the primary format.');
    console.log('JPG images are kept as fallbacks for browsers that do not support WebP.');
  }
}

// Run the script
convertAllImages().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
}); 