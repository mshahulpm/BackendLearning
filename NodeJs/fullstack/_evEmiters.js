function _basic() {

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
    });
    console.log('enter some nos with comma separated and enter');
    rl.on('line', (line) => {
        const numbers = line.split(',');
        const sum = numbers.reduce((acc, curr) => {
            return acc + (parseInt(curr) || 0);
        }, 0);
        console.log(sum);
    });

}

// custom emitters 
let emiter1
function _custom() {
    const EventEmitter = require('events');
    const emitter = new EventEmitter();
    emitter.on('event', (a, b) => {
        console.log(a, b);
    });
    emitter.emit('event', 'hello', 'world');
    emiter1 = emitter;
}


_custom();
let n = 0
let int;
int = setInterval(() => {
    emiter1.emit('event', ++n, 'hello');
    if (n === 5) {
        clearInterval(int);
    }
}, 1000); 