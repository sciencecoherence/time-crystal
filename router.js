// portal/router.js
(function () {
    var w = window.innerWidth || screen.width;
    var hasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    var ua = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    var isMobile = (w < 768) || (hasTouch && w < 1024) || ua;

    // Manual override: localStorage.setItem('sci-coh-layout', 'desktop' | 'mobile')
    var override = localStorage.getItem('sci-coh-layout');
    if (override === 'desktop') isMobile = false;
    if (override === 'mobile') isMobile = true;

    var path = window.location.pathname.replace(/\/+$/, '');
    var routePairs = [
        { desktop: '/main.html', mobile: '/mobile/main.html' },
        { desktop: '/retreat.html', mobile: '/mobile/retreat.html' },
        { desktop: '/tcb.html', mobile: '/mobile/tcb.html' },
        { desktop: '/research/spiritual-entropy.html', mobile: '/mobile/spiritual-entropy.html' }
    ];

    function matchesSuffix(currentPath, suffix) {
        return currentPath === suffix || currentPath.endsWith(suffix);
    }

    var pair = routePairs.find(function (entry) {
        return matchesSuffix(path, entry.desktop) || matchesSuffix(path, entry.mobile);
    });

    if (!pair) return;

    var onMobilePath = matchesSuffix(path, pair.mobile);
    var currentSuffix = onMobilePath ? pair.mobile : pair.desktop;
    var desiredSuffix = isMobile ? pair.mobile : pair.desktop;

    if (currentSuffix === desiredSuffix) return;

    var basePath = path.slice(0, path.length - currentSuffix.length);
    var query = window.location.search || '';
    var hash = window.location.hash || '';
    window.location.replace(basePath + desiredSuffix + query + hash);
})();
