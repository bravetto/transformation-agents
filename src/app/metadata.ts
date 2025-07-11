import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Divine Grace | The Bridge Project",
    template: "%s | Divine Grace",
  },
  description:
    "Where God's Justice flows through divine grace - building transformation from day one through community-driven rehabilitation.",
  metadataBase: new URL("https://bridgeproject.org"),
  openGraph: {
    title: "Divine Grace | The Bridge Project",
    description:
      "Where God's Justice flows through divine grace - building transformation from day one through community-driven rehabilitation.",
    url: "https://bridgeproject.org",
    siteName: "Divine Grace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Divine Grace - The Bridge Project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Grace | The Bridge Project",
    description:
      "Where God's Justice flows through divine grace - building transformation from day one through community-driven rehabilitation.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  keywords: [
    "divine grace",
    "God's justice",
    "rehabilitation",
    "justice reform",
    "community support",
    "mentorship",
    "divine intervention",
  ],
};
