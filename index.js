// ==UserScript==
// @name Debug CSS Outline
// @namespace http://tampermonkey.net/
// @version 0.2
// @description Adds a customizable outline to all elements on a page for CSS debugging
// @author Your Name
// @match *://*/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    // Recuperar valores guardados
    const savedColor = localStorage.getItem('outlineColor') || '#0000ff';
    const isOutlineEnabled = localStorage.getItem('isOutlineEnabled') === 'true';

    // Crear elementos de la UI
    const container = document.createElement('div');
    const style = document.createElement('style');
    const button = document.createElement('button');
    const colorPicker = document.createElement('input');

    // Configurar el contenedor
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        gap: 5px;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 5px;
        border-radius: 4px;
    `;

    // Configurar el color picker
    colorPicker.type = 'color';
    colorPicker.value = savedColor;
    colorPicker.style.cssText = `
        width: 30px;
        height: 30px;
        padding: 0;
        border: none;
        cursor: pointer;
    `;

    // Configurar el botón
    button.innerHTML = 'CSS';
    button.style.cssText = `
        padding: 5px 10px;
        color: white;
        background-color: gray;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
    `;

    // Aplicar outline si estaba activado
    if (isOutlineEnabled) {
        style.innerHTML = `* { outline: 1px solid ${savedColor} !important; }`;
    }

    // Event listeners
    colorPicker.addEventListener('change', function(e) {
        const newColor = e.target.value;
        localStorage.setItem('outlineColor', newColor);
        if (style.innerHTML !== '') {
            style.innerHTML = `* { outline: 1px solid ${newColor} !important; }`;
        }
    });

    button.addEventListener('click', function() {
        if (style.innerHTML === '') {
            style.innerHTML = `* { outline: 1px solid ${colorPicker.value} !important; }`;
            localStorage.setItem('isOutlineEnabled', 'true');
        } else {
            style.innerHTML = '';
            localStorage.setItem('isOutlineEnabled', 'false');
        }
    });

    // Agregar elementos al DOM
    document.head.appendChild(style);
    container.appendChild(colorPicker);
    container.appendChild(button);
    document.body.appendChild(container);
})();
