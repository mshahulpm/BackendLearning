// spam check library 
const spamCheck = require('spam-check')
const Filter = require('bad-words')

const filter = new Filter({ placeHolder: ' ' })

console.log(
    filter.clean('I want to fuck her')
    // arr
);