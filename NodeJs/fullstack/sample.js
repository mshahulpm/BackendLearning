const http = require('http');
(async () => {

    await http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
    <p>lalllalalalallalaallaallalal</p>
    <p>lalllalalalallalaallaallalal</p>
    <p>lalllalalalallalaallaallalal</p>
    `)
        res.end()
    }).listen(8080);

    http.get('http://localhost:8080/', function (res, err) {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);

        let data = '';
        let chunkCount = 0;

        res.on('data', function (chunk) {
            chunkCount++;
            data += chunk.toString();
        });

        res.on('end', function () {
            // console.log(data);
            console.log('end');
        });

        res.on('error', function (err) {
            console.log(err);
        });

    }).on('error', function (e) {
        console.log(e.message);
    }).end();
}
)()
