const express = require("express");
//body-parser middleware
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4321;

//static content served for app from public_dir
app.use(express.static("public"));

//parses any json body passed in the app
app.use(bodyParser.json());

//takes parameter for extended to extend capability of body-parser
app.use(bodyParser.urlencoded({extended: true}));

//handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import controllers to give server access to them
const routes = require("./controllers/burgers_controllers");
app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
});
