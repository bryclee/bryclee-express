var app = require('./server');

var server = app.listen(process.env.PORT, function() {
  var addr = server.address();
  console.log('Server listening on', addr.address, addr.port);
});
