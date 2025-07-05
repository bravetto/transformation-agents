'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for client components
const Navigation = dynamic(() => import('@/components/navigation'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-comfort-cream" />
})

const Footer = dynamic(() => import('@/components/footer'), { 
  ssr: false,
  loading: () => null
})

const ImpactDashboard = dynamic(() => import('@/components/impact-dashboard'), { 
  ssr: false,
  loading: () => null
})

const SocialAmplification = dynamic(() => import('@/components/social-amplification'), { 
  ssr: false,
  loading: () => null
})

// PropheticCountdown component removed - not found in codebase

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-16">
        {children}
      </main>
      
      {/* Floating Impact Dashboard */}
      <ImpactDashboard />
      
      {/* Floating Social Share */}
      <SocialAmplification />
      
      {/* PropheticCountdown removed */}
      
      <Footer />
    </>
  )
} 