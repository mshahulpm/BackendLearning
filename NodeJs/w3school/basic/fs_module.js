// fs Module 

const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('demo.html', function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Server Error</h1>');
        }
        else {
            res.write(data);
            setTimeout(() => {
                res.write('<h1>Hello after 2 sec</h1>');
                res.end()

            }, 2000)
        }
    });

}).listen(8080);

//  write to an existing file or create a new file
// fs.appendFile('demo2.html', '<h1>Hello</h1>', function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('File created');
//     }
// });

// create a new empty file

// fs.open('demo6.html', 'w', function (err, file) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(typeof file, file);
//     }
// })


//  replace the content of an existing file or create a new file

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>
        this file is created by nodejs using fs.writeFile()
    </p>
</body>
</html>`

// fs.writeFile('demo.html', html, function (err) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('File created');
//     }
// })


// append to an existing file or create a new file 
const newHtml = `\n<p>this paragraph appended by fs.appendFile() at ${new Date().toLocaleString()} </p>`;

// fs.appendFile('demo.html', newHtml, function (err) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('File created');
//     }
// })


// rename a file (name.txt => name2.txt)
// fs.rename('name.txt', 'name2.txt', function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('File renamed');
//     }
// })

