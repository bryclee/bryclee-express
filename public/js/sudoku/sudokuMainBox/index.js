'use strict';

import 'angular';
import 'sudoku/sudokuSingleBox/index';
import 'sudoku/sudokuModel/index';
import 'sudoku/sudokuKeycodes/index';
import { createArray, convertToXY, convertToMainSub } from 'sudoku/utils/index'
import template from './template.html';

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
        template: template,
        link: function(scope, element, attrs) {

          const valueModel = new SudokuModel();
          let prevInvalids = []; // Previous invalid values to reset when updating

          // The view models for the sudoku boxes. Use main/sub format
          scope.viewModels = createArray(9, (main) => {
            return createArray(9, (sub) => {
              return {
                main: main,
                sub: sub,
                invalid: false
              };
            });
          });

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
            if (value) {
              valueModel.update(value, {main: main, sub: sub});
            } else {
              valueModel.delete({main: main, sub: sub});
            }

            revalidate();
          };
          
          // Revalidate the model and view
          function revalidate() {
            var invalid = valueModel.validate();
            
            prevInvalids.forEach((item) => {
              var { main: prevMain, sub: prevSub } = convertToMainSub.apply(null, item);

              scope.viewModels[prevMain][prevSub].invalid = false;
            });

            invalid.forEach((invalidItem) => {
              var { main: invMain, sub: invSub } = convertToMainSub.apply(null, invalidItem);

              scope.viewModels[invMain][invSub].invalid = true;
            });

            prevInvalids = invalid;
          }

        }
      };
    }
  ]);
