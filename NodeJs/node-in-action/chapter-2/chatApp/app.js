const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const { send404, sendFile } = require('./controller');
var chatServer = require('./lib/chat_server'); // SOCKET IO SERVER
let cache = {};  // cache for cached files 

function serveStaticFile(res, absPath) {
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, exists => {
            if (exists) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(res);
                    } else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                });
            }
            else send404(res)
        })
    }
}

let server = http.createServer((req, res) => {

    let filePath = ''
    const { url } = req;
    if (url === '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + url;
    }


    const absPath = path.join(__dirname, filePath);
    serveStaticFile(res, absPath);

})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
})

chatServer.listen(server)
