#!/usr/bin/env node

/**
 * Character Witness Content Extraction Script
 * Extracts content from PDF character witness letters for JAHmere Webb
 * Populates the character witness data structure with real testimonials
 */

const fs = require("fs").promises;
const path = require("path");
const pdfParse = require("pdf-parse");

// Configuration
const PDF_DIRECTORY = path.join(
  __dirname,
  "../public/documents/character-letters-private",
);
const OUTPUT_FILE = path.join(
  __dirname,
  "../src/data/character-witnesses/extracted-content.ts",
);
const DATA_FILE = path.join(
  __dirname,
  "../src/data/character-witnesses/character-letters-data.ts",
);

// Priority mapping based on conversion value
const WITNESS_PRIORITY = {
  "jordan-dungy": {
    priority: 10,
    credibility: 9,
    featured: true,
    conversionPotential: "high",
  },
  "michael-mataluni": {
    priority: 8,
    credibility: 8,
    featured: true,
    conversionPotential: "high",
  },
  "brooks-lopez": {
    priority: 7,
    credibility: 7,
    featured: false,
    conversionPotential: "medium",
  },
  "jay-forte": {
    priority: 6,
    credibility: 6,
    featured: false,
    conversionPotential: "medium",
  },
  "michael-and-joanna-mckenna": {
    priority: 6,
    credibility: 6,
    featured: false,
    conversionPotential: "medium",
  },
  "kimberly-sams": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "carnetha-leech": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "giancarlo-alonso": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "keandrea-aiken": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "lindsey-mckenna": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "reggie-hutcherson": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "teresa-chantay-butler": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
  "tracy-henderson": {
    priority: 5,
    credibility: 5,
    featured: false,
    conversionPotential: "medium",
  },
};

/**
 * Convert filename to slug format
 */
