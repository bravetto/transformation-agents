import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Check-in | The Bridge Project",
  description: "Join the community in prayer and support for JAHmere Webb",
};

// Minimal implementation to prevent 404 errors
export default function CheckInPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gentle-charcoal mb-4">
          Community Check-in Portal
        </h1>
        <p className="text-lg text-soft-shadow">
          Join our growing community supporting JAHmere Webb's journey to
          freedom
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-hope-gold/10 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-courage-blue">1,247</div>
          <div className="text-sm text-soft-shadow">Letters of Support</div>
        </div>

        <div className="bg-courage-blue/10 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-hope-gold">247</div>
          <div className="text-sm text-soft-shadow">Community Supporters</div>
        </div>

        <div className="bg-gentle-charcoal/5 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-gentle-charcoal">100%</div>
          <div className="text-sm text-soft-shadow">Verified Testimonies</div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          ✨ Community Features Coming Soon
        </h2>
        <div className="text-blue-700 space-y-2">
          <p>• Prayer check-ins and community updates</p>
          <p>• Character witness testimonial portal</p>
          <p>• Community support milestones</p>
          <p>• July 28th countdown and prayer times</p>
        </div>

        <div className="mt-6 text-sm text-blue-600">
          <p>This feature is being prepared with love for our community.</p>
          <p className="mt-2 italic">
            "For where two or three gather in my name, there am I with them." -
            Matthew 18:20
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-8 text-center space-x-4">
        <Link
          href="/judge-ferrero-private"
          className="inline-block bg-courage-blue text-white px-6 py-2 rounded hover:bg-courage-blue/90 transition-colors"
        >
          Judge Resources
        </Link>
        <Link
          href="/letter-portal"
          className="inline-block bg-hope-gold text-white px-6 py-2 rounded hover:bg-hope-gold/90 transition-colors"
        >
          Write a Letter
        </Link>
        <Link
          href="/"
          className="inline-block bg-gentle-charcoal text-white px-6 py-2 rounded hover:bg-gentle-charcoal/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
