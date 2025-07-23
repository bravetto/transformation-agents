import { EntryPortal } from "@/components/trinity/entry-portal";
import { logger } from "@/lib/logger";

export default function EntryPage() {
  logger.info("Trinity Entry Portal accessed", {
    timestamp: new Date().toISOString(),
  });

  return (
    <main className="min-h-screen">
      <EntryPortal />
    </main>
  );
}

export const metadata = {
  title: "Choose Your Path - The Bridge Project",
  description:
    "Where does your heart lead you? Choose your path to help JAHmere come home and transform American justice forever.",
};
