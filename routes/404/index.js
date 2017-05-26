var error404App = require('express')();
var common = require(require('path').resolve(process.cwd(), 'routes/common'));

error404App.all('*', (req, res) => {
    common.respond404(res);
});

module.exports = error404App;
