// ==UserScript==
// @name         FocusChatBox
// @version      2024-08-28
// @description  click on chat box - hotkey
// @updateURL      https://raw.githubusercontent.com/vsevkad/Scripts4Tempermonkey/main/FocusChatBox.js
// @downloadURL    https://raw.githubusercontent.com/vsevkad/Scripts4Tempermonkey/main/FocusChatBox.js

// @match  https://www.twitch.tv/*
// @match else
// ==/UserScript==

(function() {
    'use strict';

    const FocusKey = 'tab';

    document.addEventListener('keydown', function(event) {
        const chatBox = document.querySelector('div[role="textbox"][data-a-target="chat-input"]');

        if (event.key.toLowerCase() === FocusKey) {
            if (chatBox && document.activeElement !== chatBox) {
                // focus (if unfocused)
                chatBox.focus();
                event.preventDefault();
                console.log('Chat box focused');
            }
        } else if (event.key === 'Escape') {
            if (chatBox && document.activeElement === chatBox) {
                // unfocus
                chatBox.blur();
                console.log('Chat box unfocused');
            }
        }
    });
})();
