const mysql = require('mysql');

//connection - function containing db connection fields to create a connection to the database
const connection = mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password': 'nik@mysql',
    'database': 'world'
});

connection.connect();

//export modules
module.exports.connection = connection;
