const connect = require('connect');
const app = connect();


// logger middleware 
function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

//  hello middleware
function hello(req, res,) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

//  restriction middleware
function restrict(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    let parts = authorization.split(' ');
    let scheme = parts[0];
    let auth = Buffer.from(parts[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    login(user, pass, (err) => {
        if (err) return next(err);
        next();
    })
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

function login(uname, psw, cb) {
    if (uname === 'admin' && psw === 'admin') {
        cb();
    } else cb(new Error('Unauthorized'));
}

// configurable middleware 

function setup(format) {

    const regex = /:(\w+)/g;

    return function logger(req, res, next) {
        let str = format.replace(regex, function (match, property) {
            return req[property] || '';
        });
        console.log(str);
        next();
    }
}

app
    .use(setup(':method :url'))
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000, () => {
        console.log('Server is running on port 3000');
    });

const parse = require('url').parse
let url = '/admin/users/1234/post/999'
url = parse(url)
// console.log(url)

let path = '/admin/users/:id/post/:postId'
path = path.replace(/\//g, '\\/')
console.log(path)
path = path.replace(/:(\w+)/g, '([^\\/]+)');
console.log(path)
var re = new RegExp('^' + path + '$');
console.log(re)
var captures = url.pathname.match(re)
// console.log(captures.length)
const args = [1, 2].concat(captures.slice(1))
// console.log(args)
function aaa(...args) {
    console.log({ args })
}
aaa.apply(null, args)