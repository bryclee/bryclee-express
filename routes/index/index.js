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

const indexPath = path.resolve(__dirname, 'index.ejs');

indexApp.get('/', (req, res) => {
  sendWhenRendered(res, renderMaster({
    templatePath: indexPath,
    templateData: SAMPLE_MODEL
  }));
});

indexApp.get('/sudoku', (req, res) => {
  sendWhenRendered(res, renderMaster({
    title: 'Sudoku',
    template: '<sudoku-main-box></sudoku-main-box>',
    styles: ['static/css/sudoku/sudoku.css'],
    scripts: ['/static/js/polyfill.bundle.js', '/static/js/sudoku.bundle.js']
  }));
});

module.exports = indexApp;
