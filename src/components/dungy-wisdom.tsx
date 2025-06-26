"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const books = [
  {
    title: "Quiet Strength",
    subtitle: "The Principles, Practices, and Priorities of a Winning Life",
    quote: "The secret to success is good leadership, and good leadership is all about making the lives of your team members or workers better.",
    jahmereNote: "Page 127 is worn out. This is my blueprint for The Bridge Project.",
    color: "from-royal-purple to-sacred-midnight"
  },
  {
    title: "Uncommon",
    subtitle: "Finding Your Path to Significance",
    quote: "Your significance is found in your deepest pain. That's where God does His best work.",
    jahmereNote: "Chapter 12 showed me my calling. My pain can be prevention for others.",
    color: "from-sacred-midnight to-royal-purple"
  },
  {
    title: "The Mentor Leader",
    subtitle: "Secrets to Building People and Teams That Win Consistently",
    quote: "If you want to make a difference in the lives of people, you must walk alongside them, lift and encourage them.",
    jahmereNote: "This is how Coach treats me. This is how I'll treat the youth.",
    color: "from-holy-gold to-royal-purple"
  }
]

export default function DungyWisdom() {
  const [activeBook, setActiveBook] = useState(0)

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-midnight mb-4">
            Coach Dungy's Wisdom Guiding JAHmere
          </h2>
          <p className="text-lg text-royal-purple max-w-2xl mx-auto">
            Three books. Three years of mentorship. One transformed life ready to transform others.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setActiveBook(index)}
              className={`cursor-pointer transform transition-all duration-300 ${
                activeBook === index ? 'scale-105' : 'scale-100 hover:scale-102'
              }`}
            >
              <div className={`relative rounded-lg overflow-hidden shadow-xl ${
                activeBook === index ? 'ring-4 ring-holy-gold' : ''
              }`}>
                {/* Book Cover Gradient */}
                <div className={`h-64 bg-gradient-to-br ${book.color} p-6 flex flex-col justify-center text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                  <p className="text-sm opacity-90">{book.subtitle}</p>
                </div>

                {/* Quote Section */}
                <div className="bg-white p-6">
                  <blockquote className="text-sm italic text-sacred-midnight mb-4">
                    "{book.quote}"
                  </blockquote>
                  
                  {/* JAHmere's Note */}
                  <div className="bg-light-whisper rounded-lg p-4 mt-4">
                    <p className="text-xs font-semibold text-royal-purple mb-1">JAHmere's Note:</p>
                    <p className="text-sm text-sacred-midnight">{book.jahmereNote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-royal-purple to-sacred-midnight text-white rounded-lg p-8 max-w-3xl mx-auto">
            <p className="text-xl font-semibold mb-4">
              "JAHmere calls me every week from his cell. He's not just reading my books—he's living them. 
              The Bridge Project is his way of passing on what he's learned."
            </p>
            <p className="text-holy-gold font-bold">— Tony Dungy</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-lg text-sacred-midnight mb-4">
            When a Super Bowl champion believes in transformation, miracles happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/letter-to-dungy" 
              className="btn btn-primary"
            >
              Read JAHmere's Letter to Coach
            </a>
            <a 
              href="/contact" 
              className="btn btn-secondary"
            >
              Support The Bridge
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 