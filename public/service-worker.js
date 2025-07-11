const CACHE_NAME = "bridge-v1";
const STATIC_CACHE = "bridge-static-v1";
const IMAGE_CACHE = "bridge-images-v1";

// Files to cache immediately
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/images/logo.png",
  "/images/people/display/coach-dungy.webp",
  "/images/people/display/jahmere-webb.webp",
  "/images/people/display/michael-mataluni.webp",
];

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((error) => console.error("Cache installation failed:", error)),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("bridge-") &&
                cacheName !== CACHE_NAME &&
                cacheName !== STATIC_CACHE &&
                cacheName !== IMAGE_CACHE
              );
            })
            .map((cacheName) => caches.delete(cacheName)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Helper function to handle network requests with timeout
const timeoutFetch = (request, timeout = 5000) => {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout),
    ),
  ]);
};

// Fetch event - network first with cache fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET" || url.protocol === "chrome-extension:") {
    return;
  }

  // Handle images with cache-first strategy
  if (request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return timeoutFetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => {
              // Return a fallback image or error response
              return cache.match("/images/fallbacks/default-fallback.jpg");
            });
        }),
      ),
    );
    return;
  }

  // Handle static assets with stale-while-revalidate
  if (url.pathname.match(/\.(js|css|woff2?)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          const fetchPromise = timeoutFetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch((error) => {
              console.error("Static asset fetch failed:", error);
              // Return cached response if available
              return (
                cachedResponse ||
                new Response("Not available", {
                  status: 408,
                  headers: { "Content-Type": "text/plain" },
                })
              );
            });
          return cachedResponse || fetchPromise;
        }),
      ),
    );
    return;
  }

  // Default strategy: network first with cache fallback
  event.respondWith(
    timeoutFetch(request)
      .then((networkResponse) => {
        // Clone the response before caching
        const responseToCache = networkResponse.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(request, responseToCache))
          .catch((error) => console.error("Cache put failed:", error));
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return a basic offline page for HTML requests
          if (request.destination === "document") {
            return caches.match("/offline.html");
          }
          return new Response("Not available", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        });
      }),
  );
});
