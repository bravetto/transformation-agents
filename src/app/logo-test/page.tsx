"use client"

export default function LogoTestPage() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-sacred-midnight">Logo Test Page</h1>
        
        <div className="grid gap-8">
          {/* Favicon Test */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Favicon</h2>
            <p className="text-sm text-gray-600 mb-2">Check browser tab for favicon.ico</p>
            <img src="/favicon.ico" alt="Favicon" className="h-8 w-8" />
          </div>

          {/* Apple Touch Icon */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Apple Touch Icon (180x180)</h2>
            <img src="/apple-touch-icon.png" alt="Apple Touch Icon" className="h-32 w-32 border" />
          </div>

          {/* OG Image */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Open Graph Image (1200x630)</h2>
            <img src="/og-image.png" alt="OG Image" className="w-full max-w-2xl border" />
          </div>

          {/* Logo Variations */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Logo Variations</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Main Logo</h3>
                <div className="bg-gray-100 p-4 rounded">
                  <img src="/images/logo.png" alt="Main Logo" className="h-32 w-auto mx-auto" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">White Logo (on dark)</h3>
                <div className="bg-sacred-midnight p-4 rounded">
                  <img src="/images/logo-white.png" alt="White Logo" className="h-32 w-auto mx-auto" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Dark Logo (on light)</h3>
                <div className="bg-white p-4 rounded border">
                  <img src="/images/logo-dark.png" alt="Dark Logo" className="h-32 w-auto mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Preview */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Navigation Logo Preview</h2>
            <div className="bg-gradient-to-r from-sacred-midnight to-royal-purple p-4 rounded">
              <div className="flex items-center gap-2">
                <img src="/images/logo-white.png" alt="Nav Logo" className="h-10 w-auto" />
                <span className="text-white font-bold text-lg">THE BRIDGE</span>
              </div>
            </div>
          </div>

          {/* Extra Logo */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Additional Logo Found</h2>
            <p className="text-sm text-gray-600 mb-2">logo-blue.png in public folder</p>
            <div className="bg-gray-100 p-4 rounded">
              <img src="/logo-blue.png" alt="Blue Logo" className="h-32 w-auto mx-auto" />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800">✅ Logo Checklist</h3>
          <ul className="mt-2 space-y-1 text-sm text-green-700">
            <li>• Favicon visible in browser tab</li>
            <li>• All images loading properly</li>
            <li>• White logo visible on dark background</li>
            <li>• OG image ready for social sharing</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 