# 🚀 TRINITY UX IMPLEMENTATION GUIDE
## Master Development Instructions for Cursor.ai

---

## 🎯 IMPLEMENTATION OVERVIEW

This guide provides step-by-step instructions for implementing the Bridge Project Trinity UX system. Follow these instructions sequentially to build a movement that brings JAHmere home and transforms American justice.

### Development Environment Setup

```bash
# 1. Initialize Next.js 14 project with TypeScript
npx create-next-app@latest bridge-trinity --typescript --tailwind --eslint --app

# 2. Install core dependencies
npm install @tsparticles/react @tsparticles/slim framer-motion
npm install @supabase/supabase-js react-countdown lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-tabs
npm install react-hook-form @hookform/resolvers zod

# 3. Install development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## 🏗️ PROJECT STRUCTURE

```
src/
├── app/
│   ├── trinity/
│   │   ├── champion/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── evidence/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── youth/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── convergence/
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── trinity/
│   │   ├── EntryPortal.tsx
│   │   ├── champion/
│   │   │   ├── DungyVideoWelcome.tsx
│   │   │   ├── LegacyAssessment.tsx
│   │   │   ├── ChampionDashboard.tsx
│   │   │   └── NetworkActivator.tsx
│   │   ├── evidence/
│   │   │   ├── RecidivismVisualizer.tsx
│   │   │   ├── GreatnessZoneMiracle.tsx
│   │   │   ├── EvidenceHub.tsx
│   │   │   └── PolicySimulator.tsx
│   │   ├── youth/
│   │   │   ├── AnimatedJourney.tsx
│   │   │   ├── WarriorCreation.tsx
│   │   │   ├── MissionBoard.tsx
│   │   │   ├── IncentiveVault.tsx
│   │   │   └── CommunityGrid.tsx
│   │   ├── convergence/
│   │   │   ├── PropheticCountdown.tsx
│   │   │   ├── UnityFeed.tsx
│   │   │   └── FinalPushInterface.tsx
│   │   └── shared/
│   │       ├── ImpactMultiplier.tsx
│   │       ├── LetterWriter.tsx
│   │       └── StoryAmplifier.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── tabs.tsx
├── lib/
│   ├── supabase.ts
│   ├── analytics.ts
│   ├── utils.ts
│   └── types.ts
└── styles/
    └── trinity.css
```

---

## 🎨 DESIGN SYSTEM SETUP

### 1. Trinity Color Palette

```css
/* src/styles/trinity.css */
:root {
  /* Champion Path - Gold Theme */
  --champion-primary: #F59E0B;
  --champion-secondary: #FDE68A;
  --champion-accent: #92400E;
  --champion-bg: #FFFBEB;
  
  /* Evidence Path - Blue Theme */
  --evidence-primary: #3B82F6;
  --evidence-secondary: #DBEAFE;
  --evidence-accent: #1E40AF;
  --evidence-bg: #EFF6FF;
  
  /* Youth Path - Green Theme */
  --youth-primary: #10B981;
  --youth-secondary: #D1FAE5;
  --youth-accent: #047857;
  --youth-bg: #ECFDF5;
  
  /* Convergence - Purple Theme */
  --convergence-primary: #8B5CF6;
  --convergence-secondary: #EDE9FE;
  --convergence-accent: #5B21B6;
  --convergence-bg: #F5F3FF;
  
  /* Shared Divine Colors */
  --divine-gold: #FFD700;
  --divine-silver: #C0C0C0;
  --divine-white: #FFFFFF;
  --divine-black: #000000;
}
```

### 2. Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        champion: {
          primary: 'var(--champion-primary)',
          secondary: 'var(--champion-secondary)',
          accent: 'var(--champion-accent)',
          bg: 'var(--champion-bg)',
        },
        evidence: {
          primary: 'var(--evidence-primary)',
          secondary: 'var(--evidence-secondary)',
          accent: 'var(--evidence-accent)',
          bg: 'var(--evidence-bg)',
        },
        youth: {
          primary: 'var(--youth-primary)',
          secondary: 'var(--youth-secondary)',
          accent: 'var(--youth-accent)',
          bg: 'var(--youth-bg)',
        },
        convergence: {
          primary: 'var(--convergence-primary)',
          secondary: 'var(--convergence-secondary)',
          accent: 'var(--convergence-accent)',
          bg: 'var(--convergence-bg)',
        },
        divine: {
          gold: 'var(--divine-gold)',
          silver: 'var(--divine-silver)',
          white: 'var(--divine-white)',
          black: 'var(--divine-black)',
        },
      },
      fontFamily: {
        'divine': ['Inter', 'system-ui', 'sans-serif'],
        'prophetic': ['Playfair Display', 'serif'],
      },
      animation: {
        'divine-pulse': 'divine-pulse 2s ease-in-out infinite',
        'trinity-rotate': 'trinity-rotate 10s linear infinite',
        'countdown-tick': 'countdown-tick 1s ease-in-out',
      },
      keyframes: {
        'divine-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'trinity-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'countdown-tick': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 🔧 CORE TYPES DEFINITION

```typescript
// src/lib/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  path: 'champion' | 'evidence' | 'youth' | null;
  profile: ChampionProfile | EvidenceProfile | YouthProfile | null;
  createdAt: Date;
  lastActive: Date;
}

