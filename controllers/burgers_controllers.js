//require express
const express = require("express");
//express router
const router = express.Router();
//import four model functions corresponding to get, put, post, delete, respectively
const {gettingAll, creating, editing, deleting} = require("../models/burger.js");

router.delete('/api/burgers/:id', async (request, response) => {
    try {
        const condition = `id = ${request.params.id}`;
        const results = await deleting(condition)
        if (results.affectedRows === 0) {
            //if results.affectedRows is equal to and of the same type as 0, status 404
            return response
                .status(404)
                .send("id does not exist")
                .end()
        }
        else {
            response
                .status(200)
                .send("deleted successfully")
                .end()
        }
    }
    //if unforeseen error occurs, throw 500 status, send error occurred message 
    catch (error) {
        if (error) {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
                throw error
        }
    }
});

router.put('/api/burgers/:id',  async (request, response) => {
    try {
        const condition = `id = ${request.params.id}`;
        console.log(request.body);
        const results = await editing(request.body, condition);
        if (results.affectedRows===0) {
            return response
                .status(404)
                .send("id does not exist")
                .end()
        } else {
            response
                .status(200)
                .send("updated successfully")
                .end()
        }
    }
    catch (error) {
        if (error) {
            response
                .status(500)
                .send(`error occurred ${error}`)
                throw error
        }
    }
});

router.post('/api/burgers', async (request, response) => {
    try {
        const {burger_name, devoured} = request.body;
        console.log({burger_name, devoured})
        const result = await creating(["burger_name", "devoured"], [burger_name, devoured]);
        if (result.affectedRows === 0) {
            return response
                .status(404)
                .send("the burger was not added successfully")
                .end()
        } else {
            console.log(result)
            console.log({id: result.insertId}, {burger_name: burger_name}, {devoured: devoured});
            response
                .json({id: result.insertId})
                .status(200)
                //.send("burger added successfully")
        }
    }
    catch (error) {
        if (error) {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
                throw error
        }
    }
});

//since response.render("index", hbsObj) is rendering the hbsObj to index.handlebars
//Postman is not conducive to testing its functionality as it returns object: object
//that said, console.log(hbsObj) prior to response.render returns the array of burgers contained in the database
router.get('/', async (request, response) => {
    try {
        const results = await gettingAll();
        const hbsObj = {
            burgers: results
        };
        //if array is an array and the results length corresponds to said array, then
        if (Array.isArray(results) && results.length) {
            //render index.hbs with response
            console.log(hbsObj)
            response
                .status(200)
                .render("index", hbsObj)
        } else {
            return response
                .status(404)
                .send("burger array not found")
                .end()
        }
    }
    catch (error) {
        if (error) {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
                throw error
        }

    }
});

router.get('/devour', async (request, response) => {
    try {
        const results = await gettingAll();
        const hbsObj = {
            burgers: results
        };
        if (Array.isArray(results) && results.length) {
            response
                .status(200)
                .render("devour", hbsObj)
        } else {
            return response
                .status(404)
                .send("devour list not found")
                .end()
        }
    } catch (error) {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
                //throw error
    }
});


//middleware function to ensure required fields are accounted for on post/put requests; else throws an error
//middleware tested via postman to ensure effectiveness
function inputValidation(request, response, next) {
    const { burger_name, devoured } = request.body;
    //creating array of list of items that are missing
    const missingFields = [];
    if (!burger_name) {
      missingFields.push("burger_name");
    }
    if (devoured === null) {
      missingFields.push("devoured");
    }
    if (missingFields.length) {
      response
        //status 400 for bad request
        .status(400)
        .send(`The following fields are missing: ${missingFields.join(", ")}`);
    }
    //if no missing field, proceed to next middleware
    else {
      next();
    }
  };

//exporting routes to server.js 
module.exports = router;