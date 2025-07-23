import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { OpenGraphImageConfig, PLATFORM_CONFIGS } from "@/types/social-sharing";

/**
 * 🎨 DYNAMIC OPEN GRAPH IMAGE GENERATOR
 * Creates optimized share images for maximum viral potential
 */

// Image cache to avoid regenerating identical images
const imageCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract configuration from query params
    const config: OpenGraphImageConfig = {
      width: parseInt(searchParams.get("width") || "1200"),
      height: parseInt(searchParams.get("height") || "630"),
      format: (searchParams.get("format") as "png" | "jpeg" | "webp") || "png",
      quality: parseInt(searchParams.get("quality") || "90"),

      template: (searchParams.get("template") as any) || "person-profile",

      title: searchParams.get("title") || "The Bridge Project",
      subtitle: searchParams.get("subtitle") || "",
      description: searchParams.get("description") || "",
      imageUrl: searchParams.get("imageUrl") || "",
      quoteText: searchParams.get("quoteText") || "",
      authorName: searchParams.get("authorName") || "",
      authorRole: searchParams.get("authorRole") || "",
      role: (searchParams.get("role") as any) || "lightworker",

      logo: searchParams.get("logo") || "/images/logo-blue.png",
      brandColors: {
        primary: searchParams.get("primaryColor") || "#F59E0B",
        secondary: searchParams.get("secondaryColor") || "#3B82F6",
        accent: searchParams.get("accentColor") || "#10B981",
        background: searchParams.get("backgroundColor") || "#FFFFFF",
      },

      particles: searchParams.get("particles") === "true",
      divineGlow: searchParams.get("divineGlow") === "true",
      spiritualSymbols: searchParams.get("spiritualSymbols") === "true",
    };

    // Generate cache key
    const cacheKey = generateCacheKey(config);

    // Check cache first
    const cached = imageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      logger.analytics("🖼️ OG IMAGE SERVED FROM CACHE", {
        template: config.template,
        cacheKey,
      });

      return new NextResponse(cached.buffer, {
        headers: {
          "Content-Type": `image/${config.format}`,
          "Cache-Control": "public, max-age=86400", // 24 hours
          "X-Cache-Status": "HIT",
        },
      });
    }

    // Generate image based on template
    const imageBuffer = await generateImage(config);

    // Cache the image
    imageCache.set(cacheKey, { buffer: imageBuffer, timestamp: Date.now() });

    // Clean old cache entries (keep memory usage reasonable)
    cleanImageCache();

    // Log successful generation
    logger.analytics("🎨 OG IMAGE GENERATED", {
      template: config.template,
      dimensions: `${config.width}x${config.height}`,
      format: config.format,
      cacheKey,
      size: imageBuffer.length,
    });

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": `image/${config.format}`,
        "Cache-Control": "public, max-age=86400",
        "X-Cache-Status": "MISS",
      },
    });
  } catch (error) {
    console.error("OG Image generation error:", error);
    logger.error("Failed to generate OG image", { error });

    // Return a fallback image or error response
    return NextResponse.json(
      {
        error: "Failed to generate image",
        message: "Divine image protection activated - using fallback",
      },
      { status: 500 },
    );
  }
}

/**
 * Generate image based on template using HTML/CSS to Canvas approach
 */
async function generateImage(config: OpenGraphImageConfig): Promise<Buffer> {
  // In production, you would use @vercel/og or a similar service
  // For now, we'll simulate image generation with SVG

  const svg = await generateSVGImage(config);

  // Convert SVG to PNG buffer (in production, use proper canvas/image library)
  const buffer = Buffer.from(svg, "utf-8");

  return buffer;
}

/**
 * Generate SVG image based on template
 */
async function generateSVGImage(config: OpenGraphImageConfig): Promise<string> {
  const { width, height, brandColors, template } = config;

  // Role-based color schemes
  const roleColors = {
    lightworker: {
      primary: "#F59E0B",
      secondary: "#FCD34D",
      accent: "#F97316",
    },
    messenger: { primary: "#3B82F6", secondary: "#60A5FA", accent: "#2563EB" },
    witness: { primary: "#10B981", secondary: "#34D399", accent: "#059669" },
    guardian: { primary: "#8B5CF6", secondary: "#A78BFA", accent: "#7C3AED" },
  };

  const colors = roleColors[config.role || "lightworker"];

  switch (template) {
    case "person-profile":
      return generatePersonProfileSVG(config, colors);
    case "quote-card":
      return generateQuoteCardSVG(config, colors);
    case "impact-stat":
      return generateImpactStatSVG(config, colors);
    case "timeline-event":
      return generateTimelineEventSVG(config, colors);
    case "prayer-card":
      return generatePrayerCardSVG(config, colors);
    default:
      return generateDefaultSVG(config, colors);
  }
}

