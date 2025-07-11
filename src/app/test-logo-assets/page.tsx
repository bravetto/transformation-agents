"use client";

import Image from "next/image";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

function TestLogoAssetsPage() {
  const logos = [
    { src: "/images/logo.png", name: "Default Logo" },
    { src: "/images/logo-blue.png", name: "Blue Logo" },
    { src: "/images/logo-dark.png", name: "Dark Logo" },
    { src: "/images/logo-white.png", name: "White Logo" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Logo & Assets Test</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Logo Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div key={logo.src} className="bg-gray-800 p-4 rounded-lg">
                <div className="aspect-square bg-white/10 rounded mb-2 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={150}
                    height={150}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">{logo.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Favicon & Icons
          </h2>
          <div className="flex gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Image src="/favicon.ico" alt="Favicon" width={32} height={32} />
              <p className="text-sm text-gray-400 mt-2">Favicon</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="/apple-touch-icon.png"
                alt="Apple Touch Icon"
                width={60}
                height={60}
              />
              <p className="text-sm text-gray-400 mt-2">Apple Touch Icon</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(TestLogoAssetsPage, {
  componentName: "TestLogoAssetsPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading logo test page
    </div>
  ),
});
