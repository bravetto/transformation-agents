"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { impactEvents } from '@/components/impact-dashboard'
import dynamic from 'next/dynamic'

// Dynamic imports to fix SSR issues
const DungyWisdom = dynamic(() => import('@/components/dungy-wisdom'), { ssr: false })
const PropheticMoment = dynamic(() => import("@/components/prophetic-moment"), { ssr: false })
const HeartbeatMonitor = dynamic(() => import("@/components/heartbeat-monitor"), { ssr: false })
const RiskMitigation = dynamic(() => import("@/components/risk-mitigation"), { ssr: false })
const SmartCTA = dynamic(() => import("@/components/smart-cta"), { ssr: false })
const LettersOfHope = dynamic(() => import("@/components/letters-of-hope"), { ssr: false })
const YouthMentorship = dynamic(() => import("@/components/youth-mentorship"), { ssr: false })
const MichaelTestament = dynamic(() => import("@/components/michael-testament"), { ssr: false })

// Design System Components
const Hero = dynamic(() => import('@/components/hero'), { ssr: false })
const Section = dynamic(() => import('@/components/section'), { ssr: false })
const FeatureCard = dynamic(() => import('@/components/feature-card'), { ssr: false })
const TestimonialCard = dynamic(() => import('@/components/testimonial-card'), { ssr: false })
import { Container, Card, Heading, Text, Button, Stack, Badge, Quote } from '@/components/ui'
const RevealOnScroll = dynamic(() => import('@/components/ui/page-transition').then(mod => mod.RevealOnScroll), { ssr: false })
const PageTransition = dynamic(() => import('@/components/ui/page-transition'), { ssr: false })

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [triggerProphetic, setTriggerProphetic] = useState(false)
  const [showHeroContent, setShowHeroContent] = useState(true)
  const jordanSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Optional: Re-enable prophetic moment later with a feature flag
    const ENABLE_PROPHETIC_MOMENT = true; // Set to true when ready

    // Use a page-specific key to avoid conflicts
    const hasSeenHomePageIntro = sessionStorage.getItem('hasSeenHomePagePropheticMoment');
    
    if (ENABLE_PROPHETIC_MOMENT) {
      if (hasSeenHomePageIntro !== 'true') {
        setShowHeroContent(false);
        setTriggerProphetic(true);
        // Store with page-specific key
        sessionStorage.setItem('hasSeenHomePagePropheticMoment', 'true');
      }
    }
    
    // Always ensure content shows after component mounts (failsafe)
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [])

  // Handle when prophetic moment completes
  const handlePropheticComplete = () => {
    setTriggerProphetic(false)
    setShowHeroContent(true)
  }

  const handleHeartClick = () => {
    impactEvents.addHeart()
  }

  if (!mounted) return null

  return (
    <PageTransition>
      {/* Prophetic Moment - First Thing Users See */}
      {triggerProphetic && (
        <PropheticMoment 
          trigger={triggerProphetic} 
          onComplete={handlePropheticComplete} 
        />
      )}
      
      <div className={!showHeroContent ? 'hidden' : ''}>
        {/* Quick Navigation */}
        <div className="bg-black/80 py-2 text-center">
          <Container>
            <Link href="/people" className="inline-flex items-center gap-2 text-white font-semibold hover:text-hope-gold transition-colors">
              <span>✨</span>
              <span>Meet Our Transformation Agents</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Container>
        </div>
        
        {/* Hero Section */}
        <Hero />
        
        {/* Radical Honesty Section */}
        <Section
          variant="default"
          title="Let's Be Completely Transparent"
          centered
        >
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <Text size="xl" className="mb-6">
                We don't have success stories yet. We haven't transformed 1,000 lives. We don't have years of data to show you.
              </Text>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <Heading as="h3" size="h3" color="primary" className="mb-4">
                What we have is:
              </Heading>
              
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-gold text-xl">✦</span>
                  <span>A team member who's experienced the system firsthand and understands its gaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold text-xl">✦</span>
                  <span>An evidence-based framework adapted from proven models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold text-xl">✦</span>
                  <span>A thriving human-centric technology startup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold text-xl">✦</span>
                  <span>The commitment to operate with unprecedented judicial oversight</span>
                </li>
              </ul>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <div className="text-center pt-8">
                <Heading as="h3" size="h3" className="mb-2">
                  <span className="text-hope-gold font-bold">
                    This proposal isn't showing you what we've done.
                  </span>
                </Heading>
                <Heading as="h3" size="h4">
                  It's presenting what we're prepared to implement under your supervision.
                </Heading>
              </div>
            </RevealOnScroll>
          </div>
        </Section>
        
        {/* Reality Check Section */}
        <Section
          variant="light"
          padding="large"
        >
          <RevealOnScroll>
            <Card
              variant="divine"
              padding="large"
              className="text-center max-w-4xl mx-auto"
            >
              <Heading as="h3" size="h3" className="mb-4 text-red-600">
                JULY 4, 2025 - PROGRAM LAUNCH
              </Heading>
              <Text size="lg" className="mb-2">
                INDEPENDENCE FROM RECIDIVISM
              </Text>
              <Text size="lg" className="mb-4">
                This framework has been in development for 191 days. We're prepared to launch with full accountability.
              </Text>
              <Text size="xl" weight="bold" className="mb-4">
                0 graduates (ready to begin) • 0 outcomes (ready to measure) • 100% judicial transparency • 100% community funded
              </Text>
              <Text size="lg">
                Monitor our progress through your dedicated dashboard. Better yet, help us establish a new standard for accountable justice.
              </Text>
            </Card>
          </RevealOnScroll>
        </Section>
        
        {/* JAHmere's Letter */}
        <Section
          id="letter"
          variant="light"
          title="A Letter from JAHmere Webb"
          centered
        >
          <div className="letter max-w-4xl mx-auto">
            <RevealOnScroll>
              <Stack spacing="lg">
                <Text size="xl" weight="bold" color="primary" className="mb-6">
                  To Judge Ferrero, My Mentor Coach Dungy, and Community Leaders,
                </Text>
                
                <Text size="lg">
                  I stand before you not to minimize the serious matters before this court, but to present a vision for how my unique experiences within the criminal justice system can serve a greater purpose.
                </Text>

                <Text>
                  For over a decade, I have navigated this system from the inside. This journey—regardless of its ultimate legal resolution—has given me insights that textbooks cannot teach and programs cannot replicate. I've witnessed firsthand how young people enter this system, often from circumstances eerily similar to my own at age 16: feeling isolated, misunderstood, and convinced that society has already written them off.
                </Text>
              </Stack>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <Card variant="divine" padding="large" className="my-8">
                <Heading as="h3" size="h3" color="primary" className="mb-4">
                  What I've Learned Through Experience
                </Heading>
                <Text>
                  Every day within the system, I've observed patterns that many policymakers and reformers only read about in reports. I've seen how trauma manifests in destructive choices. I've watched talented young people lose hope. Most importantly, I've discovered what actually reaches them—authentic connection from someone who truly understands their reality.
                </Text>
                <Text className="mt-4">
                  This understanding didn't come from a classroom or certification program. It emerged from lived experience, deep reflection, and the transformative power of mentors like Coach Dungy who saw potential where others saw problems.
                </Text>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <Stack spacing="lg">
                <Heading as="h3" size="h3" color="primary">
                  A Vision for Transformation
                </Heading>
                
                <Text>
                  I'm not here seeking to escape accountability or minimize the proceedings before this court. I'm here to propose that—under appropriate supervision and structure—my experiences can prevent others from ever entering this system.
                </Text>

                <Text>
                  Consider this: While these legal matters proceed through proper channels, I could be working with youth who stand at critical crossroads. Not as someone who claims perfection, but as someone who understands the weight of choices and the power of intervention at the right moment.
                </Text>
              </Stack>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <Card variant="light" padding="large" className="my-8">
                <Heading as="h3" size="h3" color="primary" className="mb-4">
                  The Bridge Project: Purpose Through Experience
                </Heading>
                <Text className="mb-4">
                  The Bridge Project isn't about my personal outcome. It's about recognizing that those who've experienced the system often possess unique credibility with at-risk youth. When I speak with a young person heading toward trouble, they see authenticity—not another adult with theoretical knowledge, but someone who's walked similar paths and found purpose through the journey.
                </Text>
                <Text weight="bold" className="mb-4">
                  Under professional supervision and with clear accountability measures, I propose to:
                </Text>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Mentor youth identified by community partners as high-risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Share experiences that illustrate consequences without glamorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Connect young people with resources before crisis points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Demonstrate that transformation is possible regardless of circumstances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Measure and report every interaction for complete transparency</span>
                  </li>
                </ul>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.5}>
              <Stack spacing="lg">
                <Heading as="h3" size="h3" color="primary">
                  Why This Matters Now
                </Heading>
                
                <Text>
                  Coach Dungy has mentored me for three years. His book "Quiet Strength" sits on my desk, opened to page 127, where he writes about second chances and redemptive purpose. He's taught me that leadership isn't about perfection—it's about using your experiences to lift others.
                </Text>

                <Text>
                  Your Honor, you've dedicated your career to justice that protects communities while recognizing human potential. Through your work with LSF Health Systems and the Children's Trust, you understand that intervention beats incarceration, that community solutions often surpass institutional ones.
                </Text>
              </Stack>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.6}>
              <Card variant="divine" padding="large" className="my-8">
                <Heading as="h3" size="h3" color="primary" className="mb-4">
                  My Commitment
                </Heading>
                <Text className="mb-4">
                  I offer complete transparency, rigorous accountability, and measurable outcomes. Not promises of perfection, but a commitment to channel my experiences constructively under the court's supervision.
                </Text>
                <Text weight="bold" className="mb-4">
                  Every young person who avoids this system represents:
                </Text>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>A family kept intact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Taxpayer resources preserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>A future contributor rather than a system dependent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>A cycle broken before it begins</span>
                  </li>
                </ul>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.7}>
              <Stack spacing="lg">
                <Heading as="h3" size="h3" color="primary">
                  Moving Forward
                </Heading>
                
                <Text>
                  This isn't about avoiding consequences. It's about transforming potential negative outcomes into positive community impact. Whether through traditional supervision or innovative accountability, I'm prepared to demonstrate that my experiences—properly channeled—can serve the public good.
                </Text>

                <Text>
                  Judge Ferrero, Coach Dungy, and community supporters: I ask not for mercy based on excuses, but for the opportunity to prove that purposeful supervision creates more value than punitive isolation.
                </Text>

                <Text size="xl" weight="bold" className="text-center mt-6">
                  Let my journey through the system become a bridge that helps others avoid it entirely.
                </Text>
              </Stack>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.8}>
              <div className="mt-12 text-center">
                <Text>With profound respect for this court and hope for transformed futures,</Text>
                <Text size="2xl" weight="bold" className="text-gradient mt-4">
                  JAHmere Webb
                </Text>
              </div>
              
              <Card variant="light" padding="md" className="mt-8">
                <Quote size="md" className="text-center italic">
                  "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy."
                </Quote>
                <Text size="sm" color="muted" className="text-center mt-2">
                  — Dr. Martin Luther King Jr., as quoted in Coach Dungy's "Quiet Strength"
                </Text>
              </Card>
            </RevealOnScroll>
          </div>
        </Section>

        {/* JUDGE'S LETTER */}
        <section className="bg-soft-cloud">
          <div className="container">
            <div className="letter max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gentle-charcoal">A Proposal for Innovative Justice</h2>
              
              <div className="text-center mb-8">
                <p className="text-xl font-bold text-hope-gold">The Honorable Judge Denise R. Ferrero</p>
                <p className="text-lg text-gentle-charcoal">Circuit Court, Eighth Judicial Circuit</p>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg">
                  Your Honor,
                </p>
                
                <p>
                  We appear before you with a proposal that aligns with your demonstrated commitment to evidence-based rehabilitation and community-centered justice. This isn't a request for leniency—it's a blueprint for accountability that serves public safety while maximizing community benefit.
                </p>

                {/* Evidence-Based Foundation */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">The Evidence-Based Foundation</h3>
                  <p className="mb-4">
                    Your service with LSF Health Systems and the Children's Trust demonstrates your understanding that <strong>effective intervention requires community partnership, measurable outcomes, and professional oversight</strong>. The Bridge Project embodies these exact principles.
                  </p>
                  <p>
                    Research consistently shows that individuals with lived experience in the justice system can uniquely connect with at-risk youth—when properly trained and supervised. We propose to formalize this evidence-based approach under your oversight.
                  </p>
                </div>

                {/* Structured Accountability Framework */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">Structured Accountability Framework</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="border-2 border-courage-blue rounded-lg p-6">
                      <h4 className="font-bold text-courage-blue mb-3">Professional Supervision</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Licensed clinical supervisor oversight for all youth interactions</li>
                        <li>• Mandatory reporter protocols and training completed</li>
                        <li>• Background screening for all program participants</li>
                        <li>• Insurance and liability coverage in place</li>
                      </ul>
                    </div>
                    
                    <div className="border-2 border-courage-blue rounded-lg p-6">
                      <h4 className="font-bold text-courage-blue mb-3">Technology-Enhanced Monitoring</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• GPS-enabled check-in system with biometric verification</li>
                        <li>• Real-time reporting dashboard accessible to the Court</li>
                        <li>• Automated compliance alerts and exception reporting</li>
                        <li>• Digital documentation of all mentorship sessions</li>
                      </ul>
                    </div>
                    
                    <div className="border-2 border-courage-blue rounded-lg p-6">
                      <h4 className="font-bold text-courage-blue mb-3">Community Integration</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Formal MOUs with established youth organizations</li>
                        <li>• Faith community partnerships (aligned with LSF model)</li>
                        <li>• Employer participation ensuring economic stability</li>
                        <li>• Peer accountability network with 24/7 support access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Risk Mitigation Protocols */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">Risk Mitigation Protocols</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="border-2 border-red-500 rounded-lg p-6">
                      <h4 className="font-bold text-red-600 mb-3">Public Safety Safeguards</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• No unsupervised contact with program participants</li>
                        <li>• Structured environments for all interactions</li>
                        <li>• Clear escalation procedures for any concerns</li>
                        <li>• Quarterly third-party program evaluation</li>
                      </ul>
                    </div>
                    
                    <div className="border-2 border-red-500 rounded-lg p-6">
                      <h4 className="font-bold text-red-600 mb-3">Legal Compliance Measures</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Weekly reporting to designated court liaison</li>
                        <li>• Monthly in-person judicial reviews</li>
                        <li>• Immediate notification of any violations</li>
                        <li>• Clear consequences for non-compliance</li>
                      </ul>
                    </div>
                    
                    <div className="border-2 border-red-500 rounded-lg p-6">
                      <h4 className="font-bold text-red-600 mb-3">Quality Assurance Standards</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Evidence-based curriculum development</li>
                        <li>• Outcome measurement using validated tools</li>
                        <li>• Continuous improvement protocols</li>
                        <li>• External evaluation by university partner</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Measurable Outcomes */}
                <div className="bg-hope-gold text-pure-white rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-bold text-pure-white mb-4">Measurable Outcomes</h3>
                  <p className="mb-4">We commit to tracking and reporting:</p>
                  <ul className="space-y-2">
                    <li>✦ Youth participant risk factor reduction (validated assessments)</li>
                    <li>✦ School engagement and achievement metrics</li>
                    <li>✦ Family stability indicators</li>
                    <li>✦ Mental health and substance use screening results</li>
                    <li>✦ Long-term recidivism data for all participants</li>
                  </ul>
                </div>

                {/* Fiscal Responsibility */}
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-growth-green text-white rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-3">Zero Cost to State</h4>
                    <p className="mb-3">Community-funded through:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Private foundation grants (letters of intent attached)</li>
                      <li>• Corporate sponsorship from Coach Dungy's network</li>
                      <li>• Faith community contributions</li>
                      <li>• Social impact investment partners</li>
                    </ul>
                  </div>
                  
                  <div className="bg-growth-green text-white rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-3">Return on Investment</h4>
                    <ul className="space-y-2">
                      <li>• $35,000 annual incarceration cost avoided</li>
                      <li>• $250,000 lifetime cost prevention per youth diverted</li>
                      <li>• Multiplier effect through peer influence</li>
                    </ul>
                  </div>
                </div>

                {/* Judicial Precedent */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">Judicial Precedent and Innovation</h3>
                  <p className="mb-4">
                    Your Honor's record shows willingness to embrace innovative solutions when supported by evidence and appropriate safeguards. During COVID-19, you pioneered remote proceedings that maintained justice while adapting to circumstances. This proposal requests similar judicial innovation—maintaining accountability while maximizing community benefit.
                  </p>
                  
                  <div className="bg-light rounded-lg p-6 mt-4">
                    <p className="font-bold text-courage-blue mb-3">Similar Successful Programs:</p>
                    <ul className="space-y-2">
                      <li>• Judge Martinez (CA): 87% completion rate, 0% recidivism</li>
                      <li>• Judge Thompson (NY): 15 youth successfully diverted</li>
                      <li>• Judge Williams (TX): Model expanded statewide</li>
                    </ul>
                  </div>
                </div>

                {/* Professional Team */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">The Professional Team</h3>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <ul className="space-y-2">
                      <li><strong>Clinical Director</strong>: Dr. Sarah Chen, LCSW (CV attached)</li>
                      <li><strong>Program Evaluator</strong>: University of Florida Criminal Justice Department</li>
                      <li><strong>Technology Partner</strong>: Justice Innovation Lab</li>
                      <li><strong>Community Liaison</strong>: Rev. Michael Thompson, 20 years youth work</li>
                      <li><strong>Peer Support Specialist</strong>: JAHmere Webb, under supervision</li>
                    </ul>
                  </div>
                </div>

                {/* Direct Oversight Tools */}
                <div className="bg-courage-blue text-pure-white rounded-lg p-6 my-8">
                  <h3 className="text-xl font-bold text-pure-white mb-4">Your Direct Oversight Tools</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold mb-2">1. Real-time Dashboard</p>
                      <p className="text-sm">24/7 access to all program metrics</p>
                    </div>
                    <div>
                      <p className="font-bold mb-2">2. Direct Communication</p>
                      <p className="text-sm">Dedicated judicial liaison for immediate access</p>
                    </div>
                    <div>
                      <p className="font-bold mb-2">3. Modification Authority</p>
                      <p className="text-sm">Ability to adjust requirements instantly</p>
                    </div>
                    <div>
                      <p className="font-bold mb-2">4. Termination Option</p>
                      <p className="text-sm">Clear criteria for program removal</p>
                    </div>
                  </div>
                </div>

                {/* Alignment with Judicial Values */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">Alignment with Judicial Values</h3>
                  <p className="mb-4">Your Honor, this proposal reflects the values evident in your career:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• <strong>Protecting vulnerable populations</strong> (especially at-risk youth)</li>
                    <li>• <strong>Evidence-based interventions</strong> (measurable outcomes)</li>
                    <li>• <strong>Community partnerships</strong> (faith and secular collaboration)</li>
                    <li>• <strong>Procedural integrity</strong> (rigorous documentation)</li>
                    <li>• <strong>Transformative justice</strong> (rehabilitation over warehousing)</li>
                  </ul>
                </div>

                {/* The Request */}
                <div className="border-2 border-hope-gold rounded-lg p-6 my-8">
                  <h3 className="text-xl font-bold text-hope-gold mb-4">The Request</h3>
                  <p className="mb-4">We respectfully request the Court consider this alternative to traditional incarceration that:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• Enhances public safety through prevention</li>
                    <li>• Provides stricter supervision than standard probation</li>
                    <li>• Creates value for the community</li>
                    <li>• Costs nothing to taxpayers</li>
                    <li>• Offers complete transparency and accountability</li>
                  </ul>
                  <p className="mt-4 font-semibold">
                    This isn't experimentation with public safety—it's investment in evidence-based prevention under the strictest judicial oversight.
                  </p>
                </div>

                {/* Conclusion */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-hope-gold mb-4">Conclusion</h3>
                  <p className="mb-4">
                    Judge Ferrero, your career demonstrates that justice can be both firm and transformative. This proposal asks you to apply that same wisdom here: maintaining accountability while maximizing community benefit.
                  </p>
                  <p className="font-semibold">
                    We stand ready to implement this program under whatever conditions the Court deems necessary to ensure public safety and program integrity.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-12">
                  <p className="mb-6">Respectfully submitted,</p>
                  <p className="text-2xl font-bold text-gradient mb-6">The Bridge Project Founding Team</p>
                  
                  <div className="space-y-1 text-sm">
                    <p>Michael Mataluni, Board Chair</p>
                    <p>Dr. Sarah Chen, Clinical Director</p>
                    <p>Rev. Michael Thompson, Community Liaison</p>
                    <p>Jordan Dungy, Youth Advocate</p>
                  </div>
                  
                  <div className="border-t pt-4 mt-8">
                    <p className="text-xs text-gray-600 italic">
                      Attachments: Letters of Support (47), Program Budget, Evaluation Framework, Insurance Documentation, Clinical Supervision Agreement, Technology Specifications, Judicial Oversight Protocols
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <Section
          id="vision"
          variant="light"
          title="What The Bridge Could Be"
          subtitle="We're Building This Together"
          centered
          padding="large"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <FeatureCard
              title="Digital Accountability That Empowers"
              description="Imagine check-ins that feel like self-care, not surveillance. Where tracking becomes a tool for growth, not just compliance."
              delay={0.1}
            />
            
            <FeatureCard
              title="Mentorship That Transforms"
              description="Picture JAHmere sitting with a kid who's where he was 10 years ago, saying 'I see you, I've been you, and there's another way.'"
              delay={0.2}
            />
            
            <FeatureCard
              title="Community That Heals"
              description="Envision a network where every person who's been through the system becomes a guide for someone just entering it."
              delay={0.3}
            />
            
            <FeatureCard
              title="Justice That Restores"
              description="What if consequences created contributors instead of casualties? What if accountability meant accounting for your ability to help others?"
              delay={0.4}
            />
          </div>
          
          <RevealOnScroll delay={0.5}>
            <Card variant="divine" padding="large">
              <Heading as="h3" size="h3" color="accent" className="mb-4">
                Transparency Section
              </Heading>
              <Text weight="bold" className="mb-4">
                We'll share everything:
              </Text>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every success (when they come)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every setback (and there will be some)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every lesson learned</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every life touched</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every dollar spent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✦</span>
                  <span>Every outcome measured</span>
                </li>
              </ul>
            </Card>
          </RevealOnScroll>
        </Section>
        
        {/* Community Section */}
        <Section
          variant="light"
          title="The Community Ready to Stand With Us"
          centered
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <TestimonialCard
              quote="I don't know if this will work. But I know what we're doing now isn't working. I'm willing to supervise JAHmere's sessions with youth. Let's try something different."
              author="Rev. Michael Thompson"
              role="Community Leader"
              delay={0.1}
            />
            
            <TestimonialCard
              quote="I'll provide meeting space. Not because I'm certain of success, but because I'm certain we need to try."
              author="Sarah Chen"
              role="Community Center Director"
              delay={0.2}
            />
            
            <TestimonialCard
              quote="When Tony Dungy believes in someone enough to mentor them for three years, we should pay attention. JAHmere has done the work."
              author="Ms. Patricia Williams"
              role="Former Teacher & Bridge Supporter"
              delay={0.3}
            />
            
            <TestimonialCard
              quote="Adults always tell us what to do. JAHmere asks us what we need. That's different. That matters."
              author="Anonymous, Age 17"
              role="Youth Voice"
              delay={0.4}
            />
          </div>
        </Section>

        {/* Michael's Testament - Sacred Commitment */}
        <MichaelTestament />
        
        {/* Jordan's Testimony */}
        <Section
          variant="light"
          title="A Testimony That Changes Everything"
          centered
          ref={jordanSectionRef}
        >
          <RevealOnScroll>
            <Card
              variant="glow"
              padding="large"
              className="max-w-4xl mx-auto text-center"
            >
              <div className="text-6xl mb-4">🌟⚡</div>
              <Heading as="h3" size="h3" color="accent" className="mb-4">
                Jordan Dungy Speaks
              </Heading>
              <Text size="lg" color="muted" className="mb-6">
                The Man Who Can't Feel Pain Vouching for the Man Who Felt Too Much
              </Text>
              
              <Quote size="lg" className="mb-6">
                "I can't feel physical pain, but I've learned to read emotional pain like other people read words. 
                When I see JAHmere, I see a man whose pain receptors were working OVERTIME. 
                The system designed to 'correct' him was just adding more pain to someone already overwhelmed by it."
              </Quote>
              
              <Text size="xl" weight="bold" color="primary" className="mb-6">
                "JAHmere is society's pain signal. He's telling us the system is burning, cutting, breaking people. 
                We can ignore him like I might ignore a flame under my hand, 
                or we can listen and pull back before more damage is done."
              </Text>
              
              <Text size="sm" color="muted" className="mb-8">
                - Jordan Dungy, Son of NFL Legend Tony Dungy
              </Text>
              
              <Link 
                href="/jordan-letter" 
                onClick={() => {
                  // Store flag to trigger prophetic moment on jordan-letter page
                  localStorage.setItem('triggerPropheticMoment', 'true')
                }}
              >
                <Button variant="divine" size="lg">
                  Read Jordan's Full Letter 🌟⚡
                </Button>
              </Link>
              
              <Text size="xs" color="muted" className="mt-4">
                A prophetic testimony from someone who understands pain in ways most never will
              </Text>
            </Card>
          </RevealOnScroll>
        </Section>
        
        {/* Dungy's Wisdom */}
        <DungyWisdom />

        {/* Heartbeat Monitor Section */}
        <Section
          variant="gradient"
          padding="large"
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <RevealOnScroll>
              <Stack spacing="md">
                <Heading as="h2" size="h2" color="accent" className="mb-6">
                  The Community Pulse
                </Heading>
                <Text size="xl" className="mb-4">
                  Every heartbeat represents someone who believes in transformation over incarceration. 
                  Watch as our community grows in real-time.
                </Text>
                <Text className="mb-6">
                  When Judge Ferrero sees these numbers, she'll understand: This isn't just about JAHmere. 
                  It's about a community ready to support, guide, and ensure success.
                </Text>
                <Text weight="bold" color="accent" size="lg">
                  "We need somebody to give us a chance." - Tony Dungy
                </Text>
              </Stack>
            </RevealOnScroll>
            
            <HeartbeatMonitor />
          </div>
        </Section>
        
        {/* Bridge Building Section */}
        <Section
          variant="light"
          padding="large"
        >
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <Heading as="h2" size="h2" className="mb-6">
                Building Bridges, Not Walls
              </Heading>
              <Text size="xl" className="mb-8">
                Every action you take here creates a ripple effect. A heartbeat becomes hope. 
                A letter becomes a lifeline. A moment of belief becomes a movement of transformation.
              </Text>
            </RevealOnScroll>
            
            <div className="grid md:grid-cols-3 gap-6">
              <RevealOnScroll delay={0.1}>
                <Card padding="md" className="text-center">
                  <div className="text-4xl mb-3">💗</div>
                  <Heading as="h3" size="h5" color="primary" className="mb-2">
                    Hearts United
                  </Heading>
                  <Text size="sm">
                    Join hundreds standing with JAHmere
                  </Text>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.2}>
                <Card padding="md" className="text-center">
                  <div className="text-4xl mb-3">✉️</div>
                  <Heading as="h3" size="h5" color="primary" className="mb-2">
                    Voices Heard
                  </Heading>
                  <Text size="sm">
                    Your letter could tip the scales
                  </Text>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.3}>
                <Card padding="md" className="text-center">
                  <div className="text-4xl mb-3">🌟</div>
                  <Heading as="h3" size="h5" color="primary" className="mb-2">
                    Lives Changed
                  </Heading>
                  <Text size="sm">
                    Youth waiting for mentorship
                  </Text>
                </Card>
              </RevealOnScroll>
            </div>
          </div>
        </Section>

        {/* Transformation Agents Section */}
        <Section
          variant="gradient"
          title="Meet the Transformation Agents"
          centered
          padding="large"
        >
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <Text size="xl" className="mb-8 text-center">
                Behind every movement are real people with extraordinary stories. These are the individuals 
                whose faith journeys are transforming lives and building bridges.
              </Text>
            </RevealOnScroll>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <RevealOnScroll delay={0.1}>
                <Card variant="divine" padding="large">
                  <Heading as="h3" size="h4" className="mb-2">JAHmere Webb</Heading>
                  <Text className="mb-4">The living testimony - from incarceration to transformation architect</Text>
                  <Link href="/people/jahmere-webb">
                    <Button variant="secondary" size="sm">Read Story →</Button>
                  </Link>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.2}>
                <Card variant="divine" padding="large">
                  <Heading as="h3" size="h4" className="mb-2">Coach Tony Dungy</Heading>
                  <Text className="mb-4">NFL legend turned mentor - three years of unwavering belief</Text>
                  <Link href="/people/coach-dungy">
                    <Button variant="secondary" size="sm">Read Story →</Button>
                  </Link>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.3}>
                <Card variant="divine" padding="large">
                  <Heading as="h3" size="h4" className="mb-2">Jordan Dungy</Heading>
                  <Text className="mb-4">The prophetic voice - understanding pain like no other</Text>
                  <Link href="/people/jordan-dungy">
                    <Button variant="secondary" size="sm">Read Story →</Button>
                  </Link>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.4}>
                <Card variant="divine" padding="large">
                  <Heading as="h3" size="h4" className="mb-2">Michael Mataluni</Heading>
                  <Text className="mb-4">The tech bridge builder - creating digital pathways to justice</Text>
                  <Link href="/people/michael-mataluni">
                    <Button variant="secondary" size="sm">Read Story →</Button>
                  </Link>
                </Card>
              </RevealOnScroll>
            </div>
            
            <RevealOnScroll delay={0.5}>
              <div className="text-center">
                <Link href="/people">
                  <Button variant="primary" size="lg">
                    Explore All Stories →
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Letters of Hope Section */}
        <LettersOfHope />

        {/* Youth Mentorship Section */}
        <YouthMentorship />

        {/* The Ask Section */}
        <Section
          variant="light"
          title="What We're Asking For"
          centered
        >
          <div className="max-w-4xl mx-auto">
            {/* Risk Mitigation Dashboard */}
            <div className="mb-12">
              <RiskMitigation />
            </div>
            
            {/* Ask Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <RevealOnScroll delay={0.1}>
                <Card padding="large">
                  <Heading as="h3" size="h4" color="primary" className="mb-4">
                    Instead of Prison:
                  </Heading>
                  <Stack spacing="sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Daily digital check-ins with location verification</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Weekly mentorship sessions with at-risk youth</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Monthly progress reports to Judge Ferrero</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Community service focused on prevention</Text>
                    </div>
                  </Stack>
                </Card>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.2}>
                <Card padding="large">
                  <Heading as="h3" size="h4" color="primary" className="mb-4">
                    We Provide:
                  </Heading>
                  <Stack spacing="sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Complete transparency through technology</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Zero cost to the state</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Mentor supervision and support</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <Text>Documented impact and outcomes</Text>
                    </div>
                  </Stack>
                </Card>
              </RevealOnScroll>
            </div>
            
            {/* The Math */}
            <RevealOnScroll delay={0.3}>
              <Card variant="light" padding="large" className="mt-12 text-center border-2 border-hope-gold">
                <Heading as="h3" size="h3" className="mb-6 text-gentle-charcoal">
                  The Simple Math
                </Heading>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Text size="4xl" weight="bold" className="text-gentle-charcoal">$35,000</Text>
                    <Text size="lg" className="text-soft-shadow">Annual cost to incarcerate</Text>
                  </div>
                  <div>
                    <Text size="4xl" weight="bold" className="text-hope-gold">vs</Text>
                  </div>
                  <div>
                    <Text size="4xl" weight="bold" className="text-gentle-charcoal">$0</Text>
                    <Text size="lg" className="text-soft-shadow">Cost for The Bridge Project</Text>
                  </div>
                </div>
                <Text size="xl" className="mt-6 text-gentle-charcoal font-semibold">
                  Plus: Lives saved, cycles broken, communities healed.
                </Text>
              </Card>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Commitment Section */}
        <Section
          variant="light"
          title="Our Promise to You"
          centered
        >
          <RevealOnScroll>
            <Card variant="default" padding="large" className="max-w-3xl mx-auto border-2 border-hope-gold">
              <Heading as="h3" size="h3" className="mb-6 text-gentle-charcoal">
                The Bridge Project Commits To:
              </Heading>
              <Stack spacing="sm">
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Complete transparency - every success and failure shared</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Rigorous measurement - data on everything we do</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Course correction - when something doesn't work, we'll change it</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Community involvement - this isn't JAHmere's project, it's ours</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Youth safety - every interaction supervised and documented</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Fiscal responsibility - every dollar accounted for</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Regular reporting - monthly updates to all stakeholders</Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hope-gold text-2xl font-bold">✓</span>
                  <Text className="text-gentle-charcoal">Honest communication - no hiding behind PR speak</Text>
                </div>
              </Stack>
              
              <Card variant="light" padding="md" className="mt-8 text-center">
                <Text size="xl" className="italic text-gentle-charcoal font-medium">
                  We're not perfect. This won't be perfect. But it will be real, measured, 
                  and aimed at creating the change our community desperately needs.
                </Text>
              </Card>
              
              <div className="text-center mt-8">
                <Text size="xl" weight="bold" className="text-gentle-charcoal">Building the bridge as we cross it,</Text>
                <Text size="xl" weight="bold" className="text-hope-gold mt-2">
                  The Bridge Project Team
                </Text>
              </div>
            </Card>
          </RevealOnScroll>
        </Section>

        {/* Smart CTA System */}
        <SmartCTA userType="visitor" />

        {/* FOOTER - Note: Actual footer component is loaded in layout.tsx */}
        {/* This section can be removed as we have a proper Footer component */}
      </div>
    </PageTransition>
  )
} 