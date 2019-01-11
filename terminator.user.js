// ==UserScript==
// @name        Terminator
// @description Terminator - chat optimizator
// @author      Semanticworld
// @version     0.0.0.1
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
    var dom = getHostName(document.location.href);
    console.log("test good");
});