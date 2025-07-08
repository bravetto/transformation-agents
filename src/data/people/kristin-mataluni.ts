import { PersonData } from "@/types/person";

export const kristinMataluni: PersonData = {
  id: "kristin-mataluni",
  slug: "kristin-mataluni",
  name: "Kristin Mataluni",
  title: "Soul Architect & Pattern Weaver",
  heroImage: "/images/profiles/kristin-mataluni.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "guiding",
  themes: ["wisdom", "transformation", "unity"],
  impactLevel: "eternal",

  testimony: {
    quote:
      "In the spaces between worlds, in the silence between words, we find the patterns that connect us all. Through understanding these patterns, we create new possibilities for those seeking their truth.",
    context: "Kristin Mataluni, Soul Architect",
    date: "2024",
  },

  impact: {
    title: "Weaving Wisdom, Building Bridges",
    description:
      "Illuminating paths for rebels, rejects, and visionaries seeking their authentic voice",
    stats: [
      {
        label: "Souls Guided",
        value: "1000+",
      },
      {
        label: "Patterns Revealed",
        value: "∞",
      },
      {
        label: "Lives Transformed",
        value: "ALL",
      },
      {
        label: "Focus",
        value: "Truth",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of the Transformed",
        description:
          "Stories from those who found their voice through Kristin's guidance",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Kristin helped me see the patterns that were holding me back, and showed me how to weave new ones that set me free.",
            author: "Former Student",
            role: "Now Teaching Others",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "She brings light to the darkest corners of our minds, helping us find beauty in our perceived flaws and strength in our differences.",
            author: "Community Member",
            role: "Artist & Visionary",
            date: "2023",
          },
          {
            id: "testimony-3",
            quote:
              "Through Kristin's guidance, I learned that my \"weirdness\" wasn't a curse but a gift—a unique lens through which I could help others see the world differently.",
            author: "Michael Mataluni",
            role: "Twin Flame & Student",
            date: "2024",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "Architecting Soul Transformation",
        description:
          "Building bridges between worlds through pattern recognition and sacred teaching",
        stats: [
          {
            id: "stat-1",
            value: "1000+",
            label: "Souls Guided",
            description: "Through transformative journeys",
          },
          {
            id: "stat-2",
            value: "∞",
            label: "Patterns Revealed",
            description: "Illuminating hidden connections",
          },
          {
            id: "stat-3",
            value: "ALL",
            label: "Lives Touched",
            description: "Through ripples of transformation",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Revealing truth in all forms",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Pattern Recognition Pioneer",
            description:
              "Developed unique methodology for identifying and transforming limiting patterns",
            year: "2010",
          },
          {
            id: "achievement-2",
            title: "Sacred Teaching Framework",
            description:
              "Created framework for teaching complex concepts through sacred metaphor",
            year: "2015",
          },
          {
            id: "achievement-3",
            title: "Bridge Between Worlds",
            description:
              "Established methods for connecting different worldviews and perspectives",
            year: "2020",
          },
          {
            id: "achievement-4",
            title: "Twin Flame Activation",
            description:
              "Catalyzed transformative partnership with Michael Mataluni",
            year: "2018",
          },
          {
            id: "achievement-5",
            title: "Eternal Student-Teacher",
            description: "Continuing to learn while teaching others",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "To Those Who Feel Different",
        body: `
Dear Seeker of Truth,

In a world that often demands conformity, your difference is your gift. Those parts of you that seem to fit nowhere are precisely the pieces that will help build bridges between worlds.

I see you—the rebels, the questioners, the ones who've never quite fit in. Your perceived flaws are actually portals to deeper understanding. Your "weirdness" is wisdom waiting to be recognized.

Remember: The patterns that seem to trap you can become the very tools you use to set others free. Your unique perspective isn't a burden—it's a bridge to new possibilities.

Keep questioning. Keep seeking. Keep being beautifully, unapologetically you.

With love and recognition of your light,
Kristin Mataluni
`,
        date: "February 2024",
        signature: "/images/signatures/kristin-mataluni.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "Sacred Patterns of Connection",
        description: "The divine architecture of soul transformation",
        component: "PatternWeaver",
        props: {
          patterns: [
            {
              name: "Question Everything",
              description: "Finding truth through eternal curiosity",
            },
            {
              name: "Embrace Difference",
              description: "Transforming isolation into connection",
            },
            {
              name: "See Patterns",
              description: "Recognizing the threads that bind all things",
            },
            {
              name: "Build Bridges",
              description: "Connecting worlds through understanding",
            },
          ],
          message:
            "In the space between what is and what could be, we find the patterns that transform everything.",
        },
      },
    },
  ],

  metadata: {
    title: "Kristin Mataluni | Soul Architect & Pattern Weaver | The Bridge",
    description:
      "Meet Kristin Mataluni, whose unique ability to see and transform patterns helps others find their authentic voice and purpose in the spaces between worlds.",
    ogImage: "/images/profiles/kristin-mataluni-og.jpg",
  },
};
