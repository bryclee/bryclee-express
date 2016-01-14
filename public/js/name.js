'use strict';

var WordBanner = require('./name/index');

var banner = new WordBanner(document.querySelector('#header-banner'));
banner.wordList = [
  'bl', 'bryclee', 'bryan c lee', 'cats are cool', 'so are dogs'
];
banner.rotateWords(2000);
