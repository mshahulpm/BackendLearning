const express = require('express');
const app = express();
const router = express.Router()
const router2 = express.Router()
const fs = require('fs');


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

app.use('/', router);
app.use('/all', router2)

app.get('/error', (req, res) => {
    throw new Error('Error');
})

app.use(errorhandler);

function errorhandler(err, req, res, next) {
    res.status(500);
    res.send(err.message);
}

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
    res.status(404).json({ error: 'Sorry cant find that!' });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

