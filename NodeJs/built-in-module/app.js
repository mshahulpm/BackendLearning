//  assert module 

function _assert() {
    const assert = require('assert');

    console.log(assert(1 < 2, '1 is greater than 2'));
    console.log(assert.ok('true', true));

    try {
        assert.deepEqual('true', false, 'true is not equal to false');
    } catch (e) {
        console.log({ e });
    }
}


//  buffer 

function _buffer() {
    const Buffer = require('buffer').Buffer;

    console.log(Buffer.from('Hello'));
    console.log(Buffer.from('Zz'));
    console.log(Buffer.alloc(10));
    console.log(Buffer.alloc(10, 1));
    console.log(Buffer.allocUnsafe(10));
    console.log(Buffer.allocUnsafe(10).fill(0));
    console.log(Buffer.alloc(15).byteLength);

    let b1 = Buffer.from('lm');
    let b2 = Buffer.from('lk');
    let x = Buffer.compare(b1, b2);
    console.log(x);

    console.log(['b', 'f', 'i', 'a', 'd'].map(Buffer.from).sort(Buffer.compare).map(x => x.toString()));
}

//  cluster module  

function _cluster() {

    const cluster = require('cluster');

    if (cluster.isWorker) {
        console.log('I am worker');
    } else {
        console.log('I am master');
        cluster.fork()
        cluster.fork()
    }
}

//  crypto module

function _crypto() {

    // Encrypt the text 'abc'
    var crypto = require('crypto');

    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update('abc', 'utf8', 'hex')
    mystr += mykey.final('hex');

    console.log(mystr);

    // decrypt ing that value 
    let newKey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    let str = newKey.update(mystr, 'hex', 'utf8');
    str += newKey.final('utf8');

    console.log(str);
}


function _dgram() {
    const dgram = require('dgram');
    const server = dgram.createSocket('udp4');
    server.on('error', (err) => {
        console.log({ err })
    })
    server.on('message', (msg, rinfo) => {
        console.log(msg.toString(), rinfo)
    })

    server.bind(41234);

    const client = dgram.createSocket('udp4');
    client.send('hello', 41234, 'localhost');
}


//  dns 

function _dns() {
    const dns = require('dns');
    dns.lookup('google.com', (err, address, family) => {
        console.log({ err, address, family });
    })

    dns.getServers('google.com', (err, servers) => {
        console.log({ err, servers });
    })
}


//  os module

function _os() {
    const os = require('os');
    console.log(os.arch());
    console.log(os.cpus());
    console.log(os.freemem());
    console.log(os.homedir());
    console.log(os.hostname());
    console.log(os.loadavg());
    console.log(os.networkInterfaces());
    console.log(os.platform());
}

//  path module

function _path() {
    const path = require('path');
    const fname = 'user/shahul/test.txt';
    console.log(path.basename(fname));
}

//  querystring module 

function _queryString() {
    var querystring = require('querystring');
    var q = querystring.parse('year=2017&month=february');
    console.log(q);

    // querystring is  deprecated 
    const url = new URLSearchParams('year=2017&month=february');
    console.log(url.get('year'));
}

// readline module 

function _readline() {
    var readline = require('readline');
    var fs = require('fs');

    var myInterface = readline.createInterface({
        input: fs.createReadStream('app.js')
    });

    var lineno = 0;
    myInterface.on('line', function (line) {
        lineno++;
        console.log('Line number ' + lineno + ': ' + line);
    });
}

//  string decoder module 

function _string_decoder() {
    var { StringDecoder } = require('string_decoder')

    var d = new StringDecoder('utf8');
    var b = Buffer.from('abc');

    console.log(b); //write buffer
    console.log(d.write(b)); // write decoded buffer;
}

//  timer  

function _timer() {
    const myInt = setInterval(() => {
        console.log('Hello');
    }, 1000);
}

// url module 

function _url() {
    const url = require('url');
    const myUrl = url.parse('http://www.example.com/users?id=12345');
    console.log(myUrl);

    // url.parse  is deprecated 
    const myUrl2 = new URL('http://www.example.com/users?id=12345');
    console.log(myUrl2);
}

// util module

function _util() {
    const util = require('util');
    const txt = 'Congratulate %s on his %dth birthday!';
    const result = util.format(txt, 'John', 6);

    console.log(result);
}

// v8 module

function _v8() {
    const v8 = require('v8');
    console.log(v8.getHeapStatistics());
}

// vm module  - to compile javascript code in virtual machine

function _vm() {
    var vm = require('vm');
    var myObj = { name: 'John', age: 38 };
    vm.createContext(myObj);

    vm.runInContext('age += 1;', myObj);

    console.log(myObj);
}

// module zlib - to compress and decompress data 

function _zlib() {
    const zlib = require('zlib');
    const fs = require('fs');

    const gzip = zlib.createGzip();
    const inp = fs.createReadStream('app.js');
    const out = fs.createWriteStream('app.js.gz');
    inp.pipe(gzip).pipe(out);

}

