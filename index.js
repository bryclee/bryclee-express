var app = require('./server');

var server = app.listen(8000, function() {
  var addr = server.address();
  console.log('Server listening on', addr.address, addr.port);
});
