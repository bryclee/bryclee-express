'use strict';

// Promisifies a function that has a node-style callback
module.exports = function promisify(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
      // Handler function for the node function
      args.push(function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fn.apply(null, args);
    });
  }
};
