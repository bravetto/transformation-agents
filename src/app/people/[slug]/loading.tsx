export default function PersonPageLoading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-courage-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content Skeleton */}
            <div className="order-2 lg:order-1">
              <div className="h-12 bg-white/20 rounded-lg w-3/4 mb-4 animate-pulse"></div>
              <div className="h-8 bg-white/20 rounded-lg w-1/2 mb-6 animate-pulse"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-4/5 animate-pulse"></div>
              </div>
              <div className="h-10 bg-white/20 rounded-lg w-40 animate-pulse"></div>
            </div>
            
            {/* Image Skeleton */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full overflow-hidden border-4 border-white/30 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimony Section Skeleton */}
      <section className="py-16 md:py-24 bg-comfort-cream">
        <div className="container mx-auto px-4">
          {/* Section header Skeleton */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="h-10 bg-gentle-charcoal/10 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gentle-charcoal/10 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>
          
          {/* Testimony Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {/* Quote icon placeholder */}
              <div className="absolute -top-6 -left-6 bg-hope-gold/50 rounded-full p-4 h-14 w-14 animate-pulse"></div>
              
              {/* Testimony content skeleton */}
              <div className="min-h-[200px]">
                <div className="space-y-4">
                  <div className="h-6 bg-gentle-charcoal/10 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gentle-charcoal/10 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gentle-charcoal/10 rounded w-4/5 animate-pulse"></div>
                </div>
                
                <div className="flex items-center mt-6">
                  <div>
                    <div className="h-6 bg-gentle-charcoal/10 rounded w-40 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gentle-charcoal/10 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots skeleton */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section Skeleton */}
      <section className="py-16 md:py-24 bg-gentle-charcoal text-white">
        <div className="container mx-auto px-4">
          {/* Section header Skeleton */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="h-10 bg-white/10 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-full bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6 animate-pulse">
                  <div className="flex flex-col h-full justify-center items-center">
                    <div className="h-10 bg-white/20 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-white/20 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-white/10 rounded-lg w-64 mx-auto mb-8 animate-pulse"></div>
            
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 bg-white/20 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-white/20 rounded w-full mt-4 animate-pulse"></div>
                  <div className="h-4 bg-white/20 rounded w-full mt-2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 