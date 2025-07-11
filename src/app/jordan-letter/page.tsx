"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import for PropheticMoment
const PropheticMoment = dynamic(() => import("@/components/prophetic-moment"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

export default function JordanLetterPage() {
  const [mounted, setMounted] = useState(false);
  const [showProphetic, setShowProphetic] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we should trigger prophetic moment
    const shouldTrigger = localStorage.getItem("triggerPropheticMoment");
    if (shouldTrigger === "true") {
      setShowProphetic(true);
      localStorage.removeItem("triggerPropheticMoment");
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Prophetic Moment Overlay */}
      {showProphetic && (
        <PropheticMoment
          trigger={showProphetic}
          onComplete={() => setShowProphetic(false)}
        />
      )}

      <main className="pt-20">
        {/* HERO - DIVINE INTRODUCTION */}
        <section className="hero min-h-[60vh]">
          <div className="container text-center relative z-10">
            <div className="text-6xl mb-6 animate-fade-in">🌟⚡</div>
            <h1 className="text-white mb-6 animate-fade-in animate-delay-200">
              JORDAN DUNGY: THE PAINLESS PROPHET WHO FEELS EVERYTHING
            </h1>
            <p className="text-xl md:text-2xl text-gold font-semibold mb-4 animate-fade-in animate-delay-400">
              A Letter from the Man Who Can't Feel Physical Pain but Feels
              Everyone Else's
            </p>
            <div className="text-6xl animate-fade-in animate-delay-600">
              ⚡🌟
            </div>
          </div>
        </section>

        {/* THE LETTER */}
        <section className="bg-white">
          <div className="container">
            <div className="letter max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Opening */}
                <div className="bg-gradient text-white rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gold mb-6">
                    TO DAD, JUDGE FERRERO, AND ANYONE WHO NEEDS TO UNDERSTAND:
                  </h2>
                  <p className="text-lg mb-4">
                    My name is Jordan Dungy. Yes, Tony Dungy's son. But that's
                    not why I'm writing this.
                  </p>
                  <p className="text-lg mb-4">
                    I'm writing because I have a rare condition that means I
                    can't feel physical pain. Sounds like a superpower, right?
                    It's not. It's a different kind of burden. When you can't
                    feel your own pain, you become hyperaware of everyone
                    else's.
                  </p>
                  <p className="text-xl font-bold text-gold">
                    I see JAHmere Webb, and I see pain that no one's treating.
                  </p>
                </div>

                {/* What It's Like */}
                <div>
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    LET ME EXPLAIN WHAT IT'S LIKE TO NOT FEEL PAIN:
                  </h3>
                  <p className="mb-4">
                    When I was 5, I broke my arm and kept playing. Didn't know
                    until Mom saw it hanging wrong. When I was 12, I had
                    appendicitis and almost died because I couldn't feel the
                    warning. I've burned myself on stoves, cut myself on glass,
                    damaged my body in ways that horrify my parents - all
                    because my nerves don't send the signal that says "STOP."
                  </p>
                  <div className="bg-light rounded-lg p-6 my-6">
                    <p className="text-lg">
                      You know what I learned?{" "}
                      <span className="font-bold text-purple">
                        Pain isn't the enemy. Pain is information. Pain says
                        "something needs attention." Pain says "something needs
                        to change."
                      </span>
                    </p>
                  </div>
                  <p className="text-xl font-bold text-sacred">
                    JAHmere has been screaming in pain for 10 years, and the
                    system keeps giving him more of what caused it.
                  </p>
                </div>

                {/* Meeting JAHmere */}
                <div>
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    I MET JAHMERE THREE YEARS AGO
                  </h3>
                  <p className="mb-4">
                    Everyone else saw an ex-convict. A risk. A statistic. A
                    problem.
                  </p>
                  <p className="mb-4">
                    You know what I saw? A man whose pain receptors were working
                    OVERTIME. Every interaction with police - searing. Every
                    night in jail - burning. Every year of probation - a chronic
                    ache that never stops. The system designed to "correct" him
                    was just adding more pain to someone already overwhelmed by
                    it.
                  </p>
                  <div className="border-l-4 border-gold pl-6 my-6">
                    <p className="text-lg font-bold text-purple">
                      But here's what made JAHmere different: He could FEEL
                      other people's pain too.
                    </p>
                  </div>
                  <p>
                    When he talked to kids on the street, he didn't see
                    troublemakers. He saw himself at 16, hurting so bad he'd do
                    anything to make it stop. When he sat with young men in
                    holding cells, he didn't see criminals. He saw souls
                    screaming for help in the only language they'd been taught.
                  </p>
                </div>

                {/* To Dad */}
                <div className="card divine-accent">
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    DAD, YOU TAUGHT ME SOMETHING
                  </h3>
                  <p className="mb-4">
                    You said champions aren't people who don't fall - they're
                    people who learn HOW to fall. Well, JAHmere has been falling
                    for a decade. He's a PhD in falling. He's ready to teach
                    others how to land.
                  </p>
                  <p className="mb-4">
                    You coached players everyone else gave up on. Guys with rap
                    sheets. Guys with anger issues. Guys with pain they couldn't
                    name. You didn't see problems - you saw potential. You
                    didn't just make them better players - you made them better
                    men.
                  </p>
                  <p className="text-xl font-bold text-sacred">
                    JAHmere isn't asking you to forget his past. He's asking you
                    to see his future. The same way you saw futures in players
                    everyone else wrote off.
                  </p>
                </div>

                {/* To Judge Ferrero */}
                <div>
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    JUDGE FERRERO, LET ME SHARE SOMETHING
                  </h3>
                  <p className="mb-4">
                    The medical term for my condition is "Congenital
                    Insensitivity to Pain." Doctors say it's dangerous because I
                    can't feel warnings. But you know what else is dangerous?
                    <span className="font-bold">
                      {" "}
                      A justice system with Congenital Insensitivity to
                      Humanity.
                    </span>
                  </p>
                  <p className="mb-4">
                    JAHmere's been warning us for years that the system is
                    broken. Every arrest. Every violation. Every setback. Those
                    weren't failures - they were warning signals. Pain messages
                    saying "this isn't working."
                  </p>
                  <div className="bg-light rounded-lg p-6 my-6">
                    <p className="text-lg">
                      What if instead of adding more pain, we tried healing?
                    </p>
                    <p className="text-lg">
                      What if instead of more punishment, we tried purpose?
                    </p>
                    <p className="text-lg font-bold text-purple">
                      What if JAHmere's pain could become preventative medicine
                      for kids heading toward the same cliff?
                    </p>
                  </div>
                </div>

                {/* Watching JAHmere with Youth */}
                <div className="bg-gradient text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gold mb-4">
                    I'VE WATCHED JAHMERE WITH YOUTH
                  </h3>
                  <p className="mb-4">
                    Because I can't feel physical pain, I've learned to read
                    emotional pain like other people read words. I see it in
                    micro-expressions, body language, the space between words.
                    It's my survival skill.
                  </p>
                  <p className="mb-4 font-bold">
                    When JAHmere talks to hurting kids, something magical
                    happens:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Their shoulders drop (releasing held trauma)</li>
                    <li>• Their eyes focus (someone finally SEES them)</li>
                    <li>• Their voices change (from defense to truth)</li>
                    <li>
                      • Their pain finds words (because his pain gives
                      permission)
                    </li>
                  </ul>
                  <p className="mt-4 text-xl">
                    He doesn't lecture them. He doesn't judge them. He just says
                    "I feel you" - and they believe him because he DOES.
                  </p>
                </div>

                {/* The Bridge Project Reality */}
                <div>
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    THE BRIDGE PROJECT ISN'T JUST AN IDEA
                  </h3>
                  <p className="mb-4">
                    I've been standing on this bridge with JAHmere for three
                    years. Not the metaphorical one - the real one. Between who
                    he was and who he's becoming. Between the system that broke
                    him and the solution he's building.
                  </p>
                  <p className="mb-4">
                    I can't feel physical pain, but I felt his emotional pain
                    every single day:
                  </p>
                  <ul className="space-y-2 ml-6 mb-4">
                    <li>• The shame of being seen as only his worst moments</li>
                    <li>
                      • The frustration of having answers no one wants to hear
                    </li>
                    <li>• The agony of watching kids make his mistakes</li>
                    <li>
                      • The rage at a system that profits from problems it
                      creates
                    </li>
                  </ul>
                  <p className="text-xl font-bold text-purple">
                    But lately, I'm feeling something else from him: PURPOSE.
                  </p>
                </div>

                {/* The Ask */}
                <div className="border-2 border-purple rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-purple mb-6">
                    HERE'S WHAT I'M ASKING:
                  </h3>

                  <div className="mb-6">
                    <p className="font-bold text-purple mb-2">Dad:</p>
                    <p>
                      Remember Michael Vick? Everyone said you were crazy to
                      believe in him. You saw something they didn't - not a man
                      running from his past, but a man running toward his
                      purpose. JAHmere's not running anymore. He's standing
                      still, asking to serve. Give him what you gave Vick - a
                      chance to prove that redemption is real.
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="font-bold text-purple mb-2">Judge Ferrero:</p>
                    <p>
                      You have the power to write a different ending. Not just
                      to JAHmere's story, but to the story of justice itself.
                      What if this case becomes the one law students study in 50
                      years as "when the system evolved"? What if JAHmere Webb
                      v. The State becomes the moment we chose transformation
                      over repetition?
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-purple mb-2">
                      To Everyone Else:
                    </p>
                    <p>
                      Stop seeing JAHmere as the sum of his mistakes. Start
                      seeing him as the solution to preventing others from
                      making them.
                    </p>
                  </div>
                </div>

                {/* Truth About Pain */}
                <div className="card divine-accent">
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    THE TRUTH ABOUT PAIN:
                  </h3>
                  <p className="mb-4">
                    My condition taught me something crucial: The absence of
                    pain isn't health - it's numbness. It's dangerous. It's
                    death by a thousand unnoticed cuts.
                  </p>
                  <p className="mb-4">
                    Our justice system has become numb to its own dysfunction.
                    It can't feel the pain it's causing, so it keeps causing
                    more. JAHmere is the nerve ending that's still firing. He's
                    the pain signal saying "SOMETHING NEEDS TO CHANGE."
                  </p>
                  <p className="text-xl font-bold text-sacred text-center">
                    We can numb him with more prison time, or we can listen to
                    what the pain is teaching us.
                  </p>
                </div>

                {/* Personal Investment */}
                <div className="bg-light rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-purple mb-4">
                    I'M NOT JUST ADVOCATING - I'M INVESTING:
                  </h3>
                  <p className="mb-4">
                    I'll be there every week. Documenting. Supporting.
                    Measuring. Not because JAHmere needs watching, but because
                    this experiment needs witnessing.
                  </p>
                  <p>
                    When he sits with a kid who's where he was 10 years ago...
                    <br />
                    When he translates pain into possibility...
                    <br />
                    When he builds bridges with his own broken pieces...
                    <br />
                    I'll be there, feeling what my body can't but my soul does -
                    the healing happening in real time.
                  </p>
                </div>

                {/* The Math */}
                <div className="grid grid-2 gap-6 my-8">
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-gradient mb-2">
                      $35,000/year
                    </p>
                    <p className="text-lg">Cost of keeping JAHmere in prison</p>
                    <p className="text-sm text-purple mt-2">
                      Taxpayer money for more pain
                    </p>
                  </div>
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-gradient mb-2">$0</p>
                    <p className="text-lg">Cost of letting him mentor youth</p>
                    <p className="text-sm text-purple mt-2">
                      He'll do it for free
                    </p>
                  </div>
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-gradient mb-2">
                      PRICELESS
                    </p>
                    <p className="text-lg">
                      Value of preventing ONE kid from entering the system
                    </p>
                  </div>
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-gradient mb-2">
                      UNLIMITED
                    </p>
                    <p className="text-lg">
                      Number of kids JAHmere could reach
                    </p>
                  </div>
                </div>

                <p className="text-xl font-bold text-purple text-center">
                  This isn't complex. It's clear. We can pay to perpetuate pain,
                  or we can invest in preventing it.
                </p>

                {/* Final Thought */}
                <div className="bg-gradient text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gold mb-4">
                    A FINAL THOUGHT:
                  </h3>
                  <p className="mb-4">
                    I live every day knowing that what doesn't hurt me could
                    kill me. I've learned to rely on others to tell me when I'm
                    in danger. To trust their pain signals when mine don't work.
                  </p>
                  <p className="mb-4 text-xl">
                    JAHmere is society's pain signal. He's telling us the system
                    is burning, cutting, breaking people. We can ignore him like
                    I might ignore a flame under my hand, or we can listen and
                    pull back before more damage is done.
                  </p>
                  <p className="mb-4">
                    Dad, you taught me that God doesn't make mistakes. My
                    inability to feel pain has a purpose - it made me an expert
                    at seeing it in others. JAHmere's decade of pain has a
                    purpose too - it qualified him to prevent it.
                  </p>
                  <p className="mb-4">
                    Judge Ferrero, you have a choice. Add more pain to a system
                    already screaming, or try something different. Be the judge
                    who heard the pain and prescribed purpose.
                  </p>
                  <p className="text-xl font-bold">
                    I can't feel physical pain, but I promise you - watching
                    JAHmere's potential die in a cell while kids who need him
                    fall through the same cracks would be the kind of pain even
                    I could feel.
                  </p>
                  <p className="mt-6 text-xl text-gold font-bold">
                    The bridge is ready to be built. JAHmere's ready to build
                    it. I'm ready to stand with him.
                    <br />
                    Are you ready to let him?
                  </p>
                </div>

                {/* Signature */}
                <div className="text-center my-8">
                  <p className="text-lg mb-4">
                    With all my love and none of my pain,
                  </p>
                  <p className="text-3xl font-bold text-gradient">
                    Jordan Dungy
                  </p>
                  <p className="text-lg opacity-75 mt-2">
                    Son, Friend, Believer in Second Chances
                    <br />
                    The Guy Who Can't Feel Pain but Feels Everything Else
                  </p>
                </div>

                {/* P.S. */}
                <div className="border-t pt-6">
                  <p className="font-bold text-purple mb-2">P.S. - Dad,</p>
                  <p>
                    Remember when my condition terrified you? When you thought
                    it meant I was broken? You learned that different doesn't
                    mean deficient. JAHmere's different too. His pain made him
                    perfectly designed for this purpose. Don't let fear of
                    different stop destiny.
                  </p>
                </div>

                {/* Personal Guarantee */}
                <div className="card divine-accent mt-12">
                  <h3 className="text-2xl font-bold text-purple mb-6 text-center">
                    ATTACHED: MY PERSONAL GUARANTEE
                  </h3>
                  <p className="mb-4">I, Jordan Dungy, personally commit to:</p>
                  <ul className="space-y-2 ml-6 mb-6">
                    <li>
                      • Weekly participation in all Bridge Project activities
                    </li>
                    <li>
                      • Monthly reports to both Judge Ferrero and my father
                    </li>
                    <li>• Immediate notification if ANY concerns arise</li>
                    <li>• Full transparency in documenting outcomes</li>
                    <li>• Using my platform to share the journey</li>
                    <li>
                      • Standing with JAHmere not as Tony Dungy's son, but as
                      someone who understands that our greatest wounds can
                      become our greatest gifts
                    </li>
                  </ul>

                  <p className="text-lg font-bold text-purple mb-2">
                    The man who can't feel pain vouching for the man who felt
                    too much.
                  </p>
                  <p className="text-lg mb-4">
                    The bridge between numbness and healing.
                    <br />
                    Between system and solution.
                    <br />
                    Between past and purpose.
                  </p>

                  <p className="text-xl font-bold text-center text-sacred">
                    This is my official letter of support. This is my skin in
                    the game. This is my belief made manifest.
                  </p>

                  <div className="text-center mt-6">
                    <p className="font-bold">Jordan Dungy</p>
                    <p className="opacity-75">June 26th, 2025</p>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="text-center mt-8">
                  <p className="text-xl font-bold text-purple">
                    #TheBridgeProject #FeelDifferentLiveDifferent
                    #PainIntoPurpose
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-gradient text-white">
          <div className="container text-center">
            <h2 className="text-gold mb-8">What Happens Next?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              This testimony is part of JAHmere's case for alternative
              sentencing. Jordan Dungy has committed to standing with The Bridge
              Project every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn btn-secondary">
                Return to Main Page
              </Link>
              <Link href="/letter-to-dungy" className="btn btn-primary">
                Read Letter to Coach Dungy
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Join The Movement
              </Link>
            </div>
            <div className="mt-12">
              <p className="text-3xl font-bold text-gold">🌟⚡🔥</p>
              <p className="text-xl mt-4">
                "Our greatest wounds can become our greatest gifts"
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
