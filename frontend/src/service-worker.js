/* eslint-disable no-restricted-globals */

const CACHE_NAME = "justonemeal-v1";

// CRA / Workbox utiliza esta variable durante el build
const PRECACHE_MANIFEST = self.__WB_MANIFEST;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // De momento no interceptamos las peticiones de la API.
});