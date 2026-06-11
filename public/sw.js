const CACHE_NAME = 'fools-journey-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/about/index.html',
  '/images/tarot_room.png',
  '/images/tarot_room_philo.png',
  '/images/sophia_portrait.png',
  '/images/philo_portrait.png',
  '/images/city_street.png',
  '/images/glitch_matrix.png',
  '/images/modern_office.png',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
];

// インストール時に静的ファイルをプレキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// フェッチ処理 (Stale-While-Revalidate 戦略)
self.addEventListener('fetch', (event) => {
  // HTTP / HTTPS のリクエストのみ処理する (chrome-extension 等を除外するため)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // キャッシュがあれば先に返しつつ、バックグラウンドで最新データをネットワーク取得してキャッシュ更新
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // オフライン時のエラー無視
          });
        return cachedResponse;
      }

      // キャッシュがない場合はネットワークから取得し、キャッシュに追加する
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
