importScripts('./sw/workbox-sw.js');
self.addEventListener('error', function(e) {
    self.clients.matchAll()
        .then(function (clients) {
            if (clients && clients.length) {
                clients[0].postMessage({
                    type: 'ERROR',
                    msg: e.message || null,
                    stack: e.error ? e.error.stack : null
                });
            }
        });
});

self.addEventListener('unhandledrejection', function(e) {
    self.clients.matchAll()
        .then(function (clients) {
            if (clients && clients.length) {
                clients[0].postMessage({
                    type: 'REJECTION',
                    msg: e.reason ? e.reason.message : null,
                    stack: e.reason ? e.reason.stack : null
                });
            }
        });
})

workbox.setConfig({
    debug: false,
    modulePathPrefix: 'http://localhost:9304/'
});
self.skipWaiting = function(){
    console.log('skipWaiting')

}
workbox.skipWaiting();

self.clientsClaim = function() {
    console.log('clientsClaim')
}
workbox.clientsClaim();


var cacheList = [
    '/',
    '/index.html',
    encodeURI('/小米_百度搜索.html')
];
var cacheHost = [
    '127.0.0.1',
    'localhost'
]

workbox.routing.registerRoute(
    function(event) {
        let isHtml = /https?.*(?=\.(html))/.test(event.url.href)
        console.log(isHtml,event.url.href   )
        // 需要缓存的HTML路径列表
        if (isHtml && cacheHost.indexOf(event.url.host)) {
            console.log(event.url.pathname)
            if (~cacheList.indexOf(event.url.pathname)) return true;
            else return false;
        } else {
            return false;
        }
    },
    workbox.strategies.networkFirst({
        cacheName: 'OCJ:html',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10
            })
        ]
    })
);

workbox.routing.registerRoute(
    function(event) {
        return /https?.*(?=\.(css|txt|js|jsp))/.test(event.url.href)
    },
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'OCJ:static',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20
            })
        ]
    })
);

workbox.routing.registerRoute(
    function(event) {
        return /https?.*(?=\.(gif|jpg|png|jpeg))/.test(event.url.href)
    },
    workbox.strategies.cacheFirst({
        cacheName: 'OCJ:img',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60
            })
        ]
    })
);


