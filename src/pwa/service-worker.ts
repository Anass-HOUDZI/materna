
/// <reference lib="webworker" />
const swSelf = self as unknown as ServiceWorkerGlobalScope;

// Constantes
const CACHE_NAME = "momtech-pwa-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/src/main.tsx",
  "/src/index.css",
  "/src/App.tsx",
  "/src/pages/Index.tsx",
  "/manifest.webmanifest",
  "/favicon.ico",
  // Ajoutez ici d’autres assets globaux (générés au build si possible)
];

// Helper: test API externe
function isApiRequest(request: Request) {
  const url = new URL(request.url);
  return url.pathname.startsWith("/api/");
}

// Helper: outil offline
function isOfflineTool(request: Request) {
  const url = new URL(request.url);
  return url.pathname.startsWith("/tools/");
}

// INSTALL: Cache assets statiques
swSelf.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  swSelf.skipWaiting();
});

// ACTIVATE: nettoyage anciens caches
swSelf.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  swSelf.clients.claim();
});

// FETCH strategies selon type
swSelf.addEventListener("fetch", (event) => {
  const req = event.request;
  if (isApiRequest(req)) {
    // External APIs: network-first, fallback to cache
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
  } else if (isOfflineTool(req) || req.destination === "document" || req.destination === "script" || req.destination === "style") {
    // Offline tools & app shell: cache-first
    event.respondWith(
      caches.match(req).then(
        (cached) => cached ||
          fetch(req).then((res) => {
            // Si on a un asset statique : add to cache
            if (
              STATIC_ASSETS.some((a) => req.url.endsWith(a)) &&
              res.ok
            ) {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
            }
            return res;
          })
      )
    );
  }
  // sinons laisser défaut
});

// SKIP WAITING + notif client sur update
swSelf.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    swSelf.skipWaiting();
  }
});

// PUSH update to clients
function sendUpdateNotification() {
  swSelf.clients.matchAll().then((clients) => {
    clients.forEach((client) =>
      client.postMessage({ type: "UPDATE_AVAILABLE" })
    );
  });
}
swSelf.addEventListener("install", sendUpdateNotification);
