import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";

export default function PersonNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-comfort-cream">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-hope-gold/20 flex items-center justify-center">
            <UserX className="h-12 w-12 text-hope-gold" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-gentle-charcoal">
          Person Not Found
        </h1>

        <p className="text-soft-shadow mb-8">
          The person profile you're looking for doesn't exist or may have been
          moved. Please check the URL or explore our other team members.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" asChild>
            <Link href="/people">View All People</Link>
          </Button>

          <Button variant="primary" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
