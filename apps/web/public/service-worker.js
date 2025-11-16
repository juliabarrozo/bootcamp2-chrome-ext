// apps/web/public/service-worker.js

self.addEventListener('install', () => {
  console.log('Service Worker instalado!');
});

self.addEventListener('fetch', () => {
  // Aqui futuramente vamos adicionar cache
});
