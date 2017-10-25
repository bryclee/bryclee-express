'use strict';

var WordBanner = require('./name/index.js');

var bannerElement = document.querySelector('#header-banner');
var banner = new WordBanner(bannerElement);
var hasReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion)').matches;

banner.setWordList([
  'bl', 'bryclee', 'bryan c lee', 'cats are cool', 'so are dogs'
]);

if (!hasReducedMotion) {
    banner.rotateWords(2000);
}

