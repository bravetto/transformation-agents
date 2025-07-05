import { Heading } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="animate-pulse">
        <div className="w-32 h-32 border-t-4 border-hope-gold rounded-full animate-spin mb-6"></div>
      </div>
      <Heading as="h2" size="h3" className="text-center mt-6 text-hope-gold animate-pulse">
        Building the Bridge...
      </Heading>
      <p className="text-center text-soft-shadow mt-2 max-w-md">
        Loading transformative content that connects truth, testimony, and technology.
      </p>
    </div>
  );
} 