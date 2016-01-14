'use strict';

import 'angular';
import 'sudoku/sudokuFocus/index';
import 'sudoku/sudokuKeycodes/index';

angular
  .module('sudokuSingleBox', [
    'sudokuFocus',
    'sudokuKeycodes'
  ])
  .directive('sudokuSingleBox', [
    'sudokuKeycodes',
    function(KEYS) {

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/sudoku/sudokuSingleBox/template.html',
        scope: {
          'mainIndex': '@',
          'subIndex': '@',
          'onChange': '&',
          'navigate': '&',
          'focused': '='
        },
        link: function(scope, element, attrs) {
          var navigate = scope.navigate;

          function updateValue(value) {
            console.log(scope.mainIndex, attrs.mainIndex);
            scope.onChange({value: value, main: parseInt(scope.mainIndex), sub: parseInt(scope.subIndex)});
          };

          scope.keyHandler = function(e) {
            var key = e.keyCode;
            var main = parseInt(scope.mainIndex);
            var sub = parseInt(scope.subIndex);

            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
              return;
            }

            if (key >= KEYS['0'] && KEYS['9']) {
              scope.value = key - 48;
              updateValue(scope.value);
            }
            switch (key) {
              case KEYS.LEFT:
              case KEYS.UP:
              case KEYS.RIGHT:
              case KEYS.DOWN:
                navigate({dir:key, main:main, sub:sub});
                break;
              case KEYS.BKSP:
                scope.value = '';
                break;
              case KEYS.TAB:
                return;
              default:
                break;
            }
            e.preventDefault();
          };
        }
      };
    }]);
