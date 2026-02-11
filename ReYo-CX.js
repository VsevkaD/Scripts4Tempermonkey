// ==UserScript==
// @name           ReYo+CX
// @namespace      https://github.com/VsevkaD/Scripts4Tempermonkey
// @version        1.0.0
// @description    Вставка плеера из CX в ReYo

// @author         vsevkad
// @author         нейрослоп

// @updateURL      https://raw.githubusercontent.com/VsevkaD/Scripts4Tempermonkey/main/ReYo-CX.js
// @downloadURL    https://raw.githubusercontent.com/VsevkaD/Scripts4Tempermonkey/main/ReYo-CX.js

// @match          https://reyohoho.serv00.net/*
// ==/UserScript==

(function() {
    'use strict';

    let lastId = null;
    let iframe = null;

    function createOrUpdatePlayer(filmId) {
        const target = document.querySelector(
            "#app > div.router-view-container > div > div > div > div.additional-info"
        );
        if (!target) return false;

        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "kp";
            iframe.setAttribute("data-kinopoisk", filmId);
            iframe.allowFullscreen = true;

            // Ширина в процентах от родительского блока
            iframe.style.width = "65%";
            iframe.style.height = "auto"; // высота остаётся фиксированной или пропорциональной можно менять
            iframe.style.aspectRatio = "16 / 9"; // сохраняем пропорции
            iframe.style.display = "block";
            iframe.style.margin = "10px auto";

            target.appendChild(iframe);
        }

        iframe.src = "https://ddbb.lol?id=" + filmId + "&n=0";
        iframe.setAttribute("data-kinopoisk", filmId);
        return true;
    }

    function checkFilmPage() {
        const match = location.href.match(/movie\/(\d+)/);
        if (!match) {
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
            lastId = null;
            return;
        }

        const filmId = match[1];
        if (filmId === lastId) return;
        lastId = filmId;

        if (!createOrUpdatePlayer(filmId)) {
            const observer = new MutationObserver((mutations, obs) => {
                if (createOrUpdatePlayer(filmId)) {
                    obs.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkFilmPage();
        }
    });
    urlObserver.observe(document, { subtree: true, childList: true });

    checkFilmPage();
})();
