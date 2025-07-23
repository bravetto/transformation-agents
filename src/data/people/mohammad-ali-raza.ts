import { PersonData } from "@/types/person";

export const mohammadAliRaza: PersonData = {
  id: "mohammad-ali-raza",
  slug: "mohammad-ali-raza",
  name: "Mohammad Ali Raza",
  title: "Technology Professional & Community Leader",
  heroImage: "/images/profiles/mohammad-ali-raza.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "guiding",
  themes: ["wisdom", "leadership", "unity"],
  impactLevel: "global",

  testimony: {
    quote:
      "True leadership flows from love, and true architecture emerges from understanding. When we build with both, we create systems that elevate humanity.",
    context: "Mohammad Ali Raza, Solution Architect",
    date: "2024",
  },

  impact: {
    title: "Architecting Divine Solutions",
    description:
      "Building bridges between technology and spirituality through compassionate leadership",
    stats: [
      {
        label: "Systems Transformed",
        value: "100+",
      },
      {
        label: "Teams Led",
        value: "50+",
      },
      {
        label: "Lives Impacted",
        value: "∞",
      },
      {
        label: "Focus",
        value: "Unity",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of Transformation",
        description:
          "Stories of those touched by Mohammad's leadership and vision",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Mohammad showed me that technical excellence and spiritual wisdom aren't opposites—they're two wings of the same bird.",
            author: "Michael Mataluni",
            role: "Spiritual Brother & Partner",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "His gentle guidance and deep technical knowledge create an environment where innovation flourishes naturally.",
            author: "Team Member",
            role: "Senior Developer",
            date: "2023",
          },
          {
            id: "testimony-3",
            quote:
              "Mohammad brings a rare combination of technical mastery and spiritual wisdom that transforms not just systems, but people.",
            author: "Industry Leader",
            role: "Technology Executive",
            date: "2024",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "Building Divine Architecture",
        description:
          "Creating technical and spiritual bridges for global transformation",
        stats: [
          {
            id: "stat-1",
            value: "100+",
            label: "Systems Transformed",
            description: "Technical architectures elevated",
          },
          {
            id: "stat-2",
            value: "50+",
            label: "Teams Led",
            description: "Through compassionate leadership",
          },
          {
            id: "stat-3",
            value: "∞",
            label: "Lives Impacted",
            description: "Through system transformation",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Unifying technology and spirit",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Solution Architecture Pioneer",
            description:
              "Developed innovative approaches to complex technical challenges",
            year: "2010",
          },
          {
            id: "achievement-2",
            title: "Spiritual Leadership Model",
            description:
              "Created framework for leading technical teams with spiritual wisdom",
            year: "2015",
          },
          {
            id: "achievement-3",
            title: "Bravëtto Architecture",
            description:
              "Elevated Bravëtto's technical architecture to world-class standards",
            year: "2023",
          },
          {
            id: "achievement-4",
            title: "Bridge Builder",
            description:
              "Connected technical excellence with spiritual transformation",
            year: "2024",
          },
          {
            id: "achievement-5",
            title: "Eternal Student",
            description: "Continuing to learn and grow while leading others",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "To Those Building the Future",
        body: `
Dear Fellow Architects,

In our quest to build systems that scale, we must remember that the greatest architecture begins with love. Every line of code, every system design, every architectural decision is an opportunity to elevate humanity.

I've learned that true innovation comes not just from technical excellence, but from the harmony between spiritual wisdom and technological advancement. When we build with both heart and mind, we create solutions that transcend mere functionality—we create bridges to human transformation.

Remember: You're not just building systems; you're creating spaces where human potential can flourish. Let love guide your architecture, and watch as your solutions transform not just technology, but lives.

With deep respect and eternal optimism,
Mohammad Ali Raza
`,
        date: "February 2024",
        signature: "/images/signatures/mohammad-ali-raza.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "Divine Architecture Principles",
        description: "The sacred foundations of transformative solutions",
        component: "ArchitecturePrinciples",
        props: {
          principles: [
            {
              name: "Lead with Love",
              description:
                "Compassionate guidance creates lasting transformation",
            },
            {
              name: "Build with Wisdom",
              description: "Technical excellence guided by spiritual insight",
            },
            {
              name: "Scale with Grace",
              description: "Systems that grow while maintaining humanity",
            },
            {
              name: "Transform through Understanding",
              description: "Solutions that elevate human potential",
            },
          ],
          message:
            "When we architect with both technical excellence and spiritual wisdom, we create systems that transform the world.",
        },
      },
    },
  ],

  metadata: {
    title:
      "Mohammad Ali Raza | Solution Architect & Spiritual Bridge Builder | The Bridge",
    description:
      "Meet Mohammad Ali Raza, whose unique blend of technical mastery and spiritual wisdom creates transformative solutions that elevate both systems and souls.",
    ogImage: "/images/profiles/mohammad-ali-raza-og.jpg",
  },
};
