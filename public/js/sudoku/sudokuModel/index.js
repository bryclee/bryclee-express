'use strict';

import 'angular';
import { createArray, convertToMainSub, convertToXY } from 'sudoku/utils/index';

function getAllCoords(coord1) {
  var x, y, main, sub;

  if (angular.isDefined(coord1.x) && angular.isDefined(coord1.y)) {
    ({ x, y } = coord1);
    ({ main, sub } = convertToMainSub(coord1.x, coord1.y));
  } else if (angular.isDefined(coord1.main) && angular.isDefined(coord1.sub)) {
    ({ main, sub } = coord1);
    ({ x, y } = convertToXY(coord1.main, coord1.sub));
  } else {
    return {}; // return error?
  }

  return {x, y, main, sub};
}

angular.module('sudokuModel', [])
  .factory('sudokuModel', [function() {
    // Returns a constructor for sudoku model, which manages data and validation.
    // Should be instantiated using 'new' constructor.

    var SudokuModel = function() {
      this.init();
    };

    SudokuModel.prototype.init = function() {
      this.values = createArray(9, () => {
        return createArray(9, 0);
      });
    };

    /*
      Update values in model
      Params:
        value,
        coords: {
          x,y or main,sub coordinates
        }
    */
    SudokuModel.prototype.update = function(value, coord) {
      var {x, y} = getAllCoords(coord);

      this.values[y][x] = value;
      return {value: value, x: x, y: y};
    };

    /*
      Delete value in model
      Params:
       coords: { x,y or main,sub coordinates }
    */
    SudokuModel.prototype.delete = function(coord) {
      var {x, y} = getAllCoords(coord);

      this.values[y][x] = 0;
      return {value: 0, x: x, y: y};
    };

    SudokuModel.prototype.validate = function() {
      var createObject = function() { return {} };
      var rows = createArray(9, createObject);
      var columns = createArray(9, createObject);
      var subs = createArray(9, createObject);
      var invalidPositions = [];

      // Count up the rows and look for duplicates
      this.values.forEach(function(row, rowIdx) {
        row.forEach(function(val, colIdx) {
          if (!val) {
            return;
          }

          var {main} = convertToMainSub(colIdx, rowIdx);
          var pos = [colIdx, rowIdx];

          // Check for duplicates
          if (rows[rowIdx][val] || columns[colIdx][val] || subs[main][val]) {
            var prevRow = rows[rowIdx][val];
            var prevCol = columns[colIdx][val];
            var prevSub = subs[main][val];

            if (prevRow && !invalidPositions.includes(prevRow[0])) invalidPositions.push(prevRow[0]);
            if (prevCol && !invalidPositions.includes(prevCol[0])) invalidPositions.push(prevCol[0]);
            if (prevSub && !invalidPositions.includes(prevSub[0])) invalidPositions.push(prevSub[0]);

            invalidPositions.push(pos);
          }

          // Store the positions of the numbers so we can match duplicates
          rows[rowIdx][val] ? rows[rowIdx][val].push(pos) : (rows[rowIdx][val] = [pos]);
          columns[colIdx][val] ? columns[colIdx][val].push(pos) : (columns[colIdx][val] = [pos]);
          subs[main][val] ? subs[main][val].push(pos) : (subs[main][val] = [pos]);
        });
      });

      return invalidPositions;
    };

    return SudokuModel;
  }]);

