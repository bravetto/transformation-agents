import { NextRequest, NextResponse } from "next/server";

/**
 * Handle manifest.json requests
 * This prevents 404 errors when browsers request the web app manifest
 */
export async function GET(request: NextRequest) {
  const manifest = {
    name: "The Bridge Project",
    short_name: "Bridge",
    description: "Transforming justice through divine connection",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBF5",
    theme_color: "#F59E0B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=604800", // 1 week
    },
  });
}
