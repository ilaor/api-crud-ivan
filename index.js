const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world\n');
}).listen(8080);

console.log('Servidor ejecutándose en http://localhost:8080');
