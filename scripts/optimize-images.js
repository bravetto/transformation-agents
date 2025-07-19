#!/usr/bin/env node

/**
 * 🚀 ADVANCED IMAGE OPTIMIZATION SCRIPT
 * Championship Performance Image Processing
 *
 * Features:
 * - Convert to WebP and AVIF formats
 * - Generate blur placeholders
 * - Progressive loading optimization
 * - Responsive image variants
 * - Automatic file size reporting
 */

const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const { createHash } = require("crypto");

// Configuration
const CONFIG = {
  // Input/Output directories
  inputDir: path.join(__dirname, "../public/images"),
  outputDir: path.join(__dirname, "../public/images/optimized"),

  // Image quality settings
  webp: { quality: 85, effort: 6 },
  avif: { quality: 75, effort: 9 },
  jpeg: { quality: 85, progressive: true },
  png: { compressionLevel: 9, progressive: true },

  // Responsive breakpoints
  breakpoints: [
    { name: "mobile", width: 480 },
    { name: "tablet", width: 768 },
    { name: "desktop", width: 1200 },
    { name: "xl", width: 1600 },
  ],

  // Blur placeholder settings
  blurPlaceholder: {
    width: 20,
    height: 20,
    quality: 20,
  },

  // File extensions to process
  supportedExtensions: [".jpg", ".jpeg", ".png", ".webp"],

  // Skip files that are already optimized
  skipOptimized: true,
};