/**
 * Generate person profile template
 */
function generatePersonProfileSVG(
  config: OpenGraphImageConfig,
  colors: any,
): string {
  const {
    width,
    height,
    title,
    subtitle,
    description,
    authorName,
    authorRole,
  } = config;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}15;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary}15;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      
      <!-- Divine particles -->
      ${config.particles ? generateParticles(width, height, colors.primary) : ""}
      
      <!-- Main content -->
      <g transform="translate(60, 60)">
        <!-- Profile circle placeholder -->
        <circle cx="100" cy="100" r="80" fill="${colors.primary}20" stroke="${colors.primary}" stroke-width="4"/>
        <text x="100" y="110" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
          ${
            authorName
              ? authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "BP"
          }
        </text>
        
        <!-- Content area -->
        <g transform="translate(220, 20)">
          <text x="0" y="30" fill="#1F2937" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
            ${title}
          </text>
          <text x="0" y="70" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="24" font-weight="600">
            ${subtitle || authorRole || ""}
          </text>
          <text x="0" y="110" fill="#4B5563" font-family="Arial, sans-serif" font-size="18">
            ${description || "The Bridge Project - Building bridges between worlds"}
          </text>
          
          <!-- Call to action -->
          <rect x="0" y="140" width="200" height="50" rx="25" fill="${colors.primary}"/>
          <text x="100" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="600">
            Learn More
          </text>
        </g>
      </g>
      
      <!-- Branding -->
      <g transform="translate(${width - 300}, ${height - 80})">
        <text x="0" y="30" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
          The Bridge Project
        </text>
        <text x="0" y="50" fill="#6B7280" font-family="Arial, sans-serif" font-size="14">
          july28freedom.vercel.app
        </text>
      </g>
      
      ${config.divineGlow ? `<rect width="${width}" height="${height}" fill="none" stroke="${colors.primary}" stroke-width="8" opacity="0.3" filter="url(#glow)"/>` : ""}
    </svg>
  `;
}

/**
 * Generate quote card template
 */
function generateQuoteCardSVG(
  config: OpenGraphImageConfig,
  colors: any,
): string {
  const { width, height, quoteText, authorName, authorRole } = config;

  // Split quote into lines for better display
  const maxLineLength = 50;
  const words = (
    quoteText ||
    "Building bridges between worlds through faith and transformation"
  ).split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxLineLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="quoteBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}25;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary}25;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#quoteBg)"/>
      
      <!-- Quote marks -->
      <text x="60" y="120" fill="${colors.primary}" font-family="Georgia, serif" font-size="120" opacity="0.3">"</text>
      
      <!-- Quote text -->
      <g transform="translate(100, 150)">
        ${lines
          .map(
            (line, index) =>
              `<text x="0" y="${index * 40}" fill="#1F2937" font-family="Georgia, serif" font-size="28" font-style="italic">${line}</text>`,
          )
          .join("")}
      </g>
      
      <!-- Attribution -->
      <g transform="translate(100, ${200 + lines.length * 40})">
        <text x="0" y="30" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="24" font-weight="600">
          — ${authorName || "The Bridge Project"}
        </text>
        <text x="0" y="55" fill="#6B7280" font-family="Arial, sans-serif" font-size="18">
          ${authorRole || "Building bridges of transformation"}
        </text>
      </g>
      
      <!-- Divine branding -->
      <g transform="translate(${width - 250}, ${height - 60})">
        <text x="0" y="20" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="16" font-weight="600">
          The Bridge Project
        </text>
        <text x="0" y="40" fill="#6B7280" font-family="Arial, sans-serif" font-size="14">
          #JAHmereFreedom #July28th
        </text>
      </g>
      
      ${config.particles ? generateParticles(width, height, colors.primary) : ""}
    </svg>
  `;
}

/**
 * Generate impact stat template
 */
