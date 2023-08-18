const express = require('express');
const app = express();
const router = express.Router()
const router2 = express.Router()
const fs = require('fs');
const pug = require('pug');
const path = require('path');
const methodOverride = require('method-override');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(methodOverride('X-HTTP-Method-Override'));
//override the response 
app.response.sendStatus = function (statusCode, type, message) {
    this.contentType(type).status(statusCode).send(message);
}

// pug 
app.get('/pug', (req, res) => {
    res.render(path.join(__dirname, 'index'), { title: 'Hello ', message: 'this one is pug template' })
})

// checking 
app.get('/sendStatus', (req, res) => {
    console.log(req.baseUrl, req.originalUrl, req.secure, req.ip, req.header('Client-IP'));
    res.sendStatus(200, 'application/json', JSON.stringify({ message: 'Hello World' }));
});
function getHandler(method) {
    return function (req, res) {
        res.send('Hello World! from ' + method);
    }
}

router.route('/')
    .get(getHandler('get'))
    .post(getHandler('post'))
    .put(getHandler('put'))
    .delete(getHandler('delete'))
    .patch(getHandler('patch'))
    .head(getHandler('head'))
    .options(getHandler('options'))
    .copy(getHandler('copy'))

router2.route('/')
    .all((req, res, next) => {
        res.send('Hello World! from ' + req.method);
    })

// cors 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/', router);
app.use('/all', router2)
app.get('/download', (req, res) => {
    res.download('./package.json');
})

app.get('/error', (req, res) => {
    throw new Error('Error');
})

app.use(errorhandler);

function errorhandler(err, req, res, next) {
    res.status(500);
    res.send(err.message);
}

app.post('/json', (req, res) => {
    console.log(req.body);
    res.status(200).json({
        token: "ahgsahsghagsghsgh"
    })
})

const users = ['one ', 'two', 'three'];
app.get('/format', function (req, res) {
    res.format({
        html: function () {
            res.send('<ul>' + users.map(function (user) {
                return '<li>' + user + '</li>';
            }).join('') + '</ul>');
        },

        text: function () {
            res.send(users.map(function (user) {
                return ' - ' + user + '\n';
            }).join(''));
        },

        json: function () {
            res.json(users);
        }
    });
});


// 404 
app.use(function (req, res, next) {
    console.log(req.url);
    res.status(404).json({ error: 'Sorry cant find that!' });
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})

