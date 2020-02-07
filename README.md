# RestaurantApp :hamburger:
mysql, express, express-handlebars, node, ORM, heroku

# User Story

This app allows users to input burgers that they would like to try. Upon eating (devouring) said burger, the user clicks the devour button. This moves the burger from the queue on the left side of the screen to the devoured column on the right side of the screen (the 86 burger column). The burger is 86'd from the app and corresponding database once the red trashcan button is clicked. For example, Bob heard about the beyond burger, a 100% plant-based burger, and how much it tasted and looked like a real burger. Bob really wants to try this burger, so he decides to add it to his burger queue. After eating the burger, he can check it off the list by clicking the yellow burger button indicating that he has "devoured" it. Perhaps Bob is at a restaurant and would like to try several signature burgers but ultimately he must choose one. With this app, he can add all three burgers to his burger queue. This provides a reminder of what items he would like to order the next time he eats at or orders takeout from this restaurant.

# Outlook

This app, while relatively simplistic, could serve as the foundation for much more involved or complex apps. A to-go order verification app for a restaurant, for example, in which the user submits an order from their menu, it enters queue, and the user selects picked up to shift the order from queue to completed. Additional features could be incorporated for the user to leave the restaurant feedback regarding the quality of their order, whether all items were prepared correctly or not, and any suggestions or "nice-to-haves" the user might think of. This would be an efficient way for a restaurant to receive real-time feedback and constructive criticism from customers to help them improve their to-go procedures on an ongoing basis. This would also make customers feel more heard as they could affect change remotely without having to say "I'd like to speak to the manager". This is but one of many potential applications.  

# Technical Overview

## MVC Directory Structure

Model, View, Controller

- Model is the business logic of the app. It interacts with the config and db folders. It maintains the data of the app. 
- View is the user interface of the app. In this case, express-handlebars is used. View display data using model allowing users to create, update, modify, and delete data.
- Controller handles user requests and interacts with the model, view, and server. It renders the appropriate view with the model data as a response.  

## Heroku Deployed App

https://infinite-stream-25057.herokuapp.com/

This app was deployed using Heroku. The SQL database was linked to the deployed app via the use of a key-value pair generated by Heroku. The key alluded to in the aforementioned pair being JAWSDB_URL and its corresponding value being a mysql url containing sensitive information such as database name, host name, username, and password. That said, Heroku is a PaaS (Platform as a Service) which implies that apps are deployed from its cloud (its cloud being AWS given that Heroku is a GUI built on AWS). 

## Link to Updated Portfolio
https://dopaminedriven.github.io/portfolio/portfolio.html

## SQL database storage

User input data is stored in a SQL database. Locally, this database is burger_db; remotely (heroku deployed), this database is ibum8812hgyphmpo. The latter being the database in which user input information is stored via the heroku deployed app. Below is an example of how the burgers table in which data is stored is structured.  

id | burger_name | devoured
-- | ----------- | --------
1  | Beyond      | 0
2  | Firestarter | 1

Where 0 = false and 1 = true

The schema.sql and seeds.sql files are located in the db folder. These files also exist in MySQL workbench. 

## Connection

The connection.js file is located in the config folder. This file requires mysql and is where the connection with the SQL database(s) is established. This connection function is exported for use in the orm.js file. This is also where the aforementioned remote JAWSDB_URL key comes into play. 

## ORM (Object Relational Mapping)

The orm.js file is located in the config folder and requires the connection.js folder (also located within the config folder). It provides the foundation for CRUD (create, read, update, delete) which are expanded upon in the model folder (using exported orm.js functions). These objects (comprised of key-value pairs) query the boiler-plate SQL syntax.

## Model

The model folder, containing the burger.js file, interacts with the config folder (which in turn interacts with the database) as well as the controller folder. The model folder imports methods defined in the orm.js file. In this app, all of the model functions are asynchronous which increases app responsivity and efficiency. The four CRUD functions defined in the burger.js file are exported for use in the controllers folder. It should be noted that using an asynchronous approach renders the necessity of a callback function obsolete; try{} and catch{} replace the need for a callback parameter.

## Controller

The controller folder, containing the burgers_controllers.js file, is where express is key (request, response). This file imports the functions exported from the models file. Express is declared as a constant in this file and then declared once more as express.Router(). Why? It is interacting directly with the router. Not only that, it also interacts with the express-handelbar files located within the views folder. The controller can be thought of as the shortstop of directory structure. The controller file also contains an input validation middleware function that is called as a parameter for PUT and POST functions. This is to ensure that the user doesn't leave any required fields null as to prevent null data being stored in the database. 

## View

The view in this app corresponds to express-handlebars files. Express handlebars is a lightweight templating system for Node. It reduces the amount of repetitive code by compiling the final DOM structure via logic. This logic is supported in a corresponding script.js file which is discussed below. 

## Error Handling Middleware

There is a script.js file located in a js folder that is located within the overarching public folder. This folder uses jQuery and interacts with handlebar files. It handles prevent default, loading, user probed CRUD functonality, and so on.

## Server

The server is where the PORT is defined, the express app is declared, and body-parser is called. This is the main file declared in the package.json since without a server, be it local or remote, there is no live app. The server being functional is also integral throughout the development process since GET, POST, PUT, and DELETE calls can be tested and trouble shooted via the use of Postman (even if the user interface view aspect of the app has not yet been created). The default layout for the user interface (view) is also declared in this file. In this case, it is an express-handlebars file where the default corresponds to main.handlebars located within the views/layouts folders. 

## npm dependencies
- orm -- https://www.npmjs.com/package/orm
- mysql -- https://www.npmjs.com/package/mysql
- express -- https://www.npmjs.com/package/express
- express-handlebars -- https://www.npmjs.com/package/express-handlebars
- body-parser -- https://www.npmjs.com/package/body-parser
- nodemon -- https://www.npmjs.com/package/nodemon

## useful resource
https://www.sitepoint.com/a-beginners-guide-to-handlebars/

.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       ├── js
│       │   └── script.js
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars

