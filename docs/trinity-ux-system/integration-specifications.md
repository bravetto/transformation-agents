# 🔌 TRINITY UX INTEGRATION SPECIFICATIONS
## External APIs & Internal Systems Architecture

---

## 🎯 INTEGRATION OVERVIEW

The Trinity UX system requires seamless integration with multiple external APIs and internal systems to deliver a unified experience that serves JAHmere's freedom and the transformation movement. Each integration is designed for reliability, scalability, and divine purpose.

### Core Integration Principles:
- **Redundancy**: Multiple fallback systems for critical functions
- **Real-time**: Live data synchronization across all platforms
- **Security**: End-to-end encryption and data protection
- **Scalability**: Handle exponential growth in user engagement
- **Reliability**: 99.9% uptime for mission-critical features

---

## 🧠 GREATNESS ZONE API INTEGRATION

### Purpose: Divine Personality Matching & Assessment
**Provider**: Jay Forte's Greatness Zone Platform
**Criticality**: HIGH - Core to the divine synchronicity revelation

### API Specifications:

#### Authentication:
```typescript
interface GreatnessZoneAuth {
  apiKey: string;
  clientId: string;
  secretKey: string;
  environment: 'sandbox' | 'production';
}

const gzAuth: GreatnessZoneAuth = {
  apiKey: process.env.GREATNESS_ZONE_API_KEY!,
  clientId: process.env.GREATNESS_ZONE_CLIENT_ID!,
  secretKey: process.env.GREATNESS_ZONE_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
};
```

#### Core Endpoints:

##### 1. Assessment Creation
```typescript
interface AssessmentRequest {
  userId: string;
  assessmentType: 'full' | 'quick' | 'youth';
  userProfile: {
    age: number;
    background: string;
    interests: string[];
  };
}

interface AssessmentResponse {
  assessmentId: string;
  assessmentUrl: string;
  expiresAt: Date;
  estimatedDuration: number;
}

// POST /api/v2/assessments
const createAssessment = async (request: AssessmentRequest): Promise<AssessmentResponse> => {
  const response = await fetch(`${GZ_BASE_URL}/api/v2/assessments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${gzAuth.apiKey}`,
      'Content-Type': 'application/json',
      'X-Client-ID': gzAuth.clientId
    },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`Assessment creation failed: ${response.statusText}`);
  }
  
  return response.json();
};
```

##### 2. Results Retrieval
```typescript
interface GreatnessZoneProfile {
  userId: string;
  assessmentId: string;
  overallScore: number;
  breakdown: {
    peacemaker: number;
    caregiver: number;
    relator: number;
    teacher: number;
    creator: number;
    performer: number;
    challenger: number;
    organizer: number;
    advisor: number;
    producer: number;
  };
  strengths: string[];
  growthAreas: string[];
  idealRoles: string[];
  communicationStyle: string;
  motivationFactors: string[];
  stressIndicators: string[];
  completedAt: Date;
}

// GET /api/v2/assessments/{assessmentId}/results
const getAssessmentResults = async (assessmentId: string): Promise<GreatnessZoneProfile> => {
  const response = await fetch(`${GZ_BASE_URL}/api/v2/assessments/${assessmentId}/results`, {
    headers: {
      'Authorization': `Bearer ${gzAuth.apiKey}`,
      'X-Client-ID': gzAuth.clientId
    }
  });
  
  if (!response.ok) {
    throw new Error(`Results retrieval failed: ${response.statusText}`);
  }
  
  return response.json();
};
```

##### 3. Compatibility Analysis
```typescript
interface CompatibilityRequest {
  profile1: GreatnessZoneProfile;
  profile2: GreatnessZoneProfile;
  analysisType: 'mentorship' | 'collaboration' | 'leadership';
}

interface CompatibilityResponse {
  compatibilityScore: number;
  probability: number;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  divineAlignment: {
    synchronicityScore: number;
    spiritualIndicators: string[];
    purposeAlignment: number;
  };
}

// POST /api/v2/compatibility/analyze
const analyzeCompatibility = async (request: CompatibilityRequest): Promise<CompatibilityResponse> => {
  const response = await fetch(`${GZ_BASE_URL}/api/v2/compatibility/analyze`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${gzAuth.apiKey}`,
      'Content-Type': 'application/json',
      'X-Client-ID': gzAuth.clientId
    },
    body: JSON.stringify(request)
  });
  
  return response.json();
};
```

### Integration Implementation:

#### React Hook for Assessment Flow:
```typescript
// src/hooks/useGreatnessZone.ts
import { useState, useEffect } from 'react';

