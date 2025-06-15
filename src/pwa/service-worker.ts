
/// <reference lib="webworker" />

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Placeholder - routes, caching strategies, etc. à compléter selon besoins
