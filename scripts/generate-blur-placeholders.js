/**
 * Generate Blur Placeholders Script
 * 
 * This script scans the public/images/people directories and generates 
 * base64 blur data URLs for each image. The results are output to a JSON file
 * that can be imported into the person-images.ts file.
 * 
 * Usage: node scripts/generate-blur-placeholders.js
 * 
 * Dependencies:
 * - sharp: For image processing
 * - fs/promises: For file system operations
 * - path: For path manipulations
 */

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

// Configuration
const PEOPLE_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'people');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'blur-data.json');
const BLUR_SIZE = 10; // Size of tiny blur image (10x10 pixels)
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Generate a blur data URL for an image
 * @param {string} imagePath Path to the image
 * @returns {Promise<string>} Base64 blur data URL
 */
async function generateBlurDataURL(imagePath) {
  try {
    // Generate a tiny image (10x10 pixels) and encode as base64 JPEG
    const buffer = await sharp(imagePath)
      .resize(BLUR_SIZE, BLUR_SIZE, { fit: 'inside' })
      .toFormat('jpeg', { quality: 40, progressive: true, optimizeScans: true })
      .toBuffer();
    
    // Convert to base64 and format as data URL
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Process a directory of images and generate blur data
 * @param {string} dir Directory path
 * @param {Object} results Object to store results
 * @param {string} type Type of images (full, display, thumbnail)
 */
async function processDirectory(dir, results, type) {
  try {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isFile() && SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())) {
        const personId = path.basename(file, path.extname(file));
        
        if (!results[personId]) {
          results[personId] = {};
        }
        
        console.log(`Processing ${type} image for ${personId}...`);
        const blurDataURL = await generateBlurDataURL(filePath);
        
        if (blurDataURL) {
          // Store the blur data for this person and image type
          if (!results[personId].blurDataURL) {
            results[personId].blurDataURL = blurDataURL;
          }
          
          // Store the image path
          results[personId][type] = `/images/people/${type}/${file}`;
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
}

/**
 * Main function to process all image directories
 */
async function main() {
  const results = {};
  
  // Process each image directory
  const directories = [
    { path: path.join(PEOPLE_IMAGES_DIR, 'full'), type: 'full' },
    { path: path.join(PEOPLE_IMAGES_DIR, 'display'), type: 'display' },
    { path: path.join(PEOPLE_IMAGES_DIR, 'thumbnails'), type: 'thumbnail' }
  ];
  
  for (const { path: dirPath, type } of directories) {
    try {
      const dirExists = await fs.access(dirPath).then(() => true).catch(() => false);
      
      if (dirExists) {
        await processDirectory(dirPath, results, type);
      } else {
        console.warn(`Directory ${dirPath} does not exist, skipping...`);
      }
    } catch (error) {
      console.error(`Error processing ${type} images:`, error.message);
    }
  }
  
  // Write results to output file
  try {
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Blur data written to ${OUTPUT_FILE}`);
    
    // Output instructions
    console.log('\nNext steps:');
    console.log('1. Add the "sharp" package if not already installed:');
    console.log('   npm install sharp');
    console.log('2. Import the generated blur data in src/data/person-images.ts:');
    console.log('   import blurData from "./blur-data.json";');
    console.log('3. Update your person image mappings with the generated data');
  } catch (error) {
    console.error('Error writing output file:', error.message);
  }
}

// Run the script
main().catch(console.error); 