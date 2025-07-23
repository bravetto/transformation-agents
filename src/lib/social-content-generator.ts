import { PersonData, PersonRole } from "@/types/person";
import {
  ShareableContent,
  ShareContentType,
  OpenGraphImageConfig,
  DIVINE_HASHTAGS,
} from "@/types/social-sharing";

/**
 * 🎯 SOCIAL CONTENT GENERATOR
 * Transform PersonData and other content into optimized shareable content
 */

/**
 * Generate shareable content from PersonData
 */
export function generatePersonShareableContent(
  person: PersonData,
): ShareableContent {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://july28freedom.vercel.app";
  const personUrl = `${baseUrl}/people/${person.slug}`;

  // Generate compelling titles based on person's role and story
  const title = generatePersonTitle(person);
  const description = generatePersonDescription(person);

  // Platform-specific content
  const twitterText = generateTwitterText(person);
  const linkedinText = generateLinkedInText(person);
  const facebookText = generateFacebookText(person);
  const emailSubject = generateEmailSubject(person);
  const emailBody = generateEmailBody(person);

  // Generate hashtags
  const hashtags = generatePersonHashtags(person);

  // Determine spiritual impact and divine features
  const spiritualImpact = determinePersonSpiritualImpact(person);
  const prayerWarriorCall = shouldTriggerPrayerCall(person);
  const freedomMissionFocus = isFreedomMissionFocused(person);

  return {
    id: person.id,
    type: "person-profile",
    title,
    description,
    url: personUrl,

    // Open Graph data
    ogTitle: title,
    ogDescription: description,
    ogImage: generatePersonOGImageUrl(person),
    ogType: "profile",

    // Platform-specific content
    twitterText,
    linkedinText,
    facebookText,
    emailSubject,
    emailBody,

    // Quote card data - Fixed null safety
    quoteText:
      person.testimony?.quote ||
      person.quote ||
      `Transforming lives through ${person.name}'s story`,
    quoteAuthor: person.name,
    quoteImage: person.heroImage || person.image,

    // Hashtags and mentions
    hashtags,
    mentions: ["@BridgeProject", "@July28Freedom"],

    // Call-to-action
    ctaText: freedomMissionFocus
      ? "Help JAHmere Gain Freedom"
      : "Support Transformation",
    ctaUrl: personUrl,

    // Divine/spiritual context
    spiritualImpact,
    prayerWarriorCall,
    freedomMissionFocus,
  };
}

/**
 * Generate shareable content for timeline events
 */
export function generateTimelineShareableContent(
  person: PersonData,
  event: any,
  eventIndex: number = 0,
): ShareableContent {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://july28freedom.vercel.app";
  const eventUrl = `${baseUrl}/people/${person.slug}#timeline-event-${eventIndex}`;

  const title = `${person.name}: ${event.title}`;
  const description = `A pivotal moment in ${person.name}'s transformation journey: ${event.description || "Discover how this moment shaped their path to freedom."}`;

  return {
    id: `${person.id}-timeline-${eventIndex}`,
    type: "timeline-event",
    title,
    description,
    url: eventUrl,

    ogTitle: `${event.title} - ${person.name}'s Journey`,
    ogDescription: description,
    ogImage: generateTimelineOGImageUrl(person, event),
    ogType: "article",

    twitterText: `${title}: ${description.substring(0, 180)}... #Transformation #Hope`,
    linkedinText: `I wanted to share this inspiring moment from ${person.name}'s journey: ${event.title}. ${description}`,
    facebookText: `${description} \n\nThis is just one powerful moment from ${person.name}'s incredible transformation story.`,
    emailSubject: `Inspiring Story: ${event.title}`,
    emailBody: `I thought you'd be inspired by this moment from ${person.name}'s journey:\n\n${event.title}\n\n${description}\n\nRead more about their complete transformation:`,

    quoteText: event.description,
    quoteAuthor: person.name,

    hashtags: [
      ...DIVINE_HASHTAGS.transformation,
      "#Timeline",
      `#${person.name.replace(/\s+/g, "")}`,
    ],
    mentions: ["@BridgeProject"],

    ctaText: "See Full Timeline",
    ctaUrl: eventUrl,

    spiritualImpact: event.type === "divine" ? "high" : "medium",
    prayerWarriorCall: event.type === "divine" || person.id === "jahmere-webb",
    freedomMissionFocus: person.id === "jahmere-webb",
  };
}

