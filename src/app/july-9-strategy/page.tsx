"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

export default function July9StrategyRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Automatic redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/july-28-strategy");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <Card className="p-8 max-w-md w-full text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-amber-600" />

        <h1 className="text-2xl font-bold mb-4">Court Date Updated!</h1>

        <p className="text-gray-600 mb-6">
          JAHmere's court date has been moved to{" "}
          <strong>July 28th, 2025</strong>.
          <br />
          <br />
          You're being redirected to our updated strategy...
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/july-28-strategy")}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Go to July 28th Strategy
          </Button>

          <p className="text-sm text-gray-500">
            Redirecting automatically in 3 seconds...
          </p>
        </div>
      </Card>
    </div>
  );
}
