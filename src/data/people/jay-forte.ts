import { PersonData } from '@/types/person';

export const jayForte: PersonData = {
  id: 'jay-forte',
  slug: 'jay-forte',
  name: 'Jay Forte',
  title: 'Discovering Greatness Zones in Everyone',
  heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop',
  
  testimony: {
    quote: 'Most people play small because they don\'t know their capacity for greatness. I help them discover, develop, and deploy their unique gifts.',
    context: 'Jay Forte, on his life\'s mission',
    date: '2024'
  },
  
  impact: {
    title: 'Architecting Human Greatness',
    description: 'When you show people their zone, they transform their world',
    stats: [
      {
        label: 'Assessments',
        value: '10,000+'
      },
      {
        label: 'Companies Transformed',
        value: '500+'
      },
      {
        label: 'Bestselling Books',
        value: '3'
      },
      {
        label: 'Mission',
        value: 'Unleash Greatness'
      }
    ]
  },
  
  sections: [
    {
      type: 'hero',
      content: {
        title: 'Jay Forte',
        subtitle: 'Discovering Greatness Zones in Everyone',
        description: "Most people play small because they don't know their capacity for greatness. I help them discover, develop, and deploy their unique gifts.",
        backgroundImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop'
      }
    },
    {
      type: 'testimony',
      content: {
        title: 'The Greatness Files',
        description: 'Revealing the extraordinary potential in ordinary people',
        testimonies: [
          {
            id: 'testimony-1',
            quote: "Two college kids changed my life. Mary was engaged, passionate, living in her zone. Mike was aimless, bored, bluffing through life. The difference? Mary knew her talents. Mike didn't. That contrast birthed my life's work. Your talents are your gifts—your roadmap to a life that suits you and brings your best to everything. We're not great at everything, but we're amazing at some things. Discover, develop, and deploy those things, and you'll find your Greatness Zone. When I met JAHmere Webb, I saw extraordinary alignment. His assessment revealed what I'd spent decades learning to see: Friend (62/200), Peacemaker (18/20), Caregiver (16/20). These weren't just scores—they were his calling card. But here's what moved me: we matched. My Friend (71/200) to his 62. My Peacemaker (19/20) to his 18. Same gifts, slightly different intensities. Perfect for a coaching relationship where the coach holds space for growth. I've assessed thousands. Written books. Built companies. But watching JAHmere transform his 'limitations' into launching pads reminded me why this work matters. We don't fix what's wrong—we amplify what's right. Love is truth in action. When we help someone see their greatness, we love them into their truth. JAHmere taught me that even from prison, you can live in your Greatness Zone. Because zones aren't locations—they're revelations.",
            author: "Jay Forte",
            role: "Greatness Architect",
            date: "2024"
          }
        ]
      }
    },
    {
      type: 'impact',
      content: {
        title: 'Architecting Human Greatness',
        description: 'When you show people their zone, they transform their world',
        stats: [
          {
            id: 'stat-1',
            value: '10,000+',
            label: 'Assessments',
            description: 'Revealing unique talents and purpose'
          },
          {
            id: 'stat-2',
            value: '500+',
            label: 'Companies Transformed',
            description: 'Through human understanding'
          },
          {
            id: 'stat-3',
            value: '3',
            label: 'Bestselling Books',
            description: 'On discovering greatness'
          },
          {
            id: 'stat-4',
            value: 'Unleash Greatness',
            label: 'Mission',
            description: 'One purpose, many lives'
          }
        ],
        achievements: [
          {
            id: 'achievement-1',
            title: 'Talent Assessment Pioneer',
            description: 'Created comprehensive talent assessment system that reveals individual purpose and potential',
            year: '2010'
          },
          {
            id: 'achievement-2',
            title: 'Greatness Zone Methodology',
            description: 'Pioneered "Greatness Zone" methodology now used in organizations worldwide',
            year: '2015'
          },
          {
            id: 'achievement-3',
            title: 'Corporate Transformation Expert',
            description: 'Transformed companies through deeper understanding of human potential',
            year: '2018'
          },
          {
            id: 'achievement-4',
            title: 'JAHmere Webb Alignment',
            description: 'Perfect assessment match with JAHmere Webb proving the system works',
            year: '2023'
          },
          {
            id: 'achievement-5',
            title: 'D³ Framework Creator',
            description: 'Teaching the world to Discover, Develop, Deploy their unique talents',
            year: 'Present'
          }
        ]
      }
    },
    {
      type: 'custom',
      content: {
        component: 'AssessmentAlignment',
        title: 'The Sacred Science of Human Design',
        description: 'How matching scores create miraculous mentorship',
        alignments: [
          {
            trait: "FRIENDS",
            person1Score: "71/200",
            person2Score: "62/200",
            meaning: "Both heart leaders who connect deeply with others"
          },
          {
            trait: "PEACEMAKERS",
            person1Score: "19/20",
            person2Score: "18/20",
            meaning: "Both unity builders who seek harmony and resolution"
          },
          {
            trait: "CAREGIVERS",
            person1Score: "18/20",
            person2Score: "16/20",
            meaning: "Both love multipliers who nurture growth in others"
          },
          {
            trait: "RELATORS",
            person1Score: "18/20",
            person2Score: "16/20",
            meaning: "Both bridge builders who connect diverse worlds"
          }
        ],
        message: "When you find someone whose greatness zone aligns with yours, you've found more than a match—you've found a mirror that shows what's possible."
      }
    },
    {
      type: 'letter',
      content: {
        title: 'To Those Searching for Purpose',
        recipient: 'To Every Person Wondering "Is This All There Is?"',
        body: `Dear Seeker,

I know that feeling. The quiet voice wondering if there's more. The vague sense that you're capable of something greater. That gap between who you are and who you could be.

You're right—there is more. But it's not outside you. It's within.

For 30 years, I've helped people discover their Greatness Zone—that magical intersection where your talents meet the world's needs. It's not mystical. It's methodical. When you know your natural talents (not just your skills), and connect them to work that needs those talents, something extraordinary happens.

The struggle stops. The resistance fades. The flow begins.

I've assessed thousands of people, and here's what I know for certain: You have incredible gifts. Not just good-enough skills you've developed through blood, sweat and tears. But innate, natural talents that feel as easy and natural to you as breathing.

The tragedy? Most people never discover them. They work jobs they tolerate. They develop skills they don't love using. They compete in areas where they're average at best, wondering why everything feels so hard.

But you're reading this letter for a reason. You're ready to stop playing small. You're ready to discover what you're truly capable of—not through hustle and grind, but through alignment with your design.

Your Greatness Zone isn't a place you create. It's a place you discover. It's been waiting for you all along. And when you find it, you'll help others find theirs too.

That's the true miracle—when we all operate from our zone, the world transforms.

To your greatness,
Jay Forte`,
        date: '2024',
        signature: {
          name: 'Jay Forte',
          title: 'Greatness Architect',
          image: '/images/signatures/jay-forte.svg'
        }
      }
    }
  ],
  
  metadata: {
    title: 'Jay Forte | Greatness Zone Architect | The Bridge',
    description: 'Jay Forte helps people discover their unique talents and purpose, finding their Greatness Zones where they can make their greatest contribution.',
    ogImage: '/images/profiles/jay-forte-og.jpg'
  }
}; 