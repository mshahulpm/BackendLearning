const http = require('http');
const urlParser = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;

const server = http.createServer((req, res) => {

    const url = urlParser(req.url, true);
    const path = join(root, url.pathname);
    const stream = fs.createReadStream(path);

    // req.pipe(fs.createWriteStream('./ab.txt'));  // pipe the request to a file

    //  data about the file
    // console.log(fs.stat(path, (e, st) => {
    //     console.log({
    //         e, st
    //     })
    // }));

    stream.on('error', () => {
        res.statusCode = 404;
        res.end('Not Found');
    });

    // stream.on('data', (chunk) => {
    //     res.write(chunk);
    // })

    // stream.on('end', () => {
    //     res.end();
    // })

    // above code is equivalent to below code
    stream.pipe(res);
})


server.listen(3000, () => {
    console.log('server is listening on port 3000');
});

// page no 108