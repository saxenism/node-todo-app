var express = require('express');
var todoController = require('./Controllers/todoControllers.js');
var app = express();
let morgan = require('morgan')

//setting up view engine
app.set('view engine', 'ejs');
app.use(morgan('dev'))

//Handling static files
app.use(express.static('./public'));

//fire Controllers
todoController(app);

app.listen(3000);

console.log("Listening to port 3000");
