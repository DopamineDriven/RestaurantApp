const orm = require("../config/orm.js");

//code to call ORM methods using burger specific input for the ORM
//use async functions with try{} and catch{}
//module.exports = {four functions corresponding to four ORM methods}
//using async try, catch approach as opposed to static sync function (cb) approach

//get => orm.selectAll
async function gettingAll() {
    try {
        const resultados = await orm.selectAll('burgers');
        return resultados
    } catch (error) {
        if (error) {
            console.log(error)
            throw error
        }
    }
};

//post => orm.create
async function creating(cols, vals) {
    try {
        const resultados = await orm.create('burgers', cols, vals);
        return resultados 
    } catch (error) {
        if (error) {
            console.log(error)
            throw error
        }
    }
};

//put => orm.update
async function editing(colValsObj, condition) {
    try {
        const resultados = await orm.update('burgers', colValsObj, condition);
        return resultados
    } catch (error) {
        if (error) {
            console.log(error)
            throw error
        }
    }
};

//delete => orm.delete
async function deleting(condition) {
    try {
        const resultados = await orm.delete('burgers', condition);
        return resultados
    } catch (error) {
        if (error) {
            console.log(error)
            throw error
        }
    }
};

module.exports = {
    gettingAll,
    creating,
    editing,
    deleting
};