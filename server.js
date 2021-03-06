//link to updated portfolio
//https://dopaminedriven.github.io/portfolio/portfolio.html
const express = require("express");
const path = require("path");
//body-parser middleware
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4321;

//static content served for app from public_dir
app.use(express.static("public"));

//parses any json body passed in the app
app.use(bodyParser.json());

//takes parameter for extended
app.use(bodyParser.urlencoded({extended: true}));

//handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

//import controllers to give server access to them
const routes = require("./controllers/burgers_controllers");
app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
});
