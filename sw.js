
const CACHE_NAME = 'radarin-pwa-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'sw.js'
];

// Tahap Install: Kunci aset utama ke dalam memori lokal browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Tahap Aktivasi: Bersihkan cache lama jika ada pembaruan sistem
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Jalur Pengambilan Data (Minimal offline support requirements)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
