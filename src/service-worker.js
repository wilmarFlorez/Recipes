/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])


// workbox.precaching.suppressWarnings()  // Deprecated method from 4.3 workbox version

workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"))

workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
    new workbox.strategies.StaleWhileRevalidate(), 'GET')

workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, 
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }), 'GET')

// Default at the end of the document 
workbox.routing.registerRoute(/^https?.*/,
    new workbox.strategies.NetworkFirst(), 'GET')