const CACHE_NAME = "dada-poem-static-v1";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./models/magic_touch.tflite",
  "./vendor/vision_bundle.mjs",
  "./vendor/vision_wasm_internal.js",
  "./vendor/vision_wasm_internal.wasm",
  "./vendor/vision_wasm_nosimd_internal.js",
  "./vendor/vision_wasm_nosimd_internal.wasm",
  "./assets/0.png",
  "./assets/1.png",
  "./assets/10%202.png",
  "./assets/10.png",
  "./assets/100.png",
  "./assets/11.png",
  "./assets/110.png",
  "./assets/12.png",
  "./assets/120.png",
  "./assets/2.png",
  "./assets/20.png",
  "./assets/3.png",
  "./assets/30.png",
  "./assets/4.png",
  "./assets/40.png",
  "./assets/5.png",
  "./assets/50.png",
  "./assets/6.png",
  "./assets/60.png",
  "./assets/7.png",
  "./assets/70.png",
  "./assets/8.png",
  "./assets/80.png",
  "./assets/9.png",
  "./assets/90.png",
  "./assets/MP.png",
  "./assets/app-icon.png",
  "./assets/archive.png",
  "./assets/blur.png",
  "./assets/bw.png",
  "./assets/capture_icon.png",
  "./assets/clear.png",
  "./assets/close.png",
  "./assets/cut.png",
  "./assets/delete.png",
  "./assets/distort.png",
  "./assets/done.png",
  "./assets/draw.png",
  "./assets/draw2.png",
  "./assets/erase.png",
  "./assets/fieldclear.png",
  "./assets/flip.png",
  "./assets/global_icon.png",
  "./assets/gravityoff.png",
  "./assets/gravityon.png",
  "./assets/grid.png",
  "./assets/in.png",
  "./assets/library.png",
  "./assets/loop.png",
  "./assets/magnet.png",
  "./assets/mosaic.png",
  "./assets/noise.png",
  "./assets/out.png",
  "./assets/path.png",
  "./assets/physics_icon.png",
  "./assets/rect.png",
  "./assets/restore.png",
  "./assets/reundo.png",
  "./assets/round.png",
  "./assets/save.png",
  "./assets/shuffleoff.png",
  "./assets/shuffleon.png",
  "./assets/side.png",
  "./assets/startcamera.png",
  "./assets/sticker.png",
  "./assets/undo.png",
  "./assets/vblur.png",
  "./assets/vbw.png",
  "./assets/video_icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        STATIC_ASSETS.map((asset) =>
          cache.add(asset).catch((err) => {
            console.warn("[dada poem sw] cache failed:", asset, err);
          })
        )
      );
      await self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key.startsWith("dada-poem-"))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })
  );
});

function isStaticRequest(url) {
  if (url.origin !== self.location.origin) return false;
  return (
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.includes("/assets/") ||
    url.pathname.includes("/models/") ||
    url.pathname.includes("/vendor/")
  );
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || !isStaticRequest(url)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
