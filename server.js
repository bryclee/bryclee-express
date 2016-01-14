var express = require('express');
var app = express();

// Set up static to read .build files
app.use(express.static('.build'))

// Set up templating
app.set('view engine', 'ejs');

// Base route
app.get('/', function(req, res) {
  res.render('index')
})
