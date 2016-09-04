'use strict';

import 'angular';
import 'sudoku/sudokuFocus/index';
import 'sudoku/sudokuKeycodes/index';
import template from './template.html';

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
        template: template,
        scope: {
          'mainIndex': '@',
          'subIndex': '@',
          'onChange': '&',
          'navigate': '&',
          'focused': '=',
          'invalid': '='
        },
        link: function(scope, element, attrs) {
          var navigate = scope.navigate;

          function updateValue(value) {
            scope.onChange({value: value, main: parseInt(scope.mainIndex), sub: parseInt(scope.subIndex)});
          };

          scope.keyHandler = function(e) {
            var key = e.keyCode;
            var main = parseInt(scope.mainIndex);
            var sub = parseInt(scope.subIndex);

            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
              return;
            }
            // If is a value
            if (key >= KEYS['1'] && key <= KEYS['9']) {
              scope.value = key - 48;
              updateValue(scope.value);
            }
            // If is a navigation key
            switch (key) {
              case KEYS.LEFT:
              case KEYS.UP:
              case KEYS.RIGHT:
              case KEYS.DOWN:
                navigate({dir:key, main:main, sub:sub});
                break;
              case KEYS.BKSP:
                scope.value = '';
                updateValue(null);
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
