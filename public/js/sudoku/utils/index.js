'use strict';

module.exports = {
  convertToXY: function(main, sub) {
    // Takes coordinates organized by main and sub-index and converts into x and y
    return {
      x: ((main - 1) % 3) * 3 + (sub - 1) % 3 + 1,
      y: Math.floor((main - 1) / 3) * 3 + Math.floor((sub - 1) / 3) + 1
    };
  },

  convertToMainSub: function(x, y) {
    // Converts x,y coordinate to main, sub-index coordinates
    return {
      main: Math.ceil(x / 3) + 3 * Math.floor((y - 1) / 3),
      sub: ((x - 1) % 3 + 1) + ((y - 1) % 3) * 3
    };
  }
}
