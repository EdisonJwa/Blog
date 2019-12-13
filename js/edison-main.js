if (window.location.hostname == 'i.yecdn.com' ){
var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
var WebpName = "!/format/webp";

if (isSupportWebp) {
    for (var i = 0; i < document.querySelectorAll("div[data-bg]").length; i += 1) {
        var originSrc = document.querySelectorAll("div[data-bg]")[i].getAttribute('data-bg'),
            newSrc = originSrc.replace(/((.png)|(.jpg)|(.jpeg))/g, '$1' + WebpName);
        document.querySelectorAll("div[data-bg]")[i].setAttribute('data-bg', newSrc)
    }

    for (var i = 0; i < document.querySelectorAll("div[data-src]").length; i += 1) {
        var originSrc = document.querySelectorAll("div[data-src]")[i].getAttribute('data-src'),
            newSrc = originSrc.replace(/((.png)|(.jpg)|(.jpeg))/g, '$1' + WebpName);
        document.querySelectorAll("div[data-bg]")[i].setAttribute('data-bg', newSrc)
    }

    for (var i = 0; i < document.querySelectorAll("img[data-src]").length; i += 1) {
        var originSrc = document.querySelectorAll("img[data-src]")[i].getAttribute('data-src'),
            newSrc = originSrc.replace(/((.png)|(.jpg)|(.jpeg))/g, '$1' + WebpName);
        document.querySelectorAll("img[data-src]")[i].setAttribute('data-src', newSrc)
    }
}
}
