var express = require('express');
var indexApp = express();

var routes = [
    require('./index/index'),
    require('./imgur'),

    // All else fails, return a 404
    require('./404')
];

routes.forEach(route => indexApp.use(route));

module.exports = indexApp;
