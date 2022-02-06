const fs = require('fs');

//  simple async example to understand callbacks 

fs.readFile('../../demoData/resource.json', (err, data) => {
    // console.log(data.toString());
})


//  home route 
function home(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello World' }));
}

// user route 

function getUser(req, res) {
    fs.readFile('../../demoData/resource.json', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Server down' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(data);
        }
    })
}

//  404 

function notFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not Found' }));
}

//  route to stream data from a file 

function streamData(req, res) {
    const stream = fs.createReadStream('../../demoData/resource.json');
    stream.on('data', (chunk) => {
        console.log(chunk.toString('utf8'));
    });
    stream.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        stream.pipe(res);
    });
}

// streaming an image to client 

function streamImageToClient(req, res) {

    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
    const stream = fs.createReadStream('../../demoData/Images/image.jpg');
    stream.pipe(res);
}

module.exports = {
    home,
    getUser,
    notFound,
    streamData,
    streamImageToClient
}

