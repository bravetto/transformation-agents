/**
 * JULY 28TH CACHE CLEARING UTILITY
 * Run this in your browser console if you're still seeing old July 9th content
 */

async function clearAllCachesForJuly28() {
  console.log("🔥 CLEARING ALL CACHES FOR JULY 28TH UPDATE...");

  try {
    // 1. Clear localStorage
    localStorage.clear();
    console.log("✅ localStorage cleared");

    // 2. Clear sessionStorage
    sessionStorage.clear();
    console.log("✅ sessionStorage cleared");

    // 3. Clear all browser caches
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(async (cacheName) => {
          await caches.delete(cacheName);
          console.log(`✅ Cache deleted: ${cacheName}`);
        }),
      );
    }

    // 4. Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (registration) => {
          await registration.unregister();
          console.log("✅ Service worker unregistered");
        }),
      );
    }

    console.log("🎉 ALL CACHES CLEARED! Reloading page...");

    // 5. Force reload
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  } catch (error) {
    console.error("❌ Error clearing caches:", error);
    console.log("🔄 Force reloading anyway...");
    window.location.reload(true);
  }
}

// Auto-run if this script is loaded directly
if (typeof window !== "undefined") {
  console.log("📢 JULY 28TH CACHE CLEANER LOADED");
  console.log("Run clearAllCachesForJuly28() to clear all caches");
  console.log("Or just refresh with Ctrl+Shift+R (or Cmd+Shift+R on Mac)");
}

// Make function available globally
if (typeof window !== "undefined") {
  window.clearAllCachesForJuly28 = clearAllCachesForJuly28;
}
