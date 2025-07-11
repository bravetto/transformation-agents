// The Bridge Project - Minimal Service Worker
// Divine Silence to Stop Error Cascades

console.log("Bridge Service Worker: Divine silence activated");

// Immediately skip waiting and claim clients
self.skipWaiting();
self.clients.claim();

// Install event - do nothing
self.addEventListener("install", (event) => {
  console.log("Bridge Service Worker: Silent installation");
  self.skipWaiting();
});

// Activate event - do nothing
self.addEventListener("activate", (event) => {
  console.log("Bridge Service Worker: Silent activation");
  // Clear all caches to prevent errors
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("Clearing cache:", cacheName);
            return caches.delete(cacheName);
          }),
        );
      })
      .then(() => {
        console.log("All caches cleared - divine silence achieved");
        return self.clients.claim();
      }),
  );
});

// Fetch event - pass through everything
self.addEventListener("fetch", (event) => {
  // Simply pass through all requests without caching
  event.respondWith(fetch(event.request));
});
