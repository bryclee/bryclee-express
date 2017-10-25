var app = require('./server.js');

var server = app.listen(process.env.PORT || 8000, function() {
  var addr = server.address();
  console.log('Server listening on', addr.address, addr.port);
});