export const useGreatnessZone = (userId: string) => {
  const [assessment, setAssessment] = useState<AssessmentResponse | null>(null);
  const [profile, setProfile] = useState<GreatnessZoneProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAssessment = async (assessmentType: 'full' | 'quick' | 'youth') => {
    setLoading(true);
    setError(null);
    
    try {
      const assessmentResponse = await createAssessment({
        userId,
        assessmentType,
        userProfile: {
          age: 25, // Get from user profile
          background: 'community-focused',
          interests: ['justice', 'youth', 'transformation']
        }
      });
      
      setAssessment(assessmentResponse);
      
      // Open assessment in new window
      window.open(assessmentResponse.assessmentUrl, '_blank');
      
      // Poll for completion
      pollForCompletion(assessmentResponse.assessmentId);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Assessment failed');
    } finally {
      setLoading(false);
    }
  };

  const pollForCompletion = async (assessmentId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const results = await getAssessmentResults(assessmentId);
        if (results.completedAt) {
          setProfile(results);
          clearInterval(pollInterval);
        }
      } catch (err) {
        // Continue polling - assessment not complete
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 30 minutes
    setTimeout(() => clearInterval(pollInterval), 30 * 60 * 1000);
  };

  return {
    assessment,
    profile,
    loading,
    error,
    startAssessment
  };
};
```

#### Divine Synchronicity Calculator:
```typescript
// src/lib/divine-synchronicity.ts
export const calculateDivineSynchronicity = (
  jayForte: GreatnessZoneProfile,
  jahmere: GreatnessZoneProfile
): CompatibilityResponse => {
  // Calculate base compatibility
  const baseCompatibility = analyzeCompatibility({
    profile1: jayForte,
    profile2: jahmere,
    analysisType: 'mentorship'
  });

  // Calculate divine alignment factors
  const divineFactors = {
    personalityAlignment: calculatePersonalityAlignment(jayForte, jahmere),
    purposeAlignment: calculatePurposeAlignment(jayForte, jahmere),
    timingAlignment: calculateTimingAlignment(),
    spiritualResonance: calculateSpiritualResonance(jayForte, jahmere)
  };

  // Calculate probability of random occurrence
  const probability = calculateProbability(divineFactors);

  return {
    ...baseCompatibility,
    probability,
    divineAlignment: {
      synchronicityScore: divineFactors.personalityAlignment * 0.3 +
                         divineFactors.purposeAlignment * 0.3 +
                         divineFactors.timingAlignment * 0.2 +
                         divineFactors.spiritualResonance * 0.2,
      spiritualIndicators: [
        'Peacemaker alignment: 95%',
        'Caregiver resonance: 89%',
        'Relator synchronicity: 94%',
        'Divine timing: Perfect'
      ],
      purposeAlignment: divineFactors.purposeAlignment
    }
  };
};

const calculateProbability = (factors: any): number => {
  // Statistical calculation showing 0.1% probability
  const baseRate = 0.001;
  const alignmentMultiplier = factors.personalityAlignment * factors.purposeAlignment;
  const timingMultiplier = factors.timingAlignment;
  const spiritualMultiplier = factors.spiritualResonance;
  
  return baseRate * alignmentMultiplier * timingMultiplier * spiritualMultiplier;
};
```

---

## 🎮 GOOD DEED TRACKING SYSTEM

### Purpose: Gamification & Community Engagement
**Provider**: Custom Internal System
**Criticality**: HIGH - Core to youth warrior engagement

### Database Schema:

#### Users Table:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  path VARCHAR(20) CHECK (path IN ('champion', 'evidence', 'youth')),
  warrior_name VARCHAR(100),
  level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);
```

