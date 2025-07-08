import { PersonData } from "@/types/person";

export const billMcDade: PersonData = {
  id: "bill-mcdade",
  slug: "bill-mcdade",
  name: "Bill McDade",
  title: "The Chairman & Technical Healer",
  heroImage: "/images/profiles/bill-mcdade.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "guiding",
  themes: ["wisdom", "transformation", "leadership"],
  impactLevel: "global",

  testimony: {
    quote:
      "For every geek, dweeb, and nerd trapped in systems they didn't create, there's a path to freedom. Through clear architecture and compassionate understanding, we can transform pain into power.",
    context: "Bill McDade, The Chairman",
    date: "2024",
  },

  impact: {
    title: "Healing Technical Trauma",
    description:
      "Transforming corporate complexity into clear, empowering architecture",
    stats: [
      {
        label: "Systems Simplified",
        value: "200+",
      },
      {
        label: "Teams Empowered",
        value: "50+",
      },
      {
        label: "Minds Freed",
        value: "∞",
      },
      {
        label: "Focus",
        value: "Clarity",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of Liberation",
        description:
          "Stories from those freed from technical confusion and corporate complexity",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              'Bill showed me that being a "geek" wasn\'t a limitation—it was a superpower waiting to be unleashed.',
            author: "Former Team Member",
            role: "Now Technical Leader",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "His ability to cut through complexity and bring clarity to chaos is nothing short of miraculous.",
            author: "Corporate Executive",
            role: "Fortune 500 Company",
            date: "2023",
          },
          {
            id: "testimony-3",
            quote:
              "The Chairman doesn't just solve technical problems—he heals the wounds that complex systems inflict on human souls.",
            author: "Technical Architect",
            role: "Global Enterprise",
            date: "2024",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "Architecting Freedom",
        description: "Creating clear paths through technical complexity",
        stats: [
          {
            id: "stat-1",
            value: "200+",
            label: "Systems Simplified",
            description: "Complex architectures clarified",
          },
          {
            id: "stat-2",
            value: "50+",
            label: "Teams Empowered",
            description: "Through clear understanding",
          },
          {
            id: "stat-3",
            value: "∞",
            label: "Minds Freed",
            description: "From technical confusion",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Bringing clarity to chaos",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Technical Clarity Pioneer",
            description:
              "Developed methodology for simplifying complex technical systems",
            year: "2005",
          },
          {
            id: "achievement-2",
            title: "Corporate Transformation",
            description:
              "Led major enterprises through technical transformation",
            year: "2010",
          },
          {
            id: "achievement-3",
            title: "The Chairman's Way",
            description:
              "Created framework for technical healing and empowerment",
            year: "2015",
          },
          {
            id: "achievement-4",
            title: "Geek Liberation",
            description:
              "Empowered technical professionals to embrace their unique gifts",
            year: "2020",
          },
          {
            id: "achievement-5",
            title: "Eternal Guide",
            description: "Continuing to light the path for technical souls",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "To the Technical Hearts in Pain",
        body: `
Dear Technical Soul,

I see you—trapped in systems of complexity, drowning in corporate bureaucracy, feeling lost in the labyrinth of legacy code and outdated processes. I know that pain. I've lived it.

But here's the truth: Your technical mind isn't just a tool for solving problems—it's a gift for transforming worlds. Those patterns you see, those complexities you understand, they're not burdens. They're bridges to freedom, waiting to be built.

Remember: Every great system starts with clarity. Every transformation begins with understanding. You're not just a cog in the machine—you're a creator of new realities.

Stay clear. Stay focused. Stay true to your technical heart.

With clarity and conviction,
Bill McDade
The Chairman
`,
        date: "February 2024",
        signature: "/images/signatures/bill-mcdade.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "The Chairman's Principles",
        description: "Sacred guidelines for technical clarity and freedom",
        component: "ClarityPrinciples",
        props: {
          principles: [
            {
              name: "Embrace Complexity",
              description:
                "Understanding chaos is the first step to transforming it",
            },
            {
              name: "Seek Clarity",
              description: "Clear thinking creates clear architecture",
            },
            {
              name: "Empower Others",
              description: "True leadership frees minds and hearts",
            },
            {
              name: "Transform Systems",
              description: "Better architecture creates better lives",
            },
          ],
          message:
            "When we bring clarity to chaos, we create space for souls to flourish.",
        },
      },
    },
  ],

  metadata: {
    title: "Bill McDade | The Chairman & Technical Healer | The Bridge",
    description:
      "Meet Bill McDade, The Chairman who transforms technical complexity into clarity, healing the hearts and minds of those trapped in outdated systems.",
    ogImage: "/images/profiles/bill-mcdade-og.jpg",
  },
};
