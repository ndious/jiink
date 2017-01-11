// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var cacheName = 'jiink-v-1-0-1';
var filesToCache = [
  '/',
  '/index.html',
  '/dist/js/app.js',
  '/src/clipboard.min.js',
  '/css/main.css',
  '/img/wallhaven-103929.png',
  '/img/LOGO-JIINK-NOIRE.png',
  '/img/go3.png',
  '/img/Cercle01.png'
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

this.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch');
  event.respondWith(caches.match(event.request).catch(function() {
    console.log(event.request);
    return fetch(event.request);
  }).then(function(response) {
    caches.open(cacheName).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/img/LOGO-JIINK-NOIRE.png');
  }));
});

// self.addEventListener('activate', function(e) {
//   console.log('[ServiceWorker] Activate');
//   e.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (key !== cacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   return self.clients.claim();
// });
