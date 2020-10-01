//require express
var express = require('express');

//require body-parser
var bodyParser = require('body-parser');

// require mongoos
var mongoose = require("mongoose");

//create express object, call express
var app = express();

//get port info
const port = process.env.PORT || 3000;

//tells app to use ejs for templates
app.set('view engine', 'ejs');

//make styles public
app.use(express.static("public"));

//tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Connection Information for Mongo
const Todo = require('./models/todo.model');
const mongoDB =  'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//couple of items todo
var tasks = [];

//completed items
var completed = [];

//get home page /
app.get('/', function(req, res){
    //query to mongoDB for todos
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            for(i = 0; i< todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i].item)
                }else{
                    tasks.push(todo[i].item)
                }
            }
        }
    });
    //return something to home page
    res.render('index', {tasks: tasks, completed: completed}); //add completed variable to ejs
});

//add post method /addtask
app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});

//remove post method /removetask
app.post('/removetask', function(req, res){
    var removeTask = req.body.check;
    //push to completed
    if(typeof removeTask === 'string'){
        tasks.splice(tasks.indexOf(removeTask), 1);
        completed.push(removeTask);
    }else if(typeof removeTask === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
            completed.push(removeTask[i]);
        }
    }
    
    res.redirect('/');
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});