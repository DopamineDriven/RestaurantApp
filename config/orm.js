const connection = require("./connection.js");

//helper functions for sql syntax
//question marks required to pass values into sql queries, right? right.
//the question marks helper function loops through creating an array of question marks representative of values
//["?", "?", "?"].toString() => "?, ?, ?"
function printQuestionMarks(num) {
    const array = [];

    for (let i = 0; i < num; i++) {
        array.push("?");
    }
    
    return array.toString();
};

//helper function converts object key/value pairs to SQL syntax
function ObjToSql(ob) {
    const arr = [];
    
    //loops through keys and pushes the key/value as a string int arr
    for (let [key, value] of Object.entries(ob)) {
        //ob[key] = var value
        //skip hidden properties by checking
        console.log(`${key} and ${value}`)
        //Therefore, if (Object.hasOwnProperty(key)) {
            //if string with spaces, add quotations (Leonardo da Vinci => 'Leonardo da Vinci')}
        if(typeof value === "string") {
            value = "'" + value + "'"
        };
        //example: {sleepy: true} => ["sleepy=true"]
        arr.push(`${key}=${value}`) 
    }
}

const orm = {
    selectAll: function(table) {
        return new Promise
    }

    //selectAll()


    //insertOne()


    //updateOne()


    //removeOne()

};

module.exports = orm;