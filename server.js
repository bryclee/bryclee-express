var express = require('express');
var app = express();

var ejs = require('ejs');

// Import subapps
var index = require('./routes');

var VIEW_DIR = 'public/templates';

// If running local dev mode, add the webpack dev middleware
if (process.env.NODE_ENV === 'dev') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/static/js/'
  }));
}

// Set up static to read .build files
app.use('/static', express.static('.build'))

// Set up templating
app.set('views', VIEW_DIR);
app.set('view engine', 'ejs');

// Cache the master template for subapps to use

// Base route
// app.get('/', index);
app.use(index);

module.exports = app;