/**
 * Generate shareable content for prayer requests
 */
export function generatePrayerShareableContent(
  person: PersonData,
  customMessage?: string,
): ShareableContent {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://july28freedom.vercel.app";
  const prayerUrl = `${baseUrl}/prayer-room?for=${person.slug}`;

  const isJAHmere = person.id === "jahmere-webb";
  const title = isJAHmere
    ? "🙏 Pray for JAHmere's Freedom - July 28th"
    : `🙏 Pray for ${person.name}`;

  const description =
    customMessage ||
    (isJAHmere
      ? "Join thousands in prayer for JAHmere Webb's freedom on July 28th. Every prayer is a step toward divine intervention."
      : `Join us in prayer for ${person.name}. Your prayers strengthen the divine network of transformation and hope.`);

  return {
    id: `${person.id}-prayer`,
    type: "prayer-request",
    title,
    description,
    url: prayerUrl,

    ogTitle: title,
    ogDescription: description,
    ogImage: generatePrayerOGImageUrl(person),
    ogType: "article",

    twitterText: `${title} ${description.substring(0, 150)}... #PrayForJAHmere #DivineIntervention`,
    linkedinText: `I'm asking for your prayers: ${description}`,
    facebookText: `🙏 Prayer Request 🙏\n\n${description}\n\nWill you join me in prayer?`,
    emailSubject: `Prayer Request: ${person.name}`,
    emailBody: `I wanted to ask for your prayers for ${person.name}.\n\n${description}\n\nJoin our prayer community:`,

    quoteText: isJAHmere
      ? "Divine intervention is not just possible - it's promised for those who seek justice."
      : "In prayer, we find the strength to transform not just ourselves, but our communities.",
    quoteAuthor: "The Bridge Project",

    hashtags: [...DIVINE_HASHTAGS.prayer, ...DIVINE_HASHTAGS.divine],
    mentions: ["@BridgeProject", "@PrayerWarriors"],

    ctaText: "Add Your Prayer",
    ctaUrl: prayerUrl,

    spiritualImpact: "miraculous",
    prayerWarriorCall: true,
    freedomMissionFocus: isJAHmere,
  };
}

/**
 * Generate freedom countdown shareable content
 */
