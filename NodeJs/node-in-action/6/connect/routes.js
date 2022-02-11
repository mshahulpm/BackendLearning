const connect = require('connect')

const parse = require('url').parse;

//  configurable middleware 
function router(obj) {
    return function (req, res, next) {
        if (!obj[req.method]) {
            next();
            return;
        }
        var routes = obj[req.method]
        var url = parse(req.url)
        var paths = Object.keys(routes)
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var fn = routes[path];
            path = path
                .replace(/\//g, '\\/')
                .replace(/:(\w+)/g, '([^\\/]+)');
            var re = new RegExp('^' + path + '$');
            var captures = url.pathname.match(re)
            if (captures) {
                var args = [req, res].concat(captures.slice(1));
                fn.apply(null, args);
                return;
            }
        }
        next();
    }
};

const routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi, loki, koki')
        },
        '/user/:id': function (req, res, id) {
            res.end('user ' + id)
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('deleted user ' + id)
        },

    }
}

//  admin route 
const admins = {
    GET: {
        '/admin': function (req, res) {
            res.end('welcome to admin')
        },
        '/admin/users': function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
        },
        '/admin/users/:id': function (req, res, id) {
            if (id == 5) throw Error()
            res.end('user ' + id)

        }
    }
}

//  error handling  
const errorHandler = function () {

    let env = process.env.NODE_ENV || 'development';
    return function (err, req, res, next) {
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err))
                break
            default:
                res.end('Server error')
        }
    }
}

connect()
    .use(router(routes))
    .use(router(admins))
    .use(errorHandler())
    .listen(3000, () => {
        console.log('server is running on port 3000')
    })

