// service-worker.js - Place this file in your public directory
const CACHE_NAME = 'brightway-pwa-v1.4';
const OFFLINE_PAGE = '/offline.html';

// Comprehensive list of core assets to precache
const PRECACHE_ASSETS = [
    '/',
    OFFLINE_PAGE,
    '/manifest.json',
    '/ios/192.png',
    '/ios/512.png',
    '/android/android-launchericon-192-192.png',
    '/android/android-launchericon-512-512.png'
];

// Asset caching strategy
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Custom routing for different asset types
const ROUTING_STRATEGIES = {
    '/api/': CACHE_STRATEGIES.NETWORK_FIRST,
    '/static/': CACHE_STRATEGIES.CACHE_FIRST,
    '.png': CACHE_STRATEGIES.CACHE_FIRST,
    '.jpg': CACHE_STRATEGIES.CACHE_FIRST,
    '.svg': CACHE_STRATEGIES.CACHE_FIRST,
    '.css': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    '.js': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    'default': CACHE_STRATEGIES.NETWORK_FIRST
};

// Install event: Precache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('🚀 Precaching core assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('Service Worker installation failed:', error);
            })
    );
});

// Activate event: Clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🧹 Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Take control of all clients immediately
                return self.clients.claim();
            })
    );
});

// Advanced fetch handling
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests and browser extensions
    if (event.request.method !== 'GET' || 
        !event.request.url.startsWith('http') || 
        event.request.url.includes('chrome-extension')) {
        return;
    }

    // Determine cache strategy based on URL
    const url = new URL(event.request.url);
    
    // Default to network-first for navigation requests
    let strategy = CACHE_STRATEGIES.NETWORK_FIRST;
    
    // Check for specific routes or file extensions
    for (const [route, routeStrategy] of Object.entries(ROUTING_STRATEGIES)) {
        if (url.pathname.includes(route) || url.pathname.endsWith(route)) {
            strategy = routeStrategy;
            break;
        }
    }

    event.respondWith(
        (async () => {
            try {
                switch (strategy) {
                    case CACHE_STRATEGIES.CACHE_FIRST:
                        const cachedResponse = await caches.match(event.request);
                        if (cachedResponse) return cachedResponse;
                        
                        try {
                            const networkResponse = await fetch(event.request);
                            if (networkResponse && networkResponse.status === 200) {
                                const cache = await caches.open(CACHE_NAME);
                                cache.put(event.request, networkResponse.clone());
                            }
                            return networkResponse;
                        } catch (error) {
                            // If fetch fails for files that should be cached, return offline page
                            if (event.request.mode === 'navigate') {
                                return caches.match(OFFLINE_PAGE);
                            }
                            throw error;
                        }

                    case CACHE_STRATEGIES.NETWORK_FIRST:
                        try {
                            const networkResponse = await fetch(event.request);
                            if (networkResponse && networkResponse.status === 200) {
                                const cache = await caches.open(CACHE_NAME);
                                cache.put(event.request, networkResponse.clone());
                            }
                            return networkResponse;
                        } catch (error) {
                            const cachedResponse = await caches.match(event.request);
                            if (cachedResponse) return cachedResponse;
                            
                            // If it's a navigation request and we're offline, show offline page
                            if (event.request.mode === 'navigate') {
                                return caches.match(OFFLINE_PAGE);
                            }
                            throw error;
                        }

                    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
                        const cachedStaleResponse = await caches.match(event.request);
                        const fetchPromise = fetch(event.request)
                            .then((networkResponse) => {
                                if (networkResponse && networkResponse.status === 200) {
                                    const cache = caches.open(CACHE_NAME);
                                    cache.then(cache => {
                                        cache.put(event.request, networkResponse.clone());
                                    });
                                }
                                return networkResponse;
                            })
                            .catch(error => {
                                // If it's a navigation request and we're offline, show offline page
                                if (event.request.mode === 'navigate') {
                                    return caches.match(OFFLINE_PAGE);
                                }
                                throw error;
                            });

                        return cachedStaleResponse || fetchPromise;
                }
            } catch (error) {
                console.error('Fetch error:', error);
                // Fallback for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match(OFFLINE_PAGE);
                }
                throw error;
            }
        })()
    );
});