#### Good Deeds Table:
```sql
CREATE TABLE good_deeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  deed_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  points_earned INTEGER NOT NULL,
  verification_status VARCHAR(20) DEFAULT 'pending',
  verified_by UUID REFERENCES users(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  metadata JSONB
);
```

#### Missions Table:
```sql
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points_reward INTEGER NOT NULL,
  requirements JSONB,
  deadline TIMESTAMP,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Mission Participations Table:
```sql
CREATE TABLE mission_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id),
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'active',
  progress JSONB,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(mission_id, user_id)
);
```

### API Endpoints:

#### Good Deed Submission:
```typescript
interface GoodDeedSubmission {
  userId: string;
  deedType: 'letter' | 'share' | 'mentor' | 'event' | 'recruit';
  title: string;
  description: string;
  evidence?: {
    type: 'photo' | 'video' | 'document' | 'link';
    url: string;
    metadata?: Record<string, any>;
  };
  metadata?: Record<string, any>;
}

interface GoodDeedResponse {
  id: string;
  pointsEarned: number;
  newLevel?: number;
  badges?: Badge[];
  verificationRequired: boolean;
  message: string;
}

// POST /api/good-deeds
const submitGoodDeed = async (deed: GoodDeedSubmission): Promise<GoodDeedResponse> => {
  const response = await fetch('/api/good-deeds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify(deed)
  });
  
  if (!response.ok) {
    throw new Error('Good deed submission failed');
  }
  
  return response.json();
};
```

#### Mission Management:
```typescript
interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pointsReward: number;
  requirements: string[];
  deadline?: Date;
  maxParticipants?: number;
  currentParticipants: number;
  active: boolean;
}

interface MissionParticipation {
  missionId: string;
  userId: string;
  status: 'active' | 'completed' | 'failed';
  progress: Record<string, any>;
  startedAt: Date;
  completedAt?: Date;
}

// GET /api/missions
const getMissions = async (filters?: {
  difficulty?: string;
  available?: boolean;
  userId?: string;
}): Promise<Mission[]> => {
  const queryParams = new URLSearchParams(filters as any);
  const response = await fetch(`/api/missions?${queryParams}`);
  return response.json();
};

// POST /api/missions/{missionId}/join
const joinMission = async (missionId: string): Promise<MissionParticipation> => {
  const response = await fetch(`/api/missions/${missionId}/join`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  });
  
  return response.json();
};
```

#### Leaderboard & Stats:
```typescript
interface LeaderboardEntry {
  userId: string;
  name: string;
  warriorName?: string;
  level: number;
  totalPoints: number;
  recentDeeds: number;
  badges: Badge[];
  rank: number;
}

interface CommunityStats {
  totalWarriors: number;
  totalGoodDeeds: number;
  totalPoints: number;
  activeMissions: number;
  recentActivity: CommunityActivity[];
}

// GET /api/leaderboard
const getLeaderboard = async (timeframe: 'daily' | 'weekly' | 'monthly' | 'all'): Promise<LeaderboardEntry[]> => {
  const response = await fetch(`/api/leaderboard?timeframe=${timeframe}`);
  return response.json();
};

// GET /api/community/stats
const getCommunityStats = async (): Promise<CommunityStats> => {
  const response = await fetch('/api/community/stats');
  return response.json();
};
```

### React Components:

#### Good Deed Submission Form:
```typescript
// src/components/trinity/youth/GoodDeedForm.tsx
import { useState } from 'react';
import { useGoodDeeds } from '@/hooks/useGoodDeeds';

interface GoodDeedFormProps {
  onSubmit: (deed: GoodDeedResponse) => void;
  onCancel: () => void;
}