class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      originalSize: 0,
      optimizedSize: 0,
      files: [],
    };
  }

  /**
   * Generate a blur placeholder for progressive loading
   */
  async generateBlurPlaceholder(inputPath) {
    try {
      const buffer = await sharp(inputPath)
        .resize(CONFIG.blurPlaceholder.width, CONFIG.blurPlaceholder.height, {
          fit: "cover",
          withoutEnlargement: false,
        })
        .jpeg({ quality: CONFIG.blurPlaceholder.quality })
        .toBuffer();

      // Convert to base64 data URL
      const base64 = buffer.toString("base64");
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.warn(
        `⚠️  Failed to generate blur placeholder for ${inputPath}:`,
        error.message,
      );
      return null;
    }
  }

  /**
   * Generate hash for cache busting
   */
  generateHash(filePath) {
    const hash = createHash("md5");
    hash.update(filePath);
    return hash.digest("hex").substring(0, 8);
  }

  /**
   * Create responsive variants of an image
   */
  async createResponsiveVariants(inputPath, outputBasePath, metadata) {
    const variants = {};

    for (const breakpoint of CONFIG.breakpoints) {
      // Skip if original is smaller than breakpoint
      if (metadata.width <= breakpoint.width) continue;

      const variantName = `${outputBasePath}-${breakpoint.name}`;

      try {
        // WebP variant
        const webpPath = `${variantName}.webp`;
        await sharp(inputPath)
          .resize(breakpoint.width, null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .webp(CONFIG.webp)
          .toFile(webpPath);

        // AVIF variant (next-gen format)
        const avifPath = `${variantName}.avif`;
        await sharp(inputPath)
          .resize(breakpoint.width, null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .avif(CONFIG.avif)
          .toFile(avifPath);

        variants[breakpoint.name] = {
          webp: webpPath,
          avif: avifPath,
          width: breakpoint.width,
        };

        console.log(`   ✓ Generated ${breakpoint.name} variants`);
      } catch (error) {
        console.warn(
          `   ⚠️  Failed to create ${breakpoint.name} variant:`,
          error.message,
        );
      }
    }

    return variants;
  }

  /**
   * Optimize a single image file
   */
  async optimizeImage(inputPath, outputPath) {
    try {
      const inputStats = await fs.stat(inputPath);
      const metadata = await sharp(inputPath).metadata();

      console.log(
        `🔄 Processing: ${path.basename(inputPath)} (${this.formatFileSize(inputStats.size)})`,
      );

      // Create output directory if it doesn't exist
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      const baseName = path.parse(outputPath).name;
      const outputDir = path.dirname(outputPath);
      const outputBasePath = path.join(outputDir, baseName);

      // Generate blur placeholder
      const blurPlaceholder = await this.generateBlurPlaceholder(inputPath);

      // Generate responsive variants
      const variants = await this.createResponsiveVariants(
        inputPath,
        outputBasePath,
        metadata,
      );

      // Optimize original in multiple formats
      const optimizedFiles = {};

      // WebP optimization
      const webpPath = `${outputBasePath}.webp`;
      await sharp(inputPath).webp(CONFIG.webp).toFile(webpPath);
      optimizedFiles.webp = webpPath;

      // AVIF optimization (most efficient)
      const avifPath = `${outputBasePath}.avif`;
      await sharp(inputPath).avif(CONFIG.avif).toFile(avifPath);
      optimizedFiles.avif = avifPath;

      // Original format optimization
      const ext = path.extname(inputPath).toLowerCase();
      const originalOptimizedPath = `${outputBasePath}${ext}`;

      if (ext === ".png") {
        await sharp(inputPath).png(CONFIG.png).toFile(originalOptimizedPath);
      } else {
        await sharp(inputPath).jpeg(CONFIG.jpeg).toFile(originalOptimizedPath);
      }
      optimizedFiles.original = originalOptimizedPath;

      // Calculate size savings
      const optimizedStats = await fs.stat(webpPath);
      const sizeSaving = inputStats.size - optimizedStats.size;
      const percentSaving = ((sizeSaving / inputStats.size) * 100).toFixed(1);

      console.log(
        `   ✅ Optimized: ${this.formatFileSize(sizeSaving)} saved (${percentSaving}%)`,
      );

      // Update statistics
      this.stats.processed++;
      this.stats.originalSize += inputStats.size;
      this.stats.optimizedSize += optimizedStats.size;

      // Store file information
      const fileInfo = {
        originalPath: inputPath,
        optimizedFiles,
        variants,
        blurPlaceholder,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
        },
        sizes: {
          original: inputStats.size,
          optimized: optimizedStats.size,
          saved: sizeSaving,
          percentSaved: parseFloat(percentSaving),
        },
      };

      this.stats.files.push(fileInfo);

      return fileInfo;
    } catch (error) {
      console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
      this.stats.errors++;
      throw error;
    }
  }

  /**
   * Recursively find all image files
   */
  async findImageFiles(dir, allFiles = []) {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          // Skip optimized directory to avoid recursion
          if (file !== "optimized") {
            await this.findImageFiles(filePath, allFiles);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          if (CONFIG.supportedExtensions.includes(ext)) {
            allFiles.push(filePath);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Cannot read directory ${dir}:`, error.message);
    }

    return allFiles;
  }

  /**
   * Format file size for display
   */
  formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  /**
   * Generate optimization report
   */
  generateReport() {
    const totalSaved = this.stats.originalSize - this.stats.optimizedSize;
    const percentSaved =
      this.stats.originalSize > 0
        ? ((totalSaved / this.stats.originalSize) * 100).toFixed(1)
        : 0;

    console.log("\n🏆 OPTIMIZATION REPORT");
    console.log("═".repeat(50));
    console.log(`📊 Files processed: ${this.stats.processed}`);
    console.log(`⚠️  Files skipped: ${this.stats.skipped}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(
      `💾 Original size: ${this.formatFileSize(this.stats.originalSize)}`,
    );
    console.log(
      `✨ Optimized size: ${this.formatFileSize(this.stats.optimizedSize)}`,
    );
    console.log(
      `🚀 Total saved: ${this.formatFileSize(totalSaved)} (${percentSaved}%)`,
    );

    if (this.stats.files.length > 0) {
      console.log("\n📋 TOP SAVINGS:");
      const topSavings = this.stats.files
        .sort((a, b) => b.sizes.saved - a.sizes.saved)
        .slice(0, 5);

      topSavings.forEach((file, i) => {
        const filename = path.basename(file.originalPath);
        console.log(
          `  ${i + 1}. ${filename}: ${this.formatFileSize(file.sizes.saved)} (${file.sizes.percentSaved}%)`,
        );
      });
    }
  }

  /**
   * Save optimization manifest for use in components
   */
  async saveOptimizationManifest() {
    const manifestPath = path.join(
      CONFIG.outputDir,
      "optimization-manifest.json",
    );

    const manifest = {
      generatedAt: new Date().toISOString(),
      totalFiles: this.stats.processed,
      totalSavings: {
        bytes: this.stats.originalSize - this.stats.optimizedSize,
        percentage:
          this.stats.originalSize > 0
            ? (
                ((this.stats.originalSize - this.stats.optimizedSize) /
                  this.stats.originalSize) *
                100
              ).toFixed(2)
            : 0,
      },
      files: this.stats.files.reduce((acc, file) => {
        const relativePath = path.relative(CONFIG.inputDir, file.originalPath);
        acc[relativePath] = {
          optimized: Object.keys(file.optimizedFiles).reduce(
            (formats, format) => {
              formats[format] = path.relative(
                path.join(__dirname, "../public"),
                file.optimizedFiles[format],
              );
              return formats;
            },
            {},
          ),
          variants: Object.keys(file.variants).reduce((resp, size) => {
            resp[size] = {
              webp: path.relative(
                path.join(__dirname, "../public"),
                file.variants[size].webp,
              ),
              avif: path.relative(
                path.join(__dirname, "../public"),
                file.variants[size].avif,
              ),
              width: file.variants[size].width,
            };
            return resp;
          }, {}),
          blurPlaceholder: file.blurPlaceholder,
          metadata: file.metadata,
        };
        return acc;
      }, {}),
    };

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n📄 Optimization manifest saved: ${manifestPath}`);
  }

  /**
   * Main optimization process
   */
  async optimize() {
    console.log("🚀 ADVANCED IMAGE OPTIMIZATION STARTING");
    console.log("═".repeat(50));
    console.log(`📂 Input directory: ${CONFIG.inputDir}`);
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    console.log(
      `🎯 Supported formats: ${CONFIG.supportedExtensions.join(", ")}`,
    );
    console.log();

    try {
      // Find all image files
      const imageFiles = await this.findImageFiles(CONFIG.inputDir);
      console.log(`🔍 Found ${imageFiles.length} image files to process\n`);

      if (imageFiles.length === 0) {
        console.log("ℹ️  No image files found to optimize");
        return;
      }

      // Process each image
      for (const imagePath of imageFiles) {
        try {
          const relativePath = path.relative(CONFIG.inputDir, imagePath);
          const outputPath = path.join(CONFIG.outputDir, relativePath);

          // Check if already optimized
          if (CONFIG.skipOptimized) {
            const webpPath = outputPath.replace(
              path.extname(outputPath),
              ".webp",
            );
            try {
              await fs.access(webpPath);
              console.log(
                `⏭️  Skipped: ${path.basename(imagePath)} (already optimized)`,
              );
              this.stats.skipped++;
              continue;
            } catch {
              // File doesn't exist, proceed with optimization
            }
          }

          await this.optimizeImage(imagePath, outputPath);
        } catch (error) {
          // Error already logged in optimizeImage
          continue;
        }
      }

      // Generate and save results
      this.generateReport();
      await this.saveOptimizationManifest();

      console.log("\n🎉 IMAGE OPTIMIZATION COMPLETE!");
    } catch (error) {
      console.error("💥 Optimization failed:", error);
      process.exit(1);
    }
  }
}

// Run optimization if called directly
if (require.main === module) {
  // Check if sharp is installed
  try {
    require("sharp");
  } catch (error) {
    console.error("❌ Sharp is required for image optimization");
    console.log("📦 Install it with: npm install sharp");
    process.exit(1);
  }

  const optimizer = new ImageOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = ImageOptimizer;
