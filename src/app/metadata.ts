import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "The Bridge Project | Building from Day 1",
    template: "%s | The Bridge Project",
  },
  description:
    "Supporting JAHmere Webb's transformation justice case through community advocacy, mentorship, and systemic change. Building bridges to a better future.",
  metadataBase: new URL("https://bridgeproject.org"),
  openGraph: {
    title: "The Bridge Project | Building from Day 1",
    description:
      "Supporting JAHmere Webb's transformation justice case through community advocacy, mentorship, and systemic change. Building bridges to a better future.",
    url: "https://bridgeproject.org",
    siteName: "The Bridge Project",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Bridge Project - Building from Day 1",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bridge Project | Building from Day 1",
    description:
      "Supporting JAHmere Webb's transformation justice case through community advocacy, mentorship, and systemic change. Building bridges to a better future.",
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
    "The Bridge Project",
    "JAHmere Webb",
    "transformation justice",
    "criminal justice reform",
    "community support",
    "mentorship",
    "youth advocacy",
    "systemic change",
    "community building",
    "rehabilitation",
  ],
};
