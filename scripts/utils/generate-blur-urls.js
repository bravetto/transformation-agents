#!/usr/bin/env node

/**
 * Generate Blur Data URLs Script
 *
 * This script generates blur data URLs for all images in the people directory
 * and updates the person-images.ts file with the new data URLs.
 */

const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// List of people and their corresponding roles
const people = [
  { id: "michael-mataluni", role: "lightworker" },
  { id: "jahmere-webb", role: "messenger" },
  { id: "jordan-dungy", role: "lightworker" },
  { id: "coach-dungy", role: "guardian" },
  { id: "jay-forte", role: "witness" },
  { id: "martha-henderson", role: "messenger" },
];

// Function to generate a blur data URL from an image path
async function generateBlurDataURL(imagePath) {
  try {
    // Load the image
    const image = await loadImage(imagePath);

    // Create a small canvas (10x10 pixels)
    const canvas = createCanvas(10, 10);
    const ctx = canvas.getContext("2d");

    // Draw the image to the canvas with downscaling
    ctx.drawImage(image, 0, 0, 10, 10);

    // Convert the canvas to a data URL (JPEG format with low quality)
    const dataURL = canvas.toDataURL("image/jpeg", 0.1);

    return dataURL;
  } catch (error) {
    console.error(
      `Error generating blur data URL for ${imagePath}:`,
      error.message,
    );
    return null;
  }
}

// Function to update the person-images.ts file with new blur data URLs
async function updatePersonImagesFile() {
  // Get the file path
  const filePath = path.join("src", "data", "person-images.ts");

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  // Read the file content
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Keep a record of blur data URLs for each person
  const blurDataURLs = {};

  // Generate blur data URLs for each person
  for (const person of people) {
    // Use the WebP image for blur data URL generation
    const imagePath = path.join(
      "public",
      "images",
      "people",
      "display",
      `${person.id}.webp`,
    );

    // If WebP doesn't exist, try JPG
    if (!fs.existsSync(imagePath)) {
      const jpgPath = path.join(
        "public",
        "images",
        "people",
        "display",
        `${person.id}.jpg`,
      );
      if (fs.existsSync(jpgPath)) {
        const blurDataURL = await generateBlurDataURL(jpgPath);
        if (blurDataURL) {
          blurDataURLs[person.id] = blurDataURL;
          console.log(`Generated blur data URL for ${person.id} using JPG`);
        }
      } else {
        console.warn(`No image found for ${person.id}`);
      }
    } else {
      const blurDataURL = await generateBlurDataURL(imagePath);
      if (blurDataURL) {
        blurDataURLs[person.id] = blurDataURL;
        console.log(`Generated blur data URL for ${person.id} using WebP`);
      }
    }
  }

  // Update the file content with new blur data URLs
  for (const personId in blurDataURLs) {
    // Find the person's entry in the file
    const regex = new RegExp(
      `('${personId}':\\s*{[^}]*blurDataURL:\\s*)([^,}]*)`,
    );
    const match = fileContent.match(regex);

    if (match) {
      // Replace the blur data URL
      fileContent = fileContent.replace(regex, `$1'${blurDataURLs[personId]}'`);
      console.log(`Updated blur data URL for ${personId} in ${filePath}`);
    } else {
      console.warn(`Could not find entry for ${personId} in ${filePath}`);
    }
  }

  // Write the updated content back to the file
  fs.writeFileSync(filePath, fileContent);
  console.log(`Updated ${filePath} with new blur data URLs`);
}

// Run the script
async function main() {
  try {
    // First, check if the canvas package is installed
    try {
      require("canvas");
    } catch (error) {
      console.error('The "canvas" package is required for this script.');
      console.error("Please install it using: npm install canvas");
      process.exit(1);
    }

    // Update the person-images.ts file
    await updatePersonImagesFile();

    console.log("Blur data URLs updated successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