function fileNameToSlug(fileName) {
  return fileName
    .replace(".pdf", "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Extract key quotes from text using pattern matching
 */
function extractKeyQuotes(text, maxQuotes = 3) {
  const quotes = [];

  // Look for direct quote patterns
  const quotePatterns = [
    /["""]([^"""]{50,200})["""]/g,
    /JAHmere\s+([^.!?]{30,150}[.!?])/gi,
    /character\s+([^.!?]{30,150}[.!?])/gi,
    /transformation\s+([^.!?]{30,150}[.!?])/gi,
    /believe\s+([^.!?]{30,150}[.!?])/gi,
  ];

  for (const pattern of quotePatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const quote = match[1] || match[0];
      if (quote && quote.length > 30 && quote.length < 200) {
        quotes.push(quote.trim());
      }
    }
  }

  // Remove duplicates and return top quotes
  return [...new Set(quotes)].slice(0, maxQuotes);
}

/**
 * Analyze themes in the text
 */
function analyzeThemes(text) {
  const themes = [];
  const themeKeywords = {
    transformation: ["transform", "change", "growth", "development", "evolv"],
    character: ["character", "integrity", "honest", "moral", "ethical"],
    family_values: [
      "family",
      "father",
      "parent",
      "family values",
      "upbringing",
    ],
    redemption: ["redemption", "second chance", "forgive", "mercy", "grace"],
    leadership: ["leader", "leadership", "mentor", "guide", "example"],
    community_impact: ["community", "impact", "help", "service", "volunteer"],
    responsibility: ["responsible", "accountability", "own up", "mature"],
    potential: ["potential", "future", "possibility", "capable", "ability"],
  };

  const lowercaseText = text.toLowerCase();

  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword)) {
        themes.push(theme);
        break;
      }
    }
  }

  return [...new Set(themes)];
}

/**
 * Extract author information from text
 */
function extractAuthorInfo(text, fileName) {
  const authorName = fileName.replace(".pdf", "");

  // Try to extract title/organization from text
  const titlePatterns = [
    /I am ([^.!?\n]+)/i,
    /As (?:a |an )?([^,.\n]+),/i,
    /My name is [^,]+ and I (?:am|work as) ([^.!?\n]+)/i,
  ];

  let title = "";
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length < 100) {
      title = match[1].trim();
      break;
    }
  }

  // Try to extract relationship
  const relationshipPatterns = [
    /(?:I have )?known JAHmere (?:for |as )?([^.!?\n]+)/i,
    /JAHmere (?:is |was )?(?:my |a )?([^.!?\n]+)/i,
    /relationship (?:with JAHmere )?(?:is |as )?([^.!?\n]+)/i,
  ];

  let relationship = "";
  for (const pattern of relationshipPatterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length < 100) {
      relationship = match[1].trim();
      break;
    }
  }

  return {
    name: authorName,
    title: title || "",
    relationship: relationship || "",
    organization: "",
  };
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Determine emotional tone
 */
function analyzeEmotionalTone(text) {
  const passionateWords = [
    "passionate",
    "driven",
    "committed",
    "dedicated",
    "strong",
    "powerful",
  ];
  const heartfeltWords = [
    "heart",
    "sincere",
    "genuine",
    "deep",
    "profound",
    "meaningful",
    "love",
  ];
  const professionalWords = [
    "professional",
    "work",
    "business",
    "colleague",
    "organization",
    "company",
  ];
  const urgentWords = [
    "urgent",
    "immediate",
    "critical",
    "important",
    "necessary",
    "must",
  ];
  const hopefulWords = [
    "hope",
    "believe",
    "trust",
    "faith",
    "positive",
    "optimistic",
    "future",
  ];
  const determinedWords = [
    "determined",
    "resolved",
    "focused",
    "committed",
    "dedicated",
    "steadfast",
  ];
  const compassionateWords = [
    "compassion",
    "care",
    "understanding",
    "empathy",
    "kindness",
    "support",
  ];

  const lowercaseText = text.toLowerCase();

  let passionateCount = 0;
  let heartfeltCount = 0;
  let professionalCount = 0;
  let urgentCount = 0;
  let hopefulCount = 0;
  let determinedCount = 0;
  let compassionateCount = 0;

  passionateWords.forEach((word) => {
    if (lowercaseText.includes(word)) passionateCount++;
  });

  heartfeltWords.forEach((word) => {
    if (lowercaseText.includes(word)) heartfeltCount++;
  });

  professionalWords.forEach((word) => {
    if (lowercaseText.includes(word)) professionalCount++;
  });

  urgentWords.forEach((word) => {
    if (lowercaseText.includes(word)) urgentCount++;
  });

  hopefulWords.forEach((word) => {
    if (lowercaseText.includes(word)) hopefulCount++;
  });

  determinedWords.forEach((word) => {
    if (lowercaseText.includes(word)) determinedCount++;
  });

  compassionateWords.forEach((word) => {
    if (lowercaseText.includes(word)) compassionateCount++;
  });

  // Find the highest scoring tone
  const scores = [
    { tone: "passionate", count: passionateCount },
    { tone: "heartfelt", count: heartfeltCount },
    { tone: "professional", count: professionalCount },
    { tone: "urgent", count: urgentCount },
    { tone: "hopeful", count: hopefulCount },
    { tone: "determined", count: determinedCount },
    { tone: "compassionate", count: compassionateCount },
  ];

  scores.sort((a, b) => b.count - a.count);

  // Return the highest scoring tone, or default to 'heartfelt' if no words found
  return scores[0].count > 0 ? scores[0].tone : "heartfelt";
}

/**
 * Process a single PDF file
 */
async function processPDF(filePath, fileName) {
  try {
    console.log(`Processing: ${fileName}`);

    const pdfBuffer = await fs.readFile(filePath);
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    if (!text || text.length < 100) {
      console.log(`Warning: ${fileName} has insufficient text content`);
      return null;
    }

    const slug = fileNameToSlug(fileName);
    const priority = WITNESS_PRIORITY[slug] || {
      priority: 5,
      credibility: 5,
      featured: false,
      conversionPotential: "medium",
    };

    const authorInfo = extractAuthorInfo(text, fileName);
    const keyQuotes = extractKeyQuotes(text);
    const themes = analyzeThemes(text);
    const wordCount = text.split(/\s+/).length;
    const readingTime = calculateReadingTime(text);
    const emotionalTone = analyzeEmotionalTone(text);

    // Calculate impact score based on content quality and priority
    const baseScore = priority.priority * 10;
    const contentBonus = Math.min(keyQuotes.length * 5, 15);
    const themeBonus = Math.min(themes.length * 3, 15);
    const lengthBonus = wordCount > 500 ? 10 : wordCount > 300 ? 5 : 0;

    const impactScore = Math.min(
      baseScore + contentBonus + themeBonus + lengthBonus,
      100,
    );

    const result = {
      id: slug,
      slug: slug,
      author: {
        ...authorInfo,
        credibilityScore: priority.credibility,
      },
      content: {
        fullText: text,
        keyQuotes: keyQuotes,
        themes: themes,
        emotionalTone: emotionalTone,
        callsToAction: [
          "Support character transformation",
          "Believe in second chances",
          "Join the movement for justice",
        ],
      },
      metadata: {
        dateWritten: new Date().toISOString().split("T")[0],
        letterType: "character",
        impactScore: impactScore,
        featured: priority.featured,
        wordCount: wordCount,
        readingTimeMinutes: readingTime,
        conversionPotential: priority.conversionPotential,
      },
      analytics: {
        viewCount: 0,
        uniqueViews: 0,
        averageReadTime: 0,
        completionRate: 0,
        shareCount: 0,
        quotesHighlighted: 0,
        conversionEvents: 0,
      },
      display: {
        priority: priority.priority,
        showFullLetter: true,
        featuredQuote: keyQuotes[0] || "",
        backgroundColor: priority.featured ? "#fef3c7" : "#f8fafc",
      },
    };

    console.log(
      `✅ Processed ${fileName}: ${wordCount} words, ${keyQuotes.length} quotes, impact score: ${impactScore}`,
    );
    return result;
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error.message);
    return null;
  }
}

/**
 * Main extraction function
 */
async function extractAllContent() {
  try {
    console.log("🚀 Starting character witness content extraction...");

    // Read PDF directory
    const files = await fs.readdir(PDF_DIRECTORY);
    const pdfFiles = files.filter((file) => file.endsWith(".pdf"));

    console.log(`Found ${pdfFiles.length} PDF files to process`);

    const extractedData = [];

    // Process each PDF
    for (const fileName of pdfFiles) {
      const filePath = path.join(PDF_DIRECTORY, fileName);
      const result = await processPDF(filePath, fileName);

      if (result) {
        extractedData.push(result);
      }
    }

    // Sort by priority (highest first)
    extractedData.sort((a, b) => b.display.priority - a.display.priority);

    // Generate TypeScript output
    const outputContent = `// Auto-generated character witness content
// Generated: ${new Date().toISOString()}
// Total letters: ${extractedData.length}

import type { CharacterWitnessLetter } from "@/types/character-witness";

export const extractedCharacterWitnessLetters: CharacterWitnessLetter[] = ${JSON.stringify(extractedData, null, 2)};

// Helper functions
export const getFeaturedWitnesses = () => {
  return extractedCharacterWitnessLetters.filter(letter => letter.metadata.featured);
};

export const getHighImpactWitnesses = () => {
  return extractedCharacterWitnessLetters.filter(letter => letter.metadata.impactScore >= 70);
};

export const getWitnessBySlug = (slug: string) => {
  return extractedCharacterWitnessLetters.find(letter => letter.slug === slug);
};

// Analytics summary
export const getContentSummary = () => {
  const totalWords = extractedCharacterWitnessLetters.reduce((sum, letter) => sum + letter.metadata.wordCount, 0);
  const avgImpactScore = extractedCharacterWitnessLetters.reduce((sum, letter) => sum + letter.metadata.impactScore, 0) / extractedCharacterWitnessLetters.length;
  
  return {
    totalLetters: extractedCharacterWitnessLetters.length,
    totalWords,
    averageWordCount: Math.round(totalWords / extractedCharacterWitnessLetters.length),
    averageImpactScore: Math.round(avgImpactScore),
    featuredCount: getFeaturedWitnesses().length,
    highImpactCount: getHighImpactWitnesses().length
  };
};
`;

    // Write the output file
    await fs.writeFile(OUTPUT_FILE, outputContent, "utf8");

    // Generate summary report
    const summary = {
      totalProcessed: extractedData.length,
      featuredWitnesses: extractedData.filter((w) => w.metadata.featured)
        .length,
      highImpactWitnesses: extractedData.filter(
        (w) => w.metadata.impactScore >= 70,
      ).length,
      averageWordCount: Math.round(
        extractedData.reduce((sum, w) => sum + w.metadata.wordCount, 0) /
          extractedData.length,
      ),
      averageImpactScore: Math.round(
        extractedData.reduce((sum, w) => sum + w.metadata.impactScore, 0) /
          extractedData.length,
      ),
      topWitnesses: extractedData.slice(0, 3).map((w) => ({
        name: w.author.name,
        impactScore: w.metadata.impactScore,
        featured: w.metadata.featured,
      })),
    };

    console.log("\n📊 EXTRACTION SUMMARY:");
    console.log(`✅ Total letters processed: ${summary.totalProcessed}`);
    console.log(`⭐ Featured witnesses: ${summary.featuredWitnesses}`);
    console.log(`🎯 High-impact witnesses: ${summary.highImpactWitnesses}`);
    console.log(`📝 Average word count: ${summary.averageWordCount}`);
    console.log(`💯 Average impact score: ${summary.averageImpactScore}`);
    console.log("\n🏆 TOP WITNESSES:");
    summary.topWitnesses.forEach((witness, index) => {
      console.log(
        `${index + 1}. ${witness.name} (Score: ${witness.impactScore}${witness.featured ? ", Featured" : ""})`,
      );
    });

    console.log(`\n✅ Content extracted to: ${OUTPUT_FILE}`);
    console.log("🚀 Ready for conversion optimization!");

    return summary;
  } catch (error) {
    console.error("❌ Error during extraction:", error);
    throw error;
  }
}

// Run extraction if called directly
if (require.main === module) {
  extractAllContent()
    .then(() => {
      console.log(
        "\n🎉 Character witness content extraction completed successfully!",
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Extraction failed:", error);
      process.exit(1);
    });
}

module.exports = { extractAllContent, processPDF };
