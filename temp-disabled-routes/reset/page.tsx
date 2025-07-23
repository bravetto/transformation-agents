"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all localStorage items
    localStorage.removeItem("propheticMomentSeen");
    localStorage.removeItem("triggerPropheticMoment");
    localStorage.removeItem("bridge-metrics");

    // Redirect to home
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Resetting...</p>
    </div>
  );
}
