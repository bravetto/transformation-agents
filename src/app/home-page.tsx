"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { impactEvents } from '@/components/impact-dashboard'
import DungyWisdom from '@/components/dungy-wisdom'
import PropheticMoment from "@/components/prophetic-moment"
import HeartbeatMonitor from "@/components/heartbeat-monitor"
import RiskMitigation from "@/components/risk-mitigation"
import SmartCTA from "@/components/smart-cta"
import LettersOfHope from "@/components/letters-of-hope"
import YouthMentorship from "@/components/youth-mentorship"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [triggerProphetic, setTriggerProphetic] = useState(false)
  const jordanSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Set up intersection observer for Jordan's section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggerProphetic) {
            setTriggerProphetic(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (jordanSectionRef.current) {
      observer.observe(jordanSectionRef.current)
    }

    return () => {
      if (jordanSectionRef.current) {
        observer.unobserve(jordanSectionRef.current)
      }
    }
  }, [mounted, triggerProphetic])

  const handleHeartClick = () => {
    impactEvents.addHeart()
  }

  if (!mounted) return null

  return (
    <main className="pt-16">
      {/* HERO - CLEAN & POWERFUL */}
      <section className="hero">
        <div className="container text-center relative z-10">
          <h1 className="text-white mb-6 animate-fade-in">
            The Bridge Project:<br />
            An Experiment in Transformation
          </h1>
                        <p className="text-xl md:text-2xl text-gold-dark font-semibold mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                What if we tried something different?
              </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            This is Day One. No case studies. No proven track record. Just a profound belief that the system we have isn't the system we need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Link href="#vision" className="btn btn-secondary">
              Read Our Vision
            </Link>
            <Link href="#why" className="btn btn-primary">
              Why This Matters
            </Link>
          </div>
        </div>
      </section>

      {/* RADICAL HONESTY */}
      <section className="bg-white">
        <div className="container">
          <h2 className="text-center mb-8">Let's Be Completely Honest</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl">
              We don't have success stories yet. We haven't transformed 1,000 lives. We don't have years of data to show you.
            </p>
            <p className="text-2xl font-bold text-royal-purple">What we have is:</p>
            <ul className="space-y-3 text-lg">
              <li><span className="text-gold-dark font-bold text-xl">✦</span> A man who's been through the system and sees its flaws</li>
              <li><span className="text-gold-dark font-bold text-xl">✦</span> A vision for something better</li>
              <li><span className="text-gold-dark font-bold text-xl">✦</span> A community ready to try</li>
              <li><span className="text-gold-dark font-bold text-xl">✦</span> The courage to build in public</li>
            </ul>
            <div className="text-center pt-8">
              <p className="text-2xl font-bold">
                <span className="text-gradient">This website isn't showing you what we've done.</span><br />
                <span className="text-sacred-midnight">It's inviting you to help us do it.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REALITY CHECK */}
      <section className="bg-light-whisper">
        <div className="container">
          <div className="card divine-accent text-center max-w-4xl mx-auto">
            <div className="text-2xl font-bold mb-4 text-royal-purple">🔥 UNDER CONSTRUCTION 🔥</div>
            <p className="text-lg mb-2">This project launched December 26, 2024. We have:</p>
            <p className="text-xl font-bold">
              0 graduates (yet) • 0 proven outcomes (yet) • 100% commitment to change • 100% transparency as we build
            </p>
            <p className="text-lg mt-4">Watch this space. Better yet, help us build it.</p>
          </div>
        </div>
      </section>

      {/* JAHMERE'S LETTER */}
      <section id="letter" className="bg-white">
        <div className="container">
          <div className="letter">
            <h2 className="text-center mb-8">A Letter from JAHmere Webb</h2>
            <div className="space-y-6">
              <p className="text-xl font-bold text-royal-purple">
                To Judge Ferrero, My Mentor Coach Dungy, and Anyone Who Believes in Second Chances,
              </p>
              
              <p>
                I won't pretend I'm a perfect candidate for mercy. I've made mistakes - real ones that hurt real people, including myself. 
                I've been in the system for a decade, and honestly? It's broken me more than it's fixed me.
              </p>

              <p className="text-xl font-bold text-royal-purple">But here's what I know:</p>

              <p>
                Every time I see a young person heading down the same path I took, I see myself at 16 - angry, scared, 
                convinced the world was against me because, frankly, it felt like it was. I can reach these kids not because 
                I've read about their struggles in textbooks, but because I've lived them.
              </p>

              <div className="bg-light-whisper p-6 rounded-lg my-8">
                <p className="text-xl font-semibold text-center">
                  I'm not asking to escape consequences. I'm asking to transform them.
                </p>
              </div>

              <p>
                Instead of sitting in a cell costing taxpayers $35,000 a year, let me work with youth who are one bad decision 
                away from joining me. Instead of adding to incarceration statistics, let me help prevent them.
              </p>

              <p>
                I don't have a perfect plan. I don't have all the answers. But I have something many don't - 
                I've been there, and I'm still here, and I want to help others find a different way.
              </p>

              <p>
                This isn't about me getting out of trouble. It's about preventing trouble for the next generation. 
                Give me structure, supervision, accountability - but let me use my experience to build bridges instead of burning more.
              </p>

              <p className="italic text-royal-purple">
                Coach Dungy - as I write this, your signed copy of "Quiet Strength" is open to page 127. 
                You've been mentoring me for three years. You know my heart. You know my transformation is real.
              </p>
            
              <div className="border-2 border-royal-purple rounded-lg p-6 mt-8 text-center">
                <p className="text-xl font-bold">
                  <span className="text-gradient">I'm not a success story yet.</span><br />
                  <span className="text-sacred-midnight">But with your trust, I could help create dozens of them.</span>
                </p>
              </div>

              <div className="text-right mt-8">
                <p>Respectfully and honestly,</p>
                <p className="text-3xl font-bold text-gradient mt-2">JAHmere Webb</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JUDGE'S LETTER */}
      <section className="bg-light-whisper">
        <div className="container">
          <div className="letter">
            <h2 className="text-center mb-8">Your Honor: A Different Approach</h2>
            <div className="space-y-6">
              <p className="text-xl font-bold text-royal-purple">Dear Judge Ferrero,</p>
              
              <p>
                We're not here with a polished program or years of success metrics. 
                We're here with something perhaps more powerful: the truth.
              </p>

              <p>
                The truth is our current system creates more problems than it solves. 
                The truth is JAHmere Webb could spend the next years in prison, or he could spend them preventing others from getting there. 
                The truth is we don't know if this will work - but we know what we're doing now isn't working.
              </p>

              <div className="bg-gradient text-white rounded-lg p-6 my-8">
                <h3 className="text-2xl font-bold text-holy-gold mb-4">What We're Proposing:</h3>
                <ul className="space-y-2">
                  <li><span className="text-holy-gold">✦</span> Daily digital check-ins (building the technology now)</li>
                  <li><span className="text-holy-gold">✦</span> Structured mentorship with at-risk youth (framework in development)</li>
                  <li><span className="text-holy-gold">✦</span> Complete transparency in reporting (you'll see every success and failure)</li>
                  <li><span className="text-holy-gold">✦</span> Community supervision and support (letters of intent included)</li>
                </ul>
              </div>

              <div className="border-2 border-red-500 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-red-600 mb-4">What We're NOT Promising:</h3>
                <ul className="space-y-2">
                  <li>✗ Perfection</li>
                  <li>✗ Overnight transformation</li>
                  <li>✗ Zero setbacks</li>
                  <li>✗ Easy answers</li>
                </ul>
              </div>

              <div className="bg-gradient text-white rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-holy-gold mb-4">What We ARE Promising:</h3>
                <ul className="space-y-2">
                  <li>✓ Unprecedented transparency</li>
                  <li>✓ Genuine effort</li>
                  <li>✓ Community investment</li>
                  <li>✓ To learn and adjust as we go</li>
                  <li>✓ To measure everything and hide nothing</li>
                </ul>
              </div>

              <p className="text-xl font-semibold text-center">
                This is an experiment in justice. Not the kind that simply punishes, but the kind that transforms. 
                We're asking you to be part of something that doesn't exist yet - but desperately needs to.
              </p>

              <div className="text-center mt-8">
                <p>With complete honesty and respect,</p>
                <p className="text-2xl font-bold text-gradient mt-2">The Bridge Project Founding Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="bg-white">
        <div className="container">
          <h2 className="text-center mb-4">What The Bridge Could Be</h2>
          <p className="text-xl text-center text-royal-purple font-semibold mb-12">We're Building This Together</p>
          
          <div className="grid grid-2 mb-12">
            <div className="card">
              <h3 className="text-2xl mb-4">Digital Accountability That Empowers</h3>
              <p>Imagine check-ins that feel like self-care, not surveillance. Where tracking becomes a tool for growth, not just compliance.</p>
            </div>

            <div className="card">
              <h3 className="text-2xl mb-4">Mentorship That Transforms</h3>
              <p>Picture JAHmere sitting with a kid who's where he was 10 years ago, saying 'I see you, I've been you, and there's another way.'</p>
            </div>

            <div className="card">
              <h3 className="text-2xl mb-4">Community That Heals</h3>
              <p>Envision a network where every person who's been through the system becomes a guide for someone just entering it.</p>
            </div>

            <div className="card">
              <h3 className="text-2xl mb-4">Justice That Restores</h3>
              <p>What if consequences created contributors instead of casualties? What if accountability meant accounting for your ability to help others?</p>
            </div>
          </div>

          <div className="card bg-gradient text-white">
            <h3 className="text-2xl text-holy-gold mb-4">Transparency Section</h3>
            <p className="mb-4 font-bold">We'll share everything:</p>
            <ul className="space-y-2">
              <li><span className="text-holy-gold font-bold">✦</span> Every success (when they come)</li>
              <li><span className="text-holy-gold font-bold">✦</span> Every setback (and there will be some)</li>
              <li><span className="text-holy-gold font-bold">✦</span> Every lesson learned</li>
              <li><span className="text-holy-gold font-bold">✦</span> Every life touched</li>
              <li><span className="text-holy-gold font-bold">✦</span> Every dollar spent</li>
              <li><span className="text-holy-gold font-bold">✦</span> Every outcome measured</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="bg-light-whisper">
        <div className="container">
          <h2 className="text-center mb-12">The Community Ready to Stand With Us</h2>
          
          <div className="grid grid-2 max-w-4xl mx-auto">
            <div className="card">
              <p className="italic mb-4">
                "I don't know if this will work. But I know what we're doing now isn't working. 
                I'm willing to supervise JAHmere's sessions with youth. Let's try something different."
              </p>
              <p className="font-bold text-royal-purple">- Rev. Michael Thompson</p>
              <p className="text-sm opacity-75">Community Leader</p>
            </div>

            <div className="card">
              <p className="italic mb-4">
                "I'll provide meeting space. Not because I'm certain of success, but because I'm certain we need to try."
              </p>
              <p className="font-bold text-royal-purple">- Sarah Chen</p>
              <p className="text-sm opacity-75">Community Center Director</p>
            </div>

            <div className="card">
              <p className="italic mb-4">
                "When Tony Dungy believes in someone enough to mentor them for three years, we should pay attention. JAHmere has done the work."
              </p>
              <p className="font-bold text-royal-purple">- Ms. Patricia Williams</p>
              <p className="text-sm opacity-75">Former Teacher & Bridge Supporter</p>
            </div>

            <div className="card">
              <p className="italic mb-4">
                "Adults always tell us what to do. JAHmere asks us what we need. That's different. That matters."
              </p>
              <p className="font-bold text-royal-purple">- Anonymous, Age 17</p>
              <p className="text-sm opacity-75">Youth Voice</p>
            </div>
          </div>
        </div>
      </section>

      {/* JORDAN'S TESTIMONY */}
      <section ref={jordanSectionRef} className="bg-white">
        <div className="container">
          <h2 className="text-center mb-8">A Testimony That Changes Everything</h2>
          
          <div className="card divine-accent max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">🌟⚡</div>
            <h3 className="text-3xl text-holy-gold mb-4">Jordan Dungy Speaks</h3>
            <p className="text-xl opacity-75 mb-6">
              The Man Who Can't Feel Pain Vouching for the Man Who Felt Too Much
            </p>
            
            <blockquote className="text-lg italic mb-6">
              "I can't feel physical pain, but I've learned to read emotional pain like other people read words. 
              When I see JAHmere, I see a man whose pain receptors were working OVERTIME. 
              The system designed to 'correct' him was just adding more pain to someone already overwhelmed by it."
            </blockquote>
            
            <div className="text-xl font-bold text-royal-purple mb-6">
              "JAHmere is society's pain signal. He's telling us the system is burning, cutting, breaking people. 
              We can ignore him like I might ignore a flame under my hand, 
              or we can listen and pull back before more damage is done."
            </div>
            
            <p className="text-lg opacity-75 mb-8">
              - Jordan Dungy, Son of NFL Legend Tony Dungy
            </p>
            
            <Link 
              href="/jordan-letter" 
              className="btn btn-primary"
              onClick={() => {
                // Store flag to trigger prophetic moment on jordan-letter page
                localStorage.setItem('triggerPropheticMoment', 'true')
              }}
            >
              Read Jordan's Full Letter 🌟⚡
            </Link>
            
            <p className="text-sm opacity-60 mt-4">
              A prophetic testimony from someone who understands pain in ways most never will
            </p>
          </div>
        </div>
      </section>

      {/* DUNGY'S WISDOM */}
      <DungyWisdom />

      {/* HEARTBEAT MONITOR - NEW SECTION */}
      <section className="bg-gradient text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-holy-gold mb-6">The Community Pulse</h2>
              <p className="text-xl mb-4">
                Every heartbeat represents someone who believes in transformation over incarceration. 
                Watch as our community grows in real-time.
              </p>
              <p className="mb-6">
                When Judge Ferrero sees these numbers, she'll understand: This isn't just about JAHmere. 
                It's about a community ready to support, guide, and ensure success.
              </p>
              <p className="text-holy-gold font-bold text-lg">
                "We need somebody to give us a chance." - Tony Dungy
              </p>
            </div>
            <HeartbeatMonitor />
          </div>
        </div>
      </section>

      {/* LETTERS OF HOPE - NEW SECTION */}
      <LettersOfHope />

      {/* YOUTH READY TO BE MENTORED - NEW SECTION */}
      <YouthMentorship />

      {/* THE ASK */}
      <section className="bg-light-whisper">
        <div className="container">
          <h2 className="text-center mb-8">What We're Asking For</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Risk Mitigation Dashboard - NEW */}
            <div className="mb-12">
              <RiskMitigation />
            </div>
            
            {/* Original Ask Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold text-royal-purple mb-4">Instead of Prison:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Daily digital check-ins with location verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Weekly mentorship sessions with at-risk youth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Monthly progress reports to Judge Ferrero</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Community service focused on prevention</span>
                  </li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-bold text-royal-purple mb-4">We Provide:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Complete transparency through technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Zero cost to the state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Mentor supervision and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-holy-gold">✓</span>
                    <span>Documented impact and outcomes</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* The Math */}
            <div className="mt-12 bg-gradient text-white rounded-lg p-8 text-center">
              <h3 className="text-3xl font-bold text-holy-gold mb-6">The Simple Math</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-4xl font-bold">$35,000</p>
                  <p className="text-lg">Annual cost to incarcerate</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-holy-gold">vs</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-lg">Cost for The Bridge Project</p>
                </div>
              </div>
              <p className="mt-6 text-xl">
                Plus: Lives saved, cycles broken, communities healed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="bg-white">
        <div className="container">
          <h2 className="text-center mb-8">Our Promise to You</h2>
          
          <div className="card divine-accent max-w-3xl mx-auto">
            <h3 className="text-2xl mb-6">The Bridge Project Commits To:</h3>
            <div className="space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Complete transparency - every success and failure shared
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Rigorous measurement - data on everything we do
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Course correction - when something doesn't work, we'll change it
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Community involvement - this isn't JAHmere's project, it's ours
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Youth safety - every interaction supervised and documented
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Fiscal responsibility - every dollar accounted for
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Regular reporting - monthly updates to all stakeholders
              </p>
              <p className="flex items-start gap-2">
                <span className="text-holy-gold text-2xl font-bold">✓</span>
                Honest communication - no hiding behind PR speak
              </p>
            </div>
            
            <div className="bg-light-whisper rounded-lg p-6 mt-8 text-center">
              <p className="text-xl italic">
                We're not perfect. This won't be perfect. But it will be real, measured, 
                and aimed at creating the change our community desperately needs.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-xl font-bold">Building the bridge as we cross it,</p>
              <p className="text-3xl font-bold text-gradient mt-2">The Bridge Project Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient text-white py-16">
        <div className="container text-center">
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            This is Day One. Everything you see here is vision, not history. 
            We're building in public, learning in real-time, and inviting you to be part of something 
            that doesn't exist yet - but needs to.
          </p>
          
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <Link href="#vision" className="text-holy-gold hover:text-white transition-colors">Our Vision</Link>
            <Link href="#letter" className="text-holy-gold hover:text-white transition-colors">Meet JAHmere</Link>
            <Link href="/jordan-letter" className="text-holy-gold hover:text-white transition-colors font-bold">Jordan's Testimony 🌟</Link>
            <Link href="/letter-to-dungy" className="text-holy-gold hover:text-white transition-colors">Letter to Coach Dungy</Link>
            <Link href="/contact" className="text-holy-gold hover:text-white transition-colors">Contact Us</Link>
            <Link href="/check-in" className="text-holy-gold hover:text-white transition-colors">Daily Check-In</Link>
            <Link href="/dashboard/judge" className="text-holy-gold hover:text-white transition-colors">Judge Dashboard</Link>
          </nav>
          
          <p className="opacity-75 mb-8">
            The Bridge Project | Founded 2025 | Building Tomorrow's Justice Today
          </p>
          
          <div className="text-3xl font-bold text-holy-gold">
            🔥 CLEAR EYES. FULL HEARTS. CAN'T LOSE. 🔥
          </div>
        </div>
      </footer>

      {/* Prophetic Moment Component */}
      <PropheticMoment 
        trigger={triggerProphetic}
        onComplete={() => {
          // Scroll to Jordan's testimony after the moment completes
          if (jordanSectionRef.current) {
            jordanSectionRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />
      
      {/* Smart CTA System */}
      <SmartCTA userType="visitor" />
    </main>
  )
} 