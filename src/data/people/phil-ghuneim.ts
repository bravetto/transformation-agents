import { PersonData } from "@/types/person";

export const philGhuneim: PersonData = {
  id: "phil-ghuneim",
  slug: "phil-ghuneim",
  name: "Phil Ghuneim",
  title: "Business Development Professional",
  heroImage: "/images/profiles/phil-ghuneim.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "serving",
  themes: ["transformation", "courage", "unity"],
  impactLevel: "eternal",

  testimony: {
    quote:
      "Through the darkest storms of abuse, I found the light of healing. Now I stand with JAHmere and others, transforming trauma into triumph, showing that our past pain becomes our greatest power to help others.",
    context: "Phil Ghuneim, Youth Advocate",
    date: "2024",
  },

  impact: {
    title: "Healing Hearts, Building Bridges",
    description:
      "Transforming personal trauma into a mission of healing and hope for youth survivors",
    stats: [
      {
        label: "Youth Mentored",
        value: "100+",
      },
      {
        label: "Years of Service",
        value: "15+",
      },
      {
        label: "Lives Transformed",
        value: "∞",
      },
      {
        label: "Focus",
        value: "Healing",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of Transformation",
        description:
          "Stories of healing and hope from those touched by Phil's journey",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Phil showed me that surviving isn't just about making it through—it's about thriving and helping others find their way to the light.",
            author: "JAHmere Webb",
            role: "Friend & Fellow Lightworker",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "His laughter and joy, despite everything he's been through, shows us all that healing is possible. Phil doesn't just talk about transformation—he lives it.",
            author: "Michael Mataluni",
            role: "Friend & Bridge Builder",
            date: "2024",
          },
          {
            id: "testimony-3",
            quote:
              "The way Phil connects with troubled youth is nothing short of miraculous. He speaks their language because he's walked their path.",
            author: "Youth Program Director",
            date: "2023",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "Transforming Pain into Purpose",
        description: "A journey from survivor to healer, mentor, and advocate",
        stats: [
          {
            id: "stat-1",
            value: "100+",
            label: "Youth Mentored",
            description: "Direct mentorship and support",
          },
          {
            id: "stat-2",
            value: "15+",
            label: "Years of Service",
            description: "Dedicated to youth advocacy",
          },
          {
            id: "stat-3",
            value: "∞",
            label: "Lives Transformed",
            description: "Through healing and hope",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Healing hearts and minds",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Survivor to Healer",
            description:
              "Transformed personal trauma into a mission of healing and hope for others",
            year: "2009",
          },
          {
            id: "achievement-2",
            title: "Youth Advocacy Pioneer",
            description:
              "Developed innovative approaches to connecting with troubled youth",
            year: "2015",
          },
          {
            id: "achievement-3",
            title: "JAHmere Webb Partnership",
            description:
              "Formed transformative partnership with JAHmere Webb, creating new paths for healing",
            year: "2023",
          },
          {
            id: "achievement-4",
            title: "Community Bridge Builder",
            description:
              "Building bridges between survivors, creating networks of support and understanding",
            year: "2024",
          },
          {
            id: "achievement-5",
            title: "Living Testament",
            description:
              "Demonstrating daily that trauma can be transformed into triumph",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "A Letter to Those Still in Pain",
        body: `
Dear Survivor,

I know the darkness you carry. I've walked through those same shadows, felt that same pain that seems too heavy to bear. But I want you to know something powerful: your pain is not your destiny.

Every scar you carry, every hurt you've endured—they can become the very tools you use to help others find their way to healing. I know because I've lived it. Through working with JAHmere, Michael, and countless youth, I've discovered that our deepest wounds often become our greatest gifts.

You are not alone. You are not broken. You are a warrior in the making, and your story isn't over—it's just beginning. The light within you is stronger than any darkness you've faced.

With unwavering hope and belief in your healing journey,
Phil Ghuneim
`,
        date: "February 2024",
        signature: "/images/signatures/phil-ghuneim.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "Sacred Brotherhood",
        description: "The divine connection between survivors turned healers",
        component: "HealingCircle",
        props: {
          connections: [
            {
              name: "JAHmere Webb",
              bond: "Brother in Healing",
              description: "United in transforming pain into purpose",
            },
            {
              name: "Michael Mataluni",
              bond: "Guide and Friend",
              description: "Supporting the journey from darkness to light",
            },
          ],
          message:
            "When survivors come together in love and understanding, miracles of healing become possible.",
        },
      },
    },
  ],

  metadata: {
    title: "Phil Ghuneim | Survivor, Healer & Youth Advocate | The Bridge",
    description:
      "Meet Phil Ghuneim, whose journey from survivor to healer shows how personal trauma can be transformed into a divine mission of healing and hope for others.",
    ogImage: "/images/profiles/phil-ghuneim-og.jpg",
  },
};
