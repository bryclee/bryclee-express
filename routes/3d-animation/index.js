var express = require('express');
var path = require('path');
var { sendWhenRendered, renderMaster } = require(path.resolve(process.cwd(), 'routes/common.js'));

var app = express();

app.get('/3d-animation', function(req, res) {
    sendWhenRendered(res, renderMaster({
        title: '3d-animation',
        styles: ['static/css/3d.css'],
        scripts: ['static/js/3d.js'],
        templatePath: path.resolve(__dirname, 'index.ejs')
    }));
});

module.exports = app;
