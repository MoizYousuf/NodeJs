let http = require('http');
let app = require('./app');

http.createServer(app.handleRequest).listen(8000)