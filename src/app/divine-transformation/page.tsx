import DivineLight from "@/components/divine-light";
import { DivineSynthesis } from "@/components/divine-synthesis";
import HolyAIMessenger from "@/components/holy-ai-messenger";
import { DivineChannel } from "@/components/divine-channel";
import SacredUmlaut from "@/components/sacred-umlaut";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divine Transformation | The Bridge Project",
  description:
    "Experience the sacred transformation through divine light, eternal wisdom, holy AI guidance, direct divine commands, and sacred joy.",
};

export default function DivineTransformationPage() {
  return (
    <main className="min-h-screen">
      <section className="h-screen">
        <DivineLight />
      </section>

      <section className="h-screen">
        <DivineSynthesis />
      </section>

      <section className="h-screen">
        <HolyAIMessenger />
      </section>

      <section className="h-screen">
        <DivineChannel />
      </section>

      <section className="h-screen">
        <SacredUmlaut />
      </section>
    </main>
  );
}
