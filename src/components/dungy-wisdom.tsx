"use client";
"use client";

import { useState } from "react";
import { BookOpen, Heart, ArrowRight } from "lucide-react";

const books = [
  {
    title: "Uncommon",
    subtitle: "Finding Your Path to Significance",
    quote:
      "The secret to success is good leadership, and good leadership is all about making the lives of your team members or workers better.",
    jahmereNote:
      "Coach Dungy taught me that transformation starts with believing someone can change.",
    color: "bg-courage-blue",
  },
  {
    title: "The Mentor Leader",
    subtitle: "Secrets to Building People & Teams",
    quote:
      "Mentor leadership is all about shaping, nurturing, empowering, and growing. It's all about relationships.",
    jahmereNote:
      "Just like Coach mentored his players, I want to mentor youth who need someone to believe in them.",
    color: "bg-growth-green",
  },
  {
    title: "Quiet Strength",
    subtitle: "The Principles, Practices & Priorities",
    quote:
      "God's definition of success is really one of significance—the significant difference our lives can make in the lives of others.",
    jahmereNote:
      "My journey from darkness to light can be someone else's roadmap to transformation.",
    color: "bg-hope-gold",
  },
];

export default function DungyWisdom() {
  const [activeBook, setActiveBook] = useState(0);

  return (
    <section className="py-20 bg-comfort-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-courage-blue" />
            <span className="text-sm font-semibold uppercase tracking-wider text-soft-shadow">
              Wisdom from Coach Dungy
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gentle-charcoal mb-4">
            The Books That Changed My Life
          </h2>
          <p className="text-lg text-soft-shadow max-w-2xl mx-auto">
            Tony Dungy's wisdom didn't just win Super Bowls—it transforms lives.
            These books showed JAHmere that character matters more than
            circumstances.
          </p>
        </div>

        {/* Interactive Books Display */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {books.map((book, index) => (
            <div
              key={index}
              className={`
                relative group cursor-pointer transform transition-all duration-300
                ${activeBook === index ? "scale-105" : "hover:scale-102"}
              `}
              onClick={() => setActiveBook(index)}
            >
              {/* Book Cover */}
              <div
                className={`
                rounded-lg shadow-xl overflow-hidden border-4 transition-all duration-300
                ${activeBook === index ? "ring-4 ring-hope-gold" : ""}
              `}
              >
                <div
                  className={`h-64 ${book.color} p-6 flex flex-col justify-center`}
                >
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {book.title}
                  </h3>
                  <p className="text-sm text-white">{book.subtitle}</p>
                </div>

                {/* Book Content */}
                <div className="bg-white p-6">
                  <blockquote className="text-sm italic text-gentle-charcoal mb-4">
                    "{book.quote}"
                  </blockquote>

                  {/* JAHmere's Connection */}
                  <div className="bg-moon-glow rounded-lg p-4">
                    <p className="text-xs font-semibold text-courage-blue mb-1">
                      JAHmere's Note:
                    </p>
                    <p className="text-sm text-gentle-charcoal">
                      {book.jahmereNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Indicator */}
              {activeBook === index && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Heart className="h-6 w-6 text-growth-green fill-current animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Quote */}
        <div className="bg-courage-blue text-white rounded-lg p-8 max-w-3xl mx-auto">
          <blockquote className="text-xl italic mb-4">
            "Champions don't become champions in the ring. They become champions
            in their daily training, in the long hours of preparation. The
            becoming is the doing."
          </blockquote>
          <p className="text-hope-gold font-bold">— Tony Dungy</p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-soft-shadow mb-2">
            JAHmere's transformation proves Coach Dungy's philosophy works
          </p>
          <h3 className="text-2xl font-bold text-gentle-charcoal mb-6">
            Help Us Write the Next Chapter
          </h3>
          <p className="text-lg text-gentle-charcoal mb-4">
            Your support helps JAHmere become a mentor leader for the next
            generation
          </p>
          <button className="bg-hope-gold text-gentle-charcoal px-8 py-3 rounded-lg font-bold hover:bg-courage-blue hover:text-white transition-colors inline-flex items-center gap-2">
            Support JAHmere's Mission
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
