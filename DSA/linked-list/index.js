

let o = { name: 'shahul' }
let b = o

console.log(o, b);

o.age = 25
console.log(o, b);

b.place = 'mlp'
console.log(o, b);

b = 0909
delete o

console.log(o, b);

