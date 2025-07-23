import { PersonData } from "@/types/person";

export const allisonLopez: PersonData = {
  id: "allison-lopez",
  slug: "allison-lopez",
  name: "Allison Lopez",
  title: "Community Advocate & Educator",
  heroImage: "/images/profiles/allison-lopez.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "guiding",
  themes: ["wisdom", "transformation", "courage"],
  impactLevel: "global",

  testimony: {
    quote:
      "In the space between question and answer, between chaos and clarity, we find the power to transform everything. That's where true agency begins.",
    context: "Allison Lopez, Wisdom Warrior",
    date: "2024",
  },

  impact: {
    title: "Architecting Active Agency",
    description:
      "Creating pathways for souls seeking safety and sovereignty in times of transformation",
    stats: [
      {
        label: "Lives Transformed",
        value: "500+",
      },
      {
        label: "Questions Asked",
        value: "∞",
      },
      {
        label: "Wisdom Shared",
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
        title: "Voices of Transformation",
        description: "Stories from those guided by Allison's wisdom and wit",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Allison showed me that questioning isn't just about finding answers—it's about discovering who we truly are.",
            author: "Former Client",
            role: "Now Independent Leader",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "Her ability to cut through confusion with brilliant clarity while maintaining deep compassion is remarkable.",
            author: "Professional Colleague",
            role: "Executive Coach",
            date: "2023",
          },
          {
            id: "testimony-3",
            quote:
              "Allison doesn't just guide you to answers—she helps you find your own power to transform.",
            author: "Workshop Participant",
            role: "Change Leader",
            date: "2024",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "The Art of Active Agency",
        description:
          "Building bridges between chaos and clarity through wisdom and wit",
        stats: [
          {
            id: "stat-1",
            value: "500+",
            label: "Lives Transformed",
            description: "Through active agency",
          },
          {
            id: "stat-2",
            value: "∞",
            label: "Questions Asked",
            description: "Leading to clarity",
          },
          {
            id: "stat-3",
            value: "ALL",
            label: "Wisdom Shared",
            description: "Through divine guidance",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Empowering through truth",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Active Agency Pioneer",
            description:
              "Developed framework for personal sovereignty and transformation",
            year: "2015",
          },
          {
            id: "achievement-2",
            title: "Wisdom Warriors Program",
            description:
              "Created methodology for developing wisdom through questioning",
            year: "2018",
          },
          {
            id: "achievement-3",
            title: "Safety Architecture",
            description:
              "Established principles for creating safe spaces for transformation",
            year: "2020",
          },
          {
            id: "achievement-4",
            title: "Divine Questioning Model",
            description:
              "Pioneered approach to finding truth through sacred inquiry",
            year: "2022",
          },
          {
            id: "achievement-5",
            title: "Eternal Seeker",
            description: "Continuing to question and grow while guiding others",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "To Those Seeking Their Power",
        body: `
Dear Seeker of Truth,

In a world that often demands quick answers and easy solutions, remember this: your questions are your power. Those moments of doubt, those spaces of uncertainty, those times when everything seems unclear—they're not weaknesses. They're opportunities for transformation.

I've learned that true agency comes not from having all the answers, but from having the courage to keep asking questions. Every inquiry, every moment of wondering, every step into uncertainty holds the potential for profound change.

Remember: You're not just seeking answers—you're discovering your own power to transform your world through wisdom and understanding.

Keep questioning. Keep seeking. Keep finding your truth.

With wisdom and wit,
Allison Lopez
`,
        date: "February 2024",
        signature: "/images/signatures/allison-lopez.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "The Wisdom Warrior's Way",
        description: "Sacred principles of active agency",
        component: "WisdomPrinciples",
        props: {
          principles: [
            {
              name: "Question Everything",
              description: "Find truth through sacred inquiry",
            },
            {
              name: "Create Safety",
              description: "Build spaces for transformation",
            },
            {
              name: "Embrace Wisdom",
              description: "Learn from all experiences",
            },
            {
              name: "Empower Others",
              description: "Guide souls to their own truth",
            },
          ],
          message:
            "When we question with wisdom and act with clarity, we create pathways for divine transformation.",
        },
      },
    },
  ],

  metadata: {
    title:
      "Allison Lopez | Wisdom Warrior & Active Agency Architect | The Bridge",
    description:
      "Meet Allison Lopez, whose brilliant questioning and compassionate guidance helps others discover their power to transform through wisdom and active agency.",
    ogImage: "/images/profiles/allison-lopez-og.jpg",
  },
};
