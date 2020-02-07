//setting up mysql connection
const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {connection = mysql.createConnection({
    //host: xyz.amazonaws.com or xyz.heroku goes here,
    port: 3306,
    user: 'root',
    password: 'Wordpass3!!!992',
    database: "burgers_db"
})
};

//establishing connection

connection.connect((error) => {
    if (error) {
        console.error(`error connecting ${error.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
})

module.exports = connection;