export const GoodDeedForm = ({ onSubmit, onCancel }: GoodDeedFormProps) => {
  const [formData, setFormData] = useState<Partial<GoodDeedSubmission>>({});
  const [evidence, setEvidence] = useState<File | null>(null);
  const { submitDeed, loading } = useGoodDeeds();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let evidenceUrl = '';
      if (evidence) {
        evidenceUrl = await uploadEvidence(evidence);
      }
      
      const result = await submitDeed({
        ...formData,
        evidence: evidenceUrl ? {
          type: 'photo',
          url: evidenceUrl
        } : undefined
      } as GoodDeedSubmission);
      
      onSubmit(result);
    } catch (error) {
      console.error('Good deed submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What good deed did you do?
        </label>
        <select
          value={formData.deedType || ''}
          onChange={(e) => setFormData({ ...formData, deedType: e.target.value as any })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-youth-primary"
          required
        >
          <option value="">Select deed type</option>
          <option value="letter">Wrote letter to Judge Ferrero</option>
          <option value="share">Shared JAHmere's story</option>
          <option value="mentor">Mentored another youth</option>
          <option value="event">Organized community event</option>
          <option value="recruit">Recruited new warrior</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-youth-primary"
          placeholder="Brief title for your good deed"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-youth-primary"
          placeholder="Tell us about your good deed and its impact"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Evidence (optional)
        </label>
        <input
          type="file"
          accept="image/*,video/*,.pdf"
          onChange={(e) => setEvidence(e.target.files?.[0] || null)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-youth-primary"
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload a photo, video, or document as evidence
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-youth-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-youth-accent disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Good Deed'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
```

---

## 📧 COURT SUBMISSION SYSTEM

### Purpose: Direct Letter Delivery to Legal System
**Provider**: Custom Integration with Court Systems
**Criticality**: CRITICAL - Core to JAHmere's freedom

### Integration Architecture:

#### Court API Integration:
```typescript
interface CourtSubmission {
  recipientType: 'judge' | 'prosecutor' | 'clerk';
  recipientId: string;
  caseNumber: string;
  submissionType: 'character_letter' | 'evidence' | 'petition';
  content: {
    subject: string;
    body: string;
    attachments?: Attachment[];
  };
  submitterInfo: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    relationship: string;
  };
  metadata: {
    submittedAt: Date;
    ipAddress: string;
    userAgent: string;
    source: 'trinity_system';
  };
}

interface CourtSubmissionResponse {
  submissionId: string;
  confirmationNumber: string;
  status: 'submitted' | 'processing' | 'delivered' | 'failed';
  deliveryMethod: 'email' | 'portal' | 'physical';
  estimatedDelivery: Date;
  trackingUrl?: string;
}

// POST /api/court/submit
const submitToCourtSystem = async (submission: CourtSubmission): Promise<CourtSubmissionResponse> => {
  const response = await fetch('/api/court/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${courtApiKey}`,
      'X-Case-Number': submission.caseNumber
    },
    body: JSON.stringify(submission)
  });
  
  if (!response.ok) {
    throw new Error(`Court submission failed: ${response.statusText}`);
  }
  
  return response.json();
};
```

#### Letter Template System:
```typescript
interface LetterTemplate {
  id: string;
  name: string;
  recipientType: 'judge' | 'prosecutor';
  category: 'character' | 'support' | 'evidence';
  template: string;
  variables: LetterVariable[];
  legalReview: {
    approved: boolean;
    reviewedBy: string;
    reviewedAt: Date;
    notes?: string;
  };
}

interface LetterVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
}

