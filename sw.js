const CACHE='heures-edition06-marseille-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const req=event.request;if(req.mode==='navigate'){event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));return}event.respondWith(caches.match(req).then(cached=>cached||fetch(req))) });