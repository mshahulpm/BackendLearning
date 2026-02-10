const { createHash } = require("crypto");



// console.log(hash);
// hash.update('hello');
// console.log(hash.digest('hex') === '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');


function hash(data, algorithm = 'sha256') {
    const normalizedData = typeof data === 'string' ? data : JSON.stringify(data);
    return createHash(algorithm).update(normalizedData).digest('hex');
}

console.log(hash('superhacker'));
console.log(hash(1234));
console.log(hash(true));
console.log(hash([123]));
console.log(hash({ name: 'shahul' }));