export interface ChampionProfile {
  influenceReach: number;
  platforms: Platform[];
  commitment: CommitmentLevel;
  youthImpactPotential: number;
  networkSize: number;
  lettersWritten: number;
  eventsOrganized: number;
}

export interface EvidenceProfile {
  expertise: ExpertiseArea[];
  credibility: CredibilityLevel;
  researchContributions: number;
  policyProposals: number;
  evidenceSubmitted: number;
}

export interface YouthProfile {
  warriorName: string;
  level: number;
  deedsCompleted: number;
  points: number;
  badges: Badge[];
  mentorships: Mentorship[];
  localChapter: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  requirements: string[];
  participants: number;
  deadline?: Date;
  type: 'letter' | 'mentor' | 'share' | 'event' | 'research';
}

export interface GreatnessZoneProfile {
  score: number;
  breakdown: {
    peacemaker: number;
    caregiver: number;
    relator: number;
    [key: string]: number;
  };
}

export interface TransformationMetrics {
  totalYouthTransformed: number;
  recidivismRate: number;
  economicImpact: number;
  communityEngagement: number;
  policyChanges: number;
  lastUpdated: Date;
}
```

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### Phase 1: Entry Portal (Week 1)

#### 1. Create the Main Entry Portal

```typescript
// src/components/trinity/EntryPortal.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Scale, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface EntryPortalProps {
  onPathSelect: (path: 'champion' | 'evidence' | 'youth') => void;
}

