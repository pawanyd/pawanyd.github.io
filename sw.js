const CACHE_NAME = 'pawan-portfolio-v' + new Date().getTime();
const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/about.html',
  '/contact.html',
  '/assets/css/main.css',
  '/assets/css/tailwind.css',
  '/assets/images/pawan.webp',
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

// Activate Service Worker - Clean up old caches
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

// Fetch Event - Network First for HTML, Cache First for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle HTML files - Network First
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request).then(response => {
        // Clone and cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Fallback to cache if network fails
        return caches.match(request).then(cachedResponse => {
          return cachedResponse || caches.match('/index.html');
        });
      })
    );
    return;
  }

  // Handle assets - Cache First
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }

        return fetch(request).then(response => {
          // Clone the response
          const responseClone = response.clone();

          // Cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }

          return response;
        }).catch(() => {
          // Return offline fallback
          return caches.match('/index.html');
        });
      })
    );
  } else {
    // Cross-origin requests - Network first
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
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
