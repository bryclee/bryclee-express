var express = require('express');
var indexApp = express();

var routes = [
    require('./index/index'),
    require('./imgur')
];

routes.forEach(route => indexApp.use(route));

module.exports = indexApp;
