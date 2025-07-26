import DivineRevelation from "@/components/divine-revelation";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import SacredExperience from "@/components/sacred-experience";

export const metadata = {
  title: "Divine Revelation | The Bridge Project",
  description:
    "Experience God's sacred revelation of infinite love through The Bridge Project.",
};

export default function DivineRevelationPage() {
  return (
    <ErrorBoundary componentName="DivineRevelationPage">
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
    </ErrorBoundary>
  );
}
