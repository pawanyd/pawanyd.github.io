/**
 * Service Worker Helper
 * Provides utilities for managing service worker cache
 */

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('[SW Helper] Service Worker registered:', registration.scope);
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
          console.log('[SW Helper] Checking for service worker updates...');
        }, 60 * 60 * 1000); // 1 hour
        
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', event => {
          if (event.data && event.data.type === 'CACHE_CLEANED') {
            console.log(`[SW Helper] Cache cleaned: ${event.data.deletedCount} expired entries removed`);
          }
        });
        
        // Trigger cache cleanup on page load
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'CLEAN_CACHE'
          });
        }
      })
      .catch(error => {
        console.error('[SW Helper] Service Worker registration failed:', error);
      });
  });
}

// Manual cache cleanup function
window.cleanServiceWorkerCache = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CLEAN_CACHE'
    });
    console.log('[SW Helper] Manual cache cleanup triggered');
  } else {
    console.warn('[SW Helper] Service Worker not available');
  }
};

// Force update service worker
window.updateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.update();
        console.log('[SW Helper] Service Worker update triggered');
      }
    });
  }
};

// Clear all caches (use with caution)
window.clearAllCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('[SW Helper] All caches cleared');
    
    // Unregister service worker
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
      console.log('[SW Helper] Service Worker unregistered');
    }
    
    // Reload page
    window.location.reload();
  }
};

// Get cache info
window.getCacheInfo = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const info = {
      cacheCount: cacheNames.length,
      caches: []
    };
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      info.caches.push({
        name: cacheName,
        entries: keys.length,
        urls: keys.map(req => req.url)
      });
    }
    
    console.log('[SW Helper] Cache Info:', info);
    return info;
  }
  return null;
};

// Display cache status in console
console.log(`
╔════════════════════════════════════════════════════════════╗
║  Service Worker Cache Manager                              ║
║  Cache Duration: 24 hours                                  ║
╠════════════════════════════════════════════════════════════╣
║  Available Commands:                                       ║
║  • cleanServiceWorkerCache()  - Clean expired cache        ║
║  • updateServiceWorker()      - Force SW update            ║
║  • getCacheInfo()             - View cache details         ║
║  • clearAllCaches()           - Clear all caches (reload)  ║
╚════════════════════════════════════════════════════════════╝
`);
