// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = 'v1::static';

// /* Start the service worker and cache all of the app's content */
// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

self.addEventListener('install', function(e) {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        './pics/add_picture_button.svg',
        './pics/button_down.png',
        './pics/button_up.png',
        './pics/date_button.svg',
        './pics/down_direction.svg',
        './pics/name_button.svg',
        './pics/notes_button.svg',
        './pics/send_button.svg',
        './pics/trail_button.svg',
        './pics/trail_conditions_button.svg',
        './pics/trail_status_button.svg',
        './pics/up_direction.svg',
        './pics/visitation_button.svg',
        './pics/weather_button.svg',
        './pics/zion_vem_buttons-04.svg',
        './pics/zion_vem_buttons-05.svg',
        './android-chrome-192x192.png',
        './android-chrome-512x512.png',
        './apple-touch-icon.png',
        './browserconfig.xml',
        './favicon-16x16.png',
        './favicon-32x32.png',
        './favicon.ico',
        './mstile-150x150.png',
        './safari-pinned-tab.svg',
        './site.webmanifest',
        './sw.js',
        './trailTracker.css',
        './trailTracker.html',
        './trailTracker.js'

      ]).then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', function(e) {
  e.respondWith(
    // ensure we check the *right* cache to match against
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

// var cacheName = 'hello-pwa';
// var filesToCache = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/js/main.js'
// ];



// /* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);