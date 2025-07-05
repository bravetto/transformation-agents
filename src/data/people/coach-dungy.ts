import { PersonData } from '@/types/person';

export const coachDungy: PersonData = {
  id: 'coach-dungy',
  slug: 'coach-dungy',
  name: 'Coach Tony Dungy',
  title: 'Where Championships Meet Character',
  heroImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1920&h=1080&fit=crop',
  localImage: true,
  
  testimony: {
    quote: 'I won Super Bowls, but my greatest victories are the lives transformed through second chances. Pain is God\'s megaphone, and I\'ve learned to listen.',
    context: 'Coach Tony Dungy, on his life philosophy',
    date: '2024'
  },
  
  impact: {
    title: 'Beyond the Field - A Legacy of Lives',
    description: 'When a coach becomes a father to the fatherless',
    stats: [
      {
        label: 'Foster Children',
        value: '100+'
      },
      {
        label: 'Super Bowl Victories',
        value: '2'
      },
      {
        label: 'Bestselling Books',
        value: '7'
      },
      {
        label: 'Lives Touched',
        value: 'Millions'
      }
    ]
  },
  
  sections: [
    {
      type: 'hero',
      content: {
        title: 'Coach Tony Dungy',
        subtitle: 'Where Championships Meet Character',
        description: "I won Super Bowls, but my greatest victories are the lives transformed through second chances. Pain is God's megaphone, and I've learned to listen.",
        backgroundImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1920&h=1080&fit=crop'
      }
    },
    {
      type: 'testimony',
      content: {
        title: 'From the Heart of a Champion',
        description: 'A testimony of purpose, pain, and divine redirection',
        testimonies: [
          {
            id: 'testimony-1',
            quote: "In 1977, I sat in my dorm room watching others get drafted while my phone stayed silent. 'Lord, how could you let this happen?' I cried. The next morning, Chuck Noll called. Not just with a contract but with wisdom: 'Don't make football your whole life.' That devastation became direction. Every low prepared me for the highs, but more importantly, for understanding others' lows. When we adopted Jordan, who can't feel physical pain, God gave me a masterclass in His design. Pain protects. Pain instructs. Pain redirects us to the Father. Without it, Jordan burns himself reaching for cookies. With it, we learn what harms and what heals. When we lost James to suicide, I thought my faith might break. Instead, it deepened. Someone asked if I'd bring him back knowing what I know about Heaven. I said no. That's when I understood—sometimes love means letting go, and sometimes justice means holding on. I've mentored players who became champions and prisoners who became preachers. Michael Vick taught me that second chances require sustained support. Now I see young men like JAHmere Webb, and I see not their worst moment but their best potential. Being the first Black coach to win a Super Bowl opened doors. But I'd trade every trophy to open one prison door for someone ready to transform. Because quiet strength isn't about being soft—it's about being certain that God's way works.",
            author: "Tony Dungy",
            role: "NFL Hall of Fame Coach",
            date: "2024"
          }
        ]
      }
    },
    {
      type: 'impact',
      content: {
        title: "Beyond the Field - A Legacy of Lives",
        description: "When a coach becomes a father to the fatherless",
        stats: [
          {
            id: 'stat-1',
            value: '100+',
            label: 'Foster Children',
            description: 'Providing homes and hope'
          },
          {
            id: 'stat-2',
            value: '2',
            label: 'Super Bowl Victories',
            description: 'As player and coach'
          },
          {
            id: 'stat-3',
            value: '7',
            label: 'Bestselling Books',
            description: 'Sharing wisdom and faith'
          },
          {
            id: 'stat-4',
            value: 'Millions',
            label: 'Lives Touched',
            description: 'Through mentorship and ministry'
          }
        ],
        achievements: [
          {
            id: 'achievement-1',
            title: 'Historic Super Bowl Victory',
            description: 'First African American coach to win Super Bowl, breaking barriers for future generations',
            year: '2007'
          },
          {
            id: 'achievement-2',
            title: 'Tampa Bay Transformation',
            description: 'Transformed Tampa Bay Buccaneers from worst to first, establishing championship culture',
            year: '2002'
          },
          {
            id: 'achievement-3',
            title: 'Michael Vick Mentorship',
            description: 'Mentored Michael Vick through redemption journey after incarceration',
            year: '2009'
          },
          {
            id: 'achievement-4',
            title: '"Quiet Strength" Philosophy',
            description: 'Authored "Quiet Strength" selling over 2 million copies and changing leadership paradigms',
            year: '2007'
          },
          {
            id: 'achievement-5',
            title: 'God\'s Way Works',
            description: 'Proved you can win at the highest levels while maintaining faith and integrity',
            year: 'Present'
          }
        ]
      }
    },
    {
      type: 'letter',
      content: {
        title: "To Those Who Think It's Too Late",
        recipient: "To Every Second-Chance Seeker",
        body: `Dear Wounded Warrior,

I'm writing to you from the other side of devastating loss, public failure, and private pain. I've buried a son, been fired when I deserved to stay, and watched people I mentored fail spectacularly. Yet I'm still here, still believing, still seeing God turn graves into gardens.

When they didn't draft me, I thought my dream died. That rejection redirected me to Pittsburgh, where I learned that football was my profession, not my purpose. Every closed door was God's GPS recalculating to a better destination.

My son Jordan taught me through his inability to feel pain that sometimes our limitations are our greatest teachers. My son James taught me through his death that sometimes our deepest pain produces our most powerful purpose.

You think your record disqualifies you? I've seen felons become fathers to the fatherless. You think your addiction defines you? I've watched addicts become advocates for freedom. You think your failure is final? I know failure is often the first chapter of a comeback story.

Here's what 40 years of coaching taught me: Champions aren't people who never fall. Champions are people who get up differently than they fell down. They get up wiser, humbler, but fiercer in their pursuit of purpose.

God doesn't waste pain. He doesn't waste failure. He doesn't waste you. Every setback is a setup for a comeback if you'll let Him coach you through it.

The game isn't over. You're just between quarters. And the God who turned my undrafted devastation into Hall of Fame destination is the same God waiting to transform your story.

Still coaching comebacks,
Coach Tony Dungy`,
        date: "2024",
        signature: {
          name: "Tony Dungy",
          title: "Coach & Mentor",
          image: "/images/signatures/tony-dungy.png"
        }
      }
    },
    {
      type: 'video',
      content: {
        title: 'The Quiet Strength Revolution',
        description: 'Coach Dungy on why winning God\'s way changes everything',
        videoUrl: 'https://www.youtube.com/embed/example-dungy',
        thumbnailUrl: '/images/video-thumbnails/dungy-leadership.svg'
      }
    }
  ],
  
  metadata: {
    title: 'Coach Tony Dungy | Where Championships Meet Character | The Bridge',
    description: 'Learn how Coach Tony Dungy\'s pain philosophy transforms lives through second chances, from Super Bowl championships to prison ministry.',
    ogImage: '/images/profiles/coach-dungy-og.jpg'
  }
}; 