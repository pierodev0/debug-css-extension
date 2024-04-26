// ==UserScript==
// @name Debug CSS Outline
// @namespace http://tampermonkey.net/
// @version 0.1
// @description Adds a blue 1px solid outline to all elements on a page for CSS debugging
// @author Your Name
// @match *://*/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    var isOutlineEnabled = localStorage.getItem('isOutlineEnabled') === 'true';

    if (isOutlineEnabled) {
        style.innerHTML = '* { outline: 1px solid blue !important; }';
    }

    document.head.appendChild(style);

    var button = document.createElement('button');
    button.innerHTML = ' CSS';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.backgroundColor = "gray"; // Corregido
    button.style.padding = "2px 5px"; // Corregido
    button.style.color = "white"; // Corregido
    button.style.border = "none";

    button.addEventListener('click', function() {
        if (style.innerHTML === '') {
            style.innerHTML = '* { outline: 1px solid blue !important; }';
            localStorage.setItem('isOutlineEnabled', 'true');
        } else {
            style.innerHTML = '';
            localStorage.setItem('isOutlineEnabled', 'false');
        }
    });

    document.body.appendChild(button);
})();
