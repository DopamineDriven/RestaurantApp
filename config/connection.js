//setting up mysql connection
const mysql = require('mysql');
let connection;
//importing key value pair from jaws.js
const JAWSDB_URL = 'mysql://i0tl3n1wicpz42dv:e5u43qa0wg7p66cr@j1r4n2ztuwm0bhh5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ibum8812hgyphmpo'

if (JAWSDB_URL) {
    connection = mysql.createConnection(JAWSDB_URL);
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