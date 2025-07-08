import { PersonData } from "@/types/person";

export const brooksLopez: PersonData = {
  id: "brooks-lopez",
  slug: "brooks-lopez",
  name: "Brooks Lopez",
  title: "Divine Mischief Maker & Experience Architect",
  heroImage: "/images/profiles/brooks-lopez.svg",
  localImage: true,

  // Filter properties
  role: "lightworker",
  journeyStage: "serving",
  themes: ["transformation", "leadership", "unity"],
  impactLevel: "global",

  testimony: {
    quote:
      "In the space between chaos and order, between mischief and meaning, we find the magic that transforms everything. That's where the real innovation happens.",
    context: "Brooks Lopez, Chief Innovation Officer",
    date: "2024",
  },

  impact: {
    title: "Transforming Mischief into Magic",
    description:
      "Creating delightful experiences that bridge worlds and heal souls",
    stats: [
      {
        label: "Experiences Created",
        value: "100+",
      },
      {
        label: "Souls Delighted",
        value: "∞",
      },
      {
        label: "Toys Rescued",
        value: "1000+",
      },
      {
        label: "Focus",
        value: "Joy",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of Delight",
        description: "Stories from those touched by Brooks's divine mischief",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Brooks showed me that innovation isn't just about technology—it's about bringing joy and wonder back into the world.",
            author: "Michael Mataluni",
            role: "Divine Brother",
            date: "2024",
          },
          {
            id: "testimony-2",
            quote:
              "His ability to transform broken things into sources of delight is nothing short of magical.",
            author: "Client",
            role: "Fortune 500 Executive",
            date: "2023",
          },
          {
            id: "testimony-3",
            quote:
              "Brooks doesn't just create experiences—he creates spaces where healing happens through joy.",
            author: "Team Member",
            role: "Experience Designer",
            date: "2024",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "The Art of Divine Mischief",
        description: "Transforming chaos into creation, pain into play",
        stats: [
          {
            id: "stat-1",
            value: "100+",
            label: "Experiences Created",
            description: "Delightful transformations",
          },
          {
            id: "stat-2",
            value: "∞",
            label: "Souls Delighted",
            description: "Through divine play",
          },
          {
            id: "stat-3",
            value: "1000+",
            label: "Toys Rescued",
            description: "Given new life and purpose",
          },
          {
            id: "stat-4",
            value: "1",
            label: "Sacred Mission",
            description: "Bringing joy to all",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Bravëtto Innovation",
            description:
              "Pioneered new approaches to experience design and delight delivery",
            year: "2015",
          },
          {
            id: "achievement-2",
            title: "Toy Rescue Mission",
            description:
              "Created program for giving new life to discarded toys and broken dreams",
            year: "2018",
          },
          {
            id: "achievement-3",
            title: "Experience Architecture",
            description:
              "Developed framework for creating transformative experiences",
            year: "2020",
          },
          {
            id: "achievement-4",
            title: "Divine Mischief Model",
            description:
              "Created methodology for turning chaos into creative opportunity",
            year: "2022",
          },
          {
            id: "achievement-5",
            title: "Eternal Player",
            description: "Continuing to bring play and possibility to all",
            year: "Present",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "To Those Who've Lost Their Play",
        body: `
Dear Playful Soul,

In a world that often seems too serious, too heavy, too fixed in its ways, remember this: mischief is magic waiting to happen. Those moments of chaos, those broken pieces, those "mistakes"—they're not problems. They're portals to possibility.

I've learned that the greatest innovations often come from playing with what others have discarded. Every broken toy, every "failed" experiment, every moment of divine mischief holds the potential for transformation.

Remember: You're not just creating experiences—you're creating spaces where souls can remember how to play, how to wonder, how to heal through joy.

Keep playing. Keep creating. Keep bringing mischief to the mundane.

With a twinkle in my eye,
Brooks Lopez
`,
        date: "February 2024",
        signature: "/images/signatures/brooks-lopez.svg",
      },
    },
    {
      type: "custom",
      content: {
        title: "The Mischief Maker's Manifesto",
        description: "Sacred principles of transformative play",
        component: "MischiefPrinciples",
        props: {
          principles: [
            {
              name: "Embrace Chaos",
              description: "Find the opportunity in disorder",
            },
            {
              name: "Play with Purpose",
              description: "Transform through joyful creation",
            },
            {
              name: "Rescue Wonder",
              description: "Give new life to lost dreams",
            },
            {
              name: "Create Delight",
              description: "Bring joy to every moment",
            },
          ],
          message:
            "When we transform mischief into magic, we create spaces where souls can heal through joy.",
        },
      },
    },
  ],

  metadata: {
    title:
      "Brooks Lopez | Divine Mischief Maker & Experience Architect | The Bridge",
    description:
      "Meet Brooks Lopez, whose divine mischief transforms chaos into creation, bringing joy and healing through innovative experience design.",
    ogImage: "/images/profiles/brooks-lopez-og.jpg",
  },
};
