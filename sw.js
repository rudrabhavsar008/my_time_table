// Version: final-v1 (Changing this name forces an update)
const cacheName = 'timetable-final-v2'; 
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Install Event: Caches the files
self.addEventListener('install', e => {
  self.skipWaiting(); // Forces this new worker to become active immediately
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// Activate Event: Cleans up old versions
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event: Serves files from Cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );

});