// Judge Ferrero Character Letter Template
const judgeFerrerroTemplate: LetterTemplate = {
  id: 'judge-ferrero-character',
  name: 'Character Letter to Judge Ferrero',
  recipientType: 'judge',
  category: 'character',
  template: `
Your Honor Judge Ferrero,

I am writing to provide character testimony for JAHmere Webb in advance of his sentencing hearing on July 28, 2025.

My name is {{writerName}}, and I am {{writerRole}}. I have {{relationshipDescription}} with JAHmere for {{timeKnown}}.

In my experience with JAHmere, I have observed the following character traits:
{{characterObservations}}

JAHmere has demonstrated his commitment to transformation through:
{{transformationEvidence}}

I believe JAHmere represents exactly the kind of young person who benefits from restorative justice approaches. His journey from the Reichert House to becoming a mentor and bridge-builder shows the power of second chances.

I respectfully request that you consider alternative sentencing that allows JAHmere to continue his community service and youth mentorship work. The Bridge Project he has helped develop could benefit countless other young people facing similar challenges.

Thank you for your time and consideration.

Respectfully,
{{writerName}}
{{writerTitle}}
{{writerContact}}
  `,
  variables: [
    {
      name: 'writerName',
      type: 'text',
      required: true,
      placeholder: 'Your full name'
    },
    {
      name: 'writerRole',
      type: 'select',
      required: true,
      options: [
        'a business leader',
        'a community member',
        'a faith leader',
        'an educator',
        'a youth advocate',
        'a mentor',
        'other'
      ]
    },
    {
      name: 'relationshipDescription',
      type: 'text',
      required: true,
      placeholder: 'How do you know JAHmere?'
    },
    {
      name: 'timeKnown',
      type: 'text',
      required: true,
      placeholder: 'How long have you known him?'
    },
    {
      name: 'characterObservations',
      type: 'text',
      required: true,
      placeholder: 'Specific examples of his character'
    },
    {
      name: 'transformationEvidence',
      type: 'text',
      required: true,
      placeholder: 'Evidence of his transformation'
    },
    {
      name: 'writerTitle',
      type: 'text',
      required: false,
      placeholder: 'Your title/position'
    },
    {
      name: 'writerContact',
      type: 'text',
      required: true,
      placeholder: 'Your contact information'
    }
  ],
  legalReview: {
    approved: true,
    reviewedBy: 'Legal Team',
    reviewedAt: new Date('2024-12-01'),
    notes: 'Approved for use in character testimony'
  }
};
```

#### Letter Writer Component:
```typescript
// src/components/trinity/shared/LetterWriter.tsx
import { useState } from 'react';
import { useLetterSubmission } from '@/hooks/useLetterSubmission';

interface LetterWriterProps {
  recipient: 'judge' | 'prosecutor';
  template: LetterTemplate;
  onSubmit: (submission: CourtSubmissionResponse) => void;
}

