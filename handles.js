const url = require('url')
const qs = require('querystring')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Welcome !</p>' +
'       <p>This is a polite application.' +
'       <p>Add "/hello?name=" with your name to receive a hello from the website.' +
'       <p>If you want to learn more about me, enter my name: Mohamed-Hacene' +
'    </body>' +
'</html>'

module.exports = {
    serverHandle: function (req, res){
    const route = url.parse(req.url)
    const path = route.pathname;
    const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/html'});
    switch (path){
        case '/hello':
            if (params['name'] === 'Mohamed-Hacene'){
                res.write("Hello I'm Mohamed-Hacene, I work in an engineering school and this is my first node.js website !");
            }
            else {
                res.write('Hello ' + params['name']);
            }
            break; 
        case '/':
            res.write(content);
            break;
        default :
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("404 Not Found\n");
            break;
        }
    res.end();
}
}