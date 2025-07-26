import { PersonData } from "@/types/person";

const examplePerson: PersonData = {
  id: "example-person",
  slug: "example-person",
  name: "Example Person",
  title: "Innovation Leader & Community Advocate",
  heroImage: "/images/profiles/example-person.jpg",

  testimony: {
    quote:
      "The journey of transformation begins with a single step of faith and continues with unwavering commitment to growth.",
    context: "Example Person, Innovation Leader",
    date: "March 2023",
  },

  impact: {
    title: "Creating Lasting Change",
    description:
      "Through innovation and community engagement, Example Person has established a pattern of sustainable impact.",
    stats: [
      {
        label: "Communities Served",
        value: 12,
      },
      {
        label: "Innovation Projects",
        value: "25+",
      },
      {
        label: "Success Rate",
        value: "92%",
      },
    ],
  },

  sections: [
    {
      type: "testimony",
      content: {
        title: "Voices of Impact",
        description:
          "Hear from those who have experienced transformation through Example Person's work.",
        testimonies: [
          {
            id: "testimony-1",
            quote:
              "Working with Example Person completely transformed our approach to community building. Their innovative methods created connections we never thought possible.",
            author: "Sarah Johnson",
            role: "Community Director",
            date: "January 2023",
          },
          {
            id: "testimony-2",
            quote:
              "The framework developed by Example Person allowed us to scale our impact while maintaining deep personal connections. Truly revolutionary.",
            author: "Michael Chen",
            role: "Foundation CEO",
            date: "November 2022",
          },
          {
            id: "testimony-3",
            quote:
              "I've never seen someone connect theory and practice so seamlessly. Example Person doesn't just talk about change - they make it happen.",
            author: "Dr. Amara Williams",
            role: "University Professor",
            date: "February 2023",
          },
        ],
      },
    },
    {
      type: "impact",
      content: {
        title: "Measuring Transformation",
        description:
          "The work of Example Person has created measurable impact across multiple domains.",
        stats: [
          {
            id: "stat-1",
            value: "12",
            label: "Communities Served",
            description: "Direct community engagement",
          },
          {
            id: "stat-2",
            value: "25+",
            label: "Innovation Projects",
            description: "Initiatives launched and completed",
          },
          {
            id: "stat-3",
            value: "92%",
            label: "Success Rate",
            description: "Projects meeting or exceeding goals",
          },
          {
            id: "stat-4",
            value: "1.5M",
            label: "People Impacted",
            description: "Direct and indirect beneficiaries",
          },
        ],
        achievements: [
          {
            id: "achievement-1",
            title: "Community Innovation Framework",
            description:
              "Developed a scalable framework for community-led innovation that has been adopted by organizations in 12 countries.",
            date: "2021",
          },
          {
            id: "achievement-2",
            title: "Transformation Accelerator",
            description:
              "Created an accelerator program that has launched 25+ community initiatives with a 92% success rate.",
            date: "2022",
          },
          {
            id: "achievement-3",
            title: "Global Impact Award",
            description:
              "Received international recognition for pioneering work in connecting innovation and community transformation.",
            date: "2023",
          },
        ],
      },
    },
    {
      type: "letter",
      content: {
        title: "A Letter of Hope",
        body: `
          Dear Future Leaders,
          
          The path of transformation is never straight, but it is always worth taking. As I've walked this journey, I've learned that the most powerful changes happen when we combine innovation with deep community connection.
          
          My hope for you is that you'll find the courage to start, the wisdom to adapt, and the perseverance to continue even when the path becomes difficult. Remember that every great transformation begins with a single step of faith.
          
          With hope and belief in your journey,
          Example Person
        `,
        date: "April 15, 2023",
        signature: "/images/signatures/example-person.png",
      },
    },
    {
      type: "video",
      content: {
        title: "Transformation in Action",
        description: "See how our community approach creates lasting change.",
        videoUrl: "https://www.youtube.com/embed/example",
        thumbnailUrl: "/images/video-thumbnails/transformation.jpg",
      },
    },
    {
      type: "custom",
      content: {
        title: "Innovation Timeline",
        description: "Key milestones in our transformation journey.",
        component: "TimelineComponent",
        props: {
          events: [
            {
              year: 2018,
              title: "First Community Project",
              description: "Launched our pilot program in urban neighborhoods.",
            },
            {
              year: 2020,
              title: "Framework Development",
              description:
                "Created the Transformation Framework based on initial learnings.",
            },
            {
              year: 2021,
              title: "Global Expansion",
              description: "Extended our model to international communities.",
            },
            {
              year: 2023,
              title: "Digital Transformation",
              description: "Launched digital tools to scale community impact.",
            },
          ],
        },
      },
    },
  ],

  metadata: {
    title:
      "Example Person | Innovation Leader & Community Advocate | The Bridge",
    description:
      "Meet Example Person, an innovation leader and community advocate pioneering new approaches to sustainable transformation.",
    ogImage: "/images/profiles/example-person-og.jpg",
  },
};

export default examplePerson;
