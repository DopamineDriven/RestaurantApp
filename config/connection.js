//setting up mysql connection
const mysql = require('mysql');
let connection;
//importing key value pair from jaws.js
//this is a necessary evil because after console logging JAWSDB_URL it was not defined when it should have been
//I attempted to use a .gitignored jaws.js file to define this constant in but since it is gitignored heroku continued erroring out after the changes
//I understand that this greatly compromises the security of the database and, in practice, would not settle for such a haphazard solution
const JAWSDB_URL = 'mysql://sevnxbbgockoooko:quteiqdar3wnm5v5@g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/f0kucnxr4wxz3mko'

if (JAWSDB_URL) {
    connection = mysql.createConnection(JAWSDB_URL);
} else {connection = mysql.createConnection({
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