'use client'

import dynamic from 'next/dynamic'

// Import the full-featured home page with all animations
const HomePage = dynamic(() => import('./home-page'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-hope-gold rounded-full mx-auto mb-4"></div>
          <p className="text-gentle-charcoal">Loading The Bridge...</p>
        </div>
      </div>
    </div>
  )
})

export default function Page() {
  return <HomePage />
}
