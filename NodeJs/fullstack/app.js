const http = require('http');
const fs = require('fs');

function responseText(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>ok it works</h1>');
}


function responseJson(req, res) {

    console.log(req.params)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        name: 'lalal',
        age: '24'
    }));
}

function notFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 not found</h1>');
}

function responseEcho(req, res) {
    const { input = '' } = req.params
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    }))
}

function responseStatic(req, res) {
    const fileName = `${__dirname}/public/${req.url.split('/static/')[1]}`;
    fs.createReadStream(fileName)
        .on('error', () => notFound(req, res))
        .pipe(res);

}


http.createServer(function (req, res) {
    console.log(req.url);
    const url = new URL(req.url, 'http://localhost:8080');
    let params = {}
    if (url.search) {
        const searchParams = new URLSearchParams(url.search);
        searchParams.forEach(function (value, key) {
            params[key] = value;
        })
    }

    req.params = params;

    switch (url.pathname) {
        case '/':
            responseText(req, res);
            break;
        case '/json':
            responseJson(req, res);
            break;
        case '/echo':
            responseEcho(req, res)
            break;

        default:
            if (url.pathname.startsWith('/static')) {
                responseStatic(req, res)
            }
            else notFound(req, res);
    }


}).listen(8080, () => console.log('server is running'));

// console.log(new URL('http://localhost:8080/code?input=hello'));