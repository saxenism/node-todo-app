var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to  the database
mongoose.connect("mongodb://Rahul:lund@todo-shard-00-00-7kuxs.mongodb.net:27017,todo-shard-00-01-7kuxs.mongodb.net:27017,todo-shard-00-02-7kuxs.mongodb.net:27017/test?ssl=true&replicaSet=ToDo-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true});

//Create  a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'Set up meeting with the Dean'}, {item: 'Call Dad'}, {item: 'Go to gym'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app)
{
  app.get('/todo', function(req, res){
    //get data from MongoDB and pass it to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos:data});
    });
  });

  app.post('/todo',urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from MongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
