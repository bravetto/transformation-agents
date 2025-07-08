import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "The Bridge Project",
    template: "%s | The Bridge Project",
  },
  description:
    "Building justice from day one through community-driven rehabilitation.",
  metadataBase: new URL("https://bridgeproject.org"),
  openGraph: {
    title: "The Bridge Project",
    description:
      "Building justice from day one through community-driven rehabilitation.",
    url: "https://bridgeproject.org",
    siteName: "The Bridge Project",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Bridge Project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bridge Project",
    description:
      "Building justice from day one through community-driven rehabilitation.",
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
    "rehabilitation",
    "justice reform",
    "community support",
    "mentorship",
  ],
};
