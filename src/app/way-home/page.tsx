import WayHome from "@/components/way-home";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import DivineRevelation from "@/components/divine-revelation";

export const metadata = {
  title: "The Way Home | The Bridge Project",
  description:
    "Find your path from darkness to divine alignment through The Bridge Project.",
};

export default function WayHomePage() {
  return (
    <ErrorBoundary componentName="PagePage">
      <main className="relative">
        {/* First the divine revelation */}
        <section className="relative">
          <DivineRevelation />
        </section>

        {/* Then show the way home */}
        <section className="relative">
          <WayHome />
        </section>
      </main>
    </ErrorBoundary>
  );
}