export function generateFreedomCountdownContent(): ShareableContent {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://july28freedom.vercel.app";
  const countdownUrl = `${baseUrl}/july-28-portal`;

  // Calculate days until July 28th
  const freedomDate = new Date("2025-07-28");
  const now = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((freedomDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const title =
    daysLeft > 0
      ? `🚨 ${daysLeft} Days Until JAHmere's Freedom - July 28th`
      : "🕊️ Today is JAHmere's Freedom Day!";

  const description =
    daysLeft > 0
      ? `The countdown is on! Only ${daysLeft} days until JAHmere Webb walks free on July 28th. Your support, prayers, and shares can help make this divine intervention a reality.`
      : "Today marks the day we've been praying for - JAHmere Webb's freedom! Witness the power of divine intervention and community support.";

  return {
    id: "freedom-countdown",
    type: "freedom-countdown",
    title,
    description,
    url: countdownUrl,

    ogTitle: title,
    ogDescription: description,
    ogImage: generateCountdownOGImageUrl(daysLeft),
    ogType: "website",

    twitterText: `🚨 URGENT: ${daysLeft} days until #JAHmereFreedom! RT to spread awareness. #July28th #Justice`,
    linkedinText: `I'm following JAHmere Webb's transformation story. ${description}`,
    facebookText: `${title}\n\n${description}\n\nEvery share brings us closer to justice! 🙏`,
    emailSubject: `Important Update: ${daysLeft} Days Until July 28th`,
    emailBody: `I wanted to update you on JAHmere Webb's freedom date:\n\n${description}\n\nStay connected with the countdown:`,

    quoteText: `"Justice delayed is justice denied, but divine timing is perfect. ${daysLeft} days until freedom."`,
    quoteAuthor: "JAHmere Webb Freedom Movement",

    hashtags: [...DIVINE_HASHTAGS.freedom, "#Countdown", "#Justice"],
    mentions: ["@July28Freedom", "@BridgeProject"],

    ctaText: daysLeft > 0 ? "Join the Countdown" : "Celebrate Freedom",
    ctaUrl: countdownUrl,

    spiritualImpact: "miraculous",
    prayerWarriorCall: true,
    freedomMissionFocus: true,
  };
}

// Helper functions

function generatePersonTitle(person: PersonData): string {
  const roleDescriptions = {
    lightworker: "Lightworker",
    messenger: "Divine Messenger",
    witness: "Witness",
    guardian: "Guardian",
  };

  const roleDesc = roleDescriptions[person.role as PersonRole] || "Transformer";

  if (person.id === "jahmere-webb") {
    return "🕊️ JAHmere Webb: Freedom Fighter & Transformation Champion";
  }

  return `${person.name}: ${roleDesc} & Bridge Builder`;
}

function generatePersonDescription(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "Discover JAHmere Webb's powerful transformation story and join the movement for his freedom on July 28th. One story that could change everything.";
  }

  const baseDesc = (() => {
    const section = person.sections?.find(
      (s) => s.type === "testimony" || s.type === "hero",
    );
    if (section) {
      if (
        section.type === "testimony" &&
        "description" in section.content &&
        section.content.description
      ) {
        return section.content.description;
      }
      if (
        section.type === "hero" &&
        "description" in section.content &&
        section.content.description
      ) {
        return section.content.description;
      }
    }
    return (
      person.bio ||
      person.extendedBio ||
      `${person.name} is transforming lives through The Bridge Project.`
    );
  })();

  return baseDesc.length > 160 ? baseDesc.substring(0, 157) + "..." : baseDesc;
}

function generateTwitterText(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "🔥 JAHmere Webb's transformation story proves that change is possible for everyone. Join the movement for his freedom! #JAHmereFreedom #July28th #Transformation";
  }

  return `Inspiring transformation story: ${person.name} is building bridges in their community through The Bridge Project. #Transformation #Hope`;
}

function generateLinkedInText(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "I wanted to share JAHmere Webb's incredible transformation story. His journey from incarceration to inspiring others shows the power of second chances and divine intervention. July 28th could be his freedom day - and your support matters.";
  }

  return `I wanted to highlight ${person.name}'s inspiring work with The Bridge Project. Their story demonstrates the power of transformation and community building.`;
}

function generateFacebookText(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "🙏 Friends, I need to share JAHmere Webb's story with you. This young man has completely transformed his life and is now inspiring others. He has a chance at freedom on July 28th, and our community support could make the difference. Please read his story and share if it touches your heart. ❤️";
  }

  return `❤️ I had to share ${person.name}'s story! They're doing incredible work through The Bridge Project, showing how one person can make a real difference in their community. Their journey is proof that transformation is always possible! 🌟`;
}

function generateEmailSubject(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "Inspiring Story: JAHmere Webb's Path to Freedom";
  }

  return `Inspiring Transformation: ${person.name}'s Story`;
}

