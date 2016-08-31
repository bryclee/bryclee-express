'use strict';

var expect = require('chai').expect;
var utils = require('../../public/js/sudoku/utils/index');

// apply test case inputs to fn and expect the result
function testFn(fn, testCases) {
  testCases.forEach(function(testCase) {
    var input = testCase.input;
    var expected = testCase.output;

    it(JSON.stringify(input), function() {
      var result = fn.apply(null, input);

      expect(result).to.eql(expected);
    });
  });
}

describe('sudoku utils', function() {
  describe('convertToXY', function() {
    describe('should convert main sub coordinates', function() {
      var result;

      var testCases = [
        {
          input: [0, 0],
          output: {x: 0, y: 0}
        },
        {
          input: [1, 3],
          output: {x: 3, y: 1}
        },
        {
          input: [2, 4],
          output: {x: 7, y: 1}
        },
        {
          input: [8, 8],
          output: {x: 8, y: 8}
        }
      ];

      testFn(utils.convertToXY, testCases);
    });
  });

  describe('convertToMainSub', function() {
    describe('should convert x y coordinates', function() {
      var result;

      var testCases = [
        {
          input: [0, 0],
          output: {main: 0, sub: 0}
        },
        {
          input: [6, 1],
          output: {main: 2, sub: 3}
        },
        {
          input: [2, 4],
          output: {main: 3, sub: 5}
        },
        {
          input: [8, 8],
          output: {main: 8, sub: 8}
        }
      ];

      testFn(utils.convertToMainSub, testCases);
    });
  });
});
