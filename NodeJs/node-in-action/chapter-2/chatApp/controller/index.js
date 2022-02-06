const path = require('path');
const mime = require('mime');

//  404 
function send404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Error 404: Resource Not Found</h1>');
    res.end();
}


// send file 
function sendFile(res, filePath, fileContent) {
    res.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) });
    res.end(fileContent);
}


module.exports = {
    send404,
    sendFile
}
