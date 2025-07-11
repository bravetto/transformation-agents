"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Divine dynamic import with error boundary protection - Client Component Context
const CacheBuster = dynamic(() => import("./cache-buster"), {
  ssr: false, // Divine protection - client-side only (allowed in client components)
  loading: () => null, // Divine silence during loading
});

const CacheBusterClient = () => {
  return (
    <Suspense fallback={null}>
      <CacheBuster />
    </Suspense>
  );
};

export default CacheBusterClient;
