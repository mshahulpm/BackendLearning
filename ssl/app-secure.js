const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('mongodb.key'),
    cert: fs.readFileSync('mongodb.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("<h1>welcome to secure server</h1>hello world\n");
}).listen(8000, () => console.log('server is available at https://localhost:8000'));