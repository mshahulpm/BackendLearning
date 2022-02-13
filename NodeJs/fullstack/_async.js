// node async behavior 

function _basic() {
    let count = 0;
    // setInterval(() => {
    //     console.log(++count);
    // }, 1000);

    console.log('hello from past');

    function setTimeoutSync(ms) {
        let start = Date.now();
        while (Date.now() - start < ms) { }
    }

    const http = require('http');
    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            setTimeoutSync(10000);
            res.end('hello world');
        } else {
            res.end('hello world fast');
        }
    });

    server.listen(3000, () => {
        console.log('listening on port 3000');
        setTimeoutSync(10000);
    });
}



// callback 

function _callback() {

    const fs = require('fs');
    const filename = '_async.js';

    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('end data got!');
    }

    );
    console.log('hello from past');


}



// console.log('start');
// for (let i = 0; i < 1000; i++) {
//     if (i === 500) {
//         console.log('middle');
//     }
// }
// console.log('end');

// function asyncLoop(n) {

//     for (let i = 0; i < n; i++) {
//         if (i === Math.floor(n / 2)) {
//             console.log('middle');
//         }
//     }
// }

// console.log('start');
// asyncLoop(1000);
// console.log('end');


//  callback broken 

function _callbackBroken() {

    const fs = require('fs');
    fs.readdir('.', (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(file => {
            if (file.includes('.')) {
                fs.readFile(file, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(file + ' : ' + data.length);
                });
            }
        })
    });
}

_callbackBroken();