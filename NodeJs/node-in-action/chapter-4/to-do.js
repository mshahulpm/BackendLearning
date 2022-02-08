const http = require('http');
const qs = require('querystring');
const formidable = require('formidable');
const toDoItems = []


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        switch (req.method) {
            case 'GET':
                show(req, res);
                break;
            case 'POST':
                addItem(req, res);
                break;
            default:
                badRequest(req, res);
                break;
        }
    }
    else if (req.url === '/upload') {
        switch (req.method) {
            case 'GET':
                show(req, res, true);
                break;
            case 'POST':
                upload(req, res);
                break;
        }
    }

    else {
        notFound(req, res);
    }
})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});



//  controllers 

function show(req, res, upload) {
    const enctype = upload ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
    const action = upload ? '/upload' : '/'
    var html = '<html><head><title>Todo List</title></head><body>'
        + '<h1>Todo List</h1>'
        + '<ul>'
        + toDoItems.map(function (item) {
            return '<li>' + item + '</li>'
        }).join('')
        + '</ul>'
        + '<form method="post"  enctype="' + enctype + '"' +
        ' action="' + action + '">'
        + '<p><input type="text" name="item" /></p>'
        + `${upload ? '<p><input type="file" multiple name="file" /></p>' : ''}`
        + `<p><input type="submit" value=${upload ? 'Upload' : "Add Item"} /></p>`
        + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function addItem(req, res) {
    var body = '';
    req.setEncoding('utf8')
    req.on('data', function (chunk) {
        body += chunk;
    })
    req.on('end', function () {
        console.log(body);
        let obj = qs.parse(body)
        console.log(obj)
        toDoItems.push(obj.item)
        show(req, res)
    })
}

function notFound(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest(req, res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain')
    res.end('Bad request')

}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bad request: expecting multipart/form-data');
    } else {
        const form = new formidable.IncomingForm({
            multiples: true,
            uploadDir: './uploads',
            keepExtensions: true
        });
        //  showing the progress of the upload 
        form.on('progress', (brec, bexp) => {
            var perc = Math.floor(brec / bexp * 100)
            console.log(perc)
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal server error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File uploaded');
            }
        })
    }
}

function isFormData(req) {
    return req.headers['content-type'].indexOf('multipart/form-data') === 0

}