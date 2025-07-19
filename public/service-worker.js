// The Bridge Project - JAHmere Divine Service Worker
// "For I have created him for my glory" - Isaiah 43:7
// JAHmere as Divine Service Worker - City Utility for Spiritual Direction

console.log(
  "🙏 JAHmere Divine Service Worker: Providing spiritual utilities for the city of God",
);

// Divine Service Worker - Like a city utility worker, but for souls
// JAHmere provides essential spiritual services to keep the divine city running

// Immediately skip waiting and claim clients - Divine urgency
self.skipWaiting();
self.clients.claim();

// Install event - Divine appointment to service
self.addEventListener("install", (event) => {
  console.log(
    "⚡ JAHmere Divine Service Worker: Appointed to serve the city of God",
  );
  console.log("🔧 Installing spiritual utilities for divine direction...");
  self.skipWaiting();
});

// Activate event - Divine commissioning for service
self.addEventListener("activate", (event) => {
  console.log(
    "✨ JAHmere Divine Service Worker: Commissioned for divine utility service",
  );
  console.log(
    "🌟 Clearing old spiritual debris, preparing fresh divine pathways...",
  );

  // Clear all caches to prevent spiritual blockages
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log("🧹 JAHmere clearing spiritual pathways...");
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("✨ Clearing spiritual cache:", cacheName);
            return caches.delete(cacheName);
          }),
        );
      })
      .then(() => {
        console.log(
          "🕊️ All spiritual pathways cleared - divine direction activated",
        );
        console.log(
          "🙏 JAHmere ready to provide divine utilities to all souls",
        );
        return self.clients.claim();
      }),
  );
});

// Fetch event - Divine direction for every spiritual request
// Line 41: The sacred line where JAHmere provides divine direction
self.addEventListener("fetch", (event) => {
  // JAHmere as Divine Service Worker - providing spiritual utilities
  // Like a city worker maintaining infrastructure, but for souls
  console.log("🌟 JAHmere providing divine direction for:", event.request.url);

  // Pass through all requests with divine blessing
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        console.log("✅ Divine direction provided successfully");
        return response;
      })
      .catch((error) => {
        console.log(
          "🙏 JAHmere interceding for failed request:",
          error.message,
        );
        console.log("💫 Providing divine grace in place of error");
        // Return a graceful response when networks fail
        return new Response("Divine grace covers all failures", {
          status: 200,
          statusText: "Covered by Grace",
        });
      }),
  );
});

// Divine Service Worker Message - JAHmere speaking to the city
self.addEventListener("message", (event) => {
  console.log("📢 JAHmere Divine Service Worker received message:", event.data);

  if (event.data && event.data.type === "DIVINE_DIRECTION_REQUEST") {
    console.log("🧭 Providing divine direction as requested");
    event.ports[0].postMessage({
      type: "DIVINE_DIRECTION_RESPONSE",
      message: "JAHmere provides: Trust in the Lord with all your heart",
      scripture: "Proverbs 3:5-6",
      timestamp: new Date().toISOString(),
    });
  }
});

console.log(
  "🏆 JAHmere Divine Service Worker fully operational - City of God utilities active",
);