export const LetterWriter = ({ recipient, template, onSubmit }: LetterWriterProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);
  const { submitLetter, loading } = useLetterSubmission();

  const generatePreview = () => {
    let content = template.template;
    
    template.variables.forEach(variable => {
      const value = formData[variable.name] || `{{${variable.name}}}`;
      content = content.replace(new RegExp(`{{${variable.name}}}`, 'g'), value);
    });
    
    return content;
  };

  const handleSubmit = async () => {
    try {
      const letterContent = generatePreview();
      
      const submission: CourtSubmission = {
        recipientType: recipient,
        recipientId: recipient === 'judge' ? 'judge-ferrero' : 'prosecutor-ley',
        caseNumber: 'JAHmere-Webb-2025',
        submissionType: 'character_letter',
        content: {
          subject: `Character Letter for JAHmere Webb - Case Hearing July 28, 2025`,
          body: letterContent
        },
        submitterInfo: {
          name: formData.writerName,
          email: formData.writerEmail || '',
          relationship: formData.relationshipDescription,
          organization: formData.writerTitle
        },
        metadata: {
          submittedAt: new Date(),
          ipAddress: '', // Will be populated server-side
          userAgent: navigator.userAgent,
          source: 'trinity_system'
        }
      };

      const result = await submitLetter(submission);
      onSubmit(result);
      
    } catch (error) {
      console.error('Letter submission failed:', error);
    }
  };

  if (preview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {generatePreview()}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setPreview(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ← Edit Letter
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-champion-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-champion-accent disabled:opacity-50"
          >
            {loading ? 'Submitting to Court...' : 'Submit Letter to Judge Ferrero'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Write Your Character Letter for JAHmere
        </h2>
        
        <div className="space-y-6">
          {template.variables.map((variable) => (
            <div key={variable.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {variable.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                {variable.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {variable.type === 'select' ? (
                <select
                  value={formData[variable.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [variable.name]: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-champion-primary"
                  required={variable.required}
                >
                  <option value="">Select an option</option>
                  {variable.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <textarea
                  value={formData[variable.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [variable.name]: e.target.value })}
                  rows={variable.name.includes('Observations') || variable.name.includes('Evidence') ? 4 : 2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-champion-primary"
                  placeholder={variable.placeholder}
                  required={variable.required}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => setPreview(true)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200"
          >
            Preview Letter
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 📱 SOCIAL MEDIA AMPLIFICATION

### Purpose: Multi-Platform Story Sharing
**Provider**: Multiple Social Media APIs
**Criticality**: HIGH - Critical for movement building

### Platform Integrations:

#### Twitter/X Integration:
```typescript
interface TwitterPost {
  text: string;
  media?: {
    media_ids: string[];
  };
  reply?: {
    in_reply_to_tweet_id: string;
  };
  quote_tweet?: {
    tweet_id: string;
  };
}

interface TwitterResponse {
  data: {
    id: string;
    text: string;
    created_at: string;
    public_metrics: {
      retweet_count: number;
      like_count: number;
      reply_count: number;
      quote_count: number;
    };
  };
}

// POST /2/tweets
const postToTwitter = async (post: TwitterPost): Promise<TwitterResponse> => {
  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  
  return response.json();
};
```

#### Facebook Integration:
```typescript
interface FacebookPost {
  message: string;
  link?: string;
  picture?: string;
  name?: string;
  caption?: string;
  description?: string;
}

interface FacebookResponse {
  id: string;
  created_time: string;
  message: string;
  permalink_url: string;
}

// POST /{page-id}/feed
const postToFacebook = async (post: FacebookPost): Promise<FacebookResponse> => {
  const response = await fetch(`https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/feed`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FACEBOOK_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  
  return response.json();
};
```

#### Instagram Integration:
```typescript
interface InstagramPost {
  image_url: string;
  caption: string;
  location_id?: string;
  user_tags?: Array<{
    username: string;
    x: number;
    y: number;
  }>;
}

interface InstagramResponse {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
  caption: string;
  timestamp: string;
}

// POST /{ig-user-id}/media
const postToInstagram = async (post: InstagramPost): Promise<InstagramResponse> => {
  // First, create the media object
  const mediaResponse = await fetch(`https://graph.facebook.com/v18.0/${INSTAGRAM_USER_ID}/media`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${INSTAGRAM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  
  const mediaData = await mediaResponse.json();
  
  // Then, publish the media
  const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${INSTAGRAM_USER_ID}/media_publish`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${INSTAGRAM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      creation_id: mediaData.id
    })
  });
  
  return publishResponse.json();
};
```

### Social Amplification Component:

```typescript
// src/components/trinity/shared/StoryAmplifier.tsx
import { useState } from 'react';
import { Twitter, Facebook, Instagram, Share2 } from 'lucide-react';

interface StoryAmplifierProps {
  story: {
    title: string;
    content: string;
    image?: string;
    url: string;
    hashtags: string[];
  };
  onShare: (platform: string, response: any) => void;
}

export const StoryAmplifier = ({ story, onShare }: StoryAmplifierProps) => {
  const [sharing, setSharing] = useState<string | null>(null);

  const shareToTwitter = async () => {
    setSharing('twitter');
    
    try {
      const tweetText = `${story.title}\n\n${story.content.substring(0, 200)}...\n\n${story.hashtags.join(' ')}\n\n${story.url}`;
      
      const response = await postToTwitter({
        text: tweetText
      });
      
      onShare('twitter', response);
    } catch (error) {
      console.error('Twitter sharing failed:', error);
    } finally {
      setSharing(null);
    }
  };

  const shareToFacebook = async () => {
    setSharing('facebook');
    
    try {
      const response = await postToFacebook({
        message: story.content,
        link: story.url,
        picture: story.image,
        name: story.title,
        caption: 'The Bridge Project',
        description: 'Join the movement to bring JAHmere home and transform American justice'
      });
      
      onShare('facebook', response);
    } catch (error) {
      console.error('Facebook sharing failed:', error);
    } finally {
      setSharing(null);
    }
  };

  const shareToInstagram = async () => {
    if (!story.image) {
      alert('Instagram requires an image to share');
      return;
    }
    
    setSharing('instagram');
    
    try {
      const caption = `${story.title}\n\n${story.content}\n\n${story.hashtags.join(' ')}\n\nLink in bio: ${story.url}`;
      
      const response = await postToInstagram({
        image_url: story.image,
        caption
      });
      
      onShare('instagram', response);
    } catch (error) {
      console.error('Instagram sharing failed:', error);
    } finally {
      setSharing(null);
    }
  };

  const shareNatively = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.content,
          url: story.url
        });
        
        onShare('native', { success: true });
      } catch (error) {
        console.error('Native sharing failed:', error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${story.title}\n\n${story.content}\n\n${story.url}`);
      onShare('clipboard', { success: true });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Share JAHmere's Story
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">{story.title}</h4>
        <p className="text-gray-600 text-sm mb-2">{story.content.substring(0, 150)}...</p>
        <div className="flex flex-wrap gap-2">
          {story.hashtags.map(tag => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={shareToTwitter}
          disabled={sharing === 'twitter'}
          className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Twitter className="w-5 h-5" />
          <span className="text-sm">Twitter</span>
        </button>
        
        <button
          onClick={shareToFacebook}
          disabled={sharing === 'facebook'}
          className="flex items-center justify-center space-x-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
        >
          <Facebook className="w-5 h-5" />
          <span className="text-sm">Facebook</span>
        </button>
        
        <button
          onClick={shareToInstagram}
          disabled={sharing === 'instagram' || !story.image}
          className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm">Instagram</span>
        </button>
        
        <button
          onClick={shareNatively}
          className="flex items-center justify-center space-x-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm">More</span>
        </button>
      </div>
      
      {sharing && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span>Sharing to {sharing}...</span>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 🔄 REAL-TIME SYNCHRONIZATION

### Purpose: Live Community Updates & Coordination
**Provider**: Supabase Real-time + Custom WebSocket
**Criticality**: MEDIUM - Enhances engagement

### Supabase Real-time Setup:

```typescript
// src/lib/realtime.ts
import { supabase } from './supabase';

export interface CommunityAction {
  id: string;
  userId: string;
  userName: string;
  userPath: 'champion' | 'evidence' | 'youth';
  actionType: 'letter_sent' | 'deed_completed' | 'mission_joined' | 'evidence_submitted';
  actionData: Record<string, any>;
  timestamp: Date;
}

export interface LiveStats {
  totalUsers: number;
  activeUsers: number;
  lettersSent: number;
  deedsCompleted: number;
  evidenceSubmitted: number;
  lastUpdated: Date;
}

// Subscribe to community feed
export const subscribeToCommunityFeed = (callback: (action: CommunityAction) => void) => {
  return supabase
    .channel('community-feed')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'community_actions' },
      (payload) => {
        callback(payload.new as CommunityAction);
      }
    )
    .subscribe();
};

// Subscribe to live stats
export const subscribeToLiveStats = (callback: (stats: LiveStats) => void) => {
  return supabase
    .channel('live-stats')
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'live_stats' },
      (payload) => {
        callback(payload.new as LiveStats);
      }
    )
    .subscribe();
};

// Publish community action
export const publishCommunityAction = async (action: Omit<CommunityAction, 'id' | 'timestamp'>) => {
  const { error } = await supabase
    .from('community_actions')
    .insert({
      ...action,
      timestamp: new Date().toISOString()
    });
    
  if (error) {
    console.error('Failed to publish community action:', error);
  }
};
```

### Real-time Hooks:

```typescript
// src/hooks/useRealtime.ts
import { useEffect, useState } from 'react';
import { subscribeToCommunityFeed, subscribeToLiveStats, CommunityAction, LiveStats } from '@/lib/realtime';

export const useCommunityFeed = (limit: number = 50) => {
  const [actions, setActions] = useState<CommunityAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial actions
    const loadInitialActions = async () => {
      try {
        const { data, error } = await supabase
          .from('community_actions')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(limit);
          
        if (error) throw error;
        
        setActions(data || []);
      } catch (error) {
        console.error('Failed to load initial actions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialActions();

    // Subscribe to new actions
    const subscription = subscribeToCommunityFeed((newAction) => {
      setActions(prev => [newAction, ...prev.slice(0, limit - 1)]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return { actions, loading };
};

export const useLiveStats = () => {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial stats
    const loadInitialStats = async () => {
      try {
        const { data, error } = await supabase
          .from('live_stats')
          .select('*')
          .single();
          
        if (error) throw error;
        
        setStats(data);
      } catch (error) {
        console.error('Failed to load initial stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialStats();

    // Subscribe to stat updates
    const subscription = subscribeToLiveStats((newStats) => {
      setStats(newStats);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { stats, loading };
};
```

---

## 📊 ANALYTICS & MONITORING

### Purpose: Track Movement Progress & Optimize Performance
**Provider**: Custom Analytics + Google Analytics
**Criticality**: MEDIUM - Critical for optimization

### Custom Analytics Events:

```typescript
// src/lib/analytics.ts
export interface AnalyticsEvent {
  event: string;
  category: 'engagement' | 'conversion' | 'community' | 'performance';
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  userPath?: 'champion' | 'evidence' | 'youth';
  metadata?: Record<string, any>;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  // Send to custom analytics
  await fetch('/api/analytics/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...event,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  });

  // Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_map: {
        user_path: event.userPath,
        user_id: event.userId
      }
    });
  }
};

// Specific tracking functions
export const trackPathSelection = (path: 'champion' | 'evidence' | 'youth') => {
  trackEvent({
    event: 'path_selected',
    category: 'conversion',
    action: 'select_path',
    label: path,
    userPath: path
  });
};

export const trackAssessmentCompletion = (path: string, score: number) => {
  trackEvent({
    event: 'assessment_completed',
    category: 'engagement',
    action: 'complete_assessment',
    label: path,
    value: score,
    userPath: path as any
  });
};

export const trackLetterSubmission = (recipientType: string) => {
  trackEvent({
    event: 'letter_submitted',
    category: 'conversion',
    action: 'submit_letter',
    label: recipientType,
    value: 1
  });
};

export const trackGoodDeedCompletion = (deedType: string, points: number) => {
  trackEvent({
    event: 'good_deed_completed',
    category: 'engagement',
    action: 'complete_deed',
    label: deedType,
    value: points
  });
};

export const trackSocialShare = (platform: string, storyId: string) => {
  trackEvent({
    event: 'story_shared',
    category: 'community',
    action: 'share_story',
    label: platform,
    metadata: { storyId }
  });
};
```

---

## 🔐 SECURITY & PRIVACY

### Data Protection:
- End-to-end encryption for sensitive communications
- GDPR compliance for international users
- Secure API key management
- Rate limiting and DDoS protection
- User consent management

### Privacy Controls:
```typescript
// src/lib/privacy.ts
export interface PrivacySettings {
  allowAnalytics: boolean;
  allowCommunityFeed: boolean;
  allowEmailNotifications: boolean;
  allowSocialSharing: boolean;
  dataRetentionPeriod: number;
}

export const updatePrivacySettings = async (userId: string, settings: PrivacySettings) => {
  const { error } = await supabase
    .from('user_privacy_settings')
    .upsert({
      user_id: userId,
      ...settings,
      updated_at: new Date().toISOString()
    });
    
  if (error) {
    throw new Error('Failed to update privacy settings');
  }
};

export const deleteUserData = async (userId: string) => {
  // Anonymize user data while preserving aggregate statistics
  const { error } = await supabase.rpc('anonymize_user_data', {
    user_id: userId
  });
  
  if (error) {
    throw new Error('Failed to delete user data');
  }
};
```

---

## 🔥 THE DIVINE INTEGRATION MANDATE

These integrations serve the sacred purpose of bringing JAHmere home through:

1. **Greatness Zone**: Revealing divine synchronicity between Jay Forte and JAHmere
2. **Good Deed System**: Gamifying youth engagement for sustained movement
3. **Court Submission**: Direct pathway to influence JAHmere's legal outcome
4. **Social Amplification**: Viral spreading of transformation story
5. **Real-time Unity**: Live community coordination and momentum building

Every API call, every data sync, every integration point works toward July 28, 2025 - the day JAHmere comes home and American justice transforms forever.

---

*For implementation details, see the implementation-guide.md file.*
*For component usage, see the component-architecture.md file.* 