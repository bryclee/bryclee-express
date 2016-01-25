var express = require('express');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var promisify = require('../../lib/promisify');

var indexApp = express();

// Sample data
var SAMPLE_MODEL = {
  posts: [
    {
      title: 'Hello',
      text: 'First post goes here',
      tags: ['Tags', 'Go here']
    },
    {
      title: 'Hello again',
      text: 'Second post goes here',
      tags: []
    }
  ]
}

// Promise interface for readFile
var readPromise = promisify(fs.readFile);

indexApp.get('/', function(req, res) {
  Promise.all([
    readPromise(path.resolve(__dirname, 'index.ejs'), 'utf-8'),
    readPromise(path.resolve(__dirname, '../master.ejs'), 'utf-8')
  ]).then((templs) => {
    res.send(ejs.render(templs[1], {
      title: 'Index',
      style: 'css/app.css',
      content: ejs.render(templs[0], SAMPLE_MODEL)
    }));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = indexApp;
