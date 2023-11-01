var sql = require("mssql");

var config = {
    user: 'sa',
    password: 'mypassword',
    server: 'localhost',
    database: 'SchoolDB'
};

sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from Student', function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        res.send(recordset);

    });
});
