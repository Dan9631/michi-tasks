/* Service Worker de Michi Tasks
   Las actualizaciones fluyen solas: la página usa red-primero y los
   recursos usan stale-while-revalidate (se sirven del caché y se
   refrescan en segundo plano). Solo sube la versión si renombras
   o eliminas archivos y quieres purgar el caché viejo. */
const CACHE = 'michi-tasks-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-64.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Navegación: red primero (para recibir versiones nuevas), caché si no hay conexión
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto (iconos, fuentes…): stale-while-revalidate — se sirve del
  // caché al instante y se refresca desde la red en segundo plano
  e.respondWith(
    caches.match(e.request).then(hit => {
      const refresh = fetch(e.request).then(resp => {
        if (resp && (resp.ok || resp.type === 'opaque')) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => hit);
      return hit || refresh;
    })
  );
});
