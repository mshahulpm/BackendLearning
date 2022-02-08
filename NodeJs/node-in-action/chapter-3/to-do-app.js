// function asyncFunc(callBack) {

//     setTimeout(function () {
//         callBack();
//     }, 1000);
// }

// let color = 'red';

// // asyncFunc(() => {
// //     console.log(color);  // blue 
// // }, 5000)


// (function (color) {
//     asyncFunc(() => {
//         console.log(color);  //red 
//     })
// })(color)

// color = 'blue';

// console.log(color);  // blue 
const Url = require('url');
const http = require('http');
let data = [];

http.createServer((req, res) => {
    const { url } = req;
    const { method } = req;

    switch (method) {
        case 'POST':
            let body = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                data.push(body);
            });
            break;
        case 'DELETE':
            let urlObj = Url.parse(url, true);
            const pathname = urlObj.pathname;
            const id = parseInt(pathname.split('/')[2])
            data = data.filter((_, i) => i !== id);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end('deleted');
            break;

    }

    switch (url) {
        case '/':
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Set-Cookie': ['type=ninja', 'language=javascript']
            });
            // set cookie 
            res.end('hello world');
            break;
        case '/users':
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify([{ name: 'John' }, { name: 'Jane' }]));
            break;
        case '/redirect':
            let body = '<html><head><meta http-equiv="refresh" content="5;url=http://localhost:3000/"></head><body>Redirecting...</body></html>';
            res.setHeader('Location', 'https://www.google.com');
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', body.length);
            res.statusCode = 302;
            res.end(body);
            break;
        case '/items':
            let resp = ''
            data.forEach((item, i) => {
                resp += `${i + 1}) ${item}\n`
            })
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plane; charset="utf-8"');
            res.setHeader('Content-Length', Buffer.byteLength(resp));
            res.end(resp);
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('<h1>Page not found</h1>');
            break;
    }


})
    .listen(3000, () => {
        console.log('server is listening on port 3000');
    });


