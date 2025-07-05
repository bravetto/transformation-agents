import type { PersonData } from '@/types/person';

export const marthaHenderson: PersonData = {
  id: 'martha-henderson',
  slug: 'martha-henderson',
  name: 'Martha Henderson',
  title: 'Mother, Prayer Warrior & Foundation',
  heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&h=1080&fit=crop',
  testimony: {
    quote: "A mother's prayers can move mountains, and I've watched God move them for my son.",
    context: "The power of a praying mother in her son's transformation story",
    date: "2024"
  },
  impact: {
    title: "A Mother's Influence",
    description: "Martha Henderson, JAHmere's mother, whose unwavering faith and prayers have been the foundation for her son's transformation journey. Her testimony speaks to the power of a mother's love and the impact of persistent prayer.",
    stats: [
      { label: "Years of Prayer", value: "30+" },
      { label: "Prayer Partners", value: "50+" },
      { label: "God's Perfect Number", value: "7" },
      { label: "Lives Touched", value: "∞" }
    ]
  },
  sections: [
    {
      type: 'hero',
      content: {
        title: 'Martha Henderson',
        subtitle: 'The Praying Mother Who Moves Mountains',
        description: "A mother's prayers can move mountains, and I've watched God move them for my son. When JAHmere was struggling, I never stopped believing in God's perfect plan.",
        backgroundImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&h=1080&fit=crop',
        ctaText: 'Read Her Story',
        ctaHref: '#testimony'
      }
    },
    {
      type: 'testimony',
      content: {
        title: 'A Mother\'s Testament of Faith',
        description: 'The unwavering belief that carried a family through transformation',
        testimonies: [
          {
            id: 'testimony-1',
            quote: "I was mature at a young age, determined to have a better life. When I was 14, my mother became addicted to crack. I rode my bike to work at the Gainesville Police Department, and she'd take my entire paycheck. Family said I'd never be anything. But I graduated with honors from UF as a married mother of two. I learned early to speak life into existence—the power of life and death is in the tongue. I'm not a social media person; I'm a prayer warrior. I'm the counselor, therapist, and psychologist for everyone who needs hope. I give and give and give because I see myself as a philanthropist, even when I can't pay all my bills. When JAHmere was struggling with his faith, I held onto God's promises. I spoke life over him when he couldn't hear it. Today, watching him transform lives, I see those prayers answered beyond my wildest dreams. I'm supposed to be doing more—I just don't know HOW yet. But God's perfect number 7 keeps showing me the way.",
            author: "Martha Henderson",
            role: "Mother & Prayer Warrior",
            date: "2024"
          }
        ]
      }
    },
    {
      type: 'impact',
      content: {
        title: "A Mother's Ripple Effect",
        description: "The power of one praying mother transforming generations",
        stats: [
          { 
            id: 'stat-1',
            label: "Years of Prayer", 
            value: "30+", 
            description: "Consistent daily intercession"
          },
          { 
            id: 'stat-2',
            label: "Prayer Partners", 
            value: "50+", 
            description: "Across three states"
          },
          { 
            id: 'stat-3',
            label: "God's Perfect Number", 
            value: "7", 
            description: "Completion and perfection"
          },
          { 
            id: 'stat-4',
            label: "Lives Touched", 
            value: "∞", 
            description: "Through prayer and mentorship"
          }
        ],
        achievements: [
          {
            id: 'achievement-1',
            title: "Overcame childhood trauma",
            description: "Graduated with honors from UF as a married mother of two",
            year: "2000"
          },
          {
            id: 'achievement-2',
            title: "Academic transformation",
            description: "Transformed from D student to honor roll after moving to NJ",
            year: "1990"
          },
          {
            id: 'achievement-3',
            title: "Created prayer circles",
            description: "Prayer networks that span three states",
            year: "2015"
          },
          {
            id: 'achievement-4',
            title: "Mothers' mentorship",
            description: "Mentors mothers whose children are struggling",
            year: "2020"
          },
          {
            id: 'achievement-5',
            title: "Living testimony",
            description: "Speaking life changes destinies",
            year: "Present"
          }
        ]
      }
    },
    {
      type: 'letter',
      content: {
        title: "A Letter to Every Mother Who Prays in the Dark",
        recipient: "To My Sisters in the Midnight Hour",
        body: `Dear Warrior Mother,

I see you. In the 3 AM darkness when everyone sleeps but you're on your knees. When they said your child would never amount to anything. When the world wrote them off, but you kept writing prayers.

I was you. Family members said I'd be nothing. My son seemed lost. But I learned early that we speak life or death with our tongues. So I chose life. Every. Single. Day.

When I couldn't see JAHmere's future, I spoke it anyway. When the evidence said failure, I declared victory. Not because I'm special—I'm just a woman who works 8-5 and can barely pay her bills. But I know the One who owns everything.

God's number 7 stalks me—not coincidence but confirmation. Seven is completion, perfection, rest. Your prayers are completing something. Your tears are perfecting someone. Your faith will bring rest.

I raised my children to need me—maybe too much. But I'd rather they lean on me than fall alone. Keep being their counselor, therapist, psychologist. The world pays those folks good money, but we do it for love. That's our superpower.

Your child's story isn't over. Mine became a bridge builder. Yours will become what you speak. So speak life, sister. Speak it when you see death. Speak it when hope is gone. Speak it until Heaven responds.

Still speaking life at 3 AM,
Martha "Mama" Henderson`,
        date: "2024",
        signature: {
          name: "Martha Henderson",
          title: "A Mother Who Never Stopped Praying",
          image: "/images/signatures/martha-henderson.svg"
        }
      }
    }
  ],
  metadata: {
    title: "Martha Henderson - The Power of a Praying Mother | The Bridge",
    description: "Discover how Martha Henderson's unwavering faith and prayers became the foundation for her son JAHmere's transformation. A testimony of a mother's love and the power of persistent prayer.",
    ogImage: "/images/profiles/martha-henderson-og.jpg"
  }
}; 