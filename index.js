// Import http module 
const http = require('http')

/* Declare an http server
http.createServer(function(req, res){

    // Write a response header
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Writ a response content
    res.end('Hello World\n');

// Start the server
}).listen(8080)*/

/* Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'*/

const handles = require('./handles')
const server = http.createServer(handles.serverHandle);
server.listen(8080)