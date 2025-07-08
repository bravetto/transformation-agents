import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story Amplifier Demo | The Bridge Project",
  description:
    "Experience our powerful story amplification system that enhances engagement, increases sharing, and creates exponential impact.",
  openGraph: {
    title: "Story Amplifier Demo | The Bridge Project",
    description:
      "Experience our powerful story amplification system that enhances engagement, increases sharing, and creates exponential impact.",
    images: ["/og-image.png"],
  },
};

export default function StoryAmplifierDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
