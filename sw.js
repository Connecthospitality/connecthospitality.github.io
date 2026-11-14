// Self-clearing service worker for instant live development
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Bypass all cache, fetch directly from network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
