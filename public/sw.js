// service-worker.js - Place this file in your public directory
const CACHE_NAME = 'brightway-pwa-v1.5';
const OFFLINE_URL = '/offline.html';

// Assets that must be available offline
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/ios/192.png',
  '/ios/512.png',
  '/ios-install-guide.png' // Add this image for the iOS installation guide
];

// Additional assets to cache when used
const RUNTIME_CACHE_PATTERNS = [
  /\.(js|css)$/, // JavaScript and CSS files
  /\.(png|jpg|jpeg|svg|webp|avif)$/, // Images
  /^https:\/\/images\.unsplash\.com/ // External images from Unsplash
];

// Install event - precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🚀 Precaching app shell assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Immediately activate on other tabs
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🏁 Service Worker activated');
      return self.clients.claim(); // Take control of uncontrolled clients
    })
  );
});

// Fetch event - handle with network-first strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests, browser extensions, etc.
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.method !== 'GET') {
    return;
  }

  // HTML pages: Network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Valid response - clone and cache it
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Network failure - try to serve from cache or fall back to offline page
          return caches.match(event.request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Assets: Cache-first for cached assets, network-first with caching for others
  const shouldCacheFirst = RUNTIME_CACHE_PATTERNS.some(pattern => 
    pattern.test(event.request.url)
  );

  if (shouldCacheFirst) {
    // Cache-first strategy for assets we want to cache
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // No cache hit - fetch from network and cache
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200) {
                return response;
              }

              // Cache the fresh network response
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
  } else {
    // Network-first with runtime caching for other requests
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        })
        .catch(() => {
          // Network failure - try to serve from cache
          return caches.match(event.request);
        })
    );
  }
});

// Handle messages from clients (e.g., refresh notification)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle app update
self.addEventListener('updatefound', () => {
  console.log('🔄 New service worker update found');
});

// This fires when a notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Add logic here to determine which page to open
  const urlToOpen = new URL('/', self.location.origin).href;
  
  event.waitUntil(
    clients.matchAll({type: 'window'}).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window/tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});