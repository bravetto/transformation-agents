#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const people = [
  'michael-mataluni',
  'jahmere-webb',
  'jordan-dungy',
  'coach-dungy',
  'jay-forte',
  'martha-henderson',
];

const sizes = ['full', 'display', 'thumbnails'];

async function convertToWebP() {
  let successCount = 0;
  let errorCount = 0;
  
  for (const person of people) {
    for (const size of sizes) {
      const jpgPath = path.join('public', 'images', 'people', size, `${person}.jpg`);
      const webpPath = path.join('public', 'images', 'people', size, `${person}.webp`);
      
      try {
        if (fs.existsSync(jpgPath)) {
          await sharp(jpgPath)
            .webp({ quality: 80 })
            .toFile(webpPath + '.new');
          
          // Replace the old file with the new one
          fs.renameSync(webpPath + '.new', webpPath);
          console.log(`Converted ${jpgPath} to ${webpPath}`);
          successCount++;
        }
      } catch (error) {
        console.error(`Error converting ${jpgPath}: ${error.message}`);
        errorCount++;
      }
    }
  }
  
  console.log(`\nConversion complete: ${successCount} successful, ${errorCount} failed`);
}

convertToWebP().catch(error => {
  console.error('Conversion failed:', error.message);
  process.exit(1);
}); 