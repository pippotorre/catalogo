/* Service worker di entratadisicurezza.app
   - app shell: cache-first
   - data/apps.json: network-first con fallback alla cache
   Ad ogni rilascio aumenta VERSIONE (e ?v= in index.html). */
const VERSIONE = 'catalogo-v2';
const SHELL = [
  './',
  './index.html',
  './css/app.css?v=2',
  './js/app.js?v=2',
  './manifest.webmanifest',
  './data/apps.json',
  './img/icone/favicon.png',
  './img/icone/icon-192.png',
  './img/icone/icon-512.png',
  './img/icone/apple-touch-icon.png',
  './img/app/buonapp.png',
  './img/app/nasone.png',
  './img/app/turet.png',
  './img/app/fontanelle.png',
  './img/app/spesaok.png',
  './img/app/uova.png',
  './img/app/guida-claude.png',
  './img/app/svolta.png',
  './img/app/reserve.png',
  './img/app/laundryscanner.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(SHELL)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chiavi => Promise.all(chiavi.filter(k => k !== VERSIONE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'attiva') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Dati: prima la rete, poi la copia salvata
  if (url.pathname.endsWith('/data/apps.json')) {
    e.respondWith(
      fetch(req).then(r => {
        const copia = r.clone();
        caches.open(VERSIONE).then(c => c.put('./data/apps.json', copia));
        return r;
      }).catch(() => caches.match('./data/apps.json'))
    );
    return;
  }

  // Navigazione: pagina dalla cache, così si apre anche offline
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }

  // Asset statici: prima la cache
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(risposta => {
      if (risposta.ok) {
        const copia = risposta.clone();
        caches.open(VERSIONE).then(c => c.put(req, copia));
      }
      return risposta;
    }))
  );
});