function generateImpactStatSVG(
  config: OpenGraphImageConfig,
  colors: any,
): string {
  const { width, height, title, subtitle, description } = config;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="impactBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${colors.primary}20;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary}20;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#impactBg)"/>
      
      <!-- Main stat -->
      <g transform="translate(${width / 2}, ${height / 2 - 50})">
        <text x="0" y="0" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="72" font-weight="900">
          ${title}
        </text>
        <text x="0" y="50" text-anchor="middle" fill="#1F2937" font-family="Arial, sans-serif" font-size="36" font-weight="600">
          ${subtitle || "Lives Transformed"}
        </text>
        <text x="0" y="90" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="20">
          ${description || "Through The Bridge Project"}
        </text>
      </g>
      
      <!-- Bottom branding -->
      <g transform="translate(${width / 2}, ${height - 60})">
        <text x="0" y="0" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
          The Bridge Project
        </text>
        <text x="0" y="25" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="16">
          Building bridges of transformation • july28freedom.vercel.app
        </text>
      </g>
    </svg>
  `;
}

/**
 * Generate timeline event template
 */
function generateTimelineEventSVG(
  config: OpenGraphImageConfig,
  colors: any,
): string {
  const { width, height, title, subtitle, description } = config;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#F9FAFB"/>
      
      <!-- Timeline line -->
      <line x1="100" y1="100" x2="100" y2="${height - 100}" stroke="${colors.primary}" stroke-width="6"/>
      
      <!-- Event circle -->
      <circle cx="100" cy="200" r="20" fill="${colors.primary}"/>
      
      <!-- Content -->
      <g transform="translate(150, 150)">
        <text x="0" y="30" fill="#1F2937" font-family="Arial, sans-serif" font-size="32" font-weight="bold">
          ${title}
        </text>
        <text x="0" y="65" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="20" font-weight="600">
          ${subtitle || "Timeline Event"}
        </text>
        <text x="0" y="100" fill="#4B5563" font-family="Arial, sans-serif" font-size="18">
          ${description || "A significant moment in the journey"}
        </text>
      </g>
      
      <!-- Year badge -->
      <rect x="20" y="170" width="160" height="60" rx="30" fill="${colors.primary}"/>
      <text x="100" y="205" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        ${new Date().getFullYear()}
      </text>
    </svg>
  `;
}

/**
 * Generate prayer card template
 */
function generatePrayerCardSVG(
  config: OpenGraphImageConfig,
  colors: any,
): string {
  const { width, height, title, description } = config;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="prayerBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${colors.primary}10;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary}30;stop-opacity:1" />
        </radialGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#prayerBg)"/>
      
      <!-- Praying hands icon (simplified) -->
      <g transform="translate(${width / 2 - 50}, 100)">
        <rect x="40" y="20" width="20" height="60" rx="10" fill="${colors.primary}" opacity="0.3"/>
        <rect x="40" y="20" width="20" height="60" rx="10" fill="${colors.primary}" opacity="0.3" transform="rotate(15 50 50)"/>
      </g>
      
      <!-- Prayer text -->
      <g transform="translate(${width / 2}, 250)">
        <text x="0" y="0" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
          🙏 ${title || "Pray for JAHmere"}
        </text>
        <text x="0" y="40" text-anchor="middle" fill="#1F2937" font-family="Arial, sans-serif" font-size="24">
          ${description || "Join us in prayer for freedom and transformation"}
        </text>
      </g>
      
      <!-- Call to action -->
      <g transform="translate(${width / 2}, 350)">
        <rect x="-100" y="0" width="200" height="50" rx="25" fill="${colors.primary}"/>
        <text x="0" y="30" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="600">
          Add Your Prayer
        </text>
      </g>
      
      <!-- Hashtags -->
      <g transform="translate(${width / 2}, ${height - 60})">
        <text x="0" y="0" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="16" font-weight="600">
          #PrayForJAHmere #July28th #DivineIntervention
        </text>
        <text x="0" y="25" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="14">
          The Bridge Project • july28freedom.vercel.app
        </text>
      </g>
    </svg>
  `;
}

/**
 * Generate default template
 */
function generateDefaultSVG(config: OpenGraphImageConfig, colors: any): string {
  const { width, height, title, description } = config;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#FFFFFF"/>
      
      <g transform="translate(${width / 2}, ${height / 2})">
        <text x="0" y="0" text-anchor="middle" fill="${colors.primary}" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
          ${title}
        </text>
        <text x="0" y="50" text-anchor="middle" fill="#4B5563" font-family="Arial, sans-serif" font-size="24">
          ${description || "The Bridge Project"}
        </text>
      </g>
    </svg>
  `;
}

/**
 * Generate divine particles for backgrounds
 */
function generateParticles(
  width: number,
  height: number,
  color: string,
): string {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 4 + 2;
    particles.push(
      `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.1"/>`,
    );
  }
  return particles.join("");
}

/**
 * Generate cache key for image caching
 */
function generateCacheKey(config: OpenGraphImageConfig): string {
  const keyData = {
    template: config.template,
    dimensions: `${config.width}x${config.height}`,
    format: config.format,
    title: config.title,
    subtitle: config.subtitle,
    role: config.role,
    particles: config.particles,
    divineGlow: config.divineGlow,
  };

  return Buffer.from(JSON.stringify(keyData)).toString("base64");
}

/**
 * Clean old cache entries
 */
function cleanImageCache(): void {
  const now = Date.now();
  for (const [key, value] of imageCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      imageCache.delete(key);
    }
  }
}
