const url = require('url');

let address = 'http://localhost:8080/default.htm?year=2017&month=february';

// address = 'https://www.w3schools.com/default.asp/users/12?year=2017&month=february';

const q = url.parse(address, true);
console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search) //returns '?year=2017&month=february'

const query = q.query; //returns an object: { year: 2017, month: 'february' }

console.log(query.month); //returns 'february'

// file server 
const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {

    const q = url.parse(req.url, true);
    const fileName = '.' + q.pathname;
    fs.readFile(fileName, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
        }
    })
}).listen(8080);