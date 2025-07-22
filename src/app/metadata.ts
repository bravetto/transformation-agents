import type { Metadata, Viewport } from "next";

// Site configuration for consistency
const siteConfig = {
  name: "The Bridge Project",
  title: "The Bridge Project - JAHmere Webb Freedom Portal",
  description:
    "Divine transformation through justice. Supporting JAHmere Webb's journey to freedom while building bridges in our community through faith, leadership, and positive change.",
  url: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://july28freedom.vercel.app"
      : "http://localhost:1437",
  ogImage: "/images/og/bridge-project-social.jpg",
  creator: "The Bridge Project Team",
  keywords: [
    "JAHmere Webb",
    "criminal justice reform",
    "community transformation",
    "second chances",
    "faith-based rehabilitation",
    "Tony Dungy",
    "Judge Ferrero",
    "Orange County justice",
    "community bridges",
    "positive change",
  ],
};

/**
 * 🎯 PRODUCTION-GRADE SEO METADATA
 * Optimized for Core Web Vitals, search ranking, and social sharing
 */
export const defaultMetadata: Metadata = {
  // Basic Meta
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    { name: "The Bridge Project Team" },
    { name: "JAHmere Webb", url: "/people/jahmere-webb" },
    { name: "Tony Dungy", url: "/people/tony-dungy" },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.name,

  // Verification and Analytics
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION_CODE || "",
    },
  },

  // Robots and Crawling
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": 60,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og/bridge-project-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "The Bridge Project - Building Community Through Faith and Justice",
        type: "image/jpeg",
      },
      {
        url: `${siteConfig.url}/images/og/jahmere-webb-story.jpg`,
        width: 1200,
        height: 630,
        alt: "JAHmere Webb - A Story of Transformation",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@BridgeProjectOrg",
    images: [`${siteConfig.url}/images/og/bridge-project-twitter.jpg`],
  },

  // Additional Meta
  category: "Social Impact",
  classification: "Community Organization",

  // Structured Data hints
  other: {
    "theme-color": "#3B82F6", // Blue-500
    "color-scheme": "light",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "application-name": siteConfig.name,
    "apple-mobile-web-app-title": siteConfig.name,
    "msapplication-TileColor": "#3B82F6",
    "msapplication-config": "/browserconfig.xml",
  },
};

/**
 * 🚀 VIEWPORT CONFIGURATION
 * Optimized for Core Web Vitals and mobile performance
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light",
};

/**
 * 🎯 PAGE-SPECIFIC METADATA GENERATORS
 */

// Person Profile Metadata
export function generatePersonMetadata({
  name,
  role,
  description,
  imagePath,
  slug,
}: {
  name: string;
  role: string;
  description: string;
  imagePath?: string;
  slug: string;
}): Metadata {
  return {
    title: `${name} - ${role} | Character Witness`,
    description: `Learn about ${name}, ${role}, and their support for JAHmere Webb's transformation journey. ${description}`,
    openGraph: {
      title: `${name} - Character Witness for JAHmere Webb`,
      description,
      images: [
        {
          url: `${siteConfig.url}${imagePath || "/images/og/default-person.jpg"}`,
          width: 1200,
          height: 630,
          alt: `${name} - ${role}`,
        },
      ],
    },
    twitter: {
      title: `${name} - ${role}`,
      description,
      images: [
        `${siteConfig.url}${imagePath || "/images/og/default-person.jpg"}`,
      ],
    },
    alternates: {
      canonical: `${siteConfig.url}/people/${slug}`,
    },
  };
}

// Legal Page Metadata
export function generateLegalMetadata({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date?: string;
}): Metadata {
  return {
    title: `${title} | Legal Documentation`,
    description,
    openGraph: {
      title: `${title} - JAHmere Webb Legal Case`,
      description,
      type: "article",
      publishedTime: date,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Campaign Page Metadata
export function generateCampaignMetadata({
  title,
  description,
  image,
  slug,
}: {
  title: string;
  description: string;
  image?: string;
  slug: string;
}): Metadata {
  return {
    title: `${title} | Community Action`,
    description,
    openGraph: {
      title: `${title} - Join The Movement`,
      description,
      images: [
        {
          url: `${siteConfig.url}${image || "/images/og/campaign-default.jpg"}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `${siteConfig.url}/campaigns/${slug}`,
    },
  };
}

// Export with original name for layout compatibility
export const metadata = defaultMetadata;
export { siteConfig };
