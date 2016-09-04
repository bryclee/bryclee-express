'use strict';

module.exports = {
  /**
   *  Takes coordinates organized by main and sub-index and converts into x and y
   */
  convertToXY(main, sub) {
    return {
      x: ((main) % 3) * 3 + (sub) % 3,
      y: Math.floor((main) / 3) * 3 + Math.floor((sub) / 3)
    };
  },

  /**
   *  Converts x,y coordinate to main, sub-index coordinates
   *  eg: 0,0 -> 0,0
   *      0,3 -> 1,0
   *      0,4 -> 1,1
   *      3,0 -> 4,0
   */
  convertToMainSub(x, y) {
    return {
      main: Math.floor(x / 3) + 3 * Math.floor((y) / 3),
      sub: ((x) % 3) + ((y) % 3) * 3
    };
  },

  /*
    Create an array of n length with each index === value, or value() if a function
  */
  createArray(n, value) {
    return Array.apply(null, Array(n)).map((a, idx) => {
      if (typeof value === 'function') {
        return value(idx);
      }
      return value;
    });
  }
}
