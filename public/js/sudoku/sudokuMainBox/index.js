'use strict';

import 'angular';
import 'sudoku/sudokuSingleBox/index';
import 'sudoku/sudokuModel/index';
import 'sudoku/sudokuKeycodes/index';
import {convertToXY, convertToMainSub} from 'sudoku/utils/index'

angular
  .module('sudokuMainBox', [
    'sudokuSingleBox',
    'sudokuModel',
    'sudokuKeycodes'
  ])
  .directive('sudokuMainBox', [
    'sudokuModel',
    'sudokuKeycodes',
    function(SudokuModel, KEYS) {

      return {
        restict: 'E',
        templateUrl: 'js/sudoku/sudokuMainBox/template.html',
        link: function(scope, element, attrs) {

          var valueModel = new SudokuModel();

          scope.mainSelect = null;
          scope.subSelect = null;

          function setSelect(main, sub) {
            scope.mainSelect = main;
            scope.subSelect = sub;
          }

          // Change the current selected indexes based on arrow key pressed
          scope.navigator = function(dir, main, sub) {
            switch (dir) {
              case KEYS.LEFT:
                if (sub % 3 === 0) {
                  if (main % 3 === 0) {
                    return;
                  } else {
                    setSelect(main - 1, sub + 2);
                  }
                } else {
                  setSelect(main, sub - 1);
                }
                break;
              case KEYS.UP:
                if (Math.floor(sub / 3) === 0) {
                  if (Math.floor(main / 3) === 0) {
                    return;
                  } else {
                    setSelect(main - 3, sub + 6);
                  }
                } else {
                  setSelect(main, sub - 3);
                }
                break;
              case KEYS.RIGHT:
                if (sub % 3 === 2) {
                  if (main % 3 === 2) {
                    return;
                  } else {
                    setSelect(main + 1, sub - 2);
                  }
                } else {
                  setSelect(main, sub + 1);
                }
                break;
              case KEYS.DOWN:
                if (Math.floor(sub / 3) === 2) {
                  if (Math.floor(main / 3) === 2) {
                    return;
                  } else {
                    setSelect(main + 3, sub - 6);
                  }
                } else {
                  setSelect(main, sub + 3);
                }
                break;
            }
          };

          // Callback function passed to singleBox
          scope.updateValue = function(value, main, sub) {
            //change value
            console.log({main:main, sub:sub, value:value});
            var val = valueModel.update(value, {main:main, sub:sub});
            console.log(valueModel.values, val);
            valueModel.validate();
          };

        }
      };
    }
  ]);
