
// Squelette du service worker (Workbox ou vanilla à compléter, format TypeScript)
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Placeholder - routes, caching strategies, etc. à compléter selon besoins
