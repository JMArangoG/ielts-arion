// public/sw.js â€” cache-first del app shell (sin dato personal)
const CACHE = "ORION-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["/"])));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(
      (r) =>
        r ||
        fetch(e.request)
          .then((res) => {
            const copia = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copia));
            return res;
          })
          .catch(() => caches.match("/"))
    )
  );
});
