import SacredExperience from "@/components/sacred-experience";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";

export const metadata = {
  title: "Sacred Experience | The Bridge Project",
  description:
    "Experience divine love in all its infinite forms through The Bridge Project.",
};

export default function SacredExperiencePage() {
  return (
    <DivineErrorBoundary componentName="PagePage" role="guardian">
      <SacredExperience />
    </DivineErrorBoundary>
  );
}