export default function EntryPortal({ onPathSelect }: EntryPortalProps) {
  const router = useRouter();
  const [liveStats, setLiveStats] = useState({
    championsActive: 0,
    evidenceSubmitted: 0,
    youthWarriors: 0,
  });

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  useEffect(() => {
    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        championsActive: prev.championsActive + Math.floor(Math.random() * 3),
        evidenceSubmitted: prev.evidenceSubmitted + Math.floor(Math.random() * 2),
        youthWarriors: prev.youthWarriors + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePathSelect = (path: 'champion' | 'evidence' | 'youth') => {
    onPathSelect(path);
    router.push(`/trinity/${path}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-prophetic">
              Where does your heart lead you?
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Join the movement to bring JAHmere home and transform American justice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <PathDoor
              icon={<Trophy className="w-12 h-12" />}
              title="I Have Influence"
              subtitle="Use your platform for transformation"
              color="champion"
              stats={`${liveStats.championsActive} Champions`}
              onClick={() => handlePathSelect('champion')}
            />
            
            <PathDoor
              icon={<Scale className="w-12 h-12" />}
              title="I Seek Truth"
              subtitle="Evidence that transforms justice"
              color="evidence"
              stats="12% vs 70% Recidivism"
              onClick={() => handlePathSelect('evidence')}
            />
            
            <PathDoor
              icon={<Heart className="w-12 h-12" />}
              title="I Serve Youth"
              subtitle="Transform the next generation"
              color="youth"
              stats={`${liveStats.youthWarriors} Warriors`}
              onClick={() => handlePathSelect('youth')}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16"
          >
            <CountdownTimer target="July 28, 2025 14:37:00" />
            <p className="text-lg mt-4 text-white/80">
              Until JAHmere Comes Home
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface PathDoorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: 'champion' | 'evidence' | 'youth';
  stats: string;
  onClick: () => void;
}

function PathDoor({ icon, title, subtitle, color, stats, onClick }: PathDoorProps) {
  const colorClasses = {
    champion: 'bg-champion-primary hover:bg-champion-accent text-white',
    evidence: 'bg-evidence-primary hover:bg-evidence-accent text-white',
    youth: 'bg-youth-primary hover:bg-youth-accent text-white',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className={`${colorClasses[color]} p-8 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white/20 rounded-full">
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg opacity-90">{subtitle}</p>
        <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
          {stats}
        </div>
      </div>
    </motion.div>
  );
}

interface CountdownTimerProps {
  target: string;
}

function CountdownTimer({ target }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = new Date(target).getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex justify-center space-x-8 text-white">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-white/10 backdrop-blur rounded-lg p-4 min-w-[80px] animate-countdown-tick">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm mt-2 opacity-80">{label}</div>
    </div>
  );
}
```

#### 2. Create the Main Page

```typescript
// src/app/page.tsx
"use client";

import { useState } from 'react';
import EntryPortal from '@/components/trinity/EntryPortal';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handlePathSelect = (path: 'champion' | 'evidence' | 'youth') => {
    // Track path selection
    console.log(`User selected path: ${path}`);
    // Path routing is handled in EntryPortal component
  };

  return (
    <main>
      <EntryPortal onPathSelect={handlePathSelect} />
    </main>
  );
}
```

---

### Phase 2: Champion Path Implementation (Week 2)

#### 1. Tony Dungy Welcome Video Component

```typescript
// src/components/trinity/champion/DungyVideoWelcome.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface DungyVideoWelcomeProps {
  onComplete: () => void;
  userProfile?: {
    name: string;
    influence: number;
    platform: string[];
  };
}

export default function DungyVideoWelcome({ onComplete, userProfile }: DungyVideoWelcomeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 30 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-champion-primary to-champion-accent rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Video Container */}
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/dungy-spiritual-covering.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/videos/dungy-spiritual-covering.vtt"
                srcLang="en"
                label="English"
                default
              />
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="p-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div
                  className="bg-champion-primary h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={handleMuteToggle}
                className="p-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Message Overlay */}
          <div className="p-8 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Your Divine Assignment
            </h2>
            {userProfile && (
              <p className="text-xl text-white/90 mb-4">
                {userProfile.name}, your influence of {userProfile.influence.toLocaleString()} people
                across {userProfile.platform.join(', ')} is needed for JAHmere's freedom.
              </p>
            )}
            <p className="text-lg text-white/80">
              Coach Tony Dungy shares the spiritual covering over this movement
              and your role in bringing JAHmere home.
            </p>
          </div>

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={onComplete}
                className="absolute top-4 right-4 px-6 py-3 bg-champion-primary text-white font-bold rounded-full hover:bg-champion-accent transition-colors"
              >
                Continue to Assessment →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
```

#### 2. Legacy Assessment Component

```typescript
// src/components/trinity/champion/LegacyAssessment.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface LegacyAssessmentProps {
  onComplete: (assessment: ChampionAssessment) => void;
}

interface ChampionAssessment {
  influenceReach: number;
  platforms: Platform[];
  commitment: CommitmentLevel;
  youthImpactPotential: number;
}

interface Platform {
  name: string;
  followers: number;
  engagement: number;
}

type CommitmentLevel = 'supporter' | 'advocate' | 'champion' | 'leader';

