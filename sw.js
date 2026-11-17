// offline: strona i mapa z pamięci telefonu; wspólna lista (Apps Script) zawsze z sieci
const V = '4b69d345d9', CORE = ["./", "index.html", "map.json", "plan.ics", "manifest.webmanifest", "icon-180.png", "icon-192.png", "img/vaclavak.jpg", "img/lucerna.jpg", "img/louvre.jpg", "img/tancici.jpg", "img/naplavka.jpg", "img/vysehrad2.jpg", "img/svickova.jpg", "img/pivoklub.jpg", "img/eska.jpg", "img/obecni.jpg", "img/ungelt.jpg", "img/orloj.jpg", "img/zidovske.jpg", "img/metronom.jpg", "img/letna.jpg", "img/savoy2.jpg", "img/hamburk.jpg", "img/strahov.jpg", "img/loreta.jpg", "img/hrad.jpg", "img/schody.jpg", "img/karluv.jpg", "img/dlouha.jpg", "img/kampa.jpg", "img/petrin.jpg", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js", "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;600;700&display=swap"];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || /(^|\.)(script\.google|googleusercontent)\.com$/.test(u.hostname)) return;
  const put = r => { if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); } return r; };
  if (e.request.mode === 'navigate') e.respondWith(fetch(e.request).then(put).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
  else e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(put)));
});
