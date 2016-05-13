var express = require('express');
var app = express();

var ejs = require('ejs');

// Import subapps
var index = require('./routes/index/route');

var VIEW_DIR = 'public/templates';

// Set up static to read .build files
app.use(express.static('.build'))

// Set up templating
app.set('views', VIEW_DIR);
app.set('view engine', 'ejs');

// Cache the master template for subapps to use

// Base route
// app.get('/', index);
app.use(index);

module.exports = app;
