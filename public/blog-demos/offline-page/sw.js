const CACHE_NAME = 'offline-cache';
const FALLBACK_HTML_URL = 'offline.html';

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(['./offline.svg', FALLBACK_HTML_URL]))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(cacheName) {
                        cacheName === 'offline-cache';
                    })
                    .map(function(cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

this.addEventListener('fetch', event => {
    if (
        event.request.mode === 'navigate' ||
        (event.request.method === 'GET' &&
            event.request.headers.get('accept').includes('text/html'))
    ) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                return caches.match(FALLBACK_HTML_URL);
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
