var express = require('express');
var ejs = require('ejs');
var path = require('path');
var common = require(path.resolve(process.cwd(), 'routes/common'));
var { renderMaster, sendWhenRendered } = common;

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

indexApp.get('/', (req, res) => {
  sendWhenRendered(res, renderMaster({
    contentUri: path.resolve(__dirname, 'index.ejs'),
    contentData: SAMPLE_MODEL
  }));
});

indexApp.get('/sudoku', (req, res) => {
  sendWhenRendered(res, renderMaster({
    title: 'Sudoku',
    style: 'static/css/sudoku/sudoku.css',
    contentUri: path.resolve(__dirname, 'sudoku.ejs'),
    contentData: {}
  }));
});

module.exports = indexApp;
