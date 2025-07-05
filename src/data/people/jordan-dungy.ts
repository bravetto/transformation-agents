import { PersonData } from '@/types/person';

export const jordanDungy: PersonData = {
  id: 'jordan-dungy',
  slug: 'jordan-dungy',
  name: 'Jordan Dungy',
  title: 'Where Legacy Meets Destiny',
  heroImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1920&h=1080&fit=crop',
  localImage: true,
  
  testimony: {
    quote: 'Not living in my father\'s shadow but finding my own light. Teaching youth that their pain has purpose and their dreams have destiny.',
    context: 'Jordan Dungy, on his personal mission',
    date: '2024'
  },
  
  impact: {
    title: 'Legacy Transformed into Action',
    description: 'When a champion\'s son becomes a champion for others',
    stats: [
      {
        label: 'Youth Mentored',
        value: '50+'
      },
      {
        label: 'Speaking Events',
        value: '25'
      },
      {
        label: 'Cities Transformed',
        value: '3'
      },
      {
        label: 'Lives Changed',
        value: 'Countless'
      }
    ]
  },
  
  sections: [
    {
      type: 'hero',
      content: {
        title: 'Jordan Dungy',
        subtitle: 'Where Legacy Meets Destiny',
        description: "My father taught me football, but God taught me faith. Now I'm teaching youth that their pain has purpose and their dreams have destiny.",
        backgroundImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1920&h=1080&fit=crop'
      }
    },
    {
      type: 'testimony',
      content: {
        title: 'Finding My Own Light',
        description: 'Beyond the shadow of a legend to a path of purpose',
        testimonies: [
          {
            id: 'testimony-1',
            quote: "Growing up as Coach Dungy's son meant expectations were high. Everyone saw the Super Bowl rings, the accolades, the success. But I saw something deeper—a man who chose service over stardom, family over fame, eternal over temporal. My journey hasn't been about living in his shadow but finding my own light. My father taught me that true leadership means serving others, but I had to learn that serving begins with healing your own wounds first. Working with The Bridge Project, I see myself in every young person who feels the weight of expectations they didn't choose. I see my father's wisdom becoming my own voice. Not copying his path but creating bridges he couldn't build because they needed my generation's blueprint. When I think about The Bridge Project, I see more than just a program—I see hope in action. Every young person reminds me why this matters. They're not statistics or problems to be solved—they're future leaders waiting for someone to believe in them. My father taught me that our greatest victories come not on the field, but in the lives we touch. Now I'm touching lives he prepared me to reach.",
            author: "Jordan Dungy",
            role: "Son of a Champion, Champion for Others",
            date: "2024"
          }
        ]
      }
    },
    {
      type: 'impact',
      content: {
        title: "Legacy Transformed into Action",
        description: "When a champion's son becomes a champion for others",
        stats: [
          {
            id: 'stat-1',
            value: '50+',
            label: 'Youth Mentored',
            description: 'Direct personal guidance'
          },
          {
            id: 'stat-2',
            value: '25',
            label: 'Speaking Events',
            description: 'Sharing wisdom and inspiration'
          },
          {
            id: 'stat-3',
            value: '3',
            label: 'Cities Transformed',
            description: 'Community-wide impact'
          },
          {
            id: 'stat-4',
            value: 'Countless',
            label: 'Lives Changed',
            description: 'Through mentorship and example'
          }
        ],
        achievements: [
          {
            id: 'achievement-1',
            title: 'Youngest Featured Speaker',
            description: 'Youngest speaker at regional faith conference, inspiring youth and adults alike',
            year: '2022'
          },
          {
            id: 'achievement-2',
            title: 'Father-Son Mentorship Model',
            description: 'Pioneered father-son mentorship model that bridges generational gaps',
            year: '2023'
          },
          {
            id: 'achievement-3',
            title: 'Legacy to Destiny Program',
            description: 'Created "Legacy to Destiny" youth program helping young people find their own path',
            year: '2024'
          },
          {
            id: 'achievement-4',
            title: 'Generational Bridge Builder',
            description: 'Building bridges between generations through authentic connection',
            year: 'Present'
          },
          {
            id: 'achievement-5',
            title: 'Living Example',
            description: 'Proving that greatness can be both inherited and earned through personal growth',
            year: 'Present'
          }
        ]
      }
    },
    {
      type: 'letter',
      content: {
        title: "To Every Child of Expectations",
        recipient: "To Those Who Carry Names Heavier Than They Chose",
        body: `Dear Future Leader,

I see you. Carrying a last name that opens doors and creates ceilings. Expected to be great because of who came before, not who you're becoming. I've been there.

My father is Tony Dungy. Yes, that Tony Dungy. Super Bowl champion. Hall of Famer. The man who did it "the Lord's way." And I'm proud to be his son. But I had to learn that his greatness didn't automatically transfer to me—I had to find my own.

Here's what I learned: Your parent's success is your platform, not your prison. Their achievements are your launching pad, not your landing spot. God has a specific calling for you that no one else can fulfill—not even them.

The Bridge Project became my purpose because I understand bridges. I stand on one every day—between my father's generation and yours, between expectation and authenticity, between legacy and destiny.

You don't have to be your parent. You don't have to exceed them. You just have to be exactly who God created you to be. Use their shoulders to see further, but walk your own path.

Your greatness is not in comparison but in connection. Connect to your purpose. Connect to your generation. Connect to the God who knew you before famous parents did.

Building bridges with you,
Jordan Dungy`,
        date: "2024",
        signature: {
          name: "Jordan Dungy",
          title: "Son Finding His Own Light",
          image: "/images/signatures/jordan-dungy.png"
        }
      }
    }
  ],
  
  metadata: {
    title: 'Jordan Dungy | Where Legacy Meets Destiny | The Bridge',
    description: 'Jordan Dungy is finding his own light beyond his father\'s shadow, teaching youth that their pain has purpose and their dreams have destiny.',
    ogImage: '/images/profiles/jordan-dungy-og.jpg'
  }
}; 