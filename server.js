const http = require('http');
const fs = require('fs');
const path = require('path');

const handlePublic = (request, response, endpoint) => {
  const extension = endpoint.split('.')[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/js",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png"
  };
  fs.readFile(__dirname + '/public/' + endpoint, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>404 not found</h1>')
    } else {
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
}

const handler = (request, response) => {
  const endpoint = request.url;
  const method = request.method;

  if (endpoint === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(__dirname + '/public/index.html', function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === '/node') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("This is the node page");
    response.end();
  } else if (endpoint === '/girls') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("This is the girls page");
    response.end();
  } else {
    handlePublic(request, response, endpoint);
  }
}

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});