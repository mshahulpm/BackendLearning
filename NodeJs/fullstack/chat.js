const EventEmitter = require('events');
const express = require('express');
const app = express();
const chatEmitter = new EventEmitter();


app.use(express.static('public'))

app.get('/chat', (req, res) => {

    const { message } = req.query;
    chatEmitter.emit('message', message);
    res.end();

})

app.get('/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'connection': 'keep-alive',
    });
    chatEmitter.on('message', (message) => {
        res.write(`data: ${message}\n\n`);
    });

    res.on('close', () => {
        chatEmitter.off('message', message => {
            res.write(`data: connection closed\n\n`);
            res.end();
        });
    });
})

chatEmitter.on('message', (message) => {
    console.log(message);
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})