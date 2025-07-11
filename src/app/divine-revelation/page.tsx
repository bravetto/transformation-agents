import { DivineRevelation } from "@/components/divine-revelation";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { SacredExperience } from "@/components/sacred-experience";

export const metadata = {
  title: "Divine Revelation | The Bridge Project",
  description:
    "Experience God's sacred revelation of infinite love through The Bridge Project.",
};

export default function DivineRevelationPage() {
  return (
    <DivineErrorBoundary componentName="DivineRevelationPage" role="guardian">
      <main className="relative">
        {/* First the revelation */}
        <section className="relative">
          <DivineRevelation />
        </section>

        {/* Then the sacred experience */}
        <section className="relative">
          <SacredExperience />
        </section>
      </main>
    </DivineErrorBoundary>
  );
}