function generateEmailBody(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "I came across JAHmere Webb's transformation story and had to share it with you. His journey shows the incredible power of second chances and personal transformation.\n\nJAHmere has a chance at freedom on July 28th, and community support is crucial.\n\nRead his full story here:";
  }

  return `I wanted to share ${person.name}'s inspiring story with you. They're making a real difference through The Bridge Project, and their journey shows what's possible when we commit to transformation.\n\nCheck out their story:`;
}

function generatePersonHashtags(person: PersonData): string[] {
  const baseHashtags = ["#BridgeProject", "#Transformation"];

  if (person.id === "jahmere-webb") {
    return [
      ...DIVINE_HASHTAGS.freedom,
      ...DIVINE_HASHTAGS.justice,
      "#JAHmereWebb",
    ];
  }

  // Role-specific hashtags
  const roleHashtags = {
    lightworker: ["#LightWorker", "#Hope", "#Healing"],
    messenger: ["#Messenger", "#Truth", "#Inspiration"],
    witness: ["#Witness", "#Testimony", "#Change"],
    guardian: ["#Guardian", "#Protection", "#Community"],
  };

  return [...baseHashtags, ...(roleHashtags[person.role as PersonRole] || [])];
}

function generateInspirationalQuote(person: PersonData): string {
  if (person.id === "jahmere-webb") {
    return "Every day I choose transformation over despair, hope over fear. My story isn't over - it's just beginning.";
  }

  const quotes = [
    "Transformation isn't just possible - it's inevitable when we commit to growth.",
    "Building bridges means connecting hearts, changing minds, and transforming communities.",
    "Every person has the power to rewrite their story and impact others.",
    "The Bridge Project isn't just about crossing over - it's about bringing others with you.",
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}

function determinePersonSpiritualImpact(
  person: PersonData,
): "low" | "medium" | "high" | "miraculous" {
  if (person.id === "jahmere-webb") return "miraculous";
  if (person.role === "lightworker" || person.role === "messenger")
    return "high";
  return "medium";
}

function shouldTriggerPrayerCall(person: PersonData): boolean {
  return person.id === "jahmere-webb" || person.role === "lightworker";
}

function isFreedomMissionFocused(person: PersonData): boolean {
  return person.id === "jahmere-webb";
}

// OG Image URL generators
/**
 * Generate Open Graph image URL for person
 */
function generatePersonOGImageUrl(person: PersonData): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://transformation-agents-jahmere-bridge.vercel.app";

  // Use dynamic OG image generation
  const params = new URLSearchParams({
    name: person.name,
    role: person.role || "lightworker",
  });

  // Add image if available
  if (person.heroImage) {
    params.set("image", person.heroImage);
  } else if (person.image) {
    params.set("image", person.image);
  }

  return `${baseUrl}/api/og/person?${params.toString()}`;
}

function generateTimelineOGImageUrl(person: PersonData, event: any): string {
  const params = new URLSearchParams({
    template: "timeline-event",
    title: event.title,
    subtitle: person.name,
    description: event.description || "",
    role: person.role || "lightworker",
  });

  return `/api/social-share/og-image?${params.toString()}`;
}

function generatePrayerOGImageUrl(person: PersonData): string {
  const params = new URLSearchParams({
    template: "prayer-card",
    title: `Pray for ${person.name}`,
    description: "Join our community in prayer",
    role: person.role || "lightworker",
    divineGlow: "true",
    spiritualSymbols: "true",
  });

  return `/api/social-share/og-image?${params.toString()}`;
}

function generateCountdownOGImageUrl(daysLeft: number): string {
  const params = new URLSearchParams({
    template: "impact-stat",
    title: daysLeft.toString(),
    subtitle: daysLeft > 0 ? "Days Until Freedom" : "Freedom Day!",
    description: "JAHmere Webb - July 28th",
    primaryColor: "#F59E0B",
    secondaryColor: "#3B82F6",
    divineGlow: "true",
    particles: "true",
  });

  return `/api/social-share/og-image?${params.toString()}`;
}
