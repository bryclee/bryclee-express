var server = require('server');

server.listen(8000, function() {
  var addr = server.address();
  console.log('Server listening on', addr.address, addr.port);
});
