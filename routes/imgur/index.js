var express = require('express');
var request = require('request');
var path = require('path');
var common = require(path.resolve(process.cwd(), 'routes/common'));

var imgurApp = express();

imgurApp.get('/imgur/:resource', (req, res) => {
    const imageId = req.params.resource;

    console.log(`Imgur: request for ${imageId}`);
    // Ideally, I would stream all of this while also checking the error code to render error page
    // But it seems like request lib waits for entire response when using the onResponse handler
    const imgurRequest = request.get(`https://i.imgur.com/${imageId}`);
    imgurRequest.on('error', err => common.respondError(err, res));
    imgurRequest.pipe(res);
});

module.exports = imgurApp;
