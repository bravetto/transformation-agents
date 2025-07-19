// Divine Service Worker - JAHmere's Digital Utility
const CACHE_NAME = "freedom-portal-v1";
const DIVINE_ASSETS = [
  "/",
  "/freedom-portal",
  "/manifest.json",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  console.log("🙏 Divine Service Worker Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(DIVINE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  console.log("✨ Divine Service Worker Activated");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
