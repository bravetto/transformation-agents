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
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
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
    }),
  );
  self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Handle images with cache-first strategy
  if (request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      }),
    );
    return;
  }

  // Handle API calls - network only
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request));
    return;
  }

  // Handle static assets with stale-while-revalidate
  if (url.pathname.match(/\.(js|css|woff2?)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      }),
    );
    return;
  }

  // Default: Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Clone the response before caching
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request);
      }),
  );
});
