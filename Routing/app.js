let url = require('url');
let fs = require('fs');

function renderHtml(path, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(path, null, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('File not Found');
        } else {
            response.write(data)
        }
        response.end()
    })
}
module.exports = {
    handleRequest: function (request, response) {
        let path = url.parse(request.url).pathname;
        switch (path) {
            case '/':
                renderHtml('./index.html', response);
                break;
            case '/login':
                renderHtml('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('route not found')
                response.end()
        }
    }
}