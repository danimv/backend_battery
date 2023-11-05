const net = require('net');

function findAvailablePort(startPort, endPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1, endPort).then(resolve);
      } else {
        reject(err);
      }
    });

    server.on('listening', () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });

    server.listen(startPort);
  });
}

exports.findAvailablePort = findAvailablePort; 
// Usage

