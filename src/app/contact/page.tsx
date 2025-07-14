"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { impactEvents } from "@/components/impact-dashboard";
import { Mail, Heart, ArrowLeft, Send, Users } from "lucide-react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    skills: "",
    availability: "",
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add letter to impact counter
    impactEvents.addLetter();
    setSupportSubmitted(true);

    // Show celebration animation
    const celebration = document.createElement("div");
    celebration.className =
      "fixed inset-0 z-50 flex items-center justify-center pointer-events-none";
    celebration.innerHTML = `
      <div class="bg-elite-divine-amber text-elite-obsidian-depth rounded-xl p-8 text-center transform scale-0 animate-celebrate shadow-2xl">
        <div class="text-8xl mb-4">🎉</div>
        <p class="text-2xl font-bold mb-2">Your Letter is Flying to Judge Ferrero!</p>
        <p class="text-lg">Watch the counter increase →</p>
      </div>
    `;
    document.body.appendChild(celebration);

    // Add celebration animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes celebrate {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      .animate-celebrate {
        animation: celebrate 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    // Remove celebration after animation
    setTimeout(() => {
      celebration.remove();
      style.remove();
    }, 3000);

    // Here you would typically send the data to your backend
    // TODO: Implement backend API call to submit support form
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add heart to impact counter for volunteers
    impactEvents.addHeart();
    setVolunteerSubmitted(true);
    // Here you would typically send the data to your backend
    // TODO: Implement backend API call to submit volunteer form
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-elite-obsidian-depth via-elite-justice-indigo to-elite-sacred-violet relative overflow-hidden">
      {/* Elite Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(67,56,202,0.3)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_230deg_at_center,transparent_0deg,rgba(67,56,202,0.1)_60deg,transparent_120deg)]" />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 text-elite-divine-amber hover:text-elite-platinum-truth transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xl font-bold">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-elite-platinum-truth">
            Contact & Support
          </h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-elite-divine-amber via-elite-platinum-truth to-elite-justice-indigo bg-clip-text text-transparent">
            Stand With JAHmere
          </h2>
          <p className="text-2xl text-elite-divine-amber font-semibold mb-4">
            Your voice matters. Your support creates change.
          </p>
          <p className="text-lg text-elite-platinum-truth max-w-3xl mx-auto leading-relaxed">
            JAHmere is reading Coach Dungy's books in his cell. Your letter
            could be his next source of hope. Join thousands who believe in
            transformation over incarceration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Support Letter Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative"
          >
            {/* Glassmorphism Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-elite-platinum-truth/10 via-elite-justice-indigo/5 to-elite-sacred-violet/10 backdrop-blur-xl rounded-2xl border border-elite-platinum-truth/20 shadow-2xl" />
            <div className="relative p-8 rounded-2xl">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-elite-divine-amber/20 rounded-xl backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-elite-divine-amber" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-elite-platinum-truth">
                    Write a Letter of Support
                  </h3>
                  <p className="text-elite-divine-amber font-semibold">
                    Direct impact to Judge Ferrero
                  </p>
                </div>
              </div>

              <p className="text-elite-platinum-truth mb-8 leading-relaxed">
                Your letter will be shared with Judge Ferrero and added to
                JAHmere's case file. Every letter strengthens the bridge to
                transformation justice.
              </p>

              {supportSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                    className="text-8xl mb-6"
                  >
                    ✉️
                  </motion.div>
                  <h4 className="text-3xl font-bold text-elite-divine-amber mb-4">
                    Thank You!
                  </h4>
                  <p className="text-xl text-elite-platinum-truth mb-2">
                    Your letter has been received and will make a difference.
                  </p>
                  <p className="text-elite-platinum-truth">
                    Watch the letter counter increase on the impact dashboard!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="support-name"
                    >
                      Your Name
                    </label>
                    <input
                      id="support-name"
                      type="text"
                      required
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-divine-amber focus:outline-none focus:ring-2 focus:ring-elite-divine-amber/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                      value={supportForm.name}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="support-email"
                    >
                      Email Address
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      required
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-divine-amber focus:outline-none focus:ring-2 focus:ring-elite-divine-amber/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="your.email@example.com"
                      value={supportForm.email}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="support-message"
                    >
                      Your Message to Judge Ferrero
                    </label>
                    <textarea
                      id="support-message"
                      required
                      rows={6}
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-divine-amber focus:outline-none focus:ring-2 focus:ring-elite-divine-amber/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Share why you believe in second chances, transformation, or JAHmere's mission. Your words could change a life..."
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-elite-divine-amber to-elite-justice-indigo text-elite-obsidian-depth py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(255,107,53,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Letter of Support
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Volunteer Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative"
          >
            {/* Glassmorphism Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-elite-sacred-violet/10 via-elite-transformation-emerald/5 to-elite-justice-indigo/10 backdrop-blur-xl rounded-2xl border border-elite-platinum-truth/20 shadow-2xl" />
            <div className="relative p-8 rounded-2xl">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-elite-transformation-emerald/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-8 h-8 text-elite-transformation-emerald" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-elite-platinum-truth">
                    Volunteer to Help
                  </h3>
                  <p className="text-elite-transformation-emerald font-semibold">
                    Join the bridge builders
                  </p>
                </div>
              </div>

              <p className="text-elite-platinum-truth mb-8 leading-relaxed">
                Join the bridge builders. Help transform lives through
                mentorship and support. Coach Dungy taught us that everyone can
                make a difference.
              </p>

              {volunteerSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                    className="text-8xl mb-6"
                  >
                    💗
                  </motion.div>
                  <h4 className="text-3xl font-bold text-elite-transformation-emerald mb-4">
                    Welcome to the Team!
                  </h4>
                  <p className="text-xl text-elite-platinum-truth mb-2">
                    We'll be in touch soon about volunteer opportunities.
                  </p>
                  <p className="text-elite-platinum-truth">
                    You've added your heart to our growing community!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="volunteer-name"
                    >
                      Your Name
                    </label>
                    <input
                      id="volunteer-name"
                      type="text"
                      required
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-transformation-emerald focus:outline-none focus:ring-2 focus:ring-elite-transformation-emerald/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                      value={volunteerForm.name}
                      onChange={(e) =>
                        setVolunteerForm({
                          ...volunteerForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="volunteer-email"
                    >
                      Email Address
                    </label>
                    <input
                      id="volunteer-email"
                      type="email"
                      required
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-transformation-emerald focus:outline-none focus:ring-2 focus:ring-elite-transformation-emerald/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="your.email@example.com"
                      value={volunteerForm.email}
                      onChange={(e) =>
                        setVolunteerForm({
                          ...volunteerForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="volunteer-skills"
                    >
                      How Can You Help?
                    </label>
                    <textarea
                      id="volunteer-skills"
                      required
                      rows={3}
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-transformation-emerald focus:outline-none focus:ring-2 focus:ring-elite-transformation-emerald/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Mentoring, technical skills, community connections, legal support, social media, etc..."
                      value={volunteerForm.skills}
                      onChange={(e) =>
                        setVolunteerForm({
                          ...volunteerForm,
                          skills: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-elite-platinum-truth"
                      htmlFor="volunteer-availability"
                    >
                      Availability
                    </label>
                    <input
                      id="volunteer-availability"
                      type="text"
                      required
                      className="w-full p-4 rounded-xl bg-elite-platinum-truth/10 border border-elite-platinum-truth/20 focus:border-elite-transformation-emerald focus:outline-none focus:ring-2 focus:ring-elite-transformation-emerald/30 text-elite-platinum-truth placeholder-elite-platinum-truth/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="Weekly, monthly, project-based, weekends only..."
                      value={volunteerForm.availability}
                      onChange={(e) =>
                        setVolunteerForm({
                          ...volunteerForm,
                          availability: e.target.value,
                        })
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-elite-transformation-emerald to-elite-sacred-violet text-elite-platinum-truth py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(5,150,105,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Join the Bridge Builders
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Direct Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glassmorphism Card */}
          <div className="absolute inset-0 bg-gradient-to-br from-elite-platinum-truth/10 via-elite-divine-amber/5 to-elite-justice-indigo/10 backdrop-blur-xl rounded-2xl border border-elite-platinum-truth/20 shadow-2xl" />
          <div className="relative p-8 rounded-2xl text-center">
            <h3 className="text-3xl font-bold text-elite-divine-amber mb-6">
              Direct Contact
            </h3>
            <p className="text-lg text-elite-platinum-truth mb-6">
              For urgent matters, media inquiries, or direct collaboration:
            </p>
            <div className="bg-elite-obsidian-depth/30 rounded-xl p-6 mb-8 backdrop-blur-sm border border-elite-platinum-truth/10">
              <p className="text-2xl font-bold text-elite-divine-amber mb-2">
                info@thebridgeproject.org
              </p>
              <p className="text-elite-platinum-truth">
                (Response within 24-48 hours)
              </p>
            </div>

            <div className="border-t border-elite-platinum-truth/20 pt-8">
              <blockquote className="text-lg italic text-elite-platinum-truth mb-4 leading-relaxed">
                "The measure of a man is not where he stands in moments of
                comfort, but where he stands at times of challenge and
                controversy."
              </blockquote>
              <cite className="text-elite-divine-amber font-semibold">
                — Martin Luther King Jr.
              </cite>
              <p className="text-sm mt-3 text-elite-platinum-truth">
                (One of Coach Dungy's favorite quotes, now guiding JAHmere)
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
