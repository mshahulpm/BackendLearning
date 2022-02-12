const formidable = require('formidable');
const http = require('http');
const fs = require('fs');


http.createServer(function (req, res) {


    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`
            <form action="fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload"><br>
            <input type="submit">
            </form>
            `)
            res.end()
            break
        case '/fileupload':
            const form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                const oldpath = files.filetoupload.filepath;
                const newpath = './upload/' + Date.now() + '.' + files.filetoupload.originalFilename.split('.')[1];

                const readStream = fs.createReadStream(oldpath);
                const writeStream = fs.createWriteStream(newpath);
                readStream.pipe(writeStream);
                readStream.on('end', function () {
                    fs.unlink(oldpath, function (err) {
                        if (err) throw err;
                        console.log('file deleted');
                    });

                })

                writeStream.on('error', function (err) {
                    console.log(err.stack);
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.write('Error');
                    res.end();
                })

                writeStream.on('finish', function () {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('Received upload:\n\n');
                    res.end();
                })

            })
    }

}).listen(8080);
