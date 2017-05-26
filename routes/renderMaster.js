var ejs = require('ejs');
var path = require('path');
var extend = require('util')._extend;
var promisify = require(path.join(process.cwd(), 'lib/promisify'));

var renderFilePromise = promisify(ejs.renderFile);

module.exports = (data, options) => {
    return renderFilePromise(
        path.join(__dirname, 'master.ejs'),
        {
            title: data.title || 'bryclee',
            style: data.style || 'static/css/app.css',
            contentUri: data.contentUri,
            contentData: data.contentData
        },
        extend({

        }, options)
    );
};
