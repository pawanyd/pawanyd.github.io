// Cache Configuration
const CACHE_NAME = 'pawan-portfolio-v' + new Date().getTime();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/about.html',
  '/contact.html',
  '/assets/css/tailwind.min.css',
  '/assets/css/github-widget.min.css',
  '/assets/images/pawan.webp',
  '/manifest.json'
];

// Helper function to check if cache is expired
const isCacheExpired = (cachedTime) => {
  if (!cachedTime) return true;
  const now = Date.now();
  return (now - cachedTime) > CACHE_DURATION;
};

// Helper function to add timestamp to cached response
const addTimestampToCache = async (cache, request, response) => {
  const timestamp = Date.now();
  const headers = new Headers(response.headers);
  headers.append('sw-cache-timestamp', timestamp.toString());
  
  const modifiedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
  
  await cache.put(request, modifiedResponse);
};

// Install Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      try {
        const timestamp = Date.now();
        // Cache all URLs with timestamp
        for (const url of urlsToCache) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await addTimestampToCache(cache, url, response);
            }
          } catch (err) {
            console.log(`[SW] Failed to cache ${url}:`, err);
          }
        }
        console.log('[SW] Initial cache completed');
      } catch (err) {
        console.log('[SW] Cache installation error:', err);
      }
    })
  );
  self.skipWaiting();
});

// Activate Service Worker - Clean up old caches and expired entries
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    (async () => {
      // Delete old cache versions
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
      
      // Clean expired entries from current cache
      const cache = await caches.open(CACHE_NAME);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const cachedTime = response.headers.get('sw-cache-timestamp');
          if (cachedTime && isCacheExpired(parseInt(cachedTime))) {
            console.log('[SW] Removing expired cache:', request.url);
            await cache.delete(request);
          }
        }
      }
      
      console.log('[SW] Activation completed');
    })()
  );
  self.clients.claim();
});

// Fetch Event - Network First for HTML, Cache First for assets with expiration check
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle HTML files - Network First with cache fallback
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      (async () => {
        try {
          // Try network first
          const networkResponse = await fetch(request);
          
          if (networkResponse.ok) {
            // Cache the fresh response with timestamp
            const cache = await caches.open(CACHE_NAME);
            await addTimestampToCache(cache, request, networkResponse.clone());
            console.log('[SW] Cached fresh HTML:', request.url);
          }
          
          return networkResponse;
        } catch (error) {
          // Network failed, try cache
          console.log('[SW] Network failed, trying cache:', request.url);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(request);
          
          if (cachedResponse) {
            const cachedTime = cachedResponse.headers.get('sw-cache-timestamp');
            
            // Check if cache is expired
            if (cachedTime && isCacheExpired(parseInt(cachedTime))) {
              console.log('[SW] Cache expired for:', request.url);
              // Cache expired, delete it
              await cache.delete(request);
              // Return fallback
              return cache.match('/index.html') || new Response('Offline', { status: 503 });
            }
            
            console.log('[SW] Serving from cache:', request.url);
            return cachedResponse;
          }
          
          // No cache available, return fallback
          return cache.match('/index.html') || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // Handle assets - Cache First with expiration check
  if (url.origin === location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
          const cachedTime = cachedResponse.headers.get('sw-cache-timestamp');
          
          // Check if cache is expired
          if (cachedTime && isCacheExpired(parseInt(cachedTime))) {
            console.log('[SW] Asset cache expired:', request.url);
            // Cache expired, delete it and fetch fresh
            await cache.delete(request);
            
            try {
              const networkResponse = await fetch(request);
              if (networkResponse.ok) {
                await addTimestampToCache(cache, request, networkResponse.clone());
                console.log('[SW] Refreshed expired asset:', request.url);
              }
              return networkResponse;
            } catch (error) {
              console.log('[SW] Failed to refresh expired asset:', request.url);
              return new Response('Asset unavailable', { status: 503 });
            }
          }
          
          // Cache is still valid
          console.log('[SW] Serving asset from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        try {
          const networkResponse = await fetch(request);
          
          if (networkResponse.ok) {
            await addTimestampToCache(cache, request, networkResponse.clone());
            console.log('[SW] Cached new asset:', request.url);
          }
          
          return networkResponse;
        } catch (error) {
          console.log('[SW] Failed to fetch asset:', request.url);
          return new Response('Asset unavailable', { status: 503 });
        }
      })()
    );
  } else {
    // Cross-origin requests - Network first with cache fallback
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          
          if (networkResponse.ok && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            await addTimestampToCache(cache, request, networkResponse.clone());
            console.log('[SW] Cached cross-origin resource:', request.url);
          }
          
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(request);
          
          if (cachedResponse) {
            const cachedTime = cachedResponse.headers.get('sw-cache-timestamp');
            
            if (cachedTime && !isCacheExpired(parseInt(cachedTime))) {
              console.log('[SW] Serving cross-origin from cache:', request.url);
              return cachedResponse;
            } else {
              // Expired, delete it
              await cache.delete(request);
            }
          }
          
          return new Response('Resource unavailable', { status: 503 });
        }
      })()
    );
  }
});

// Periodic cache cleanup - runs every hour
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    event.waitUntil(
      (async () => {
        console.log('[SW] Manual cache cleanup triggered');
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        let deletedCount = 0;
        
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const cachedTime = response.headers.get('sw-cache-timestamp');
            if (cachedTime && isCacheExpired(parseInt(cachedTime))) {
              await cache.delete(request);
              deletedCount++;
              console.log('[SW] Cleaned expired entry:', request.url);
            }
          }
        }
        
        console.log(`[SW] Cache cleanup completed. Deleted ${deletedCount} expired entries.`);
        
        // Send message back to client
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'CACHE_CLEANED',
            deletedCount: deletedCount
          });
        });
      })()
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle background sync (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-portfolio') {
    event.waitUntil(
      (async () => {
        console.log('[SW] Background sync triggered');
        // Perform background sync tasks
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        
        // Clean expired entries during sync
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const cachedTime = response.headers.get('sw-cache-timestamp');
            if (cachedTime && isCacheExpired(parseInt(cachedTime))) {
              await cache.delete(request);
              console.log('[SW] Sync: Removed expired cache:', request.url);
            }
          }
        }
      })()
    );
  }
});

console.log('[SW] Service Worker loaded with 24-hour cache expiration');
