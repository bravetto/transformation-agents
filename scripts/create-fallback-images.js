#!/usr/bin/env node

/**
 * This script creates fallback images for all people in different formats (WebP and JPG)
 * It uses the role-based fallback images to create placeholders until real images are available
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Make sure we have the directory structure
const sizes = ['full', 'display', 'thumbnails'];
for (const size of sizes) {
  const dir = path.join('public', 'images', 'people', size);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// List of people and their corresponding roles
const people = [
  { id: 'michael-mataluni', role: 'lightworker' },
  { id: 'jahmere-webb', role: 'messenger' },
  { id: 'jordan-dungy', role: 'lightworker' },
  { id: 'coach-dungy', role: 'guardian' },
  { id: 'jay-forte', role: 'witness' },
  { id: 'martha-henderson', role: 'messenger' },
];

// Function to copy fallback images to person image directories
function copyFallbackImages() {
  let webpCount = 0;
  let jpgCount = 0;

  for (const person of people) {
    for (const size of sizes) {
      const sourcePath = path.join('public', 'images', 'fallbacks', `${person.role}-fallback.jpg`);
      
      // WebP target path
      const webpTarget = path.join('public', 'images', 'people', size, `${person.id}.webp`);
      
      // JPG target path
      const jpgTarget = path.join('public', 'images', 'people', size, `${person.id}.jpg`);
      
      // Copy and convert to WebP
      try {
        if (process.platform === 'darwin' || process.platform === 'linux') {
          // Use cwebp if available, otherwise just copy the JPG (the frontend will handle conversion)
          try {
            execSync(`cwebp -q 80 "${sourcePath}" -o "${webpTarget}"`, { stdio: 'ignore' });
            webpCount++;
            console.log(`Created WebP: ${webpTarget}`);
          } catch (e) {
            console.log(`WebP conversion failed for ${webpTarget}, copying JPG instead`);
            fs.copyFileSync(sourcePath, webpTarget);
            webpCount++;
          }
        } else {
          // On Windows or other platforms, just copy the file
          fs.copyFileSync(sourcePath, webpTarget);
          webpCount++;
          console.log(`Created WebP: ${webpTarget}`);
        }
      } catch (e) {
        console.error(`Error creating WebP file ${webpTarget}:`, e.message);
      }
      
      // Copy as JPG for fallback
      try {
        fs.copyFileSync(sourcePath, jpgTarget);
        jpgCount++;
        console.log(`Created JPG: ${jpgTarget}`);
      } catch (e) {
        console.error(`Error creating JPG file ${jpgTarget}:`, e.message);
      }
    }
  }

  console.log(`\nCreated ${webpCount} WebP files and ${jpgCount} JPG files as placeholders.`);
  console.log('These are temporary placeholders. Replace with actual images when available.');
}

// Execute the function
copyFallbackImages(); 