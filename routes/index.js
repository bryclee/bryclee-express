var express = require('express');
var indexApp = express();

var routes = [
    require('./index/index.js'),
    require('./imgur'),
    require('./3d-animation'),
    // All else fails, return a 404
    require('./404')
];

// For debugging
indexApp.use((req, res, next) => {
    console.log(`[${req.method}]: ${req.originalUrl}`);
    next();
});

routes.forEach(route => indexApp.use(route));

module.exports = indexApp;
