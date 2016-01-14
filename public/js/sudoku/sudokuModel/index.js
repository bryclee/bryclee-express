'use strict';

import 'angular';
import utils from 'sudoku/utils/index';


function createArray(n, value) {
  return Array.apply(null, Array(n)).map(() => {
    if (typeof value === 'function') {
      return value();
    }
    return value;
  });
}

function getAllCoords(coord1) {
  var x, y, main, sub;

  if (angular.isDefined(coord1.x) && angular.isDefined(coord1.y)) {
    ({ x, y } = coord1);
    ({ main, sub } = utils.convertToMainSub(coord1.x, coord1.y));
  } else if (angular.isDefined(coord1.main) && angular.isDefined(coord1.sub)) {
    ({ main, sub } = coord1);
    ({ x, y } = utils.convertToXY(coord1.main, coord1.sub));
  } else {
    return {};
  }

  return coord2;
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

      var createObject = function() { return {} };
      this.rows = createArray(9, createObject);
      this.columns = createArray(9, createObject);
      this.subs = createArray(9, createObject);
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

      this.values.forEach(function(row, rowIdx) {
        row.forEach(function(val, colIdx) {
          var {main} = utils.convertToMainSub(rowIdx + 1, colIdx + 1);
          rows[rowIdx][val] = rows[rowIdx][val] ? rows[rowIdx][val] + 1 : 1;
          columns[colIdx][val] = columns[colIdx][val] ? columns[colIdx][val] : 1;
          subs[main][val] = subs[main][val] ? subs[main][val] + 1 : 1;
        });
      });

      console.log(rows, columns, subs);
    };

    return SudokuModel;
  }]);

