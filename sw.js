const CACHE_NAME = 'pawan-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/about.html',
  '/contact.html',
  '/assets/css/main.css',
  '/assets/css/tailwind.css',
  '/assets/images/profile.jpg',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Cache First Strategy with Network Fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different request types
  if (url.origin === location.origin) {
    // Same origin requests
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }

        return fetch(request).then(response => {
          // Clone the response
          const responseClone = response.clone();

          // Cache the response
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }

          return response;
        }).catch(() => {
          // Return offline page or cached response
          return caches.match('/index.html');
        });
      })
    );
  } else {
    // Cross-origin requests - network first
    event.respondWith(
      fetch(request).then(response => {
        // Cache successful responses
        if (response.ok && response.status === 200) {
          // Clone the response before using it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Return cached response if available
        return caches.match(request);
      })
    );
  }
});

// Handle background sync (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-portfolio') {
    event.waitUntil(
      // Perform background sync tasks
      Promise.resolve()
    );
  }
});
