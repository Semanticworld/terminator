// ==UserScript==
// @name        Terminator
// @description Terminator - chat optimizator
// @author      Semanticworld
// @version     0.0.0.2
// @updateURL   https://github.com/Semanticworld/terminator/raw/master/terminator.user.js
// @namespace   https://livacha.com/
// @match       https://livacha.com/chat/*
// @match       https://dropmefiles.com/*
// @connect     livacha.com
// @connect     dropmefiles.com
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==
(function() {
    'use strict';
        function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }
    var dom = getHostName(document.location.href);
    console.log("test good");
});