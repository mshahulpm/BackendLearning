const jwt = require('jsonwebtoken')
const fs = require('fs')

var privateKey = fs.readFileSync('./private.key');
var publicKey = fs.readFileSync('./public.key');
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

jwt.verify(token, publicKey, function (err, decoded) {
    if (err) return console.log(err)
    console.log(decoded) // bar
});