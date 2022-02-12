const fs = require('fs');

// const rs = fs.createReadStream('./chunk.html');

// rs.on('open', function () {
//     console.log('The file is open');
// })
// let data = ''
// let chunkCount = 0;
// rs.on('data', function (chunk) {
//     console.log(++chunkCount);
//     if (!data) data += chunk.toString();
// })

// rs.on('end', function () {
//     console.log(data.length);
// })

// rs.close()

// fs.readFile('./chunk.html', function (err, data) {
//     console.log(data.length);
// }) 
const http = require('http');
const events = require('events');
const eventEmitter = new events.EventEmitter();

//  event handler
const myEventHandler = function () {
    console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);

http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Hello World</h1>');
            break
        case '/scream':
            eventEmitter.emit('scream');
            res.end('<h1>I hear a scream!</h1>');
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
    }
}).listen(8080);
