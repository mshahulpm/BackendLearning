const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
    const sql = "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Table created');
    })
});

// connection.query('insert into customers (name,address) values ("Shahul","Highway 15")', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// }) 

//  insert a new customer into the `customers` table

// connection.query('insert into customers set ?', { name: 'John', address: 'Highway 71' }, function (err, result) {
//     if (err) throw err;

//     console.log('Last insert ID:', result);
// })

//  insert multiple records into the `customers` table 
var sql = "INSERT INTO customers (name, address) VALUES ?";
var values = [
    ['Jack', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Frank', 'Baker st 544'],
    ['Rose', 'Highway 71'],
    ['Michael', 'Highway 78'],
]

// connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log(result + " record(s) inserted");
// })


//  select all columns from the `customers` table

// connection.query('select * from customers', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// }) 

// select specific columns from the `customers` table

// connection.query('select address from customers', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     console.log(fields);
// }) 


//  wild card character `%`

// select docs where address start with H 

// connection.query('select * from customers where address like "h%"', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// })

// escape special characters to prevent SQL injection

let addr = 'Mountain 21';
sql = `select * from customers where address = "${mysql.escape(addr)}"`;

connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})

// or second method 

connection.query(`select * from customers where address = ?`, [addr], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})


// order by alphabetical order 

connection.query('select * from customers order by name', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})


// descending order

connection.query('select * from customers order by name desc', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})


// delete a record from the `customers` table 

connection.query('delete from customers where id = 2', function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) deleted");
})


// delete a table

// connection.query('drop table IF EXISTS customers', function (err, result) {
//     if (err) throw err;
//     console.log(result);
// })


// update a record in the `customers` table

// connection.query('update customers set address = "Edit 123" where id = 1', function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
// }) 



//  limit the number of records returned

connection.query('select * from customers limit 2', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})


// start from a specific record 

connection.query('select * from customers limit 2 offset 2', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
})