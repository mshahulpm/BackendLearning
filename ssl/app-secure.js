const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('mongodb.key'),
    cert: fs.readFileSync('mongodb.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(443);