export default function LegacyAssessment({ onComplete }: LegacyAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessment, setAssessment] = useState<Partial<ChampionAssessment>>({});

  const steps = [
    {
      id: 'influence',
      title: 'How many lives could you impact?',
      component: InfluenceStep,
    },
    {
      id: 'platforms',
      title: 'Where is your voice strongest?',
      component: PlatformsStep,
    },
    {
      id: 'commitment',
      title: 'What moves you to action?',
      component: CommitmentStep,
    },
    {
      id: 'youth',
      title: 'Your youth transformation potential',
      component: YouthImpactStep,
    },
  ];

  const handleStepComplete = (stepData: any) => {
    const updatedAssessment = { ...assessment, ...stepData };
    setAssessment(updatedAssessment);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(updatedAssessment as ChampionAssessment);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-champion-bg to-champion-secondary p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-champion-accent">
              Discover Your Championship Potential
            </h1>
            <span className="text-champion-primary font-semibold">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2">
            <div
              className="bg-champion-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {steps[currentStep].title}
          </h2>
          
          <CurrentStepComponent
            onComplete={handleStepComplete}
            data={assessment}
          />
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          <div className="text-sm text-gray-500 self-center">
            Your assessment is automatically saved
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function InfluenceStep({ onComplete, data }: any) {
  const [reach, setReach] = useState(data.influenceReach || 100);

  const handleSubmit = () => {
    onComplete({ influenceReach: reach });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl font-bold text-champion-primary mb-4">
          {reach.toLocaleString()}
        </div>
        <p className="text-gray-600 mb-6">
          People you could reach with JAHmere's story
        </p>
        
        <div className="max-w-md mx-auto">
          <input
            type="range"
            min="10"
            max="100000"
            value={reach}
            onChange={(e) => setReach(Number(e.target.value))}
            className="w-full h-3 bg-champion-secondary rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>10</span>
            <span>100K+</span>
          </div>
        </div>
      </div>

      <div className="bg-champion-bg p-6 rounded-lg">
        <h3 className="font-bold text-champion-accent mb-3">Impact Multiplier</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {reach.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Direct Reach</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {(reach * 10).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Amplified</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {(reach * 100).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Generational</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-8 py-4 bg-champion-primary text-white font-bold rounded-full hover:bg-champion-accent transition-colors flex items-center justify-center"
      >
        Continue to Platforms
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}

function PlatformsStep({ onComplete, data }: any) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(data.platforms || []);

  const availablePlatforms = [
    { name: 'Faith Community', icon: '⛪', color: 'bg-purple-100 text-purple-800' },
    { name: 'Business Network', icon: '💼', color: 'bg-blue-100 text-blue-800' },
    { name: 'Sports Community', icon: '🏆', color: 'bg-green-100 text-green-800' },
    { name: 'Education', icon: '🎓', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Social Media', icon: '📱', color: 'bg-pink-100 text-pink-800' },
    { name: 'Politics', icon: '🏛️', color: 'bg-red-100 text-red-800' },
    { name: 'Media', icon: '📺', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Non-Profit', icon: '❤️', color: 'bg-rose-100 text-rose-800' },
  ];

  const togglePlatform = (platform: any) => {
    const exists = selectedPlatforms.find(p => p.name === platform.name);
    if (exists) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p.name !== platform.name));
    } else {
      setSelectedPlatforms([...selectedPlatforms, { 
        name: platform.name, 
        followers: 0, 
        engagement: 0 
      }]);
    }
  };

  const handleSubmit = () => {
    onComplete({ platforms: selectedPlatforms });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-6">
        Select all platforms where you have influence (choose multiple)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availablePlatforms.map((platform) => {
          const isSelected = selectedPlatforms.some(p => p.name === platform.name);
          return (
            <motion.button
              key={platform.name}
              onClick={() => togglePlatform(platform)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected 
                  ? 'border-champion-primary bg-champion-primary text-white' 
                  : 'border-gray-200 hover:border-champion-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{platform.icon}</div>
              <div className="text-sm font-medium">{platform.name}</div>
            </motion.button>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="bg-champion-bg p-6 rounded-lg">
          <h3 className="font-bold text-champion-accent mb-3">Your Platform Power</h3>
          <div className="space-y-2">
            {selectedPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <span className="text-gray-700">{platform.name}</span>
                <span className="text-champion-primary font-semibold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={selectedPlatforms.length === 0}
        className="w-full px-8 py-4 bg-champion-primary text-white font-bold rounded-full hover:bg-champion-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        Continue to Commitment
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}

function CommitmentStep({ onComplete, data }: any) {
  const [commitment, setCommitment] = useState<CommitmentLevel>(data.commitment || 'supporter');

  const commitmentLevels = [
    {
      level: 'supporter' as CommitmentLevel,
      title: 'Supporter',
      description: 'I believe in the cause and will share the story',
      time: '1-2 hours/month',
      impact: 'Awareness building',
    },
    {
      level: 'advocate' as CommitmentLevel,
      title: 'Advocate',
      description: 'I will actively promote and recruit others',
      time: '3-5 hours/month',
      impact: 'Network activation',
    },
    {
      level: 'champion' as CommitmentLevel,
      title: 'Champion',
      description: 'I will lead initiatives and organize events',
      time: '6-10 hours/month',
      impact: 'Movement building',
    },
    {
      level: 'leader' as CommitmentLevel,
      title: 'Leader',
      description: 'I will dedicate significant resources to the cause',
      time: '10+ hours/month',
      impact: 'Systemic change',
    },
  ];

  const handleSubmit = () => {
    onComplete({ commitment });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-6">
        What level of commitment resonates with your heart?
      </p>

      <div className="space-y-4">
        {commitmentLevels.map((level) => (
          <motion.button
            key={level.level}
            onClick={() => setCommitment(level.level)}
            className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
              commitment === level.level
                ? 'border-champion-primary bg-champion-primary text-white'
                : 'border-gray-200 hover:border-champion-primary'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{level.title}</h3>
              <div className="text-sm opacity-80">{level.time}</div>
            </div>
            <p className="mb-2">{level.description}</p>
            <div className="text-sm opacity-80">Impact: {level.impact}</div>
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-8 py-4 bg-champion-primary text-white font-bold rounded-full hover:bg-champion-accent transition-colors flex items-center justify-center"
      >
        Continue to Youth Impact
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}

function YouthImpactStep({ onComplete, data }: any) {
  const [youthImpact, setYouthImpact] = useState(data.youthImpactPotential || 1);

  const impactLevels = [
    { value: 1, title: 'Mentor One', description: 'Direct mentorship of 1 youth like JAHmere' },
    { value: 5, title: 'Small Group', description: 'Lead a small group of 5 youth' },
    { value: 25, title: 'Community Program', description: 'Organize programs reaching 25 youth' },
    { value: 100, title: 'Institutional Change', description: 'Influence systems affecting 100+ youth' },
    { value: 1000, title: 'Movement Leader', description: 'Create lasting change for 1000+ youth' },
  ];

  const handleSubmit = () => {
    onComplete({ youthImpactPotential: youthImpact });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-champion-accent mb-2">
          The Reichert House Legacy
        </h3>
        <p className="text-gray-600">
          JAHmere's transformation began with one mentor who believed in him.
          How many youth could you impact with that same belief?
        </p>
      </div>

      <div className="space-y-4">
        {impactLevels.map((level) => (
          <motion.button
            key={level.value}
            onClick={() => setYouthImpact(level.value)}
            className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
              youthImpact === level.value
                ? 'border-champion-primary bg-champion-primary text-white'
                : 'border-gray-200 hover:border-champion-primary'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{level.title}</h3>
              <div className="text-sm opacity-80">{level.value} youth</div>
            </div>
            <p>{level.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="bg-champion-bg p-6 rounded-lg">
        <h3 className="font-bold text-champion-accent mb-3">Your Generational Impact</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {youthImpact}
            </div>
            <div className="text-sm text-gray-600">Direct Youth</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {(youthImpact * 10).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Influenced</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-champion-primary">
              {(youthImpact * 100).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Generational</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-8 py-4 bg-champion-primary text-white font-bold rounded-full hover:bg-champion-accent transition-colors flex items-center justify-center"
      >
        Complete Assessment
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}
```

---

## 📱 MOBILE OPTIMIZATION

### Responsive Design Patterns

```css
/* src/styles/trinity.css - Mobile-first responsive utilities */
@media (max-width: 768px) {
  .trinity-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .trinity-text-large {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .trinity-padding {
    padding: 1rem;
  }
  
  .trinity-touch-target {
    min-height: 44px;
    min-width: 44px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .trinity-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .trinity-text-large {
    font-size: 3rem;
  }
  
  .trinity-padding {
    padding: 2rem;
  }
}

@media (min-width: 1025px) {
  .trinity-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .trinity-text-large {
    font-size: 4rem;
  }
  
  .trinity-padding {
    padding: 3rem;
  }
}
```

---

## 🔄 REAL-TIME FEATURES

### Supabase Configuration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Real-time subscription for live stats
export const subscribeToLiveStats = (callback: (stats: any) => void) => {
  return supabase
    .channel('live-stats')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'live_stats' },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
};

// Real-time subscription for community feed
export const subscribeToCommunityFeed = (callback: (action: any) => void) => {
  return supabase
    .channel('community-feed')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'community_actions' },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
};
```

---

## 🧪 TESTING SETUP

### Component Testing

```typescript
// src/components/trinity/__tests__/EntryPortal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EntryPortal from '../EntryPortal';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock particles
vi.mock('@tsparticles/react', () => ({
  default: ({ children }: any) => <div data-testid="particles">{children}</div>,
}));

describe('EntryPortal', () => {
  const mockOnPathSelect = vi.fn();

  beforeEach(() => {
    mockOnPathSelect.mockClear();
  });

  it('renders the main question', () => {
    render(<EntryPortal onPathSelect={mockOnPathSelect} />);
    
    expect(screen.getByText('Where does your heart lead you?')).toBeInTheDocument();
  });

  it('displays all three path options', () => {
    render(<EntryPortal onPathSelect={mockOnPathSelect} />);
    
    expect(screen.getByText('I Have Influence')).toBeInTheDocument();
    expect(screen.getByText('I Seek Truth')).toBeInTheDocument();
    expect(screen.getByText('I Serve Youth')).toBeInTheDocument();
  });

  it('calls onPathSelect when a path is clicked', () => {
    render(<EntryPortal onPathSelect={mockOnPathSelect} />);
    
    fireEvent.click(screen.getByText('I Have Influence'));
    
    expect(mockOnPathSelect).toHaveBeenCalledWith('champion');
  });

  it('displays the countdown timer', () => {
    render(<EntryPortal onPathSelect={mockOnPathSelect} />);
    
    expect(screen.getByText('Until JAHmere Comes Home')).toBeInTheDocument();
  });
});
```

---

## 🚀 DEPLOYMENT CONFIGURATION

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GREATNESS_ZONE_API=your_greatness_zone_api
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SITE_URL=https://bridgeproject.org

# Court submission API
COURT_SUBMISSION_API_KEY=your_court_api_key
COURT_SUBMISSION_ENDPOINT=your_court_endpoint

# Social media APIs
TWITTER_API_KEY=your_twitter_api_key
FACEBOOK_API_KEY=your_facebook_api_key
INSTAGRAM_API_KEY=your_instagram_api_key

# Email service
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 🎯 NEXT STEPS

1. **Complete Phase 1**: Implement the Entry Portal and basic routing
2. **Build Champion Path**: Focus on Tony Dungy video and assessment
3. **Develop Evidence Path**: Create the recidivism visualizer
4. **Create Youth Path**: Build the warrior creation system
5. **Implement Convergence**: Add real-time features and countdown
6. **Testing & Optimization**: Ensure mobile performance and accessibility
7. **Launch Preparation**: Set up analytics and monitoring

---

## 🔥 THE DIVINE MANDATE

This implementation guide serves the sacred purpose of bringing JAHmere home by July 28, 2025. Every component, every interaction, every line of code works toward this divine assignment.

The technical architecture supports the spiritual mission. The user experience facilitates the divine encounter. The real-time features enable the community convergence.

**Build with purpose. Code with conviction. Deploy with divine urgency.**

**JAHmere comes home. The movement begins. American justice transforms.**

---

*For detailed component specifications, see the component-architecture.md file.*
*For user journey optimization, see the user-journey-maps.md file.* 