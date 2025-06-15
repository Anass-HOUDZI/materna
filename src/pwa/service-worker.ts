
/// <reference lib="webworker" />

const swSelf = self as unknown as ServiceWorkerGlobalScope;

swSelf.addEventListener("install", (event) => {
  swSelf.skipWaiting();
});

swSelf.addEventListener("activate", (event) => {
  swSelf.clients.claim();
});

// Placeholder - routes, caching strategies, etc. à compléter selon besoins