// Push notification handler
self.addEventListener('push', (event) => {
    const payload = event.data ? event.data.json() : {
        title: 'BrightWay Notification',
        body: 'You have a new update or service alert.',
        icon: '/android/android-launchericon-192-192.png'
    };

    event.waitUntil(
        self.registration.showNotification(payload.title, {
            body: payload.body,
            icon: payload.icon,
            badge: '/ios/48.png',
            vibrate: [200, 100, 200],
            tag: 'brightway-notification',
            data: payload.data || {}
        })
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Handle custom action if provided in notification data
    const action = event.action;
    const notificationData = event.notification.data;
    
    let urlToOpen = '/';
    
    if (notificationData && notificationData.url) {
        urlToOpen = notificationData.url;
    } else if (action === 'contact') {
        urlToOpen = '/#contact';
    } else if (action === 'services') {
        urlToOpen = '/#services';
    }
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
            // If a window client is available, navigate it to the page
            const hadWindowToFocus = clientsArr.some(windowClient => {
                if (windowClient.url === urlToOpen) {
                    return windowClient.focus();
                }
                return false;
            });
            
            // If no window client to focus, open a new window
            if (!hadWindowToFocus) {
                return self.clients.openWindow(urlToOpen);
            }
        })
    );
});

// Background sync for failed requests
self.addEventListener('sync', (event) => {
    if (event.tag === 'service-booking') {
        event.waitUntil(
            // Implement retry logic for service bookings
            syncServiceBookings()
        );
    } else if (event.tag === 'contact-form') {
        event.waitUntil(
            // Implement retry logic for contact form submissions
            syncContactForms()
        );
    }
});

// Function to retry service bookings
async function syncServiceBookings() {
    try {
        // Get all pending bookings from IndexedDB or localStorage
        const pendingBookings = await getPendingBookings();
        
        // Process each pending booking
        for (const booking of pendingBookings) {
            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(booking)
                });
                
                if (response.ok) {
                    // If successful, remove from pending
                    await removePendingBooking(booking.id);
                }
            } catch (error) {
                console.error('Failed to sync booking:', error);
                // Will be retried next time sync event fires
            }
        }
    } catch (error) {
        console.error('Error in syncServiceBookings:', error);
    }
}

// Function to retry contact form submissions
async function syncContactForms() {
    try {
        // Get all pending contact form submissions
        const pendingForms = await getPendingContactForms();
        
        // Process each pending form
        for (const form of pendingForms) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                
                if (response.ok) {
                    // If successful, remove from pending
                    await removePendingContactForm(form.id);
                }
            } catch (error) {
                console.error('Failed to sync contact form:', error);
                // Will be retried next time sync event fires
            }
        }
    } catch (error) {
        console.error('Error in syncContactForms:', error);
    }
}

// Helper functions for background sync
// These would be implemented with IndexedDB in a real app
async function getPendingBookings() {
    // Placeholder - would actually retrieve from IndexedDB
    return JSON.parse(localStorage.getItem('pendingBookings') || '[]');
}

async function removePendingBooking(id) {
    // Placeholder - would actually remove from IndexedDB
    const bookings = JSON.parse(localStorage.getItem('pendingBookings') || '[]');
    localStorage.setItem('pendingBookings', JSON.stringify(bookings.filter(b => b.id !== id)));
}

async function getPendingContactForms() {
    // Placeholder - would actually retrieve from IndexedDB
    return JSON.parse(localStorage.getItem('pendingContactForms') || '[]');
}

async function removePendingContactForm(id) {
    // Placeholder - would actually remove from IndexedDB
    const forms = JSON.parse(localStorage.getItem('pendingContactForms') || '[]');
    localStorage.setItem('pendingContactForms', JSON.stringify(forms.filter(f => f.id !== id)));
}

// Message handling for update notifications
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});