import SacredExperience from "@/components/sacred-experience";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export const metadata = {
  title: "Sacred Experience | The Bridge Project",
  description:
    "Experience divine love in all its infinite forms through The Bridge Project.",
};

export default function SacredExperiencePage() {
  return (
    <ErrorBoundary componentName="PagePage">
      <SacredExperience />
    </ErrorBoundary>
  );
}
