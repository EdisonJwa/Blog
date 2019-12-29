const workboxVersion = '4.3.1';
importScripts(`https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/workbox-sw.js`);
workbox.setConfig({
    modulePathPrefix: `https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/`
});
let cacheSuffixVersion = '-190413';
const precacheCacheName = workbox.core.cacheNames.precache,
    runtimeCacheName = workbox.core.cacheNames.runtime,
    maxEntries = 100;
workbox.core.setCacheNameDetails({
    prefix: 'edison-blog',
    suffix: cacheSuffixVersion
});
workbox.precaching.precacheAndRoute(['https://cdn.jsdelivr.net/gh/sukkaw/hexo-theme-suka@latest/source/css/style.min.css', 'https://cdn.jsdelivr.net/gh/sukkaw/hexo-theme-suka@latest/source/img/suka-lazyload.gif', 'https://cdn.jsdelivr.net/gh/sukkaw/hexo-theme-suka@latest/source/js/local-search.min.js', 'https://cdn.jsdelivr.net/gh/sukkaw/hexo-theme-suka@latest/source/js/hanabi-browser.min.js', 'https://cdn.jsdelivr.net/npm/prism-themes@1.1.0/themes/prism-atom-dark.min.css', 'https://cdn.jsdelivr.net/npm/spectre.css@0.5.3', 'https://cdn.jsdelivr.net/npm/prism-themes@1/themes/prism-atom-dark.min.css', 'https://cdn.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.css', 'https://cdn.jsdelivr.net/npm/vanilla-lazyload'], );
workbox.routing.registerRoute(/(.*(?:alicdn|360buyimg|yecdn|joybuy)\.com)|i.loli.net/, new workbox.strategies.CacheFirst({
    cacheName: 'img-cache' + cacheSuffixVersion,
    plugins: [new workbox.expiration.Plugin({
        maxEntries,
        maxAgeSeconds: 30 * 24 * 60 * 60,
    }), new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
    }), ]
}));
workbox.routing.registerRoute(/.*cdn\.jsdelivr\.net/, new workbox.strategies.NetworkFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    plugins: [new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
    }), new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
    }), ]
}));
workbox.routing.registerRoute(/.*fonts\.cdn\.uv\.uy/, new workbox.strategies.NetworkFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    plugins: [new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
    }), new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
    }), ]
}));
workbox.routing.registerRoute(
    new RegExp('^https://pagead2\.googlesyndication\.com'),
    new workbox.strategies.NetworkOnly()
);
workbox.routing.registerRoute(
    new RegExp('^https://ga\.cdn\.uv\.uy'),
    new workbox.strategies.NetworkOnly()
);
workbox.routing.registerRoute(new RegExp('/disqus/(.*)\.json(.*)'), new workbox.strategies.NetworkFirst({
    options: [{
        networkTimeoutSeconds: 3,
    }]
}));
workbox.routing.registerRoute(new RegExp('https://disqus\.api\.opt\.ninja'), new workbox.strategies.NetworkFirst({
    options: [{
        networkTimeoutSeconds: 3,
    }]
}));
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.googleAnalytics.initialize();
workbox.routing.registerRoute(new RegExp('^https://(.*)disqus\.com'), new workbox.strategies.NetworkOnly());
workbox.routing.registerRoute(new RegExp('^https://(.*)disquscdn\.com(.*)(png|jpg|jpeg|svg|gif)'), new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'disqus-img-cache' + cacheSuffixVersion,
    plugins: [new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
    }), new workbox.expiration.Plugin({
        maxEntries,
    }), ],
}));
workbox.routing.registerRoute(new RegExp('^https://(.*)disquscdn\.com'), new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'disqus-cdn-cache' + cacheSuffixVersion,
    plugins: [new workbox.expiration.Plugin({
        maxEntries: 10,
    }), ],
}));
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'img-cache' + cacheSuffixVersion,
}));
workbox.routing.registerRoute(/.*\.(css|js)/, new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-assets-cache',
}));
workbox.routing.registerRoute('/sw.js', new workbox.strategies.StaleWhileRevalidate());
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst({
    options: [{
        networkTimeoutSeconds: 3,
    }]
}));
workbox.core.skipWaiting();
workbox.core.clientsClaim();