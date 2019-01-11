// ==UserScript==
// @name        Terminator
// @description Terminator - Chat optimizator
// @author      Semanticworld
// @version     0.0.0.9
// @updateURL   https://github.com/Semanticworld/terminator/raw/master/terminator.user.js
// @icon        https://github.com/Semanticworld/terminator/raw/master/assets/ico/ico128.png
// @icon64      https://github.com/Semanticworld/terminator/raw/master/assets/ico/ico64.png
// @namespace   https://livacha.com/
// @match       https://livacha.com/chat/*
// @match       https://dropmefiles.com/*
// @connect     livacha.com
// @connect     dropmefiles.com
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==
(function () {
    'use strict';

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }

    function LoadSelectedTerminator(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.text = xhr.responseText;
                    document.body.appendChild(script);
                }
            }
        };
        xhr.send(null);
    }
    var home = "https://github.com/Semanticworld/terminator/raw/master/assets/js/";
    var dom = getHostName(document.location.href);
    switch (dom) {
        case 'livacha.com':
            LoadSelectedTerminator(home + "livacha.js?r=" + Math.random());
            break;
        case 'marshat.com':
            LoadSelectedTerminator(home + "marshat.js?r=" + Math.random());
            break;
    }
})();