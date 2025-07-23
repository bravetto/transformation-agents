import { Metadata } from "next";
import PeopleContent from "./people-content";

export const metadata: Metadata = {
  title:
    "Transformation Agents | The Bridge Project - JAHmere Webb Freedom Mission",
  description:
    "Meet the extraordinary individuals whose faith journeys are transforming lives and communities through The Bridge Project. Featuring JAHmere Webb, Tony Dungy, Jordan Dungy, and other champions of justice.",
  keywords: [
    "transformation agents",
    "JAHmere Webb",
    "Tony Dungy",
    "Jordan Dungy",
    "Michael Mataluni",
    "character witnesses",
    "Bridge Project",
    "criminal justice reform",
    "faith journey",
    "community transformation",
    "July 28 2025",
  ],
  openGraph: {
    title: "Transformation Agents | The Bridge Project",
    description:
      "Meet the extraordinary individuals whose faith journeys are transforming lives and communities. Join the mission to free JAHmere Webb.",
    type: "website",
    images: [
      {
        url: "/images/og/transformation-agents.jpg",
        width: 1200,
        height: 630,
        alt: "Transformation Agents - The Bridge Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transformation Agents | The Bridge Project",
    description:
      "Meet the extraordinary individuals transforming lives through faith and community support.",
    images: ["/images/og/transformation-agents.jpg"],
  },
};

export default function PeopleIndexPage() {
  return <PeopleContent />;
}
