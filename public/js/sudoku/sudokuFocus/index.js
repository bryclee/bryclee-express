'use strict';

import 'angular';

angular.module('sudokuFocus', [])
  .directive('sudokuFocus', ['$timeout', function($timeout) {
    // Focus directive
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        scope.$watch(attrs.sudokuFocus, (val) => {
          if (angular.isDefined(val) && val) {
            $timeout(() => { element[0].focus() });
          }
        });

        element.on('blur', () => {
          if (angular.isDefined(attrs.sudokuBlur)) {
            scope.$apply(attrs.sudokuBlur);
          }
        });

        scope.$on('$destroy', () => {
          console.log('scope destroyed, unregistering');
          element.off('blur');
        });
      }
    };
  }]);
