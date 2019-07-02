const cacheName = 'cache-v1';
const recoursesToPrecache = [
    '/',
    'index.html',
    'style.css',
    '/bootstrap-4.1.3-dist/css/bootstrap.min.css',
    '/bootstrap-4.1.3-dist/js/bootstrap.min.js',
    '/css/fixed.css',
    '/img/apple.png',
    '/img/client1.png',
    '/img/client2.png',
    '/img/computers.png',
    '/img/nuno.png',
    '/js/jquery-3.3.1.min.js'
];

self.addEventListener('controllerchange',
  function() { window.location.reload(); }
);

self.addEventListener('install', event => {
    console.log('Service worker Install event');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(recoursesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('activate event!');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
    })
    );
});