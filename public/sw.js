const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/robots.txt',
  '/site.webmanifest',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!event.request.url.startsWith('http')) return;

  // Handle API requests
  if (event.request.url.includes('/api/')) {
    // For API requests, try network first, then cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response for potential caching
          const responseToCache = response.clone();
          
          // Cache successful API responses
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request);
        })
    );
  } else {
    // For static assets, try cache first, then network
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request).then((response) => {
          // Don't cache if response is not ok or not a GET request
          if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-form') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Implement background sync logic for failed form submissions
  const requests = await caches.match('/api/contact/queue');
  if (requests) {
    // Process queued requests
  }
}

// Push notification event listener
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const title = data.title || 'New Notification';
    const options = {
      body: data.body || 'You have a new notification',
      icon: '/logo192.png',
      badge: '/logo192.png',
      data: {
        url: data.url || '/',
      },
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
