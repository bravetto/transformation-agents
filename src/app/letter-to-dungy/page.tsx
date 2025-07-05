"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function LetterToDungyPage() {
  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="hero min-h-[50vh]">
        <div className="container text-center relative z-10">
          <motion.h1 
            className="text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Dear Coach
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-holy-gold font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A Letter from Your Mentee, JAHmere Webb
          </motion.p>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            To the Man Who Never Gave Up on Me
          </motion.p>
        </div>
      </section>

      {/* THE LETTER */}
      <section className="bg-white">
        <div className="container">
          <div className="letter max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="text-right opacity-75 text-sm">
                December 26, 2024<br />
                From a Cell in Florida<br />
                <span className="italic">Your book "Quiet Strength" open beside me</span>
              </div>

              <p className="text-xl font-bold text-royal-purple">
                Coach Tony Dungy<br />
                My Mentor, My Guide<br />
                The Man Who Sees What I Could Be
              </p>

              <p className="text-xl font-bold text-royal-purple mt-8">Dear Coach,</p>

              <p>
                I'm writing this letter with your signed copy of "Quiet Strength" next to me. 
                The pages are worn now—I've read it so many times I could probably recite chapters. 
                You wrote in the front: "JAHmere, your strength will come from serving others. 
                Keep fighting the good fight." I've been trying, Coach. I've been trying.
              </p>

              <p>
                When you first agreed to mentor me, I couldn't believe it. Tony Dungy—Super Bowl champion, 
                Hall of Famer—taking time for someone like me. But you told me something I'll never forget: 
                "JAHmere, God doesn't make mistakes. You're here for a purpose, and we're going to find it together."
              </p>

              <div className="bg-light-whisper rounded-lg p-6 my-8">
                <p className="text-xl font-bold text-royal-purple mb-4">Coach, I need to be honest with you:</p>
                <p>
                  Sitting in this cell, I feel like I've let you down. You invested your time, 
                  your wisdom, your faith in me. And here I am, locked up, feeling like I've fumbled 
                  on the one-yard line. But then I remember what you taught me: "It's not about 
                  the setback, it's about the comeback."
                </p>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4">What Your Mentorship Has Meant</h3>

              <p>
                Every week when we talk, you remind me that I'm not my worst mistake. You've shared 
                your own pain—losing James, facing criticism, dealing with doubt. You've shown me 
                that strength isn't about being perfect; it's about being persistent.
              </p>

              <p className="text-xl font-bold text-sacred-midnight">
                You taught me that my pain could be someone else's prevention.
              </p>

              <p>
                Remember when you told me about visiting prisons after James passed? How you saw 
                young men who reminded you of him? You said, "JAHmere, I can't save my son, 
                but maybe I can save someone else's." Coach, that's exactly what I want to do 
                with The Bridge Project.
              </p>

              <div className="border-l-4 border-holy-gold pl-6 my-8">
                <p className="text-lg italic">
                  "You said, 'Sometimes God puts us in uncomfortable places to comfort others later.' 
                  Well, Coach, I'm in the most uncomfortable place of my life. But I'm ready 
                  to use it to comfort kids heading down this same path."
                </p>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4">The Bridge Project—Our Vision Realized</h3>

              <div className="card divine-accent">
                <h4 className="text-xl font-bold text-royal-purple mb-4">What We've Talked About Becoming Reality</h4>
                <p className="mb-4">
                  Remember all those conversations about creating a program for at-risk youth? 
                  About using my story to redirect others? The Bridge Project is that vision, Coach:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-holy-gold text-xl">✓</span>
                    <span><strong>Living Your Philosophy:</strong> "Walk alongside them, don't shout down from on high"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-holy-gold text-xl">✓</span>
                    <span><strong>Accountability Through Technology:</strong> Daily check-ins that build discipline, not just compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-holy-gold text-xl">✓</span>
                    <span><strong>Mentorship That Transforms:</strong> Just like you transformed me, I can transform others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-holy-gold text-xl">✓</span>
                    <span><strong>Building Legacy:</strong> "A consistent pattern of building into the lives of others"</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4 mt-8">I Need My Coach Now More Than Ever</h3>

              <p>
                You've stood by me through so much already. When others saw a statistic, 
                you saw a soul. When others saw a problem, you saw potential. Now I need 
                you to help others see what you've always seen in me.
              </p>

              <p>
                I'm not asking you to tell Judge Ferrero I'm perfect—we both know I'm not. 
                I'm asking you to share what you've witnessed: my growth, my commitment 
                to change, my genuine desire to serve youth. Tell her about our conversations, 
                about the young men I already write to from in here, about the program 
                we've designed together.
              </p>

              <div className="bg-gradient text-white rounded-lg p-6 my-8">
                <p className="text-xl font-bold text-holy-gold mb-4">What Your Voice Means Now:</p>
                <ul className="space-y-2 text-lg">
                  <li>• Validation that transformation is real and measurable</li>
                  <li>• Proof that mentorship can redirect lives</li>
                  <li>• Hope for other young men in the system</li>
                  <li>• A chance to turn our vision into reality</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4">Living Your Lessons</h3>

              <p>
                Page 127 of "Quiet Strength"—I have it memorized: "The secret to success is good 
                leadership, and good leadership is all about making the lives of your team members 
                or workers better." Coach, locked up, I can't make anyone's life better. But with 
                The Bridge Project, I could lead kids away from this place.
              </p>

              <p>
                You taught me that God's strength shows up most in our weakness. Well, I've never 
                been weaker than I am right now. But I've also never been more ready to let 
                God use my mess for His message.
              </p>

              <div className="card">
                <p className="text-xl font-bold text-center text-royal-purple mb-4">
                  "I don't have the strength or wisdom to get through a single day 
                  without guidance and grace from God."
                </p>
                <p className="text-center">
                  - Tony Dungy<br />
                  <span className="text-sm opacity-75">
                    The quote you made me memorize our first meeting.<br />
                    I say it every morning in here.
                  </span>
                </p>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4 mt-8">My Promise to You, Coach</h3>

              <p>
                If Judge Ferrero gives me this chance:
              </p>

              <ul className="space-y-3 ml-6">
                <li>• I will honor every lesson you've taught me</li>
                <li>• I will make you proud to be my mentor</li>
                <li>• I will be transparent about every struggle and success</li>
                <li>• I will build the program we've envisioned together</li>
                <li>• I will prove that your investment in me wasn't wasted</li>
                <li>• I will pass on your wisdom to the next generation</li>
              </ul>

              <div className="bg-light-whisper rounded-lg p-6 my-8">
                <p className="text-xl font-bold text-royal-purple mb-4">
                  You told me champions are built in the off-season.
                </p>
                <p>
                  Well, Coach, this cell has been my off-season. I've been training—reading, 
                  praying, planning, preparing. I've been building the mental and spiritual 
                  muscles I'll need to lift others. I'm ready for game time.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-royal-purple mb-4">Jordan Gets It</h3>

              <p>
                Your son Jordan wrote the most powerful letter about me. He sees what you've helped 
                me understand—that my pain isn't pointless if it can prevent others' pain. He called 
                me "society's pain signal," warning that the system is broken. Coach, with your support 
                and Judge Ferrero's wisdom, we can fix it, one young life at a time.
              </p>

              <p>
                Jordan said I'm the man who felt too much pain. But you've taught me that feeling 
                pain means I can feel empathy, compassion, love. Those aren't weaknesses, Coach. 
                With your guidance, they've become my strengths.
              </p>

              <div className="border-2 border-royal-purple rounded-lg p-8 my-8">
                <p className="text-xl font-bold text-royal-purple mb-4">Coach, I'm asking you to:</p>
                <p className="text-lg">
                  Write to Judge Ferrero. Tell her about the JAHmere you know. The one who calls 
                  you every week from this cell. The one who's memorized your books. The one who 
                  writes to at-risk youth. The one who's designed The Bridge Project with your guidance. 
                  Tell her that alternative sentencing isn't avoiding accountability—it's 
                  maximizing impact.
                </p>
              </div>

              <div className="text-center my-12">
                <p className="text-3xl font-bold text-gradient mb-4">
                  "We need somebody to give us a chance."
                </p>
                <p className="text-lg">
                  You said that, Coach. You gave me a chance when no one else would. 
                  Now I need one more chance—not to avoid consequences, but to transform them 
                  into something that honors your investment in me.
                </p>
              </div>

              <div className="bg-gradient text-white rounded-lg p-8">
                <p className="text-xl mb-4">
                  You've spent three years teaching me that my past doesn't define my purpose. 
                  That my pain can be someone's gain. That quiet strength can move mountains. 
                  Coach, The Bridge Project is those mountains starting to move.
                </p>
                <p className="text-xl font-bold text-holy-gold">
                  Will you help me prove that your faith in me was justified?
                </p>
              </div>

              <div className="mt-12">
                <p>With deepest gratitude and unshakeable hope,</p>
                <p className="text-3xl font-bold text-gradient mt-2">JAHmere Webb</p>
                <p className="text-sm opacity-75 mt-2">
                  Your mentee<br />
                  Future Bridge Builder<br />
                  Living proof that mentorship transforms lives
                </p>
              </div>

              <div className="mt-8 p-4 border-t">
                <p className="text-sm opacity-75">
                  P.S. - I'm on chapter 12 of "Uncommon" now. The part about finding your calling 
                  in your deepest pain? Coach, I found it. The Bridge Project is my calling. 
                  Thank you for never letting me quit on myself. I promise I won't quit on the 
                  kids who need what you've given me—hope, guidance, and a second chance to 
                  get it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient text-white">
        <div className="container text-center">
          <h2 className="text-holy-gold mb-8">The Power of Mentorship</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Tony Dungy has been mentoring JAHmere for three years. This letter is part of 
            JAHmere's appeal to transform his sentence into service. When a champion 
            believes in someone, transformation is possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-secondary">
              Return to Home
            </Link>
            <Link href="/jordan-letter" className="btn btn-primary">
              Read Jordan's Testimony
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Support The Bridge
            </Link>
          </div>
          <p className="mt-8 text-lg font-bold">
            "Part of our purpose in life is to build a legacy—<br />
            a consistent pattern of building into the lives of others."<br />
            <span className="text-holy-gold">- Tony Dungy</span>
          </p>
        </div>
      </section>
    </main>
  )
} 